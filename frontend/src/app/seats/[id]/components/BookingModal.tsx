"use client";

import { useState } from "react";

type BookingModalProps = {
  open: boolean;
  seatId: number;
  onClose: () => void;
  onConfirmSuccess: (seatId: number, name: string, email: string) => void;
};

export function BookingModal({
  open,
  seatId,
  onClose,
  onConfirmSuccess,
}: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleClose = () => {
    setName("");
    setEmail("");
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      setError("Please fill name and email");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACK}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, seat_id: seatId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed");
        return;
      }

      alert("Booking successful 🎉");

     
      setName("");
      setEmail("");

      onClose();

      onConfirmSuccess(seatId, name, email);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-bold">Confirm Booking</h3>

        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            disabled={loading}
          />
        </div>

        {error && (
          <p className="mb-3 text-red-500 text-sm font-medium">{error}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded bg-gray-200 px-4 py-2 text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
