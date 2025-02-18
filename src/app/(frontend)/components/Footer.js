"use client";

import Link from "next/link";
import Image from "next/legacy/image";
import { useState } from "react";
import wrap1 from "../../../assets/wrap1.png";
import arrow from "../../../assets/arrow.png";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-off text-black p-0 border-b border-black">
        <div className="border-t border-black flex justify-between">
          <div className="p-6 lg:w-3/4 w-[60rem]">
            <h1 className="BfrikaRegular pt-4 text-2xl content-center">
              THE WRAPPERS OF RIVERS
            </h1>
            <div className="lg:flex justify-between py-8">
              <div className="lg:w-2/5">
                <h1 className="Oswald-Bold text-xl py-4">Make a Contribution</h1>
                <p className="DMSans-Regular text-xs lg:w-72">
                  To sustain the Archives ever-evolving collection, we are
                  dependent on private donations. Please consider making a
                  contribution:
                </p>
                <Link className="flex pt-6" href="/">
                  <p className="Oswald-Bold text-black pr-4 text-base flex items-end">
                    Donate
                  </p>
                  <Image
                    src={arrow}
                    alt="arrow"
                    className="mx-4"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>

              <div className="lg:w-1/4 DMSans-Regular">
                <h1 className="Oswald-Bold text-xl py-4">Resources</h1>
                <nav className="footerNav">
                  <Link className="flex py-2" href="/archives">
                    <p className="text-black pr-4 text-sm flex items-end">
                      Wrappers
                    </p>
                  </Link>
                  <Link className="flex py-2" href="/about">
                    <p className="text-black pr-4 text-sm flex items-end">
                      About
                    </p>
                  </Link>
                  <Link className="flex py-2" href="/series">
                    <p className="text-black pr-4 text-sm flex items-end">
                      Photo series
                    </p>
                  </Link>
                  <Link className="flex py-2" href="/interviews">
                    <p className="text-black pr-4 text-sm flex items-end">
                      Interviews
                    </p>
                  </Link>
                  <Link className="flex py-2" href="/contact">
                    <p className="text-black pr-4 text-sm flex items-end">
                      Contact
                    </p>
                  </Link>
                </nav>
              </div>

              <div className="lg:w-2/5">
                <h1 className="Oswald-Bold text-xl py-6">Newsletter</h1>
                <p className="DMSans-Regular text-xs lg:w-72">
                  Subscribe to our newsletter to receive occasional updates
                  about our projects
                </p>

                {/* Button to Open Modal */}
                <button
                  className="flex pt-6 items-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  <p className="Oswald-Bold text-black pr-4 text-base">Subscribe</p>
                  <Image
                    src={arrow}
                    alt="arrow"
                    className="mx-4"
                    width={30}
                    height={30}
                  />
                </button>
              </div>
            </div>
          </div>

          <Image
            src={wrap1}
            alt="wrap"
            height={350}
            width={150}
            className="lg:pl-10 object-cover"
          />
        </div>
      </div>

      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center subscribe-form">
          <div className="bg-grayW border border-black p-6 rounded-lg shadow-lg w-[600px] relative">
            <button
              className="absolute top-2 right-4 text-black text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {/* Mailchimp Form */}
            <div id="mc_embed_signup">
              <form
                action="https://gmail.us13.list-manage.com/subscribe/post?u=e5449ae63a9a695ea7e60c623&amp;id=45ec14107d&amp;f_id=004f21eaf0"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                target="_blank"
                className="validate">
                <h2 className="text-xl BfrikaRegular text-black font-bold mb-2">Subscribe</h2>
                
        
                  <label for="mce-FNAME" className="block text-black text-sm pt-4">
                    Name *
                  </label>
                  <input 
                  type="text" 
                  name="FNAME" 
                  className="border border-black text-black bg-grayW rounded w-full px-3 py-2 my-2"
                  id="mce-FNAME"
                  required
                  />
              

                <label for="mce-EMAIL" className="block text-black text-sm pt-4">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  className="border border-black text-black bg-grayW rounded w-full px-3 py-2 my-2"
                  id="mce-EMAIL"
                  required
                />

              <div className="mt-6">
                <button
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="Oswald-Bold bg-grayW text-black px-0 py-2 rounded mt-2 cursor-pointer flex items-center"
                >
                  Subscribe
                  <Image
                    src={arrow}
                    alt="arrow"
                    className="ml-6 w-6 h-6 "
                    width={24}
                    height={24}
                  />
                </button>
              </div>


              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
