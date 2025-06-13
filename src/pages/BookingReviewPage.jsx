import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useBookingContext } from '../hooks/useBookingContext';
import { formatDateTimeRange } from '../utils/DateUtils';
import { formatPrice } from '../utils/StringUtils';

const BookingReviewPage = () => {

    // 订单信息
    const { bookingData } = useBookingContext()
    const { departure, return: returnFlight, totalPrice, otherFee } = bookingData

    const baseDivStlye = 'max-w-xl p-4 bg-white rounded-lg shadow border-2'
    const baseTitleStyle = 'text-black text-2xl py-2 mb-6 font-bold text-left'

    // 页面跳转
    const navigate = useNavigate()

    // 获取仓位名称
    const getcabinClassName = (cabinClass) => {
        switch (cabinClass) {
            case '1':
                return 'Business'
            case '2':
                return 'First Class'
            default:
                return 'Economy'
        }
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='flex flex-col md:p-[25px] bg-white rounded-2xl'>
                <p className='text-black text-4xl mb-6 font-bold text-left'>Review your flights</p>
                <form className='space-y-6'>
                    {departure ? (
                        <div className={baseDivStlye}>
                            <p className={baseTitleStyle}>Depart</p>
                            <p className='text-gray-400 text-left'>{getcabinClassName(departure.flight.cabinClass)}</p>
                            <p className='text-black text-base font-bold text-left'>
                                {departure.departureCity} to {departure.arrivalCity}
                            </p>
                            <p className='text-gray-400 text-left'>
                                {formatDateTimeRange(departure.flight.departureDate,
                                    departure.flight.departureTime,
                                    departure.flight.arrivalDate,
                                    departure.flight.arrivalTime)}
                            </p>
                        </div>
                    ) : (
                        <p className='text-yellow-600 text-left'>⚠️ No depart flight selected</p>
                    )}
                    {returnFlight ? (
                        <div className={baseDivStlye}>
                            <p className={baseTitleStyle}>Return</p>
                            <p className='text-gray-400 text-left'>{getcabinClassName(returnFlight.flight.cabinClass)}</p>
                            <p className='text-black text-base font-bold text-left'>
                                {returnFlight.departureCity} to {returnFlight.arrivalCity}
                            </p>
                            <p className='text-gray-400 text-left'>
                                {formatDateTimeRange(returnFlight.flight.departureDate,
                                    returnFlight.flight.departureTime,
                                    returnFlight.flight.arrivalDate,
                                    returnFlight.flight.arrivalTime)}
                            </p>
                        </div>
                    ) : (
                        <p className='text-yellow-600 text-left'>⚠️ No return flight selected</p>
                    )}
                    <div className={baseDivStlye}>
                        <p className={baseTitleStyle}>Fare summary</p>
                        <div className='flex'>
                            <div className='w-1/3 border-t border-gray-300 p-4'>
                                <p className='text-gray-400 text-left'>Base fare</p>
                                <p className='text-black text-base font-bold text-left'>{formatPrice(totalPrice)}</p>
                            </div>
                            <div className='w-2/3 border-t border-gray-300 p-4'>
                                <p className='text-gray-400 text-left'>Taxes, fees, and carrier charges</p>
                                <p className='text-black text-base font-bold text-left'>{formatPrice(otherFee)}</p>
                            </div>
                        </div>
                        <div className=' border-t border-gray-300 p-4'>
                            <p className='text-gray-400 text-left'>Total</p>
                            <p className='text-black text-base font-bold text-left'>{formatPrice(totalPrice + otherFee)}</p>
                        </div>
                    </div>
                    <Button custumizedStyle='max-w-xs'>Continue to payment</Button>
                </form>
            </div>
        </div>
    )
}

export default BookingReviewPage;
