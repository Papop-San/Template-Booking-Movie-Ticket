"use client";

import { useState } from "react";

type BookingModalProps = {
  open: boolean;
  seats: string[];
  onClose: () => void;
  onConfirm: (data: {
    name: string;
    email: string;
    seats: string[];
  }) => void;
};

export function BookingModal({
  open,
  seats,
  onClose,
  onConfirm,
}: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Please fill name and email");
      return;
    }

    onConfirm({ name, email, seats });
    setName("");
    setEmail("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Confirm Booking</h3>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </div>

        <div className="mb-4 text-sm">
          <span className="font-medium">Selected Seats:</span>{" "}
          {seats.join(", ")}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-sm bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded px-4 py-2 text-sm bg-blue-600 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
