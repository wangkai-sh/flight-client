import { useBookingContext } from "../hooks/useBookingContext";

const BookingConfirmation = () => {
  // 订单信息
  const { bookingData } = useBookingContext()
  const { departure, return: returnFlight, bookingId, totalPrice, otherFee } = bookingData


  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:p-[25px] bg-white rounded-2xl'>
        <div className="text-center mb-12">
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Booking Successful!</h1>
          <p className="mt-2 text-lg text-gray-600">Your flight has been successfully booked</p>
          <p className="mt-1 text-sm text-gray-500">Booking Reference: {bookingId}</p>
        </div>


        <div className="mt-12 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Important Reminders</h3>
          <ul className="mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside">
            <li>Please arrive at the airport 2 hours before departure for check-in</li>
            <li>Bring valid identification documents for boarding</li>
            <li>For rescheduling or cancellations, please complete at least 24 hours in advance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
