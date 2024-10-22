import { Link } from "react-router-dom";

export const NavigationButton = ({ path, className, children }) => {
  return (
    <>
      <li className="px-5 py-2.5 rounded-full hover:text-gray-500 focus:ring-2 focus:ring-gray-300 transition duration-150 ease-in-out font-semibold">
        <Link to={path} className={className}>
          {children}
        </Link>
      </li>
    </>
  );
};
