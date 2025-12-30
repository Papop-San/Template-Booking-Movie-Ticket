"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EventBooking } from "@/types/admin";

export default function TablePage() {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("Flight Phuket");
  const [eventBookings, setEventBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch bookings
 const fetchBookings = async () => {
  try {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/bookings/admin`
    );
    if (!res.ok) throw new Error("Failed to fetch bookings");

    const json = await res.json();

    const events = Array.isArray(json) ? json : json.data;

    setEventBookings(events);

    if (events.length > 0) {
      setActiveTab(events[0].event_name);
    }
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  const activeEvent = eventBookings.find((e) => e.event_name === activeTab);
  const filteredBookings = activeEvent?.bookings || [];

  // Filter by searchTerm
  const searchedBookings = filteredBookings.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(searchedBookings.length / ITEMS_PER_PAGE);
  const currentBookings = searchedBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Delete booking by email
  const handleDelete = async (email: string) => {
    if (!confirm(`ยืนยันการลบ Booking ของ ${email}?`)) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/bookings/${email}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete booking");
      }
      alert(`Booking ของ ${email} ถูกลบแล้ว`);
      await fetchBookings();
      setCurrentPage(1);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="p-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-bold mb-4">Booking List</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {eventBookings.map((event) => (
              <Button
                key={event.event_id}
                size="sm"
                variant={activeTab === event.event_name ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(event.event_name);
                  setCurrentPage(1);
                  setSearchTerm(""); 
                }}
              >
                {event.event_name}
              </Button>
            ))}
          </div>

          {/* Available Seats & Status */}
          <div className="flex gap-6 mt-2">
            <p className="flex items-center gap-2">
              <span> 💺 </span>
              Available Seats: {activeEvent?.availableSeats ?? 0}
            </p>
            <p className="flex items-center gap-2">
              {activeEvent?.status === "Available" ? (
                <span className="text-green-600">✅</span>
              ) : (
                <span className="text-red-600">❌</span>
              )}
              Status Flight: {activeEvent?.status ?? "-"}
            </p>
          </div>

          {/* Search */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search Name or Email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border p-2 rounded w-full max-w-sm"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seat Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBookings.map((b) => (
                  <TableRow key={b.seat_id} className="hover:bg-gray-50">
                    <TableCell>{b.seat_code}</TableCell>
                    <TableCell>{b.name}</TableCell>
                    <TableCell>{b.email}</TableCell>
                    <TableCell>{b.booking_status}</TableCell>
                    <TableCell>
                      {b.booking_status === "BOOKED" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(b.email)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-end items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
