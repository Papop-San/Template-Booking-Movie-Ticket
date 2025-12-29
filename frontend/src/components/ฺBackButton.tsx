"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

 
  if (pathname === "/") return null;

  return (
    <Button variant="outline"  onClick={() => router.back()}>
      ← Back
    </Button>
  );
}
