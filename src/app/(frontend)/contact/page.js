"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import wrap from '../../../assets/wrp1.jpg';
import wrap1 from '../../../assets/wrp2.jpg';
import wrap2 from '../../../assets/wrp3.jpg';
import Rect from '../../../assets/Rect.png';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='bg-grayW text-black p-0 border-b border-black flex justify-between'>
        <Link className="flex" href="/interviews">
          <h1 className='BfrikaRegular p-6 px-8 text-4xl content-center'>Contact</h1>
        </Link>
        <div className="flex justify-center sideW">
          <div className="border border-black slide-up">
            <Image src={wrap} alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
          </div>
          <div className="border border-black slide-up" style={{ animationDelay: "0.2s" }}>
            <Image src={wrap1} alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
          </div>
          <div className="border border-black slide-up" style={{ animationDelay: "0.4s" }}>
            <Image src={wrap2} alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
          </div>
        </div>
      </div>

  
      <div className="bg-white text-black p-0 border-b border-black">
      <div className="border-t border-black flex justify-between">
        <div className="p-6 lg:w-3/4 w-[60rem]">
        
          <div className="lg:flex justify-between py-8">
            <div className="">
              <div className="p-6 bg-white border border-black rounded-md shadow-md w-full mx-auto">
                <h2 className="text-xl font-bold mb-4 Oswald-Bold">Leave a message</h2>
                {successMessage && <p className="text-green-600">{successMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded h-32"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            <div className="DMSans-Regular py-6">
              <h1 className="Oswald-Bold text-xl py-4">Socials</h1>
              <nav>
                <Link className="flex py-2" target="_blank" href="https://www.instagram.com/ourwrappers?igsh=eWVqdHlycHB3dG9k">
                  <p className="text-black pr-4 text-base flex items-end">
                    Instagram
                  </p>
                </Link>
                <Link className="flex py-2" target="_blank" href="https://www.youtube.com/@NielEche">
                  <p className="text-black pr-4 text-base flex items-end">
                    Youtube
                  </p>
                </Link>
                <Link className="flex py-2" target="_blank" href="/interviews">
                  <p className="text-black pr-4 text-base flex items-end">
                    Twitter
                  </p>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default ContactPage;
