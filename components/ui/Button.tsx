'use client';
import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Button = ({ ...props }) => {
  const { className, login, onClick, onSign, label, redirectUrl } = props;
  //   function handleRedirect() {
  //     console.log("Clicked");
  //     redirect(`/api/auth/signin?callbackUrl=${redirectUrl}`);
  //   }
  return (
    <button
      className={`btn bg-primary ${className}`}
      onClick={login ? () => signIn('spotify') : () => signOut()}
    >
      {label}
    </button>
  );
};

export default Button;
