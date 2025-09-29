import React from "react";

function Suggestions({ addresses, onSelect }) {
   
  return (
    <div className="overflow-auto max-h-[60vh] flex flex-col gap-2">
    

      {addresses.map((address, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(address)}
          className="flex items-center gap-3 p-3  rounded-lg cursor-pointer hover:bg-gray-200"
        >
          {/* Location pin */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-black flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>

          {/* Address text */}
          <span className="text-gray-900">{address}</span>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
