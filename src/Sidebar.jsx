import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Sidebar = ({ items }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  // hover only if not pinned
  const handleMouseEnter = () => {
    if (!pinned) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!pinned) setIsOpen(false);
  };

  const togglePin = () => {
    setPinned(!pinned);
    setIsOpen(!pinned); // toggle open state
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`h-screen bg-white border-r border-gray-200 text-gray-800 
        transition-all duration-300 shadow-md flex flex-col z-9999 
        ${isOpen ? "w-60" : "w-16"}`}
    >
      {/* top bar */}
      <div className="flex justify-end items-center h-16 px-3 border-b border-gray-200">
        {isOpen && (
          <button
            onClick={togglePin}
            className="p-2 rounded hover:bg-gray-100 transition"
            title={pinned ? "Unpin Sidebar" : "Pin Sidebar"}
          >
            <FiMenu size={24} />
          </button>
        )}
      </div>

      {/* when collapsed show center menu */}
      {!isOpen && (
        <div className="flex justify-center items-center h-16">
          <button
            onClick={togglePin}
            className="p-2 rounded hover:bg-gray-100 transition"
            title="Open Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      )}

      {/* menu items */}
      <div className="flex-1 p-2 space-y-1">
        {items.map((item, index) => (
          <div
            key={index}
            title={item.label}
            onClick={() => navigate(item.route)}
            className="flex items-center gap-4 p-3 rounded hover:bg-gray-100 cursor-pointer transition truncate"
          >
            <div className="flex-shrink-0">
              {React.cloneElement(item.icon, { size: 24 })}
            </div>
            {isOpen && <span className="truncate">{item.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
