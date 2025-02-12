"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Toaster } from "react-hot-toast";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <Header />
      <Toaster
        position="top-center"
        containerClassName="!z-[999999999]"
        reverseOrder={false}
      />
      <main className="grow">{children}</main>
      <Footer border={true} />
    </>
  );
}
