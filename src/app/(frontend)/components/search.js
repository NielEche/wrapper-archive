"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
import arrow from '../../../assets/arrow.png';
import { motion } from "framer-motion";

export default function Search({ showSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true); // Start loading

    // Simulate a delay before navigating
    setTimeout(() => {
      router.push(`/search-results?query=${encodeURIComponent(searchTerm)}`);
      setLoading(false); // Stop loading after navigation
    }, 1500); // Delay for 1.5 seconds
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: showSearch ? "auto" : 0, opacity: showSearch ? 1 : 0 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`transition-all duration-300 ease-in-out ${
        showSearch ? "opacity-100 max-h-full" : "max-h-0 opacity-0"
      } overflow-hidden bg-white text-black p-0 border-b border-black`}
    >
      <form className="p-4 relative" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for wrappers and locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pr-10 border border-black rounded focus:outline-none focus:ring-none focus:ring-black"
          disabled={loading} // Disable input while searching
        />
        
        <button 
          type="submit" 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-4"
          disabled={loading} // Disable button while searching
        >
          {loading ? ( 
            <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div> 
          ) : (
            <Image src={arrow} alt="arrow" width={25} height={25} />
          )}
        </button>
      </form>
    </motion.div>
  );
}
