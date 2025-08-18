// import React, { useState, useRef, useEffect } from "react";
// import EmojiPicker from "emoji-picker-react";
// import { FaUserCircle } from "react-icons/fa";

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

//   // Called when emoji selected
//   const onEmojiClick = (emojiData) => {
//     onSelect(emojiData.emoji);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block">
//       <div
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-4 cursor-pointer select-none"
//       >
//         <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg relative">
//           {icon ? (
//             typeof icon === "string" && icon.length === 1 ? (
//               // Show emoji character if single emoji string
//               <span className="text-3xl">{icon}</span>
//             ) : (
//               <img src={icon} alt="Icon" className="w-12 h-12 rounded-lg" />
//             )
//           ) : (
//             <FaUserCircle className="text-4xl text-gray-500" />
//           )}
//         </div>
//         <p className="text-purple-600 font-semibold">
//           {icon ? "Change Icon" : "Pick Icon"}
//         </p>
//       </div>

//       {isOpen && (
//         <div
//           ref={pickerRef}
//           className="absolute z-50 -mt-44"
//           style={{ width: "300px" }}
//         >
//           {/* Header with close button */}
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

//           {/* Emoji Picker */}
//           <EmojiPicker
//             onEmojiClick={(emojiObject) => onSelect(emojiObject.emoji)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmojiPickerPopup;
import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaUserCircle } from "react-icons/fa";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

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

  // Handle emoji selection
  const onEmojiClick = (emojiData) => {
    onSelect(emojiData.emoji); // pass emoji up to parent
    setIsOpen(false); // close picker
  };

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer select-none"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg relative">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <FaUserCircle className="text-4xl text-gray-500" />
          )}
        </div>
        <p className="text-purple-600 font-semibold">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Emoji Picker */}
      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute z-50 mt-2 bg-white p-2 rounded-lg shadow-lg"
          style={{ width: "300px" }}
        >
          {/* Close button */}
          <div className="flex justify-end mb-1">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 font-bold text-xl bg-gray-100 pr-2 pl-2 rounded-full"
              aria-label="Close emoji picker"
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
