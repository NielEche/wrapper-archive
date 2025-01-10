import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from "next/navigation";

export default async function InterviewPage({ params }) {
    const { id } = params;

    try {
        const payload = await getPayloadHMR({
            config: configPromise,
        });

        if (!payload) {
            console.error("Payload initialization failed");
            notFound();
        }

    
        const interviewsCollection = await payload.find({
            collection: "interviews", 
          });
      
          const interviews = interviewsCollection.docs; 
        
        if (!interviews || interviews.length === 0) {
            console.error("No interviews found");
            notFound();
        }

        // Find the specific archive from the archives list
        const interview = interviews.find((item) => item.id.toString() === id.toString());

        if (!interview) {
            console.error(`interview with id ${id} not found`);
            notFound();
        }

         // Extract video ID from YouTube URL
         const urlParams = new URLSearchParams(new URL(interview.link).search);
         const videoId = urlParams.get('v'); // Extract the `v` parameter for the video ID
         const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
            <div className="archive-details pt-8 bg-grayW">
                <div className='md:pt-[72px] pt-[136px] sm:container mx-auto lg:px-32 text-black'>
                   
                    <h1 className="Oswald-Bold text-4xl font-bold py-6 text-left pt-10">{interview.title}</h1>
                    <p className="text-lg DMSans-Regular leading-tight  text-left pb-10">{interview.description}</p>
                </div>

                <hr className='border-black mt-10'></hr>

                <div className="">
                    <iframe
                    width="100%"
                    height="600"
                    src={embedUrl}
                    title={interview.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
                </div>
               
            </div>
        );
    } catch (error) {
        console.error("Error fetching interview:", error);
        notFound();
    }
}
