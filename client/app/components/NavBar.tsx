"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, clearToken } from "../lib/auth";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getToken());
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold">PostBoard</Link>
      <div className="space-x-4">
        {loggedIn ? (
          <>
            <Link href="/posts/new">New Post</Link>
            <button onClick={() => { clearToken(); location.href="/"; }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}