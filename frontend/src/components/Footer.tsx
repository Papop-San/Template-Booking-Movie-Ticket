import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="flex h-16 items-center justify-center text-sm text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
