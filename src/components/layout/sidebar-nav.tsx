"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCT_NAME } from "@/lib/brand";
import {
  GraduationCap,
  LayoutDashboard,
  Map,
  ClipboardList,
  CalendarClock,
  BarChart3,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface NavLink {
  href: string;
  icon: LucideIcon;
  label: string;
}

const sidebarLinks: NavLink[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/roadmap", icon: Map, label: "Roadmap" },
  { href: "/requirements", icon: ClipboardList, label: "Requirements" },
  { href: "/deadlines", icon: CalendarClock, label: "Deadlines" },
  { href: "/progress", icon: BarChart3, label: "Progress" },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
              "justify-start gap-3",
              isActive && "font-semibold"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-muted/40 md:block">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">{PRODUCT_NAME}</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        <NavLinks pathname={pathname} />
      </nav>
    </aside>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "md:hidden"
        )}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">{PRODUCT_NAME}</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function PageTitle() {
  const pathname = usePathname();
  const current = sidebarLinks.find((link) => link.href === pathname);
  return (
    <h1 className="text-lg font-semibold">{current?.label ?? "Dashboard"}</h1>
  );
}
