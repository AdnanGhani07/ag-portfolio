"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";

const links = [
  { name: "home", path: "/" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-cyan-500" />
      </SheetTrigger>

      <SheetContent
        className="flex flex-col bg-[#0a0f1c] border-l border-cyan-500/20"
        aria-describedby={undefined}
      >
        {/* Visually hidden title for screen readers (required by Radix) */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        {/* Logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/" onClick={() => setOpen(false)}>
            <h1 className="text-4xl font-semibold text-white">
              Adnan<span className="text-cyan-500">.</span>
            </h1>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={() => setOpen(false)}
              className={`${
                link.path === pathname
                  ? "text-cyan-500 border-b-2 border-cyan-500"
                  : "text-white"
              } text-xl capitalize hover:text-cyan-500 transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
