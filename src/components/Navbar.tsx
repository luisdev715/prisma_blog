import { Album } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar bg-neutral-300">
      <div className="container">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            <Album color="purple" />
          </a>
        </div>
        <div className="flex-none">
          <Link className="btn btn-ghost" href="/create">
            Create post
          </Link>
        </div>
      </div>
    </nav>
  );
}
