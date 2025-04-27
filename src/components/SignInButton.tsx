"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // Import the useRouter hook to navigate

type Props = { text: string };

const SignInButton = ({ text }: Props) => {
  const router = useRouter(); // Initialize router for navigation

  const handleSignInClick = () => {
    router.push("/SignIn"); // Navigate to the SignIn page when clicked
  };

  return (
    <Button
      onClick={handleSignInClick} // On click, navigate to the SignIn page
    >
      {text}
    </Button>
  );
};

export default SignInButton;
