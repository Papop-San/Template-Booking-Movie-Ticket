import Link from "next/link";
import { Button } from "@/components/ui/button";
    import {House ,UserStar    } from "lucide-react"


export function Navbar() {
  return (
    <nav className="w-full border-b bg-background">
      <div className="mx-auto flex h-20  items-center justify-between px-6">
        {/* Left */}
        <Link href="/" className="text-sm font-semibold">
          MyApp
        </Link>

        {/* Right */}
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="lg" >
            <House/>
            Home
          </Button>
          <Button variant="ghost" size="lg">
            <UserStar />
            Admin
          </Button>
        </div>
      </div>
    </nav>
  );
}
