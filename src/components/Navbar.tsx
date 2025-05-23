import Link from "next/link";
import React from "react";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { getAuthSession } from "@/lib/nextauth";  // Import the custom getAuthSession function
import SignInButton from "./SignInButton";

const Navbar = async () => {
  const session = await getAuthSession();  // Use the custom getAuthSession function

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            Smart Learn
          </p>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {session?.user && (
            <Link href="/dashboard" className="hover:text-gray-700 dark:hover:text-white">
              Dashboard
            </Link>
          )}
          <Link href="/AITutor" className="hover:text-gray-700 dark:hover:text-white">AI Tutor</Link>
          <Link href="/pricing" className="hover:text-gray-700 dark:hover:text-white">Pricing</Link>
          <Link href="/Competitor" className="hover:text-gray-700 dark:hover:text-white">Competitors</Link>
          <Link href="/about" className="hover:text-gray-700 dark:hover:text-white">About Us</Link>
          <Link href="/contact" className="hover:text-gray-700 dark:hover:text-white">Contact Us</Link>
        </div>

        {/* User Account and Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle className="mr-4" />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text={"Sign In"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
