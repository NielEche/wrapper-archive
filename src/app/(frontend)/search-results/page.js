import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import Link from 'next/link';
import Image from "next/legacy/image";

export default async function SearchResults({ searchParams }) {
  const searchTerm = searchParams?.query || "";

  const payload = await getPayloadHMR({
    config: configPromise,
  });

  // Fetch archives that match the search term in title, description, or locations.description
  const archivesCollection = await payload.find({
    collection: "archives",
    where: {
      or: [
        { title: { like: searchTerm } },
        { description: { like: searchTerm } },
        { "locations.description": { like: searchTerm } }, // Searching inside the locations array
      ],
    },
  });

  const archives = archivesCollection.docs;

  return (
    <div className="py-[72px]">
      <div className="border-b border-white">
          <h1 className="Oswald-Bold text-4xl font-bold mb-10 px-10">
            Search Results for {searchTerm} 
          </h1>
      </div>

      {archives.length === 0 ? (
        <p className="BfrikaRegular text-xl py-10 px-10">No results found.</p>
      ) : (
        <div className="bg-black border-b border-white ">
          <div className="grid lg:grid-cols-4 gap-0 text-white">
          
            {archives.map((archive) => (
              <div
                key={archive.id}
                className="archive-card bg-black text-white lg:p-12 p-6 border-t-0 border-b-0 border-white border slide-up relative overflow-hidden">
                <Link className="flex" href={`/archives/${archive.id}`} >
                <Image
                  src={archive.coverImage.url}
                  width={400}
                  height={350}
                  alt={archive.title}
                  className="object-cover"/>
                </Link> 
                <h1 className="Oswald-Bold text-4xl py-6">{archive.title}</h1>
                <p className="DMSans-Regular text-base leading-tight text-justify">
                  {archive.description.length > 200
                    ? `${archive.description.slice(0, 150)}...`
                    : archive.description}
                </p>

                {/* Display locations if available */}
                  {archive.locations && archive.locations.length > 0 && (
                    <div className="mt-4 grid lg:grid-cols-3 grid-cols-2 gap-0">
                      {archive.locations.map((location, index) => (
                        <div key={index} className="text-xs italic border-white border p-2">
                          {location.description}
                        </div>
                      ))}
                    </div>
                  )}
                  
                <Link className="flex" href={`/archives/${archive.id}`} >
                <h1 className="Oswald-Bold text-sm font-black pt-6">Explore</h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
