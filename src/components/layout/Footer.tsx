"use client";

import Link from 'next/link';

import Logo from '@/assets/svg/logo.svg';
import { components } from '@/slices/menu';
import { Content } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

type SlicesProps = {
  slices: Content.FooterColumnSlice[];
  nav?: "landing" | "shows" | "blog" | "hr";
};

export const Footer = ({ slices, nav }: SlicesProps) => {
  const toggleConsentLayer = () => {
    // @ts-ignore
    window.UC_UI.showFirstLayer();
  };

  return (
    <footer className="bg-gray-15 text-white py-16 2xl:py-20 print:hidden">
      {nav !== "landing" && (
        <div className="container flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-12 grid-rows-2 lg:grid-rows-1">
          <div className="col-span-1">
            <SliceZone
              slices={slices.filter((slice) => slice.primary.column === "1")}
              components={components}
            />
          </div>
          <div className="col-span-1">
            <SliceZone
              slices={slices.filter((slice) => slice.primary.column === "2")}
              components={components}
            />
          </div>
          <div className="col-span-1">
            <SliceZone
              slices={slices.filter((slice) => slice.primary.column === "3")}
              components={components}
            />
          </div>
          <div className="col-span-1">
            <SliceZone
              slices={slices.filter((slice) => slice.primary.column === "4")}
              components={components}
            />
          </div>
        </div>
      )}
      {nav === "landing" && (
        <div className="container">
          <div className="col-span-6 sm:col-span-12 flex flex-col sm:flex-row justify-between items-center font-copy text-base font-medium text-white">
            <div className="flex items-center gap-4">
              <Logo className="h-7 -mb-0.5" />
              <p className="text-gray-EE opacity-75">All rights reserved</p>
            </div>
            <p className="text-gray-EE mt-4 sm:mt-0">
              <span className="opacity-75">For more information, visit </span>
              <Link href="/" className="text-white">
                Prismic.io
              </Link>
              <span className="opacity-75 mx-2">·</span>
              <button onClick={() => toggleConsentLayer()}>
                Cookie settings
              </button>
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
