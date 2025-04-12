"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useIsSignedIn } from "@/lib/hooks/use-is-signed-in";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function NavHeaderMobile() {
  const isSignedIn = useIsSignedIn();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/rewards", label: "Rewards" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm px-4 py-5 flex items-center justify-between">
      <Link
        href="/"
        className="text-primary font-semibold leading-5 no-underline"
      >
        LOOKLOOK.PET
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} aria-label="Open menu" className="p-2">
            <Menu className="h-6 w-6 text-muted-foreground" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="p-4 w-full h-full max-w-full">
          <SheetHeader>
            <SheetTitle>
              <Link
                href="/"
                className="text-primary font-semibold leading-5 no-underline"
              >
                LOOKLOOK.PET
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="mt-6 flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((link, index) => (
              <div
                key={link.href}
                className="flex flex-col items-center justify-center"
              >
                <div className="flex flex-col gap-2 items-center justify-center">
                  <Link href={link.href} className="py-6">
                    {link.label}
                  </Link>
                </div>
                <Separator />
              </div>
            ))}

            <div className="mt-4 flex flex-col gap-2">
              {isSignedIn ? (
                <Button
                  onClick={() => {
                    document.cookie = "token=; path=/; max-age=0";
                    window.location.href = "/signin";
                  }}
                  variant={"destructive"}
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link href="/signin">Sign In</Link>
                  <Link href="/signup">Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
