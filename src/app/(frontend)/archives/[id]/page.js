import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from "next/navigation";
import Image from "next/legacy/image";

export default async function ArchivePage({ params }) {
    const { id } = await params;

    try {
        const payload = await getPayloadHMR({
            config: configPromise,
        });

        if (!payload) {
            console.error("Payload initialization failed");
            notFound();
        }

        const archivesCollection = await payload.find({
            collection: "archives",
            where: {
                id: {
                    equals: id
                }
            }
        });

        if (!archivesCollection || !archivesCollection.docs.length) {
            console.error(`Archive with id ${id} not found`);
            notFound();
        }

        const archive = archivesCollection.docs[0];

        return (
            <div className="archive-details pb-8 bg-grayW">
                <div className='text-black'>
                    <div className="relative h-screen">
                       <Image 
                         src={archive.coverImage?.url} 
                         alt="wrap" 
                         layout='fill'
                         priority={true}
                         loading="eager"
                         className="object-cover w-full h-full mx-auto flex"
                       />

                      <div className="absolute bottom-20 left-12">
                        <h1 className="Oswald-Bold text-4xl font-bold text-white px-6 py-4 rounded-xl bg-gradient-to-r from-black/70 to-gray-800/70 transition-all duration-300 hover:from-black/80 hover:to-gray-700/80">{archive.title}</h1>
                      </div>
                    </div>
                <div className='container mx-auto'>
                    <p className="sm text-lg DMSans-Regular leading-tight py-6 text-left">{archive.description}</p>
                </div>
                   
                </div>

                <hr className='border-black mt-2'></hr>
                {/* Added locations section */}
                <div className='container mx-auto'>
                {archive.locations && archive.locations.length > 0 && (
                    <div className=" mt-4 grid lg:grid-cols-3 grid-cols-2 gap-0">
                        {archive.locations.map((location, index) => (
                            <div key={index} className="text-xs text-black italic text-center border-black mr-2 border p-2">
                                {location.description}
                            </div>
                        ))}
                    </div>
                )}
                </div>
               
            </div>
        );
    } catch (error) {
        console.error("Error fetching archives:", error);
        notFound();
    }
}
