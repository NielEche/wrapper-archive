'use client'; 

import { useEffect } from 'react';
import Link from 'next/link';

const Interview = ({ interviews }) => {


  return (
    <div className='bg-grayW border-b archive-cardmain2'>
      <div className='grid lg:grid-cols-3 gap-0 text-black'>
        {interviews.map((interview) => {
        // Extract video ID from YouTube URL
          const urlParams = new URLSearchParams(new URL(interview.link).search);
          const videoId = urlParams.get('v'); // Extract the `v` parameter for the video ID
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;

          return (
            <div key={interview.id} className="archive-card2 lg:p-12 p-6 border-t-0 border-black border-r">
              <div className="video-container">
                <iframe
                  width="100%"
                  height="315"
                  src={embedUrl}
                  title={interview.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <Link className="flex" href={`/interviews/${interview.id}`} >
                <h1 className="Oswald-Bold text-4xl py-6">{interview.title}</h1>
              </Link>
              <Link className="flex" href={`/interviews/${interview.id}`} >
                <p className="DMSans-Regular text-base leading-tight text-justify">{interview.description}</p>
              </Link>
            </div>
          );
        })}
      </div>
  </div>
  );
};

export default Interview;
