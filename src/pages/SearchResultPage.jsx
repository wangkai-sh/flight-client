import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightTable from '../components/FlightTable';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFlightContext } from '../hooks/useFlightContext';
import { useBookingContext } from '../hooks/useBookingContext';
import { addBooking } from '../services/bookingApi';

const SearchResultPage = () => {

    const { state } = useLocation()
    // 登录信息
    const { userId } = useAuthContext()
    // 可选的航班信息
    const { departure, return: returnFlights } = useFlightContext()
    // 订单信息
    const { updateSelectedFlight, updateBookingIdAndFee } = useBookingContext()
    // 当前操作（选择出发航班/返程航班）
    const [currentStep, setCurrentStep] = useState('departure')
    // 存储出发航班
    const [selectedDepartureFlightId, setSelectedDepartureFlightId] = useState(null);
    // 乘客信息
    const [passengers, setPassengers] = useState([
        { firstName: 'firstName', lastName: 'lastName', email: 'a@b.c' }
    ]);
    // 页面跳转
    const navigate = useNavigate()

    const handleSelect = async (e, type, selectedFlight) => {
        e.preventDefault()

        // 存储出发订单信息
        if (currentStep === 'departure') {
            updateSelectedFlight(type, {
                departureCity: departure.departure,
                arrivalCity: departure.arrival,
                passengers: departure.passengers,
                flight: selectedFlight
            })
            // 存储出发航班
            setSelectedDepartureFlightId(selectedFlight.flightId);
        } else if (currentStep === 'return') {
            // 存储返程订单信息
            updateSelectedFlight(type, {
                departureCity: returnFlights.departure,
                arrivalCity: returnFlights.arrival,
                passengers: returnFlights.passengers,
                flight: selectedFlight
            })
        }

        // 单程
        if (state.tripType === '1') {
            try {
                // 添加订单
                const response = await addBooking(userId,
                    selectedFlight.flightId,
                    null,
                    passengers)

                // 存储订单总价和其他费用
                updateBookingIdAndFee(response.bookingId, response.totalPrice, response.otherFee)

                // 跳转至航班确认页
                navigate('/bookingReview');
                console.log(response)
            } catch (error) {
                // 调试用代码
                console.error(error)
            }
        } else {
            // 往返

            // 返程航班已选择
            if (currentStep === 'return') {
                try {
                    // 添加订单
                    const response = await addBooking(userId,
                        selectedDepartureFlightId,
                        selectedFlight.flightId,
                        passengers)

                    // 存储订单总价和其他费用
                    updateBookingIdAndFee(response.bookingId, response.totalPrice, response.otherFee)

                    // 跳转至航班确认页
                    navigate('/bookingReview');
                } catch (error) {
                    // 调试用代码
                    console.error(error)
                }
            } else {
                setCurrentStep('return')
            }
        }
    }

    // if (loading) return <div>Loading...</div>
    // if (error) return <div>Error：{error}</div>

    return (
        <div className='container mx-auto p-4'>
            {currentStep === 'departure' && (
                <FlightTable
                    title='Select your departure flight'
                    flights={departure?.flights ?? []}
                    onClick={(e, flight) => handleSelect(e, currentStep, flight)} />
            )}
            {currentStep === 'return' && (
                <FlightTable
                    title='Select your return flight'
                    flights={returnFlights?.flights ?? []}
                    onClick={(e, flight) => handleSelect(e, currentStep, flight)} />
            )}
        </div>
    )
}

export default SearchResultPage;
