"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { BookingModal } from "./BookingModal";
import { CancelBookingModal } from "./CancelBookingModal";
import { Seat , SeatSelectorProps} from "@/types/seat";


function SeatBox({
  seat,
  selectedId,
  onSelect,
  onCancel,
}: {
  seat?: Seat;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  onCancel: (id: number) => void;
}) {
  if (!seat) return <div className="w-11 h-11" />;

  const isBooked = seat.status === "BOOKED";
  const isSelected = selectedId === seat.id;

  return (
    <button
      type="button"
      onClick={() => {
        if (isBooked) {
          onCancel(seat.id);
        } else {
          onSelect(isSelected ? null : seat.id);
        }
      }}
      className={clsx(
        "w-11 h-11 rounded-lg text-xs font-bold border-b-4 transition",
        isBooked
          ? "bg-gray-300 border-gray-400 text-gray-600 hover:bg-red-200"
          : isSelected
          ? "bg-blue-600 border-blue-800 text-white scale-105"
          : "bg-white border-gray-200 hover:bg-blue-50"
      )}
    >
      {seat.seat_code}
    </button>
  );
}

export function SeatSelector({ seats }: SeatSelectorProps) {
  const [localSeats, setLocalSeats] = useState<Seat[]>([]);
  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);

  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [cancelSeatId, setCancelSeatId] = useState<number | null>(null);

  useEffect(() => {
    setLocalSeats(seats);
  }, [seats]);

  const getSeatByCode = (code: string) =>
    localSeats.find((s) => s.seat_code === code);

  const selectedSeat = localSeats.find((s) => s.id === selectedSeatId);

  const numbers = localSeats.map((s) =>
    parseInt(s.seat_code.replace(/\D/g, ""))
  );
  const totalRows =
    numbers.length > 0 ? Math.ceil(Math.max(...numbers) / 2) : 0;

  const handleBookingSuccess = (
    seatId: number,
  ) => {
    setLocalSeats((prev) =>
      prev.map((s) => (s.id === seatId ? { ...s, status: "BOOKED" } : s))
    );
    setSelectedSeatId(null);
    setOpenBookingModal(false);
  };

  const handleOpenCancel = (seatId: number) => {
    setCancelSeatId(seatId);
    setOpenCancelModal(true);
  };

  const handleCancelSuccess = () => {
    if (cancelSeatId === null) return;

    setLocalSeats((prev) =>
      prev.map((s) =>
        s.id === cancelSeatId ? { ...s, status: "AVAILABLE" } : s
      )
    );

    setCancelSeatId(null);
    setOpenCancelModal(false);
  };

  return (
    <div className="mt-12 max-w-sm mx-auto p-6 bg-white rounded-3xl border shadow-2xl">
      {/* Header */}
      <div className="mb-8 flex justify-between text-xs text-gray-400">
        <div className="border px-2 py-1 rounded">DRIVER</div>
        <div className="rounded border px-4 py-1">DOOR</div>
      </div>

      {/* Seats */}
      <div className="flex flex-col gap-5">
        {Array.from({ length: totalRows }).map((_, i) => {
          const n1 = i * 2 + 1;
          const n2 = i * 2 + 2;

          return (
            <div key={i} className="flex justify-between">
              <div className="flex gap-2">
                <SeatBox
                  seat={getSeatByCode(`A${n1}`)}
                  selectedId={selectedSeatId}
                  onSelect={setSelectedSeatId}
                  onCancel={handleOpenCancel}
                />
                <SeatBox
                  seat={getSeatByCode(`A${n2}`)}
                  selectedId={selectedSeatId}
                  onSelect={setSelectedSeatId}
                  onCancel={handleOpenCancel}
                />
              </div>

              <div className="w-6" />

              <div className="flex gap-2">
                <SeatBox
                  seat={getSeatByCode(`B${n1}`)}
                  selectedId={selectedSeatId}
                  onSelect={setSelectedSeatId}
                  onCancel={handleOpenCancel}
                />
                <SeatBox
                  seat={getSeatByCode(`B${n2}`)}
                  selectedId={selectedSeatId}
                  onSelect={setSelectedSeatId}
                  onCancel={handleOpenCancel}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end text-xs text-gray-400">
        <div className="rounded border px-4 py-1">DOOR</div>
      </div>

      {/* Selected */}
      <div className="mt-8 text-center text-sm">
        {selectedSeat ? (
          <>
            <p>
              คุณเลือก:{" "}
              <span className="font-bold text-blue-600">
                {selectedSeat.seat_code}
              </span>
            </p>

            <button
              onClick={() => setOpenBookingModal(true)}
              className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-white font-bold"
            >
              จองที่นั่ง
            </button>
          </>
        ) : (
          <p className="italic text-gray-400">กรุณาเลือกที่นั่ง</p>
        )}
      </div>

      {/* Booking Modal */}
      {selectedSeatId !== null && (
        <BookingModal
          open={openBookingModal}
          seatId={selectedSeatId}
          onClose={() => setOpenBookingModal(false)}
          onConfirmSuccess={handleBookingSuccess}
        />
      )}

      {/* Cancel Modal */}
      {cancelSeatId !== null && (
        <CancelBookingModal
          open={openCancelModal}
          seatId={cancelSeatId}
          onClose={() => {
            setOpenCancelModal(false);
            setCancelSeatId(null);
          }}
          onCancelSuccess={handleCancelSuccess}
        />
      )}
    </div>
  );
}

