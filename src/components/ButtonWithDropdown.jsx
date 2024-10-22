import { useState } from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed

const ButtonWithDropdown = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        className="p-2 inline-flex flex-row items-center gap-2 rounded"
        onMouseEnter={() => setIsHovered(true)} // Show options on hover
        onMouseLeave={() => setIsHovered(false)} // Hide options when not hovered
      >
        {" "}
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="2em"
          width="2em"
          className="inline-block"
        >
          <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isHovered && (
        <div className="absolute left-0 mt-2 text-black rounded-md shadow-lg z-10">
          <Link to="/signin" className="block px-4 py-2 hover:bg-blue-100" a>
            Sign in
          </Link>
          <Link to="/login" className="block px-4 py-2 hover:bg-blue-100">
            Log in
          </Link>
        </div>
      )}
    </div>
  );
};

export default ButtonWithDropdown;
