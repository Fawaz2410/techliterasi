import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { motion } from 'framer-motion'; // Import ini untuk animasi

import 'swiper/css';
import 'swiper/css/effect-creative';

export default function Home() {
  const slides = [
    { id: 1, image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Keamanan Siber" },
    { id: 2, image: "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Literasi Digital" },
    { id: 3, image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Logika Koding" }
  ];

  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#0f172a] transition-colors duration-500 overflow-hidden">
      
      {/* Ornamen Latar Belakang */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* KOLOM KIRI: TEKS DENGAN ANIMASI MOTION */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase">Baru</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">Konten Pembelajaran Terbaru Telah Tersedia!</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-[1000] text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
              NAVIGASI <br />
              <span className="text-indigo-600 dark:text-indigo-400 italic">MASA DEPAN</span> <br />
              DIGITAL.
            </h1>

            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
              Eksplorasi dunia teknologi tanpa batas bersama <span className="text-slate-900 dark:text-white font-bold">Kita</span>. Belajar cerdas, aman, dan inovatif.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/konten" className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-300 dark:shadow-none block">
                  MULAI PETUALANGAN
                </Link>
              </motion.div>
              
              <div className="flex -space-x-3 items-center">
                {[1,2,3].map(i => (
                  <img key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900" src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                ))}
                <span className="pl-5 text-sm font-bold text-slate-400">+1.2k Siswa</span>
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: SLIDER DENGAN ANIMASI MELAYANG */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/5 relative"
          >
            {/* Ikon Melayang (Floating) */}
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center text-3xl z-20"
            >
              🛡️
            </motion.div>

            <div className="relative p-4 bg-indigo-600 rounded-[3.5rem] shadow-2xl rotate-2">
              <Swiper
                effect={'creative'}
                creativeEffect={{
                  prev: { shadow: true, translate: ['-120%', 0, -500] },
                  next: { shadow: true, translate: ['120%', 0, -500] },
                }}
                autoplay={{ delay: 3000 }}
                modules={[Autoplay, EffectCreative]}
                className="rounded-[2.8rem] aspect-[4/5]"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative h-full">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 flex flex-col justify-end p-8">
                        <h3 className="text-3xl font-black text-white">{slide.title}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>

        {/* SECTION FITUR DENGAN STAGGERED ANIMATION */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
        >
          {[
            { icon: "🔐", title: "Cyber Guard", desc: "Keamanan privasi data utama." },
            { icon: "🌐", title: "Web Logic", desc: "Pahami cara kerja dunia internet." },
            { icon: "🚀", title: "Fast Learn", desc: "Materi padat dan mudah dipahami." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase">{item.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}