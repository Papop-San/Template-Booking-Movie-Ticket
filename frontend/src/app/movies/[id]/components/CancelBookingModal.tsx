"use client";

import { useState } from "react";

type CancelBookingModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
};

export function CancelBookingModal({ open, onClose, onConfirm }: CancelBookingModalProps) {
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleConfirm = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    onConfirm(email);
    setEmail("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Cancel Booking</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 text-sm"
          >
            Close
          </button>
          <button
            onClick={handleConfirm}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
