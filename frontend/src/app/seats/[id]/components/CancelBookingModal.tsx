"use client";

import { useState } from "react";

type CancelBookingModalProps = {
  open: boolean;
  seatId: number; 
  onClose: () => void;
  onCancelSuccess: (seatId: number, email: string) => void; 
};

export function CancelBookingModal({
  open,
  seatId,
  onClose,
  onCancelSuccess,
}: CancelBookingModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/bookings/${email}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Cancel failed");
        return;
      }

      alert("Cancel successful 🎉");
      setEmail("");
      onClose();

      onCancelSuccess(seatId, email);
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded bg-gray-200 px-4 py-2 text-sm disabled:opacity-50"
          >
            Close
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {loading ? "Cancelling..." : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
