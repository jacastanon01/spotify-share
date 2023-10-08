"use client";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

const Button = ({ ...props }) => {
  const { className, onClick, label, redirectUrl } = props;
  //   function handleRedirect() {
  //     console.log("Clicked");
  //     redirect(`/api/auth/signin?callbackUrl=${redirectUrl}`);
  //   }
  return (
    <Link href={redirectUrl}>
      <button className={`btn bg-primary ${className}`} onClick={onClick}>
        {label}
      </button>
    </Link>
  );
};

export default Button;
