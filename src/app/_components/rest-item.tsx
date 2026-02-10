import Image from "next/image";
import { motion } from 'framer-motion';
import { Rest } from "@/models/rest";

type RestItemProps = {
    index: number;
    isFirst?: boolean;
    isLast?: boolean;
    item: Rest;
}

export const RestItem = ({index, isFirst, isLast, item}: RestItemProps) => {
    return (
        <div className={`group min-w-[85vw] sm:min-w-[420px] md:min-w-[500px] snap-center scroll-smooth rounded-2xl ${isFirst ? "ml-4 lg:ml-7" : ""} ${isLast ? "mr-4 lg:mr-7" : ""}`}>
            <motion.div 
                className="relative h-40 sm:h-52 rounded-xl overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ 
                    duration: 0.5, 
                    delay: index * 0.15 + 0.2,
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
                        delay: index * 0.15 + 0.2,
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
                        delay: index * 0.15 + 0.3,
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
                        delay: index * 0.15 + 0.4,
                        ease: "easeOut" 
                    }}
                    className="mt-5 flex items-center gap-6"
                >
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => item.bookLink && window.open(item.bookLink, '_blank')}
                        aria-label={`Book now for ${item.title}`}
                        className="rounded-full cursor-pointer px-5 py-2 ring-1 ring-white/60 bg-transparent hover:bg-white/10 transition"
                    >
                        book now
                    </motion.button>
                    {/* <motion.a 
                        href="#" 
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-2 group/cta text-white/90"
                    >
                        <span>more</span>
                        <MoveRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                    </motion.a> */}
                </motion.div>
            </div>
        </div>
    );
}