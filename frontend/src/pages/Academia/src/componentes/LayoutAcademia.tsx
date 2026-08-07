/** @format */

import { ReactNode } from "react";
import NavbarAcademia from "./NavbarAcademia";
import FooterAcademia from "./FooterAcademia";

interface LayoutAcademiaProps {
  children: ReactNode;
}

export default function LayoutAcademia({ children }: LayoutAcademiaProps) {
  return (
    <div className="academia-container flex flex-col min-h-screen bg-gray-50">
      <NavbarAcademia />
      <main className="flex-grow pt-0">{children}</main>
      <FooterAcademia />
    </div>
  );
}
