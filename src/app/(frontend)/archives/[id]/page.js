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

           // Custom RichTextRenderer
           const RichTextRenderer = ({ content }) => {
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
          
            return (
              <div className="rich-text space-y-4 text-lg articulatcfLight">
                {content.root.children.map((node, index) => (
                  <div key={index}>{renderNode(node)}</div>
                ))}
              </div>
            );
          };
  
      const { title, description, coverImage, imageGallery, locations } = archive;
  

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

                    <div className="container lg:px-20 px-10 py-10 Archsummary">
                        {description ? <RichTextRenderer content={description} /> : <p>No description available.</p>}
                    </div>
                </div>

                <hr className='border-black mt-2'></hr>
                {/* Added locations section */}

                <div className='container mx-auto'>
                    <h3 className="Oswald-Bold text-2xl font-bold text-black p-6 text-center">
                        What does the {archive.title} look like?
                    </h3>

                    <div className="mt-4 grid lg:grid-cols-4 grid-cols-2 gap-4">
                        {/* Cover Image */}
                        {archive.coverImage && (
                        <div
                             className="archive-card p-4 border border-black border slide-up relative overflow-hidden">
                             <Image
                               src={archive.coverImage?.url || `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${archive.coverImage}`}
                               width={400}
                               height={400}
                               alt="Cover"
                               priority={true}
                               className="object-cover archiveImage"/>
                             <p className="text-xs text-black italic text-center"></p>
                        </div>               
                        )}

                        {/* Image Gallery */}
                        {archive.imageGallery &&
                            archive.imageGallery.map((imageItem, index) => {
                                const imageUrl = imageItem.image?.url || `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/media/${imageItem.image}`;

                                return (
                                    <div key={index} className="archive-card p-4 border border-black border slide-up relative overflow-hidden">
                                        <Image 
                                            src={imageUrl}
                                            alt={imageItem.caption || `Image ${index + 1}`}
                                            width={400}
                                            height={400}
                                            priority={true}
                                            className="object-cover archiveImage"/>
                                        {imageItem.caption && (
                                            <p className="text-xs text-black italic text-center">{imageItem.caption}</p>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>


                <hr className='border-black mt-2'></hr>
               
                <div className='container mx-auto'>
                    <h3 className="Oswald-Bold text-2xl font-bold text-black p-6 text-center">
                        Where can you find {archive.title}?
                    </h3>
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
