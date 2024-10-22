import { useState } from "react";
import { NavigationButton } from "../components/NavigationButton";

export const NavigationLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-end items-center">
          {/* Butonul hamburger pentru mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg fill="none" viewBox="0 0 15 15" height="3em" width="3em">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.5 3.1a.4.4 0 100 .8h7a.4.4 0 000-.8h-7zm0 2a.4.4 0 100 .8h7a.4.4 0 000-.8h-7zm-.4 2.4c0-.22.18-.4.4-.4h7a.4.4 0 010 .8h-7a.4.4 0 01-.4-.4zm.4 1.6a.4.4 0 100 .8h7a.4.4 0 000-.8h-7zm-.4 2.4c0-.22.18-.4.4-.4h7a.4.4 0 010 .8h-7a.4.4 0 01-.4-.4zM2.5 9.25L5 6H0l2.5 3.25z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Links-urile pentru meniul mare */}
          <div className="hidden md:flex space-x-6 text-white">
            <ul className="flex flex-row items-center justify-center gap-2 border-2 border-gray-900 bg-gray-900 text-white p-0">
              <NavigationButton path="/">Home</NavigationButton>
              <NavigationButton path="/clients">Clients</NavigationButton>
              <NavigationButton path="/products">Products</NavigationButton>
              <NavigationButton path="/orders">Orders</NavigationButton>
              <NavigationButton path="/test">Test</NavigationButton>
            </ul>
          </div>
        </div>
        {/* Meniul dropdown pentru mobile */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden bg-white text-black mt-2 rounded-lg p-4 list-none`}
        >
          <NavigationButton path="/" className="block text-black py-2">
            Home
          </NavigationButton>
          <NavigationButton path="/clients" className="block text-black py-2">
            Clients
          </NavigationButton>
          <NavigationButton path="/products" className="block text-black py-2">
            Products
          </NavigationButton>
          <NavigationButton path="/orders" className="block text-black py-2">
            Orders
          </NavigationButton>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};
