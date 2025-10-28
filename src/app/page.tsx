"use client"
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, MoveDown, MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const parallaxImgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(prev => (prev !== isScrolled ? isScrolled : prev));

            const y = Math.min(window.scrollY, 500);
            if (parallaxImgRef.current) {
                parallaxImgRef.current.style.transform =
                    `translate3d(0, ${y * -0.2}px, 0) scale(1.2)`;
            }
        };

        update();
        let rafId = 0;
        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const handleScrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

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
    const [aboutIndex, setAboutIndex] = useState(0);
    const [isSwitching, setIsSwitching] = useState(false);

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

    // Data & kontrol untuk section Rest
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
    const restRef = useRef<HTMLDivElement>(null);
    const scrollRest = (dir: "prev" | "next") => {
        const el = restRef.current;
        if (!el) return;

        const cards = Array.from(el.children) as HTMLElement[];
        const current = el.scrollLeft;
        const epsilon = restItems.length; // toleransi kecil terhadap floating scroll

        // Cari kartu target relatif terhadap posisi sekarang
        const nextCard = cards.find((c) => c.offsetLeft - current > epsilon);
        const prevCard = [...cards].reverse().find((c) => current - c.offsetLeft > epsilon);
        const targetCard = dir === "next" ? nextCard ?? cards[cards.length - 1] : prevCard ?? cards[0];

        // Gulir sehingga kartu berada di tengah viewport
        const targetLeft =
        targetCard.offsetLeft - el.clientWidth / 2 + targetCard.clientWidth / 2;

        el.scrollTo({ left: targetLeft, behavior: "smooth" });
    };

    // Gallery: data + state + ref
    const gallerySlides = [
    {
        word: "Stay",
        left: ["/images/illustration-1.jpg", "/images/the-hita-sri-krisna.png", "/images/illustration-3.jpg"],
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
    const [galleryIndex, setGalleryIndex] = useState(0);
    const galleryRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onScroll = () => {
            const el = galleryRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = el.offsetHeight;
            
            // Hitung progress scroll dalam section
            const scrollProgress = Math.max(0, window.scrollY - sectionTop);
            const maxScroll = sectionHeight - window.innerHeight;
            const normalizedProgress = Math.min(scrollProgress / maxScroll, 1);
            
            // Konversi ke index dengan pembagian yang lebih halus
            const totalSlides = gallerySlides.length;
            const rawIndex = normalizedProgress * (totalSlides - 1);
            const nextIndex = Math.min(Math.round(rawIndex), totalSlides - 1);

            setGalleryIndex((prev) => (nextIndex !== prev ? nextIndex : prev));
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 w-full flex items-center justify-center transition-colors duration-300 ${
                    scrolled ? "bg-white/80 backdrop-blur-md text-black" : "bg-transparent text-white"
                }`}
            >
                <nav className="flex justify-between text-sm sm:text-base w-full max-w-3xl px-4 my-4">
                    <a href="#" className="group uppercase relative">
                        Home
                        <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full bg-current transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </a>
                    <a href="#about" className="group uppercase relative">
                        About
                        <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full bg-current transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </a>
                    <a href="#stay" className="group uppercase relative">
                        Stay
                        <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full bg-current transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </a>
                    <a href="#blog" className="group uppercase relative">
                        Blog
                        <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full bg-current transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </a>
                </nav>
            </header>

            {/* Hero full-height dengan background image */}
            <section id="jumbotron" className="relative min-h-screen overflow-hidden">
                {/* Wrapper tetap statis */}
                <div className="absolute inset-0">
                    {/* Hanya gambar yang ditransform */}
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
                    {/* Overlay statis agar tidak ada celah */}
                    <div className="absolute inset-0 bg-[#2a1e14]/40" />
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center">
                    <p className="uppercase tracking-widest text-xs sm:text-sm">Explore The Hita</p>
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

            {/* Section About */}
            <section id="about" className="p-4 lg:p-7 scroll-mt-24 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className={`relative h-72 md:h-[420px] transition-all duration-300 ease-in-out ${isSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"} will-change-[opacity,transform]`}>
                        <Image
                            src={aboutSlides[aboutIndex].image}
                            alt={aboutSlides[aboutIndex].title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover border rounded-2xl"
                            priority
                        />
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col justify-between">
                        <div className="text-2xl font-medium mb-3 text-black">THE HITA</div>

                        <div className="flex flex-col" key={aboutIndex}>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black">
                                {aboutSlides[aboutIndex].title}
                            </h2>
                            <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-700">
                                {aboutSlides[aboutIndex].desc}
                            </p>

                            <div className="mt-8 flex items-center gap-6">
                                <button aria-label="Previous" onClick={() => switchAbout("prev")}>
                                    <ArrowLeft className="w-5 h-5 text-black" />
                                </button>
                                <button aria-label="Next" onClick={() => switchAbout("next")}>
                                    <ArrowRight className="w-5 h-5 text-black" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Rest (carousel) */}
            <section id="stay" className="py-4 lg:py-7 bg-gradient-to-b from-[#3D2709] to-[#211503] text-white">
                <div>
                    <div className="flex items-center justify-between px-4 sm:px-7">
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
                    </div>

                    <div
                        ref={restRef}
                        style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
                        className="mt-6 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
                    >
                        {restItems.map((item, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === restItems.length - 1;
                            return (
                                <article
                                    key={idx}
                                    className={`group min-w-[85vw] sm:min-w-[420px] md:min-w-[500px] snap-center rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1 ${isFirst ? "ml-4 lg:ml-7" : ""} ${isLast ? "mr-4 lg:mr-7" : ""}`}
                                >
                                    <div className="relative h-40 sm:h-52 rounded-xl overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 90vw, 33vw"
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex flex-col px-4">
                                        <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                                        <p className="mt-2 text-sm opacity-80">{item.desc}</p>

                                        <div className="mt-5 flex items-center gap-6">
                                            <button className="rounded-full px-5 py-2 ring-1 ring-white/60 bg-transparent hover:bg-white/10 transition">
                                                book now
                                            </button>
                                            <a href="#" className="inline-flex items-center gap-2 group/cta text-white/90">
                                                <span>more</span>
                                                <MoveRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section Gallery */}
            <section id="gallery" className="bg-white relative">
                <div
                    ref={galleryRef}
                    style={{ height: `${gallerySlides.length * 50}vh` }}
                    className="relative"
                >
                    <div className="sticky top-0 h-screen">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 h-full flex items-center justify-center">
                            {/* Grid: mobile 2 kolom (teks | gambar), desktop 3 kolom seperti sekarang */}
                            <div className="relative w-full h-full grid grid-cols-[64px_1fr] md:grid-cols-3 grid-rows-[auto_1fr_auto] gap-6 items-center">
                                {/* 3 Gambar Atas — desktop tetap seperti sekarang */}
                                <div className="row-start-1 col-start-1 hidden md:block">
                                    <div className="relative w-full h-28 sm:h-36 md:h-44 lg:h-52 rounded-[24px] overflow-hidden bg-neutral-100">
                                        <Image src={gallerySlides[galleryIndex].left[0]} alt="Top 1" fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="row-start-1 col-start-2 hidden md:block">
                                    <div className="relative w-full h-28 sm:h-36 md:h-44 lg:h-52 rounded-[24px] overflow-hidden bg-neutral-100">
                                        <Image src={gallerySlides[galleryIndex].right[0]} alt="Top 2" fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="row-start-1 col-start-3 hidden md:block">
                                    <div className="relative w-full h-28 sm:h-36 md:h-44 lg:h-52 rounded-[24px] overflow-hidden bg-neutral-100">
                                        <Image src={gallerySlides[galleryIndex].right[1]} alt="Top 3" fill className="object-cover" />
                                    </div>
                                </div>

                                {/* 3 Gambar Atas — mobile di kolom kanan */}
                                <div className="row-start-1 col-start-2 md:hidden">
                                    <div className="flex gap-6">
                                        <div className="relative w-full h-24  rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].left[0]} alt="Top 1" fill className="object-cover" />
                                        </div>
                                        <div className="relative w-full h-24 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].right[0]} alt="Top 2" fill className="object-cover" />
                                        </div>
                                        <div className="relative w-full h-24 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].right[1]} alt="Top 3" fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* 1 Gambar Kiri — sembunyikan di mobile, tampil di desktop */}
                                <div className="row-start-2 col-start-1 hidden md:block">
                                    <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80 rounded-[24px] overflow-hidden bg-neutral-100">
                                        <Image src={gallerySlides[galleryIndex].left[1]} alt="Left" fill className="object-cover" />
                                    </div>
                                </div>

                                {/* Teks: mobile di kiri (rotate 270), desktop di tengah seperti sekarang */}
                                <div className="row-start-2 col-start-1 md:col-start-2 lg:relative flex flex-col items-start md:items-center justify-center text-left md:text-center z-10 pr-4 md:pr-24">
                                    <div className="flex flex-col gap-6">
                                        {gallerySlides.map((s, i) => (
                                            <h2
                                                key={s.word}
                                                className={`text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-tight transform-gpu
                                                    will-change-[filter,opacity,transform]
                                                    transition-[filter,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                                    inline-block rotate-270 md:rotate-0 origin-left whitespace-nowrap
                                                    ${i === galleryIndex
                                                        ? "text-[#3D2709] opacity-100 blur-0 scale-100"
                                                        : "text-[#3D2709] opacity-60 blur-[3px] scale-[0.98]"}`}
                                            >
                                                {s.word}
                                            </h2>
                                        ))}
                                    </div>
                                    {/* Indikator scroll: sembunyikan di mobile, tampil di desktop */}
                                    <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 rotate-90 hidden md:flex items-center gap-2 text-sm text-neutral-500 pointer-events-none">
                                        <span>scroll</span>
                                        <span className="w-10 h-px bg-neutral-400"></span>
                                    </div>
                                </div>

                                {/* 1 Gambar Kanan — desktop */}
                                <div className="row-start-2 col-start-3 hidden md:block">
                                    <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80 rounded-[24px] overflow-hidden bg-neutral-100">
                                        <Image src={gallerySlides[galleryIndex].right[2]} alt="Right" fill className="object-cover" />
                                    </div>
                                </div>
                                {/* Gambar tengah — mobile semua di kanan */}
                                <div className="row-start-2 col-start-2 md:hidden">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="relative w-full h-24 lg:h-40 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].left[1]} alt="Mid 1" fill className="object-cover" />
                                        </div>
                                        <div className="relative w-full h-24 lg:h-40 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].right[2]} alt="Mid 2" fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* 2 Gambar Bawah — desktop memenuhi lebar */}
                                <div className="row-start-3 col-span-3 hidden md:block">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="relative w-full h-28 sm:h-36 md:h-44 lg:h-52 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].right[0]} alt="Bottom 1" fill className="object-cover" />
                                        </div>
                                        <div className="relative w-full h-28 sm:h-36 md:h-24 lg:h-52 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].left[0]} alt="Bottom 2" fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* 2 Gambar Bawah — mobile di kanan */}
                                <div className="row-start-3 col-start-2 md:hidden">
                                    <div className="flex gap-6">
                                        <div className="relative w-full h-24 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].right[0]} alt="Bottom 1" fill className="object-cover" />
                                        </div>
                                        <div className="relative w-full h-24 rounded-[24px] overflow-hidden bg-neutral-100">
                                            <Image src={gallerySlides[galleryIndex].left[0]} alt="Bottom 2" fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="feedback" className="py-4 lg:py-7 bg-white">

            </section>
        </>
    );
}