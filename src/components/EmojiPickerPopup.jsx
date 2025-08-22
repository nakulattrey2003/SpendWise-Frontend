// import React, { useState, useRef, useEffect } from "react";
// import EmojiPicker from "emoji-picker-react";
// import { FaUserCircle } from "react-icons/fa";
// import { Image } from "lucide-react";

// const EmojiPickerPopup = ({ icon, onSelect }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pickerRef = useRef(null);

//   // Close picker if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (pickerRef.current && !pickerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   // Handle emoji selection
//   const onEmojiClick = (emojiData) => {
//     onSelect(emojiData.emoji); // pass emoji up to parent
//     setIsOpen(false); // close picker
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Trigger */}
//       <div
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-4 cursor-pointer select-none"
//       >
//         <div className="w-9 h-9 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg relative">
//           {icon ? (
//             <span className="text-2xl">{icon}</span>
//           ) : (
//             <Image className="text-4xl text-purple-700" />
//           )}
//         </div>
//         <p className="text-purple-600 font-semibold">
//           {icon ? "Change Icon" : "Pick Icon"}
//         </p>
//       </div>

//       {/* Emoji Picker */}
//       {isOpen && (
//         <div
//           ref={pickerRef}
//           className="absolute z-50 mt-2 bg-white p-2 rounded-lg shadow-lg"
//         >
//           {/* Close button */}
//           <div className="flex justify-end mb-1">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-gray-500 hover:text-gray-700 font-bold text-xl bg-gray-100 pr-2 pl-2 rounded-full"
//               aria-label="Close emoji picker"
//               type="button"
//             >
//               &times;
//             </button>
//           </div>

//           <EmojiPicker onEmojiClick={onEmojiClick} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmojiPickerPopup;

import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaUserCircle } from "react-icons/fa";
import { Image } from "lucide-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 100, y: 100 }); // initial position
  const pickerRef = useRef(null);
  const dragRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Close picker if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Emoji selection
  const onEmojiClick = (emojiData) => {
    onSelect(emojiData.emoji);
    setIsOpen(false);
  };

  // Drag Handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragOffset]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    const rect = pickerRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer select-none"
      >
        <div className="w-9 h-9 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg relative">
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <Image className="text-4xl text-purple-700" />
          )}
        </div>
        <p className="text-purple-600 font-semibold">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Picker */}
      {isOpen && (
        <div
          ref={pickerRef}
          style={{
            position: "fixed",
            top: `${position.y}px`,
            left: `${position.x}px`,
            zIndex: 1000,
          }}
          className="bg-white p-2 rounded-lg shadow-2xl"
        >
          {/* Drag Header */}
          <div
            ref={dragRef}
            onMouseDown={handleMouseDown}
            className="cursor-move flex justify-between items-center mb-2 bg-gray-100 px-2 py-1 rounded w-full"
          >
            <span className="font-semibold text-gray-600 text-sm">
              Emoji Picker
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 font-bold text-2xl"
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
          </div>

          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
