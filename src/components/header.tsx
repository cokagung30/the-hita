"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

type HeaderProps = {
    isScrolled: boolean;
}

export default function Header({isScrolled}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Events", href: "#events" },
        { name: "Accommodations", href: "#rest" },
        { name: "Contact Us", href: "#footer" },
        { name: "Gallery", href: "#gallery" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`
                    fixed top-0 inset-x-0 z-50 w-full flex items-center 
                    justify-between transition-all duration-300 px-6 lg:px-12
                    ${isScrolled 
                        ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
                        : "bg-transparent py-4"
                    }
                `}
            >
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Image 
                        src={isScrolled ? "/images/header-logo-secondary.svg" : "/images/header-logo.svg"}
                        alt="The Hita Logo"
                        width={150}
                        height={60}
                        className="transition-opacity duration-300 w-24 h-auto sm:w-32 lg:w-[150px]"
                    />
                </div>

                {/* Navigation Links - Desktop */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                    {navLinks.map((link, idx) => (
                        <a 
                            key={idx}
                            href={link.href} 
                            className={`
                                group uppercase relative font-medium text-sm tracking-wide
                                transition-colors duration-300
                                ${isScrolled ? "text-black hover:text-black/70" : "text-white hover:text-white/70"}
                            `}
                        >
                            {link.name}
                            <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full bg-current transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                        </a>
                    ))}
                </nav>

                {/* Book Now Button - Desktop */}
                <motion.a
                    href="#rest"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        hidden md:block uppercase font-bold text-sm tracking-wide
                        px-6 py-2.5 rounded transition-colors duration-300
                        ${isScrolled 
                            ? "bg-black text-white hover:bg-black/80" 
                            : "bg-white text-black hover:bg-white/90"
                        }
                    `}
                >
                    Book Now
                </motion.a>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className={`
                        md:hidden flex flex-col gap-1.5 w-5 h-5 justify-center
                        transition-colors duration-300 relative z-[60]
                    `}
                    aria-label="Menu"
                >
                    <span className={`h-0.5 w-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''} ${isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"}`}></span>
                    <span className={`h-0.5 w-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''} ${isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"}`}></span>
                    <span className={`h-0.5 w-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${isScrolled || isMobileMenuOpen ? "bg-black" : "bg-white"}`}></span>
                </button>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            onClick={closeMobileMenu}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-50 shadow-2xl overflow-y-auto"
                        >
                            <div className="p-6">
                                {/* Close Button */}
                                <button
                                    onClick={closeMobileMenu}
                                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6 text-black" />
                                </button>

                                {/* Logo */}
                                <div className="mb-12 mt-8">
                                    <Image 
                                        src="/images/header-logo-secondary.svg"
                                        alt="The Hita Logo"
                                        width={120}
                                        height={40}
                                        className="w-20 h-auto sm:w-28"
                                    />
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((link, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={link.href}
                                            onClick={closeMobileMenu}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="text-2xl font-semibold text-black hover:text-black/70 transition-colors"
                                        >
                                            {link.name}
                                        </motion.a>
                                    ))}
                                </nav>

                                {/* Book Now Button */}
                                <motion.a
                                    href="#rest"
                                    onClick={closeMobileMenu}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-12 block w-full text-center uppercase font-bold text-sm tracking-wide px-6 py-3 rounded bg-black text-white hover:bg-black/80 transition-colors"
                                >
                                    Book Now
                                </motion.a>

                                {/* Additional Info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-12 pt-6 border-t border-gray-200"
                                >
                                    <p className="text-sm text-gray-600 mb-2">Contact Us</p>
                                    <a href="tel:+6281234567890" className="text-sm text-black font-semibold hover:text-black/70">
                                        +62 812 3456 7890
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}