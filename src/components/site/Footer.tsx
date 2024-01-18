import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="container flex flex-1 w-full py-4 pb-8 max-md:px-6">
      <ul className="flex items-center gap-2">
        <li>
          <Link
            className="text-sm font-medium underline text-primary"
            href={"/privacy-policy"}
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            className="text-sm font-medium underline text-primary"
            href={"/terms"}
          >
            Terms of service
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
