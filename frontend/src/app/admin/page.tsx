"use client";

import { useState } from "react";
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

type Booking = {
  name: string;
  email: string;
  seatCode: string;
  createdAt: string; // ISO string
  category: "Movie" | "Event" | "Concert";
};



const bookings: Booking[] = Array.from({ length: 50 }).map((_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  seatCode: `A${(i % 15) + 1}`,
  createdAt: `2025-12-28T20:${String(30 + i).padStart(2, "0")}:00.000Z`,
  category: i % 3 === 0 ? "Movie" : i % 3 === 1 ? "Event" : "Concert",
}));

export default function TablePage() {
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"Movie" | "Event" | "Concert">(
    "Movie"
  );

  const filteredBookings = bookings.filter((b) => b.category === activeTab);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-bold mb-4">Booking List</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {(["Movie", "Event", "Concert"] as const).map((tab) => (
              <Button
                key={tab}
                size="sm"
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // reset page when tab changes
                }}
              >
                {tab}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Seat Code</TableHead>
                  <TableHead>Create Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBookings.map((b, idx) => (
                  <TableRow key={idx} className="hover:bg-gray-50">
                    <TableCell>{b.name}</TableCell>
                    <TableCell>{b.email}</TableCell>
                    <TableCell>{b.seatCode}</TableCell>
                    <TableCell>
                      {new Date(b.createdAt).toLocaleString("th-TH", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
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
