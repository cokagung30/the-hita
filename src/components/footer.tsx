"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
    // const currentYear = new Date().getFullYear();
    const [currentYear, setCurrentYear] = useState(2026);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const footerLinks = {
        navigate: [
            { name: "About", href: "#about" },
            { name: "Accommodations", href: "#rest" },
            { name: "Gallery", href: "#gallery" },
            { name: "Events", href: "#events" },
            { name: "Contact Us", href: "#footer" },
        ],
    };

    const socialMedia = [
        { name: "The Hita", handle: "@thehita", href: "https://instagram.com/thehita" },
    ];

    return (
        <footer id="footer" className="bg-gradient-to-b from-[#3D2709] to-[#211503] text-white">
            <div>
                {/* Main Footer Content */}
                <div className="flex lg:flex-row flex-col gap-8 lg:gap-12 mb-12 px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
                    {/* Logo & Address */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-[50%] w-full"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Image 
                                src="/images/logo-white.svg"
                                alt="The Hita Logo"
                                width={50}
                                height={20}
                            />
                        </div>
                        
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                            Jl. Kresna No.03, Legian,<br />
                            Kec. Kuta, Kabupaten Badung,<br />
                            Bali 80361, Indonesia
                        </p>

                        <a 
                            href="https://wa.me/6281234567890"
                            className="inline-block text-white font-semibold text-sm mb-6 hover:text-white/80 transition-colors"
                        >
                            WA +62 837 489 938 27
                        </a>
                    </motion.div>

                    {/* Navigate Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:w-[15%] w-full"
                    >
                        <h3 className="text-white/50 uppercase tracking-widest text-xs font-semibold mb-6">
                            Navigate
                        </h3>
                        <ul className="space-y-4">
                            {footerLinks.navigate.map((link, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={link.href}
                                        className="text-white text-base hover:text-white/70 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-[10%] w-full"
                    >
                        <h3 className="text-white/50 uppercase tracking-widest text-xs font-semibold mb-6">
                            Socials
                        </h3>
                        <ul className="space-y-4">
                            {socialMedia.map((social, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                        <span className="text-white text-base group-hover:text-white/70 transition-colors">
                                            {social.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:w-[25%] w-full"
                    >
                        <h3 className="text-white/50 uppercase tracking-widest text-xs font-semibold mb-6">
                            Follow Our Stories
                        </h3>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
                            />
                            <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors"
                                aria-label="Subscribe"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mb-8"></div>

                {/* Bottom Bar */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8 pb-8"
                >
                    <p className="text-white/50 text-sm text-center md:text-left">
                        © The Hita {currentYear}. All Rights Reserved.
                    </p>
                    
                    <div className="flex gap-8 text-sm">
                        <Link href="#" className="text-white/50 hover:text-white transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link href="#" className="text-white/50 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* WhatsApp Floating Button */}
            <motion.a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
                aria-label="Contact via WhatsApp"
            >
                <MessageCircle className="w-7 h-7 text-white" fill="white" />
            </motion.a>
        </footer>
    );
}