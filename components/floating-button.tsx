import Link from "next/link";
import React from "react";

interface IFloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const FloatingButton: React.FC<IFloatingButtonProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="fixed bottom-24 right-5 rounded-full border-transparent bg-orange-400 p-4 text-white shadow-xl transition-colors hover:bg-orange-500 md:right-36 lg:right-72 xl:right-[28rem]">
        {children}
      </a>
    </Link>
  );
};

export default FloatingButton;
