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

    return response.data;
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

    return response.data;
};

// 更新订单状态
export const updateBookingStatus = async (bookingId, status) => {
    const response = await instance.patch(`/bookings/${bookingId}/status`,
        null,
        {
            params: {
                status: status
            }
        });

    return response.data;
};
