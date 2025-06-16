import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState({
        passengers: null,
        departure: null,
        return: null,
        bookingId: null,
        totalPrice: 0,
        otherFee: 0
    })

    const updateSelectedFlight = (type, flight) => {
        setBookingData(prev => ({ ...prev, [type]: flight }))
    };

    const updatePassengers = (passengers) => {
        setBookingData(prev => ({ ...prev, passengers }))
    };

    const updateBookingIdAndFee = (bookingId, totalPrice, otherFee) => {
        setBookingData(prev => ({ ...prev, bookingId, totalPrice, otherFee }))
    };

    return (
        <BookingContext.Provider value={{
            bookingData,
            updateSelectedFlight,
            updatePassengers,
            updateBookingIdAndFee
        }}>
            {children}
        </BookingContext.Provider>
    )
}
