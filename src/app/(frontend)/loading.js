import Image from "next/legacy/image";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-grayW z-50">
      <div className="flex flex-col items-center">
       <div className="flex justify-center sideW">
          <div className="border border-black slide-up">
            <Image src="/wrp1.jpg" alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
          </div>

          <div className="border border-black slide-up" style={{ animationDelay: "0.2s" }}>
            <Image src="/wrp2.jpg" alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
          </div>

          <div className="border border-black slide-up" style={{ animationDelay: "0.4s" }}>
            <Image src="/wrp3.jpg" alt="wrap" width={55} height={100} className="object-cover mx-auto flex seriesCover" />
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-black">Loading...</p>
      </div>
    </div>
  );
} 