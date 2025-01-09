import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { notFound } from "next/navigation";

export default async function ArchivePage({ params }) {
    const { id } = params;

    try {
        const payload = await getPayloadHMR({
            config: configPromise,
        });

        if (!payload) {
            console.error("Payload initialization failed");
            notFound();
        }

        // Fetch all archives directly
        const archivesCollection = await payload.find({
            collection: "archives",
        });
        const archives = archivesCollection.docs;

        console.log("Archives fetched:", archives);

        if (!archives || archives.length === 0) {
            console.error("No archives found");
            notFound();
        }

        // Find the specific archive from the archives list
        const archive = archives.find((item) => item.id.toString() === id.toString());

        if (!archive) {
            console.error(`Archive with id ${id} not found`);
            notFound();
        }

        return (
            <div className="archive-details p-8 bg-grayW">

                <div className='md:pt-[72px] pt-[136px] sm:container mx-auto lg:px-32 text-black'>
                    <h1 className="Oswald-Bold text-4xl font-bold my-6">{archive.title}</h1>
                    <p className="text-lg DMSans-Regular leading-tight">{archive.description}</p>
                </div>
              
                <img
                    src={archive.coverImage.url}
                    alt={archive.title}
                    width={800}
                    height={600}
                    className="object-cover py-20"
                />
               
            </div>
        );
    } catch (error) {
        console.error("Error fetching archives:", error);
        notFound();
    }
}
