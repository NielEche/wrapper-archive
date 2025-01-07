import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import Rect from '../../assets/Rect.png';
import arrow from '../../assets/arrow.png';
import wrap from '../../assets/wrp1.jpg';
import wrap1 from '../../assets/wrp2.jpg';
import wrap2 from '../../assets/wrp3.jpg';
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Map from './components/map';
import Archive from './components/archive';


export default function Archives() {
  

  return (
    <>
   

    <div className='bg-off text-black p-0 border-b border-black flex justify-end'>
      <h1 className='BfrikaRegular p-6 px-8 text-4xl content-center py-10'>INTERVIEWS</h1>
    </div>


    </>
  );
};

export default Archives;
