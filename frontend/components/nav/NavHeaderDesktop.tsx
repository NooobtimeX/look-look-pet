"use client";

import Link from "next/link";
import { useIsSignedIn } from "@/lib/hooks/use-is-signed-in";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const navLinks = [
  { href: "https://looklook.pet/#features", label: "Features" },
  { href: "https://looklook.pet/#partner", label: "Partner" },
  { href: "https://looklook.pet/#articles", label: "Learning Space" },
  { href: "https://looklook.pet/#about", label: "About" },
  { href: "https://looklook.pet/#contact-us", label: "Contact Us" },
];

const userLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/rewards", label: "Rewards" },
];

export function NavHeaderDesktop() {
  const isSignedIn = useIsSignedIn();

  const handleSignOut = () => {
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/";
  };

  return (
    <header className="w-full sticky top-0 z-50 border-b bg-background shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-primary"
        >
          LOOKLOOK.PET
        </Link>
        <div className="flex space-x-10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-secondary text-sm font-semibold "
            >
              {label}
            </Link>
          ))}
        </div>
        <nav className="flex gap-6 items-center text-sm font-medium text-muted-foreground">
          <div className="ml-6">
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:text-foreground transition">
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userLinks.map(({ href, label }) => (
                    <DropdownMenuItem asChild key={href}>
                      <Link href={href}>{label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <Separator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-500"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-4">
                <Link href="/signin" className="hover:text-foreground">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup" className="hover:text-foreground">
                  <Button variant="default">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
