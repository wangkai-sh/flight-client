import { FlightContext } from "../context/FlightContext";
import { useContext } from "react";

export const useFlightContext = () => {
    return useContext(FlightContext)
};
