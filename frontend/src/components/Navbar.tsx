import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House, UserStar } from "lucide-react"
import Image from "next/image";



export function Navbar() {
  return (
    <nav className="w-full border-b bg-background">
      <div className="mx-auto flex h-20  items-center justify-between px-6">
        {/* Left */}
        <Link href="/" className="text-sm font-semibold">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-8">
          <Button asChild variant="ghost" size="lg">
            <Link href="/">
              <House />
              Home
            </Link>
          </Button>

          <Button asChild   variant="ghost" size="lg">
            <Link href="/admin">
              <UserStar />
              Admin
            </Link>

          </Button>
        </div>
      </div>
    </nav>
  );
}
