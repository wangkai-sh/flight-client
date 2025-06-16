import instance from "../services/http";

// 获取所有的航班信息
export const getAllFlights = async (type, searchData) => {
    const payload = type === 'departure' ? {
        cabinClass: searchData.cabinClass,
        departure: searchData.departure,
        arrival: searchData.arrival,
        departDate: searchData.departDate,
        passengers: searchData.passengers
    } : {
        cabinClass: searchData.cabinClass,
        departure: searchData.arrival,
        arrival: searchData.departure,
        departDate: searchData.returnDate,
        passengers: searchData.passengers
    };

    const response = await instance.post('/flights', payload);
    return response.data;
};

export const getFlightDetail = (flightId) => {
    instance.get(`/flights/${flightId}`)
}
