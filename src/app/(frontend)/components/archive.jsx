'use client'; 

import { useEffect } from 'react';
import Link from 'next/link';

const Archive = ({ archives }) => {
  useEffect(() => {
    const archiveCards = document.querySelectorAll('.archive-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view'); // Add animation class
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    archiveCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <div className="bg-grayW border-b border-black archive-cardmain">
      <div className="grid lg:grid-cols-3 gap-0 text-black">
        {archives.map((archive) => (
            
            <div
              key={archive.id}
              className="archive-card lg:p-12 p-6 border-t-0 border-b-0 border-black border slide-up relative overflow-hidden">
              <Link className="flex" href={`/archives/${archive.id}`} >
              <img
                src={archive.coverImage.url}
                width={400}
                height={350}
                alt={archive.title}
                className="object-cover"/>
              </Link> 
              <h1 className="Oswald-Bold text-4xl py-6">{archive.title}</h1>
              <p className="DMSans-Regular text-base leading-tight text-justify">
                {archive.description.length > 200
                  ? `${archive.description.slice(0, 200)}...`
                  : archive.description}
              </p>
                
              <Link className="flex" href={`/archive/${archive.id}`} >
              <h1 className="Oswald-Bold text-sm font-black pt-6">Read More</h1>
              </Link>
            </div>

        ))}
      </div>
    </div>
  );
};

export default Archive;
