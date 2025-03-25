"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { HiX } from "react-icons/hi";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-black text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/">
                    <Image src="/logoimage.png" alt="Logo" width={100} height={40} />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
                    <li><Link href="/menu" className="hover:text-blue-400">Menu</Link></li>
                    <li><Link href="/reservation" className="hover:text-blue-400">Make a Reservation</Link></li>
                    <li><Link href="/contact" className="hover:text-blue-400">Contact Us</Link></li>
                </ul>

                <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <HiX /> : <CiMenuBurger />}
                </button>
            </div>

            {menuOpen && (
                <ul className="md:hidden mt-4 space-y-2 text-center bg-black">
                    <li><Link href="/" className="block py-2 hover:text-blue-400">Home</Link></li>
                    <li><Link href="/menu" className="block py-2 hover:text-blue-400">Menu</Link></li>
                    <li><Link href="/reservation" className="block py-2 hover:text-blue-400">Make a Reservation</Link></li>
                    <li><Link href="/contact" className="block py-2 hover:text-blue-400">Contact Us</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
