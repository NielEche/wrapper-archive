"use client"; // Ensure this is a client component

import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import wrap from "../../../assets/wrp1.jpg";
import wrap1 from "../../../assets/wrp2.jpg";
import wrap2 from "../../../assets/wrp3.jpg";
import Build from "../components/build";

const BuildWrapper = () => {
  return (
    <>
      <div className="bg-grayW text-black p-0 border-b border-black flex justify-between">
        <Link className="flex" href="/series">
          <h1 className="BfrikaRegular p-6 px-8 lg:text-3xl text-base content-cente r">
            Design your own Wrapper
          </h1>
        </Link>

        <div className="flex justify-center sideW">
          <div className="border border-black slide-up">
            <Image
              src={wrap}
              alt="wrap"
              width={55}
              height={100}
              className="object-cover mx-auto flex seriesCover"
            />
          </div>

          <div
            className="border border-black slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Image
              src={wrap1}
              alt="wrap"
              width={55}
              height={100}
              className="object-cover mx-auto flex seriesCover"
            />
          </div>

          <div
            className="border border-black slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Image
              src={wrap2}
              alt="wrap"
              width={55}
              height={100}
              className="object-cover mx-auto flex seriesCover"
            />
          </div>
        </div>
      </div>

      <div>
        <Build />
      </div>
    </>
  );
};

export default BuildWrapper;
