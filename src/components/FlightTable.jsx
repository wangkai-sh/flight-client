import React from 'react';
import { airlineLogos } from '../utils/AirlineCodes';
import { formatPrice } from '../utils/StringUtils';
import { calculateInterval, formatInterval, formatToAMPM } from '../utils/TimeUtils';
import Button from './Button';

const FlightTable = ({
    title,
    flights = [],
    onClick
}) => {
    // const flightList = flights ? Object.values(flights) : [];

    return (
        <div className='flex flex-col md:p-[25px] bg-white rounded-2xl'>
            <p className='text-black text-4xl mb-6 font-bold text-left'>{title}</p>
            <form className='space-y-6'>
                <div className="bg-gray-50 mr-50">
                    <div>
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className='bg-gradient-to-r from-[#0f294d] to-blue-600/70'>
                                    <th className='rounded-tl-lg w-[5%] px-6 py-3'>Airline</th>
                                    <th className='w-[15%] px-6 py-3'>Departure</th>
                                    <th className='w-[15%] px-6 py-3'>Arrival</th>
                                    <th className='w-[10%] px-6 py-3'>Duration</th>
                                    <th className='w-[10%] px-6 py-3'>Stops</th>
                                    <th className='w-[15%] px-6 py-3'>Price</th>
                                    <th className='rounded-tr-lg w-[20%] px-6 py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.length > 0 ? (flights.map(flight => (
                                    <tr key={flight.flightId} className='border-b border-gray-200 hover:bg-gray-100 text-black'>
                                        <td className='w-[5%] px-6 py-4'>
                                            <img
                                                src={airlineLogos[flight.flightNumber]}
                                                alt="airline logo"
                                                className="h-8 object-contain"
                                            />
                                        </td>
                                        <td className='w-[15%] px-6 py-4 whitespace-nowrap'>{formatToAMPM(flight.departureTime)}</td>
                                        <td className='w-[15%] px-6 py-4 whitespace-nowrap'>{formatToAMPM(flight.arrivalTime)}</td>
                                        <td className='w-[10%] px-6 py-4'>{formatInterval(calculateInterval(flight.departureTime, flight.arrivalTime))}</td>
                                        <td className='w-[10%] px-6 py-4 whitespace-nowrap'>Non-stop</td>
                                        <td className='w-[15%] px-6 py-4'>{formatPrice(flight.price)}</td>
                                        <td className='w-[20%] px-6 py-4'>
                                            <Button custumizedStyle='max-w-xs' onClick={(e) => onClick(e, flight)}>Select</Button>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan='7' className='text-center py-8 text-gray-500'>
                                            <span className='font-semibold block'>Sorry, no available flights found</span>
                                            <p className='text-sm mt-2'>Please change your search criteria and try again</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FlightTable;
