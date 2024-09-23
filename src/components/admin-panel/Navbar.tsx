/*
import { useAppSelector } from '@/redux/hooks'
import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'

interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({setShowCart}: PropsType) => {
  const cartCount = useAppSelector((state) => state.cartReducer.length)
  return (
    <div className="pt-4 bg-white top-0 sticky">
      <div className="flex justify-between items-center">
        <div className="text-4xl font-bold">LOGO</div>
        <div className="lg:flex hidden w-full max-w-[500px]">
          <input
            className="border-2 border-accent px-6 py-2 w-full"
            type="text"
            placeholder="Search for products..."
            />

            <div className="bg-accent text-white text-[26px] grid place-items-center px-4">
              <BsSearch />
            </div>
        </div>
        <div className="flex gap-4 md:gap-8 items-center">
          <div className="md:flex hidden gap-3">
            <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px]
            w-[50px] h-[50px] grid-place-items-center">
              <AiOutlineUser />
            </div>
            <div>
            </div>
              <p className="text-gray-500">Hello, Sign in</p>
              <p className="font-medium">Your Account</p>
          </div>
        </div>



      </div>
    </div>
  )
}

export default Navbar
*/
import { useAppSelector } from '@/redux/hooks';
import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setShowCart }: PropsType) => {
  const cartCount = useAppSelector((state) => state.cartReducer.length);

  return (
    <div className="pt-4 bg-white top-0 sticky">
      <div className="flex justify-between items-center">
        <div className="text-4xl font-bold">LOGO</div>
        
        {/* Search Bar */}
        <div className="lg:flex hidden w-full max-w-[500px]">
          <input
            className="border-2 border-accent px-6 py-2 w-full"
            type="text"
            placeholder="Search for products..."
          />
          <div className="bg-accent text-white text-[26px] grid place-items-center px-4">
            <BsSearch />
          </div>
        </div>

        {/* User and Cart Info */}
        <div className="flex gap-4 md:gap-8 items-center">
          {/* User Info */}
          <div className="md:flex hidden gap-3 items-center">
            <div className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px]
              w-[50px] h-[50px] grid place-items-center">
              <AiOutlineUser />
            </div>
            <div>
              <p className="text-gray-500">Hello, Sign in</p>
              <p className="font-medium">Your Account</p>
            </div>
          </div>

          {/* Cart Info */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart(true)}
          >
            <div className="text-[32px]">
              🛒
            </div>
            {cartCount > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full 
                text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
