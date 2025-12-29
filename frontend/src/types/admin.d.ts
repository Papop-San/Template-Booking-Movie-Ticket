export type BookingItem = {
  seat_id: number;
  seat_code: string;
  name: string;
  email: string;
  booking_status: string;
};

export type EventBooking = {
  event_id: number;
  event_name: string;
  bookings: BookingItem[];
  availableSeats: number;
  status: string;
};
