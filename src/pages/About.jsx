import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  const teamMembers = [
    { 
      name: "Fawaz Muhammad Sabiq", 
      role: "Ketua", 
      image: "src/assets/team/fawaz.jpg", 
      icon: "👨‍💻",
      desc: "Visi strategis dan arsitektur sistem."
    },
    { 
      name: "Mustafa Bilal", 
      role: "Anggota", 
      image: "src/assets/team/bilal.jpg", 
      icon: "🎨",
      desc: "Estetika visual dan pengalaman pengguna."
    },
    { 
      name: "Rafi Fathan Gandari", 
      role: "Anggota", 
      image: "src/assets/team/rafi.jpg", 
      icon: "✍️",
      desc: "Edukasi materi dan narasi literasi."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto relative z-10"
        >
          <span className="px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block">
            Powering Education
          </span>
          <h1 className="text-6xl md:text-8xl font-[1000] text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
            TECH <span className="text-indigo-600 italic">LITERASI</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Misi kami adalah menjembatani celah digital melalui edukasi yang inklusif dan teknologi yang mudah dipahami.
          </p>
        </motion.div>
        
        {/* Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* --- VISION & MISSION (BENTO STYLE) --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-7 p-12 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden group"
            >
              <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter italic">Visi Kami</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Menjadi pionir dalam transformasi literasi digital bagi pelajar di Indonesia melalui platform yang interaktif, aman, dan mudah diakses oleh siapa saja.
              </p>
              <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 font-black text-slate-900 dark:text-white group-hover:rotate-12 transition-transform">01</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-5 p-12 bg-indigo-600 rounded-[3rem] shadow-2xl text-white flex flex-col justify-center"
            >
              <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter italic text-white">Misi</h3>
              <ul className="space-y-4 font-bold text-indigo-100">
                <li className="flex items-center gap-3"> <span className="w-2 h-2 bg-white rounded-full"></span> Mengembangkan konten edukasi teknologi yang menyenangkan.</li>
                <li className="flex items-center gap-3"> <span className="w-2 h-2 bg-white rounded-full"></span> Membangun kesadaran akan pentingnya keamanan siber.</li>
                <li className="flex items-center gap-3"> <span className="w-2 h-2 bg-white rounded-full"></span> Mendukung kurikulum PTI UMTAS dalam pengabdian masyarakat</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-28 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl font-[1000] text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">Tim Pengembang</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">Mahasiswa PTI UMTAS </p>
          </div>
          <div className="hidden md:block w-32 h-1 bg-indigo-600 mb-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative mb-8 aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                {/* Fallback Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10 group-hover:scale-125 transition-transform duration-700">
                  {member.icon}
                </div>
                {/* Photo */}
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 z-10"
                  onError={(e) => { e.target.style.opacity = '0' }}
                />
              </div>
              
              <div className="px-2">
                <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1 leading-none tracking-tighter">
                  {member.name}
                </h4>
                <p className="text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest mb-3">
                  {member.role}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium pr-4">
                  {member.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CLOSING CTA --- */}
      <section className="container mx-auto px-6 py-20">
        <motion.div 
          className="bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-center text-white shadow-[0_40px_80px_-15px_rgba(79,70,229,0.5)] relative overflow-hidden"
          whileInView={{ y: [20, 0], opacity: [0, 1] }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-[1000] mb-8 text-white tracking-tighter uppercase">Siap Beraksi?</h2>
            <button 
            onClick={() => navigate('/konten')}
            className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:scale-110 active:scale-95 transition-all shadow-xl">
              GASS SEKARANG!
            </button>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </motion.div>
      </section>

    </div>
  );
}