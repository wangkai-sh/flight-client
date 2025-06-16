import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../services/bookingApi';
import { formatDate } from '../utils/DateUtils';

const MyBookingsPage = () => {

    const [upcomingData, setUpcomingData] = useState([]);
    const [pastData, setPastData] = useState([]);
    const [error, setError] = useState(null);

    // 初始化时调用 API
    useEffect(() => {
        const fetchData = async () => {
            // 获取未完成订单信息
            try {
                const response = await fetchBookings('Upcoming');
                setUpcomingData(response.content);
            } catch (err) {
                setError(err.message);
            }

            // 获取已完成订单信息
            try {
                const response = await fetchBookings('Past');
                setPastData(response.content);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const baseDivStlye = 'max-w-xl p-4 bg-white rounded-lg shadow border-2'
    const baseTitleStyle = 'text-black text-2xl py-2 mb-3 font-bold text-left'

    return (
        <div className='container mx-auto p-4'>
            <div className='flex flex-col md:p-[25px] bg-white rounded-2xl'>
                <p className='text-black text-4xl mb-6 font-bold text-left'>My bookings</p>
                <div className={baseDivStlye}>
                    <p className={baseTitleStyle}>Upcoming</p>
                    {upcomingData?.length > 0 ? (
                        upcomingData.map(upcoming => (
                            <div className='border-t border-gray-300 p-4'>
                                <p className='text-gray-400 text-left'>Booking Reference: {upcoming.reference}</p>
                                <p className='text-black text-base font-bold text-left'>
                                    {upcoming.departureCity} to {upcoming.arrivalCity}
                                </p>
                                <p className='text-gray-400 text-left'>Departure: {formatDate(upcoming.departureDate)}</p>
                            </div>
                        ))
                    ) : (
                        <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-800 mb-6'>
                            <p className='text-black text-base font-bold text-center'>No upcoming bookings</p>
                            <p className='text-gray-400 text-xs text-center'>You don't have any upcoming bookings. Start planning your next trip now.</p>
                        </div>
                    )}
                </div>
                <div className={baseDivStlye}>
                    <p className={baseTitleStyle}>Past</p>
                    {pastData?.length > 0 ? (pastData.map(past => (
                        <div className='border-t border-gray-300 p-4'>
                            <p className='text-gray-400 text-left'>Booking Reference: {past.reference}</p>
                            <p className='text-black text-base font-bold text-left'>
                                {past.departureCity} to {past.arrivalCity}
                            </p>
                            <p className='text-gray-400 text-left'>Completed: {formatDate(past.completeTime.slice(0, 8))}</p>
                        </div>
                    ))
                    ) : (
                        <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-800'>
                            <p className='text-black text-base font-bold text-center'>No past bookings</p>
                            <p className='text-gray-400 text-xs text-center'>You don't have any past bookings. Your booking history will appear here once you've completed a flight.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyBookingsPage;
