"use client";

import Link from 'next/link';
import Image from "next/legacy/image";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import logo from '../../../assets/wr.png';
import icon from '../../../assets/icon.png';
import expand from '../../../assets/Group3.png';
import search from '../../../assets/search.png';
import mode from '../../../assets/mode.png';


export default function Header() {
  return (
    <>
    <div className='fixed w-full z-[1000]'>

    <header className="bg-off text-white p-4 border-black border-b">
    <nav className="mx-auto flex flex-col md:flex-row justify-center items-center relative  ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 logo">
        <Link className="flex" href="/">
          <Image src={logo} alt="logo" width={200} height={22} />
        </Link>
      </div>

      <div className="flex justify-between w-full px-4 md:relative md:top-0 md:left-0">
        <div className="text-lg font-bold">
          <Link className="flex" href="/">
            <Image src={icon} alt="Code" width={40} height={40} />
          </Link>
        </div>

        <ul className="md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6 md:mt-0 justify-center lg:flex hidden pt-2">
          <li className="px-2">
            <Link className="flex" href="/">
              <Image src={expand} alt="expand" width={30} height={30} />
            </Link>
          </li>
          <li className="px-2">
            <Link className="flex" href="/about">
              <Image src={search} alt="search" width={25} height={25} />
            </Link>
          </li>
          <li className="px-2">
            <Link className="flex" href="/services">
              <Image src={mode} alt="mode" width={25} height={25} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </header>
    <ul className="md:hidden bg-off flex-row space-y-0 space-x-4  justify-around lg:hidden flex border-b py-4 border-black">
      <li className="px-2">
        <Link className="flex" href="/">
          <Image src={expand} alt="expand" width={30} height={30} />
        </Link>
      </li>
      <li className="px-2">
        <Link className="flex" href="/about">
          <Image src={search} alt="search" width={25} height={25} />
        </Link>
      </li>
      <li className="px-2">
        <Link className="flex" href="/services">
          <Image src={mode} alt="mode" width={25} height={25} />
        </Link>
      </li>
    </ul>
    </div>
</>
    
  );
}

