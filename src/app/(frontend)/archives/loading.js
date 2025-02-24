export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
        <p className="mt-4 text-lg font-medium text-black">Loading...</p>
      </div>
    </div>
  );
} 