"use client";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveDown, MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";
import Header from "@/components/header";

const aboutSlides = [
    { 
        title: "A Cozy Guest House", 
        image: "/images/illustration-1.jpg", 
        desc: "The Hita is a boutique guest house where modern comfort meets island calm. Sunlit rooms and a relaxed café invite slow mornings and easy evenings. Thoughtful details and local touches make every stay feel personal." 
    },
    { 
        title: "Designed for Slow Living", 
        image: "/images/illustration-2.jpg", 
        desc: "Soft linens, warm wood, and locally crafted pieces shape spaces made to unwind. Private corners and shared courtyards create a gentle rhythm between your Bali adventures." 
    },
    { 
        title: "Warm, Attentive Service", 
        image: "/images/illustration-3.jpg", 
        desc: "Hosts greet you like family. From breakfast and coffee to curated tips, small touches make your time at The Hita simple, comfortable, and memorable." 
    },
];

const restItems = [
    {
        title: "The Hita Uluwatu",
        desc: "Our prime stay at the mystical Jimbaran Area. A strategic area close to the lousy Uluwatu and energetic Seminyak & Canggu Area",
        image: "/images/the-hita-uluwatu.png",
    },
    {
        title: "The Hita Seminyak",
        desc: "Our prime stay at the mystical Jimbaran Area. A strategic area close to the lousy Uluwatu and energetic Seminyak & Canggu Area",
        image: "/images/the-hita-seminyak.png",
    },
    {
        title: "Sri Krisna",
        desc: "Our prime stay at the mystical Jimbaran Area. A strategic area close to the lousy Uluwatu and energetic Seminyak & Canggu Area",
        image: "/images/the-hita-sri-krisna.png",
    }
];

const gallerySlides = [
    {
        word: "Stay",
        left: ["/images/the-hita-logo.png", "/images/the-hita-sri-krisna.png", "/images/illustration-3.jpg"],
        right: ["/images/illustration-2.jpg", "/images/the-hita-seminyak.png", "/images/the-hita-uluwatu.png"],
    },
    {
        word: "Explore",
        left: ["/images/illustration-2.jpg", "/images/the-hita-uluwatu.png", "/images/illustration-1.jpg"],
        right: ["/images/illustration-3.jpg", "/images/the-hita-seminyak.png", "/images/the-hita-sri-krisna.png"],
    },
    {
        word: "Enjoy",
        left: ["/images/the-hita-seminyak.png", "/images/illustration-3.jpg", "/images/the-hita-sri-krisna.png"],
        right: ["/images/illustration-1.jpg", "/images/the-hita-uluwatu.png", "/images/illustration-2.jpg"],
    },
];

const feedbacks = [
    {
        name: "Sarah Johnson",
        rating: 5,
        comment: "An absolutely wonderful stay! The attention to detail and warm hospitality made our Bali experience unforgettable. The rooms are beautifully designed and the location is perfect.",
        date: "March 2024"
    },
    {
        name: "Michael Chen",
        rating: 5,
        comment: "The Hita exceeded all expectations. The staff went above and beyond to make our stay comfortable. The café serves excellent coffee and the atmosphere is so relaxing.",
        date: "February 2024"
    },
    {
        name: "Emma Williams",
        rating: 5,
        comment: "A hidden gem in Bali! The peaceful ambiance and thoughtful touches throughout made this the perfect retreat. Can't wait to return!",
        date: "January 2024"
    },
    {
        name: "David Martinez",
        rating: 5,
        comment: "Incredible experience from start to finish. The blend of modern comfort and traditional Balinese charm is perfect. Highly recommend!",
        date: "December 2023"
    }
];

const offers = [
    {title: 'Book by \nWhatsapp', percentage: 10},
    {title: 'Book from \nWebsite', percentage: 10},
    {title: 'Membership \nDiscount', percentage: 10},
];

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [aboutIndex, setAboutIndex] = useState(0);
    const [isSwitching, setIsSwitching] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

    const parallaxImgRef = useRef<HTMLDivElement>(null);
    const restRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const feedbackRef = useRef<HTMLDivElement>(null);
    const eventsParallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId = 0;
        
        const update = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(prev => (prev !== isScrolled ? isScrolled : prev));

            const y = Math.min(window.scrollY, 500);
            if (parallaxImgRef.current) {
                parallaxImgRef.current.style.transform =
                    `translate3d(0, ${y * -0.2}px, 0) scale(1.2)`;
            }

            const eventsSection = document.getElementById('events');
            if (eventsSection && eventsParallaxRef.current) {
                const eventsRect = eventsSection.getBoundingClientRect();
                const eventsSectionTop = eventsRect.top + window.scrollY;
                
                const eventsScrollY = Math.max(0, window.scrollY - eventsSectionTop);
                const eventsY = Math.min(eventsScrollY, 500);
                
                eventsParallaxRef.current.style.transform = `translate3d(0, ${eventsY * -0.2}px, 0) scale(1.2)`;
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);

            // Gallery scroll logic
            const el = galleryRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = el.offsetHeight;

            const scrollProgress = Math.max(0, window.scrollY - sectionTop);
            const maxScroll = sectionHeight - window.innerHeight;
            const normalizeProgress = Math.min(scrollProgress / maxScroll, 1);

            const totalSlides = gallerySlides.length;
            const rawIndex = normalizeProgress * (totalSlides - 1);
            const nextIndex = Math.min(Math.round(rawIndex), totalSlides - 1);

            setGalleryIndex((prev) => (nextIndex !== prev ? nextIndex : prev));
        };

        update(); // Initial call
        window.addEventListener("scroll", onScroll, { passive: true });
        
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const switchAbout = (dir: "next" | "prev") => {
        setIsSwitching(true); // animasi keluar
        setTimeout(() => {
            setAboutIndex((i) =>
                dir === "next" ? (i + 1) % aboutSlides.length : (i - 1 + aboutSlides.length) % aboutSlides.length
            );
            // animasi masuk setelah konten diganti
            requestAnimationFrame(() => setIsSwitching(false));
        }, 250); // sesuaikan durasi dengan transition di bawah
    };

    const handleScrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollRest = (dir: "prev" | "next") => {
        const el = restRef.current;
        if (!el) return;

        const cardWidth = el.querySelector('.group')?.clientWidth || 0;
        const gap = 24; // 6 * 4px (gap-6 in Tailwind)
        const scrollAmount = cardWidth + gap;

        if (dir === "next") {
            el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        } else {
            el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    // Auto-slide feedback cards
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentFeedbackIndex((prev) => (prev + 1) % feedbacks.length);
        }, 3000); // Slide setiap 3 detik

        return () => clearInterval(intervalId);
    }, []);

    // Scroll feedback container when index changes
    useEffect(() => {
        const el = feedbackRef.current;
        if (!el) return;

        const cards = Array.from(el.children) as HTMLElement[];
        const targetCard = cards[currentFeedbackIndex];
        
        if (targetCard) {
            const targetLeft = targetCard.offsetLeft - el.clientWidth / 2 + targetCard.clientWidth / 2;
            el.scrollTo({ left: targetLeft, behavior: "smooth" });
        }
    }, [currentFeedbackIndex]);

    return (
        <>
            <Header isScrolled={scrolled} />

            <section id="jumbotron" className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0">
                    <div 
                        ref={parallaxImgRef}
                        className="absolute -inset-12 will-change-transform"
                    >
                        <Image 
                            src="/images/banner.avif"
                            alt="Background"
                            fill
                            sizes="100vw"
                            className="object-cover pointer-events-none"
                            priority
                        />
                    </div>

                    <div className="absolute inset-0 bg-[#2a1e14]/40" />
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center">
                    <div className="uppercase tracking-widest text-xs sm:text-sm">
                        Explore The Hita
                    </div>
                    <button
                        type="button"
                        aria-label="Scroll ke About"
                        onClick={() => handleScrollTo("about")}
                        className="mt-1"
                    >
                        <MoveDown className="w-8 animate-[scrollDown_1.6s_ease-out_infinite] cursor-pointer" />
                    </button>
                </div>
            </section>

            <section id="about" className="p-4 lg:p-7 scroll-mt-24 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, x: -30 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={`
                            relative h-72 md:h-[420px] transition-all duration-300
                            ease-linear ${isSwitching ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}
                            will-change-[opacity,transform] rounded-2xl overflow-hidden
                        `}
                    >
                        <Image 
                            src={aboutSlides[aboutIndex].image}
                            alt={aboutSlides[aboutIndex].title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>

                    <div className="p-6 sm:p-8 flex flex-col justify-between">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="text-2xl font-medium mb-3 text-black"
                        >
                            THE HITA
                        </motion.div>

                        <div className="flex flex-col" key={aboutIndex}>
                            <motion.h2 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-black transition-all duration-300 ease-out ${isSwitching ? 'opacity-0 translate-x-[-4]' : 'opacity-100 translate-x-0'}`}
                            >
                                {aboutSlides[aboutIndex].title}
                            </motion.h2>
                            
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`mt-4 text-base sm:text-lg md:text-xl text-neutral-700 transition-all duration-300 ease-out ${isSwitching ? 'opacity-0 translate-x-[-4]' : 'opacity-100 translate-x-0'}`}
                            >
                                {aboutSlides[aboutIndex].desc}
                            </motion.div>

                            <div className="mt-8 flex items-center gap-6">
                                <motion.button 
                                    whileHover={{ scale: 1.1, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label="Previous" 
                                    onClick={() => switchAbout("prev")}
                                    className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-black" />
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.1, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label="Next" 
                                    onClick={() => switchAbout("next")}
                                    className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                                >
                                    <ArrowRight className="w-5 h-5 text-black" />
                                </motion.button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="rest" className="py-4 lg:py-7 bg-gradient-to-b from-[#3D2709] to-[#211503] text-white">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex items-center justify-between px-4 sm:px-7"
                    >
                        <h2 className="text-3xl sm:text-4xl font-semibold">Rest</h2>

                        <div className="flex items-center gap-3">
                            <button
                                aria-label="Previous"
                                onClick={() => scrollRest("prev")}
                                className="rounded-full border border-white/50 w-9 h-9 grid place-items-center hover:bg-white/10 transition"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                aria-label="Next"
                                onClick={() => scrollRest("next")}
                                className="rounded-full border border-white/50 w-9 h-9 grid place-items-center hover:bg-white/10 transition"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>

                    <div
                        ref={restRef}
                        style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
                        className="mt-6 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
                    >
                        {restItems.map((item, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === restItems.length - 1;
                            return (
                                <div
                                    key={idx}
                                    className={`group min-w-[85vw] sm:min-w-[420px] md:min-w-[500px] snap-center scroll-smooth rounded-2xl ${isFirst ? "ml-4 lg:ml-7" : ""} ${isLast ? "mr-4 lg:mr-7" : ""}`}
                                >
                                    <motion.div 
                                        className="relative h-40 sm:h-52 rounded-xl overflow-hidden"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: idx * 0.15 + 0.2,
                                            ease: "easeOut" 
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 90vw, 33vw"
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    <div className="flex flex-col px-4">
                                        <motion.h3 
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: false }}
                                            transition={{ 
                                                duration: 0.5, 
                                                delay: idx * 0.15 + 0.2,
                                                ease: "easeOut" 
                                            }}
                                            className="mt-5 text-2xl font-semibold"
                                        >
                                            {item.title}
                                        </motion.h3>
                                        <motion.div 
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: false }}
                                            transition={{ 
                                                duration: 0.5, 
                                                delay: idx * 0.15 + 0.3,
                                                ease: "easeOut" 
                                            }}
                                            className="mt-2 text-sm opacity-80"
                                        >
                                            {item.desc}
                                        </motion.div>

                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false }}
                                            transition={{ 
                                                duration: 0.5, 
                                                delay: idx * 0.15 + 0.4,
                                                ease: "easeOut" 
                                            }}
                                            className="mt-5 flex items-center gap-6"
                                        >
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="rounded-full px-5 py-2 ring-1 ring-white/60 bg-transparent hover:bg-white/10 transition"
                                            >
                                                book now
                                            </motion.button>
                                            <motion.a 
                                                href="#" 
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.2 }}
                                                className="inline-flex items-center gap-2 group/cta text-white/90"
                                            >
                                                <span>more</span>
                                                <MoveRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                                            </motion.a>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="gallery" className="bg-white py-6">
                <div ref={galleryRef} style={{ height: `${gallerySlides.length * 80}vh` }} className="relative">
                    <div className="sticky top-10 h-screen">
                        {/* Mobile Layout */}
                        <div className="flex gap-10 md:hidden h-full px-6">
                            <div className="flex flex-col w-5 self-center gap-6">
                                {gallerySlides.map((s, i) => (
                                    <div 
                                        key={s.word} 
                                        className={`sticky h-full rotate-270 ${i == 1 ? 'mt-14 mb-5' : 'my-10'}`}
                                    >
                                        <h2
                                            className={`
                                                inline-block origin-left whitespace-nowrap text-4xl sm:text-5xl font-semibold tracking-tight leading-none transition-all duration-500 ease-out
                                                ${i === galleryIndex ? "text-[#3D2709] opacity-100 blur-0" : "text-[#3D2709]/70 opacity-80 blur-sm md:blur"}
                                            `}
                                        >
                                            {s.word}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-left-0-${galleryIndex}`}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative w-full h-28 sm:h-36 md:h-44 lg:h-40 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].left[0]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-left-1-${galleryIndex}`}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                                        className="relative w-full h-28 sm:h-36 md:h-44 lg:h-48 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].left[1]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-right-0-${galleryIndex}`}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                                        className="relative w-full h-28 sm:h-36 md:h-44 lg:h-48 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].right[0]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-left-2-${galleryIndex}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                                        className="relative w-full h-28 sm:h-36 md:h-44 lg:h-72 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].left[2]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-right-1-${galleryIndex}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                                        className="relative w-full h-28 sm:h-36 md:h-44 lg:h-60 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].right[1]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-right-2-${galleryIndex}`}
                                        initial={{ opacity: 0, rotate: -5, scale: 0.95 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: 5, scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                                        className="relative w-full h-28 sm:h-36 md:h-44 lg:h-60 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].right[2]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex md:flex-col items-start justify-center gap-9 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10 h-full mt-10">
                            <div className="flex gap-10 w-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`desktop-left-0-${galleryIndex}`}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="relative w-[42%] h-28 sm:h-36 md:h-44 lg:h-40 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].left[0]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`desktop-left-1-${galleryIndex}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                        className="relative w-[35%] h-28 sm:h-36 md:h-44 lg:h-48 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].left[1]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`desktop-right-0-${galleryIndex}`}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="relative w-[23%] h-28 sm:h-36 md:h-44 lg:h-48 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].right[0]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="flex w-full gap-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`desktop-left-1-row2-${galleryIndex}`}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 40 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="relative w-[40%] h-28 sm:h-36 md:h-44 lg:h-72 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].left[1]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex items-center gap-5 w-[25%]">
                                    <div className="md:flex flex-col items-center justify-center gap-6">
                                        {gallerySlides.map((s, i) => (
                                            <h2
                                                key={s.word}
                                                className={`inline-block origin-left whitespace-nowrap text-4xl sm:text-5xl font-semibold tracking-tight leading-none transition-all duration-500 ease-out
                                                    ${i === galleryIndex ? "text-[#3D2709] opacity-100 blur-0" : "text-[#3D2709]/70 opacity-80 blur-sm md:blur"}`}
                                            >
                                                {s.word}
                                            </h2>
                                        ))}
                                    </div>

                                    <div className="top-1/2 -translate-y-1/2 rotate-90 hidden md:flex items-center gap-2 text-sm text-neutral-500 pointer-events-none">
                                        <span>scroll</span>
                                        <span className="w-10 h-px bg-neutral-400"></span>
                                    </div>
                                </div>
                                    
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`desktop-right-1-${galleryIndex}`}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="relative w-[35%] h-28 sm:h-36 md:h-44 lg:h-64 rounded-[24px] overflow-hidden bg-neutral-100 self-end"
                                    >
                                        <Image src={gallerySlides[galleryIndex].right[1]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="flex w-full gap-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`desktop-left-2-${galleryIndex}`}
                                        initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 1.05, rotate: 3 }}
                                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                                        className="relative w-[50%] h-28 sm:h-36 md:h-44 lg:h-60 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].left[2]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`desktop-right-2-${galleryIndex}`}
                                        initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 1.05, rotate: -3 }}
                                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                                        className="relative w-[50%] h-28 sm:h-36 md:h-44 lg:h-60 rounded-[24px] overflow-hidden bg-neutral-100"
                                    >
                                        <Image src={gallerySlides[galleryIndex].right[2]} alt="Gallery image" fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="feedback" className="bg-white lg:py-16 py-8 lg:gap-8 gap-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center lg:justify-center justify-start px-4 lg:px-0 mb-8 relative">
                        <h2 className="text-sm md:text-3xl font-semibold bg-[#3D2709] text-white lg:px-8 px-4 lg:py-3 py-2 rounded-full">
                            Hear from Others
                        </h2>

                        <div className="absolute lg:right-0 right-4 flex items-center gap-3">
                            <button
                                aria-label="Previous Feedback"
                                onClick={() => {
                                    setCurrentFeedbackIndex((prev) => 
                                        prev === 0 ? feedbacks.length - 1 : prev - 1
                                    );
                                }}
                                className="rounded-full border-2 border-[#3D2709] lg:w-10 lg:h-10 w-6 h-6 grid place-items-center hover:bg-[#3D2709] transition-colors duration-300 group"
                            >
                                <ChevronLeft className="lg:w-8 w-4 lg:h-8 h-4 text-[#3D2709] group-hover:text-white transition-colors duration-300" />
                            </button>
                            <button
                                aria-label="Next Feedback"
                                onClick={() => {
                                    setCurrentFeedbackIndex((prev) => (prev + 1) % feedbacks.length);
                                }}
                                className="rounded-full border-2 border-[#3D2709] lg:w-10 lg:h-10 w-6 h-6 grid place-items-center hover:bg-[#3D2709] transition-colors duration-300 group"
                            >
                                <ChevronRight className="lg:w-8 w-4 lg:h-8 h-4 text-[#3D2709] group-hover:text-white transition-colors duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div
                    ref={feedbackRef}
                    className="mt-6 flex lg:gap-4 gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
                    style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
                >
                    {feedbacks.map((feedback, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === feedbacks.length - 1;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ 
                                    opacity: idx === currentFeedbackIndex ? 1 : 0.6,
                                    scale: idx === currentFeedbackIndex ? 1 : 0.95
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`group border-2 border-[#221604] min-w-[85vw] sm:min-w-[420px] md:min-w-[500px] gap-1.5 flex flex-col rounded-2xl p-6 ${isFirst ? "ml-4 lg:ml-7" : ""} ${isLast ? "mr-4 lg:mr-7" : ""}`}
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <h2 className="text-xl lg:text-2xl text-[#3D2709]">
                                        {feedback.name}
                                    </h2>
                                    <div className="text-[#221604] text-xs lg:text-sm font-semibold leading-relaxed mb-6">
                                        {feedback.comment}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(feedback.rating)].map((_, i) => (
                                                <svg key={i} className="lg:w-6 w-4 lg:h-6 h-4" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path 
                                                        d="M14.2193 8.79199L14.3316 9.1377H22.2368L16.1353 13.5713L15.8413 13.7842L15.9536 14.1299L18.2837 21.3027L12.1822 16.8701L11.8882 16.6562L11.5943 16.8701L5.49173 21.3027L7.82278 14.1299L7.93509 13.7842L7.64114 13.5713L1.53958 9.1377H9.44485L9.55716 8.79199L11.8882 1.61719L14.2193 8.79199Z" 
                                                        fill="#E5D3A6" 
                                                        stroke="#211503"
                                                    />
                                                </svg>
                                            ))}
                                        </div>

                                        <span className="lg:text-xl text-sm text-[#221604] font-semibold">
                                            {feedback.rating}/5
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            <section id="offers" className="py-4 lg:py-7 bg-gradient-to-b from-[#3D2709] to-[#211503] text-white">
                <div className="w-full flex flex-col">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex items-center justify-between px-4 sm:px-7"
                    >
                        <h2 className="text-3xl sm:text-4xl font-semibold">Offers</h2>
                    </motion.div>

                    <div className="mt-6 flex lg:gap-6 gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 lg:mx-7 mx-4 no-scrollbar">
                        {offers.map((offer, i) => {
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-100px" }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: i * 0.15, 
                                        ease: "easeOut" 
                                    }}
                                    className="bg-white lg:rounded-4xl rounded-xl lg:p-2 p-1 w-full flex flex-col lg:gap-8 gap-2 snap-center"
                                >
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: i * 0.15 + 0.2,
                                            ease: "easeOut" 
                                        }}
                                        className="text-sm lg:text-3xl font-semibold text-[#221604] lg:mx-6 mx-1.5 lg:my-4 my-2 lg:whitespace-pre-line"
                                    >
                                        {offer.title}
                                    </motion.div>
                                    
                                    <div
                                        className="bg-gradient-to-b from-[#3D2709] to-[#211503] w-full text-white items-end py-2 lg:px-6 px-2 lg:rounded-b-4xl rounded-b-xl font-bold text-sm lg:text-3xl text-end"
                                    >
                                        {offer.percentage}% off
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                        className="self-center mt-2 lg:mt-6 text-base lg:text-2xl"
                    >
                        *contact us for validity & how to redeem
                    </motion.span>
                </div>
            </section>

            <section id="events" className="py-4 lg:py-7 bg-white px-4 lg:px-7">
                <div className="relative min-h-screen overflow-hidden">
                    <div ref={eventsParallaxRef} className="absolute -inset-12 will-change-transform">
                        <Image 
                            src="/images/community.png"
                            alt="Illustration Community"
                            fill
                            className="object-cover pointer-events-none w-full lg:h-fit h-[50vh]"
                            priority
                        />
                    </div>

                    <div className="relative z-10 w-full lg:w-fit bg-white pl-2 lg:pl-4 pr-3 lg:pr-5 pt-1 lg:pt-2 pb-2 lg:pb-5 text-[#221604] font-bold lg:text-start text-center text-lg lg:text-5xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            Crafting Home for Everyone
                        </motion.div>
                    </div>
                </div>

                <div className="relative z-10 mt-10 px-2 lg:px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-[#221604] font-bold text-lg lg:text-4xl mb-1 lg:mb-4"
                    >
                        Our Events
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-[#221604] text-lg lg:text-4xl lg:mb-18 mb-8"
                    >
                        The Place Where Characters Blends
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-6 w-full mb-4 lg:mb-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            className="relative w-full lg:w-[20%] h-[90vw] lg:h-96 rounded-[16px] lg:rounded-[24px] overflow-hidden bg-neutral-100 cursor-pointer"
                        >
                            <Image src="/images/events-1.png" alt="Image Event 1" fill className="object-cover" />
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-gradient-to-t from-[#3D2709]/80 via-[#3D2709]/40 to-transparent flex items-end p-4"
                            >
                                <p className="text-white font-semibold text-sm lg:text-base">Yoga Session</p>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            className="relative w-full lg:w-[35%] h-[90vw] lg:h-96 rounded-[16px] lg:rounded-[24px] overflow-hidden bg-neutral-100 cursor-pointer"
                        >
                            <Image src="/images/events-2.png" alt="Image Event 2" fill className="object-cover" />
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-gradient-to-t from-[#3D2709]/80 via-[#3D2709]/40 to-transparent flex items-end p-4"
                            >
                                <p className="text-white font-semibold text-sm lg:text-base">Community Gathering</p>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            className="relative w-full lg:w-[45%] h-[90vw] lg:h-96 rounded-[16px] lg:rounded-[24px] overflow-hidden bg-neutral-100 cursor-pointer"
                        >
                            <Image src="/images/events-3.png" alt="Image Event 3" fill className="object-cover" />
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-gradient-to-t from-[#3D2709]/80 via-[#3D2709]/40 to-transparent flex items-end p-4"
                            >
                                <p className="text-white font-semibold text-sm lg:text-base">Rooftop BBQ</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}