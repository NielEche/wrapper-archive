"use client";

import Link from 'next/link';
import Image from "next/legacy/image";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import from next/navigation
import wrap1 from '../../../assets/wrap1.png';
import arrow from '../../../assets/arrow.png';


export default function Footer() {
    return (
        <>
          <div className='bg-off text-black p-0 border-b border-black'>
              <div className=' border-t border-black flex justify-between'>
                <div className='p-6 lg:w-3/4 w-[60rem]'>
                  <h1 className='BfrikaRegular pt-4 text-2xl content-center'>THE WRAPPERS OF RIVERS</h1>
                  <div className='lg:flex justify-between py-8'>

                    <div className='lg:w-2/5'>
                      <h1 className='Oswald-Bold text-xl py-4'>Make a Contribution</h1>
                      <p className='DMSans-Regular text-xs lg:w-72'>To sustain the Archives ever-evolving collection, we are dependent on private donations. Please consider making a contribution:</p>
                      <Link className="flex pt-6" href="/">
                        <p className='text-black pr-4 text-base flex items-end'>Donate</p>
                        <Image src={arrow} alt="arrow" className='mx-4' width={30} height={30} />
                      </Link>
                    </div>
                    <div className='lg:w-1/4'>
                      <h1 className='Oswald-Bold text-xl py-4'>Resources</h1>
                      <nav>
                        <Link className="flex py-2" href="/">
                          <p className='text-black pr-4 text-sm flex items-end'>Wrappers</p>
                        </Link>
                        <Link className="flex py-2" href="/">
                          <p className='text-black pr-4 text-sm flex items-end'>About</p>
                        </Link>
                        <Link className="flex py-2" href="/">
                          <p className='text-black pr-4 text-sm flex items-end'>Photo series</p>
                        </Link>
                        <Link className="flex py-2" href="/">
                          <p className='text-black pr-4 text-sm flex items-end'>Interviews</p>
                        </Link>
                        <Link className="flex py-2" href="/">
                          <p className='text-black pr-4 text-sm flex items-end'>Contact</p>
                        </Link>
                      </nav>
                    </div>

                    <div className='lg:w-2/5'>
                      <h1 className='Oswald-Bold text-xl py-6'>Newsletter</h1>
                      <p className='DMSans-Regular text-xs lg:w-72'>Subscribe to our newsletter to receive occasional
                      updates about our projects</p>
                      <form>
        
                      </form>
                      <Link className="flex pt-6" href="/">
                        <p className='text-black pr-4 text-base flex items-end'>Subscribe</p>
                        <Image src={arrow} alt="arrow" className='mx-4' width={30} height={30} />
                      </Link>
                    </div>
                  </div>
                </div>

              
                  <Image src={wrap1} alt="wrap" height={350} width={150} className='lg:pl-10 object-cover' />
            

              </div>
          </div>
  
        </>
      );
   
}
