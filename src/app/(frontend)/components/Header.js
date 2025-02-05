"use client";

import Link from 'next/link';
import Image from "next/legacy/image";
import { useState, useEffect } from 'react';
import logo from '../../../assets/wr.png';
import icon from '../../../assets/icon.png';
import map from '../../../assets/Group3.png';
import search from '../../../assets/search.png';
import close from '../../../assets/closeicon.png';
import series from '../../../assets/series.png';
import Search from './search';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Detect scroll position
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`w-full z-[999] ${isScrolled ? 'fixed top-0 left-0' : ''}`}>
        <header className="bg-off text-white p-4 border-black border-b">
          <nav className="mx-auto flex flex-col md:flex-row justify-center items-center relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 logo">
              <Link className="flex" href="/">
                <h1 className="BfrikaRegular text-black hidden">WRAPPERS OF RIVERS</h1>
                <Image src={logo} alt="logo" width={300} height={33} />
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
                  <button className="flex"  onClick={scrollToMap}>
                    <Image src={map} alt="map" width={30} height={30} />
                  </button>
                </li>
                <li className="px-2">
                  <button className="flex" onClick={toggleSearch}>
                    <Image src={showSearch ? close : search} alt="search" width={25} height={25} />
                  </button>
                </li>
                <li className="px-2">
                  <Link className="flex" href="/series">
                    <Image src={series} alt="series" width={25} height={25} />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* Mobile Nav */}
        <ul className="md:hidden bg-off flex-row space-y-0 space-x-4 justify-around lg:hidden flex border-b py-4 border-black">
          <li className="px-2">
            <button className="flex"  onClick={scrollToMap}>
              <Image src={map} alt="map" width={30} height={30} />
            </button>
          </li>
          <li className="px-2">
            <button className="flex" onClick={toggleSearch}>
              <Image src={showSearch ? close : search} alt="search" width={25} height={25} />
            </button>
          </li>
          <li className="px-2">
            <Link className="flex" href="/series">
              <Image src={series} alt="series" width={25} height={25} />
            </Link>
          </li>
        </ul>

   
             <Search showSearch={showSearch} />
       
      </div>
    </>
  );
}
