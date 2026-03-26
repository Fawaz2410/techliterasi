import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Konten() {
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    const savedXP = parseInt(localStorage.getItem('aha_user_xp') || '0');
    setUserXP(savedXP);
  }, []);

  // --- LOGIKA 5 LEVEL (ULTIMATE GAMIFICATION) ---
  const getLevelInfo = (xp) => {
    if (xp < 500) return { level: 1, rank: "Rookie", target: 500, color: "text-slate-500" };
    if (xp < 1000) return { level: 2, rank: "Explorer", target: 1000, color: "text-blue-500" };
    if (xp < 2000) return { level: 3, rank: "Hacker", target: 2000, color: "text-purple-500" };
    if (xp < 4000) return { level: 4, rank: "Cyber Ninja", target: 4000, color: "text-rose-500" };
    return { level: 5, rank: "Legend 👑", target: 4000, color: "text-amber-500" }; // Max Level
  };

  const { level: currentLevel, rank: rankName, target: targetXP, color: rankColor } = getLevelInfo(userXP);
  
  // Hitung persentase progress bar (jika level 5, bar penuh 100%)
  const progressPercent = currentLevel === 5 ? 100 : Math.min((userXP / targetXP) * 100, 100);

  // --- DATA MODUL MISI DIPERLUAS ---
  const modules = [
    { 
      id: 1, title: "Detektif Siber", desc: "Kenali bahaya phising, scam, dan cara melindungi data.", 
      icon: "🕵️‍♂️", level: "Pemula", xp: 100, time: "15 Menit", 
      color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30", locked: false 
    },
    { 
      id: 2, title: "Jejak Digital", desc: "Pahami rekam jejakmu di internet dan bedakan hoaks.", 
      icon: "👣", level: "Pemula", xp: 150, time: "20 Menit", 
      color: "from-purple-500 to-fuchsia-600", shadow: "shadow-purple-500/30", locked: false 
    },
    { 
      id: 3, title: "Logika Blok", desc: "Susun algoritma dasar dan pahami cara komputer berpikir.", 
      icon: "🧩", level: "Menengah", xp: 250, time: "35 Menit", 
      color: "from-green-400 to-emerald-600", shadow: "shadow-green-500/30", locked: false 
    },
    // Misi ini terbuka di Level 2 (500 XP)
    { 
      id: 4, title: "Master Kriptografi", desc: "Belajar enkripsi pesan. Kumpulkan 500 XP untuk membuka ini.", 
      icon: "🔐", level: "Lanjutan", xp: 500, time: "60 Menit", 
      color: "from-slate-700 to-slate-900", shadow: "shadow-slate-500/30", locked: userXP < 500 
    },
    // Misi ini terbuka di Level 3 (1000 XP)
    { 
      id: 5, title: "Jaringan Komputer", desc: "Eksplorasi bagaimana internet menghubungkan seluruh dunia.", 
      icon: "🌐", level: "Lanjutan", xp: 1000, time: "90 Menit", 
      color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/30", locked: userXP < 1000 
    },
    // Misi ini terbuka di Level 4 (2000 XP)
    { 
      id: 6, title: "AI & Masa Depan", desc: "Pahami kecerdasan buatan dan etika penggunaannya.", 
      icon: "🤖", level: "Expert", xp: 2000, time: "120 Menit", 
      color: "from-amber-400 to-orange-600", shadow: "shadow-amber-500/30", locked: userXP < 2000 
    }
  ];

  return (
    <div className="min-h-[85vh] bg-[#fafafa] dark:bg-[#0f172a] transition-colors duration-500 pb-24 overflow-hidden">
      
      {/* --- BACKGROUND ORNAMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-indigo-900/5 dark:bg-indigo-900/20 -z-10 clip-path-slant"></div>
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 pt-10 md:pt-16 mt-16">
        
        {/* --- HEADER DASHBOARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-700 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 text-[10rem] opacity-5 pointer-events-none">🎮</div>
          
          <div className="relative z-10 w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 mb-4">
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 dark:text-white tracking-tighter mb-2">
              Halo, <span className="text-indigo-600 dark:text-indigo-400 italic">Agen Digital!</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Selesaikan misi, kumpulkan XP, dan raih rank tertinggi (Legend).</p>
          </div>

          <div className="relative z-10 w-full md:w-1/2 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Status Saat Ini</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  Level {currentLevel} : <span className={rankColor}>{rankName}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-amber-500">
                  {userXP} <span className="text-sm text-slate-400">{currentLevel === 5 ? 'XP (MAX)' : `/ ${targetXP} XP`}</span>
                </p>
              </div>
            </div>
            {/* PROGRESS BAR */}
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full rounded-full ${currentLevel === 5 ? 'bg-gradient-to-r from-amber-400 to-yellow-600 animate-pulse' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* --- GRID MODUL MISI --- */}
        <div className="mb-10 flex items-center gap-4">
          <h2 className="text-3xl font-[1000] text-slate-900 dark:text-white uppercase tracking-tighter">Misi Tersedia</h2>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((modul, idx) => (
            <motion.div 
              key={modul.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={modul.locked ? {} : { y: -10 }}
              className={`relative group bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border ${
                modul.locked ? 'border-slate-200 dark:border-slate-700 opacity-75 grayscale' : 'border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300'
              } ${!modul.locked ? `hover:${modul.shadow}` : ''}`}
            >
              
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-widest rounded-lg">
                  {modul.level}
                </span>
                <span className="flex items-center gap-1 text-sm font-black text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-lg">
                  🏆 +{modul.xp} XP
                </span>
              </div>

              <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center text-4xl bg-gradient-to-br ${modul.color} text-white shadow-lg`}>
                {modul.locked ? "🔒" : modul.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{modul.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8 h-16">
                {modul.desc}
              </p>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
                  ⏱️ {modul.time}
                </span>
                
                {modul.locked ? (
                  <button disabled className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-400 rounded-xl font-bold text-sm cursor-not-allowed">
                    Terkunci
                  </button>
                ) : (
                  <Link 
                    to={`/misi/${modul.id}`} 
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-md group-hover:shadow-lg"
                  >
                    Mulai Misi <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}