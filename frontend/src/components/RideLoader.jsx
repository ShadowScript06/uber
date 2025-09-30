export default function RideLoaderPopup() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center bg-black rounded-2xl p-8 shadow-lg">
        {/* Loader */}
        <div className="w-14 h-14 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="mt-6 text-lg font-medium tracking-wide text-gray-200">
          Booking your ride... please wait
        </p>
      </div>
    </div>
  );
}
