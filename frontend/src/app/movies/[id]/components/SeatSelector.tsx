"use client";

import { useState } from "react";
import clsx from "clsx";
import { BookingModal } from "./BookingModal";
import { CancelBookingModal } from "./CancelBookingModal";

type SeatStatus = "available" | "booked";

type Seat = {
  id: string;
  row: "A" | "B";
  number: number;
  status: SeatStatus;
};

const ROWS: ("A" | "B")[] = ["A", "B"];
const SEATS_PER_ROW = 15;
const AISLE_AFTER = 7;

// mock seat data
const seatsMock: Seat[] = ROWS.flatMap((row) =>
  Array.from({ length: SEATS_PER_ROW }).map((_, i) => ({
    id: `${row}${i + 1}`,
    row,
    number: i + 1,
    status: (i + 1) % 6 === 0 ? "booked" : "available",
  }))
);

export function SeatSelector() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between py-10">
        <h2 className="text-xl font-bold">Select Your Seat</h2>

        {/* Legend */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-gray-200" />
            Available
          </div>
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-blue-600" />
            Selected
          </div>
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-gray-400" />
            Booked
          </div>
        </div>
      </div>


      {/* Screen */}
      <div className="mb-6 text-center">
        <div className="mx-auto h-2 w-2/3 rounded bg-gray-300" />
        <p className="mt-2 text-sm text-gray-500">SCREEN</p>
      </div>

      {/* Seats */}
      <div className="space-y-4">
        {ROWS.map((row) => (
          <div key={row} className="flex items-center justify-center gap-2">
            <span className="w-6 text-sm font-medium text-gray-500">{row}</span>

            {seatsMock
              .filter((seat) => seat.row === row)
              .map((seat) => {
                const isSelected = selectedSeat === seat.id;
                const isAisle = seat.number === AISLE_AFTER + 1;

                return (
                  <div key={seat.id} className="flex items-center">
                    {isAisle && <div className="w-6" />}

                    <button
                      onClick={() => toggleSeat(seat)}
                      className={clsx(
                        "h-10 w-10 rounded text-sm font-medium transition",
                        seat.status === "booked" &&
                        "bg-gray-400 text-white cursor-not-allowed",
                        seat.status === "available" &&
                        !isSelected &&
                        "bg-gray-200 hover:bg-blue-200",
                        isSelected && "bg-blue-600 text-white"
                      )}
                    >
                      {seat.number}
                    </button>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* Book Button */}
      {selectedSeat && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setOpenBookingModal(true)}
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white"
          >
            Book Selected Seat
          </button>
          <button
            onClick={() => setOpenCancelModal(true)}
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white"
          >
            Cancel Booking
          </button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        open={openBookingModal}
        seats={selectedSeat ? [selectedSeat] : []}
        onClose={() => setOpenBookingModal(false)}
        onConfirm={(data) => {
          console.log("BOOKING DATA:", data);
          setOpenBookingModal(false);
          setSelectedSeat(null);
        }}
      />

      {/* Cancel Modal */}
      <CancelBookingModal
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        onConfirm={(email) => {
          console.log("CANCEL BOOKING EMAIL:", email);
          // 👉 ส่ง API ยกเลิก booking ตาม email
          setOpenCancelModal(false);
          setSelectedSeat(null);
        }}
      />
    </div>
  );
}
