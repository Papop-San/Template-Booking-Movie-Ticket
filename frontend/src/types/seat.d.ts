export type SeatStatus = "AVAILABLE" | "BOOKED";

export type Seat = {
  id: number;
  seat_code: string;
  status: SeatStatus;
};

type SeatSelectorProps = {
  seats: Seat[];
};
