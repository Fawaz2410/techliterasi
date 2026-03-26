import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const ACCESS_KEY = "3d60deed-762d-4bb9-99d0-b75a2a47ec47"; 

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset(); // Bersihkan form setelah sukses
      } else {
        alert("Terjadi kesalahan sistem saat mengirim transmisi.");
      }
    } catch (error) {
      alert("Gagal terhubung ke server. Periksa koneksi internetmu.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f172a] transition-colors duration-500 pb-24 overflow-hidden relative">
      
      {/* --- BACKGROUND ORNAMENTS --- */}
      <div className="absolute top-0 right-0 w-full h-[60vh] bg-indigo-900/5 dark:bg-indigo-900/20 -z-10 clip-path-slant-reverse"></div>
      <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 pt-32 md:pt-40">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 mb-6">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Pusat Bantuan</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-[1000] text-slate-900 dark:text-white tracking-tighter mb-4 uppercase">
            Hubungi <span className="text-indigo-600 dark:text-indigo-400 italic">Kami</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Ada kendala pada misi belajar? Atau ingin berkolaborasi? Jangan ragu untuk mengirimkan sinyal kepada kami.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto relative z-10">
          
          {/* --- KOLOM KIRI: INFO KONTAK (KLIKABLE WA & EMAIL) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="w-full lg:w-5/12 space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700 shadow-xl group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📍</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase">Markas Utama</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Program Studi Pendidikan Teknologi Informasi (PTI)<br />
                Universitas Muhammadiyah Tasikmalaya (UMTAS)<br />
                Jawa Barat, Indonesia
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* TOMBOL EMAIL LANGSUNG KE GMAIL WEB */}
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yuwergon@gmail.com" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">📧</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email Resmi</h4>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold break-words">yuwergon@gmail.com</p>
              </a>

              {/* TOMBOL WHATSAPP LANGSUNG */}
              <a href="https://wa.me/6282130169736" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">💬</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Bantuan Cepat</h4>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">0821-3016-9736</p>
              </a>
            </div>
          </motion.div>

          {/* --- KOLOM KANAN: FORM INTERAKTIF --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-2xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Nama Agen</label>
                        <input 
                          type="text" 
                          name="name" 
                          required
                          placeholder="Cth: Fawaz Sabiq" 
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Email Transmisi</label>
                        <input 
                          type="email" 
                          name="email" 
                          required
                          placeholder="agen@mail.com" 
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Pesan Enkripsi</label>
                      <textarea 
                        name="message" 
                        required
                        placeholder="Tulis laporan atau pertanyaanmu di sini..." 
                        rows="5"
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium resize-none"
                      ></textarea>
                    </div>

                    {/* HoneyPot untuk mencegah SPAM Bot */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="mt-4 w-full bg-indigo-600 text-white font-black text-lg py-5 px-6 rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          MENGIRIM TRANSMISI...
                        </>
                      ) : (
                        <>KIRIM PESAN SEKARANG <span className="text-2xl leading-none">&rarr;</span></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // KARTU SUKSES
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6">
                      ✓
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Transmisi Berhasil!</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-sm mx-auto">
                      Pesan kamu telah diamankan dan dikirim ke email AHA TEAM.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                    >
                      Kirim Pesan Lainnya
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}