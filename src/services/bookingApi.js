import instance from "../services/http";

// 添加
export const addBooking = async (
    userId,
    departureFlightId,
    retrunFlightId,
    passengers) => {
    const response = await instance.post('/bookings', {
        userId: userId,
        departureFlightId: departureFlightId,
        retrunFlightId: retrunFlightId,
        passengers: passengers
    });

    return response;
};

// 获取所有订单
export const fetchBookings = async (status, page = 1, size = 5) => {
    const response = await instance.get('/bookings', {
        params: {
            status: status,
            page: page,
            size: size
        }
    });

    return response;
};
