"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { SeatSelector } from "./components/SeatSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function MovieDetailPage() {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const name = searchParams.get("name");
  const [seats, setSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDialog, setShowFullDialog] = useState(false);
  const [fullMessage, setFullMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchSeats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACK}/seats/event/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch seats");
        const data = await res.json();
        setSeats(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const checkFull = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACK}/notifications/check/${id}`
        );
        if (!res.ok) throw new Error("Failed to check notification");

        const text = await res.text();
        if (!text) return; // ถ้า empty ไม่ทำอะไร

        const data = JSON.parse(text); // parse เป็น JSON เอง
        if (data.type === "FULL") {
          setFullMessage(data.message);
          setShowFullDialog(true);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchSeats();
    checkFull(); 
  }, [id]);

  if (!id) return <p>Invalid movie id</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <main className="h-auto bg-sky-50 px-20 mt-20">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#333333]">{name}</h2>
          <p className="text-gray-600 mt-2 text-lg">
            🚌 Get ready to travel with us! Experience fun and beautiful views
            along the way!
          </p>
        </div>

        <div className="mt-10 mb-6 flex gap-6 text-sm text-gray-600">
          <LegendItem
            label="ว่าง"
            className="bg-white border border-gray-300"
          />
          <LegendItem label="เลือกแล้ว" className="bg-blue-600" />
          <LegendItem label="จองแล้ว" className="bg-gray-300" />
        </div>
      </div>

      <SeatSelector seats={seats} />

      {/* Dialog สำหรับเต็ม */}
      <Dialog open={showFullDialog} onOpenChange={setShowFullDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>⚠️ ที่นั่งเต็มแล้ว</DialogTitle>
            <DialogDescription>{fullMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowFullDialog(false)}>ปิด</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function LegendItem({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded ${className}`} />
      <span>{label}</span>
    </div>
  );
}
