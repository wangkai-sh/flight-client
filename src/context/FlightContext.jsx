import React, { createContext, useState } from "react";
import { getAllFlights } from "../services/flightApi";

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
    const [flightData, setFlightData] = useState({
        departure: null,
        return: null,
        loading: false,
        error: null
    });

    const fetchFlights = async (type, seachData) => {
        setFlightData(prev => ({ ...prev, loading: true }));

        try {
            // 直接使用解析后的数据
            const result = await getAllFlights(type, seachData)

            setFlightData(prev => ({
                ...prev,
                [type]: result,
                loading: false
            }))
        } catch (error) {
            setFlightData(prev => ({
                ...prev,
                error: error.message,
                loading: false
            }))
        }
    }

    return (
        <FlightContext.Provider value={{ ...flightData, fetchFlights }}>
            {children}
        </FlightContext.Provider>
    )
}
