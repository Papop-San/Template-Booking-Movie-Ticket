"use client";

import { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";


export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/events`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch events (${res.status})`);
      }

      const result = await res.json();
      setEvents(result.data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="w-full bg-sky-50 mt-20 h-auto">
      <div className="flex flex-col items-start w-full">
        <div className="mb-8 ml-12">
          <h1 className="text-2xl font-bold text-[#333333]">Now Showing</h1>
          <p className="font-normal text-[#414A63]">
            Experience it now at your favorite vacations!
          </p>
        </div>

        {/* 🔄 Loading */}
          {loading && (
            <div className="grid grid-cols-4 gap-x-8 gap-y-12 self-center mt-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card
                  key={i}
                  className="border-none bg-white rounded-lg p-4 shadow-md"
                >
                  <CardContent className="flex flex-col items-center">
                    <Skeleton className="w-40 h-40 rounded-lg" />
                    <Skeleton className="mt-4 h-4 w-3/4" />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Skeleton className="h-3 w-1/2" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

        {/* ❌ Error */}
        {error && !loading && (
          <div className="w-full flex justify-center mt-20">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {/* ✅ Data */}
        {!loading && !error && (
          <div className="grid grid-cols-4 gap-x-8 gap-y-12 self-center  mt-10">
            {events.map((event) => (
              <Link
                key={event.id}
                href={{
                  pathname: `/seats/${event.id}`,
                  query: { name: event.name },
                }}
                className="block"
              >
                <Card className="group border-none shadow-md bg-white rounded-lg overflow-hidden p-4 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="flex flex-col items-center justify-center">
                    <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-600 font-bold text-lg text-center">
                        {event.name}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col items-center mt-4">
                    <p className="text-gray-500 text-sm">
                      Capacity: {event.capacity}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
