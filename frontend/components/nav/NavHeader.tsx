"use client";

import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { NavHeaderDesktop } from "@/components/nav/NavHeaderDesktop";
import { NavHeaderMobile } from "@/components/nav/NavHeaderMobile";

export function NavHeader() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return isMobile ? <NavHeaderMobile /> : <NavHeaderDesktop />;
}
