'use client'; 

import { useEffect } from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";

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


  const RichTextRenderer = ({ content, maxLength }) => {
    if (!content || !content.root || !content.root.children) return null;
  
    const renderNode = (node) => {
      if (node.type === 'text') {
        return node.text;
      }
  
      if (node.type === 'linebreak') {
        return <br />;
      }
  
      if (node.type === 'unordered-list') {
        return (
          <ul className="list-disc ml-6">
            {node.children.map((child, index) => (
              <li key={index}>{renderNode(child)}</li>
            ))}
          </ul>
        );
      }
  
      if (node.type === 'ordered-list') {
        return (
          <ol className="list-decimal ml-6">
            {node.children.map((child, index) => (
              <li key={index}>{renderNode(child)}</li>
            ))}
          </ol>
        );
      }
  
      if (node.type === 'list-item') {
        return <li>{node.children.map(renderNode)}</li>;
      }
  
      if (node.children) {
        return (
          <div>
            {node.children.map((child, index) => (
              <span key={index}>{renderNode(child)}</span>
            ))}
          </div>
        );
      }
  
      return null;
    };
  
    // Extract plain text from the content
    const plainText = content.root.children
      .flatMap((node) => node.children?.map((child) => child.text) || [])
      .join(' ');
  
    // Apply character limit if maxLength is provided
    const truncatedText =
      maxLength && plainText.length > maxLength
        ? `${plainText.slice(0, maxLength)}....`
        : plainText;
  
    return (
      <div className="rich-text space-y-4 text-base articulatcfLight">
        {truncatedText}
      </div>
    );
  };
  

  return (
    <div className="bg-grayW border-b border-black archive-cardmain">
      <div className="grid lg:grid-cols-3 gap-0 text-black">
        {archives.map((archive) => (
            
            <div
              key={archive.id}
              className="archive-card lg:p-12 p-6 border-t-0 border-b border-black border slide-up relative overflow-hidden">
              <Link className="flex" href={`/archives/${archive.slug}`} >
              <Image
                src={archive.coverImage.url}
                width={400}
                height={400}
                alt={archive.title}
                className="object-cover archiveImage"/>
              </Link> 
              <h1 className="Oswald-Bold text-4xl py-6">{archive.title}</h1>
            
              <div className="DMSans-Regular lg:text-base text-sm leading-tight text-justify">
                {archive.description ? (
                  <RichTextRenderer content={archive.description} maxLength={200} />
                ) : (
                  <p>No description available.</p>
                )}
              </div>

                {/* show locations if its available */}
                {archive.locations && archive.locations.length > 0 && (
                    <div className="mt-4 grid lg:grid-cols-3 grid-cols-2 gap-0">
                      {archive.locations.map((location, index) => (
                        <div key={index} className="text-xs italic text-center border-black mr-2 border p-2 my-1">
                          {location.description}
                        </div>
                      ))}
                    </div>
                  )}
                
              <Link className="flex" href={`/archives/${archive.slug}`} >
              <h1 className="Oswald-Bold text-sm font-black pt-6">Read More</h1>
              </Link>
            </div>

        ))}
      </div>
    </div>
  );
};

export default Archive;
