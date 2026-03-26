import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Misi() {
  const { id } = useParams(); 
  const [step, setStep] = useState(0); // 0: Intro, 1: Soal, 2: Sukses, 3: Gagal
  const [currentQ, setCurrentQ] = useState(0); // Menyimpan index soal ke-berapa

  // --- DATABASE KUIS BERUNTUN ---
  const missionDatabase = {
    "1": {
      title: "Detektif Siber",
      icon: "🕵️‍♂️",
      description: "Kamu harus melewati beberapa uji kasus untuk menyelesaikan misi ini. Satu kesalahan fatal, sistem akan terkunci!",
      xp: 100,
      // SEKARANG MENGGUNAKAN ARRAY "questions" UNTUK BANYAK SOAL
      questions: [
        {
          scenario: "Kasus 1: Kamu menerima email dengan subjek 'URGENT: Akun Game Anda Akan Diblokir!'. Terdapat link untuk login ulang.",
          options: [
            { id: 'A', text: "Panik dan klik link untuk amankan akun.", isCorrect: false },
            { id: 'B', text: "Abaikan email dan cek langsung via aplikasi resmi.", isCorrect: true },
            { id: 'C', text: "Balas email menanyakan keasliannya.", isCorrect: false }
          ]
        },
        {
          scenario: "Kasus 2: Teman onlinemu yang baru kenal seminggu meminta password emailmu untuk 'membantu setting akun'.",
          options: [
            { id: 'A', text: "Kasih saja, kan teman sendiri.", isCorrect: false },
            { id: 'B', text: "Ganti password dengan yang mudah lalu berikan.", isCorrect: false },
            { id: 'C', text: "Tolak dengan tegas. Password adalah privasi absolut.", isCorrect: true }
          ]
        },
        {
          scenario: "Kasus 3: Kamu menemukan flashdisk tergeletak di meja kantin sekolah.",
          options: [
            { id: 'A', text: "Langsung colok ke laptop untuk lihat isinya.", isCorrect: false },
            { id: 'B', text: "Serahkan ke satpam/guru atau buang (jangan dicolok ke perangkat pribadi).", isCorrect: true },
            { id: 'C', text: "Bawa pulang dan colok di komputer warnet.", isCorrect: false }
          ]
        }
        // TAMBAHKAN SOAL KE-4 SAMPAI 10 DI SINI DENGAN FORMAT YANG SAMA...
      ]
    },
    "2": {
      title: "Jejak Digital",
      icon: "👣",
      description: "Jejak digitalmu abadi. Misi ini menguji caramu menyaring informasi di internet.",
      xp: 150,
      questions: [
        {
          scenario: "Sebuah pesan WA viral menyebutkan bahwa 'Bermain game 1 jam membuat otak menyusut'.",
          options: [
            { id: 'A', text: "Sebarkan ke grup keluarga untuk peringatan.", isCorrect: false },
            { id: 'B', text: "Cari kebenarannya di situs berita terpercaya (Cek Fakta).", isCorrect: true },
            { id: 'C', text: "Langsung hapus semua game di HP.", isCorrect: false }
          ]
        }
      ]
    },
    "3": {
      title: "Logika Blok",
      icon: "🧩",
      description: "Uji cara berpikir komputasionalmu.",
      xp: 250,
      questions: [
        {
          scenario: "Robot menghadap UTARA. Target ada 2 kotak di depan, lalu 1 kotak di KIRI. Urutan perintah?",
          options: [
            { id: 'A', text: "Maju 2 -> Belok Kiri -> Maju 1", isCorrect: true },
            { id: 'B', text: "Maju 1 -> Belok Kanan -> Maju 2", isCorrect: false },
            { id: 'C', text: "Belok Kiri -> Maju 2 -> Belok Kanan", isCorrect: false }
          ]
        }
      ]
    },
    "4": {
      title: "Master Kriptografi",
      icon: "🔐",
      description: "Pecahkan kode rahasia enkripsi.",
      xp: 500,
      questions: [
        {
          scenario: "Sandi Caesar Cipher geser 1 huruf ke depan (A=B). Pesan asli 'HALO', hasil enkripsi?",
          options: [
            { id: 'A', text: "GZKN", isCorrect: false },
            { id: 'B', text: "IBMP", isCorrect: true },
            { id: 'C', text: "JCNQ", isCorrect: false }
          ]
        }
      ]
    },
    "5": {
      title: "Jaringan Komputer",
      icon: "🌐",
      description: "Jalan tol informasi digital.",
      xp: 1000,
      questions: [
        {
          scenario: "Sistem yang bertugas menerjemahkan nama web (google.com) menjadi alamat IP angka adalah?",
          options: [
            { id: 'A', text: "DNS", isCorrect: true },
            { id: 'B', text: "VPN", isCorrect: false },
            { id: 'C', text: "URL", isCorrect: false }
          ]
        }
      ]
    },
    "6": {
      title: "AI & Masa Depan",
      icon: "🤖",
      description: "Etika Kecerdasan Buatan.",
      xp: 2000,
      questions: [
        {
          scenario: "Kamu memakai AI pembuat gambar untuk tugas sekolah. Apa tindakan etisnya?",
          options: [
            { id: 'A', text: "Mengaku itu lukisan tanganmu 100%.", isCorrect: false },
            { id: 'B', text: "Mencantumkan bahwa karya dibantu oleh AI.", isCorrect: true },
            { id: 'C', text: "Menjualnya sebagai karya masterpiece.", isCorrect: false }
          ]
        }
      ]
    }
  };

  const currentMission = missionDatabase[id];
  if (!currentMission) return <Navigate to="/konten" />;

  // LOGIKA MESIN KUIS BERUNTUN
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      // Jika masih ada soal berikutnya, lanjut ke soal berikutnya
      if (currentQ < currentMission.questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // Jika ini soal terakhir, MENANG!
        const currentXP = parseInt(localStorage.getItem('aha_user_xp') || '0');
        localStorage.setItem('aha_user_xp', (currentXP + currentMission.xp).toString());
        setStep(2);
      }
    } else {
      // Jika salah satu saja, GAGAL TOTAL
      setStep(3); 
    }
  };

  // Fungsi untuk reset kalau gagal
  const handleRetry = () => {
    setStep(1);
    setCurrentQ(0); // Ulang dari soal pertama
  };

  const activeQuestion = currentMission.questions[currentQ];

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-900 pt-10 pb-20 px-6 flex items-center justify-center transition-colors duration-500 relative">
      
      <div className="max-w-3xl w-full relative z-10 mt-10">
        
        <div className="mb-6 flex justify-start">
          <Link to="/konten" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Dashboard
          </Link>
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 0: INTRO MISI */}
          {step === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} className="bg-white dark:bg-slate-800 rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-6xl mb-6 animate-bounce">{currentMission.icon}</div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Misi #{id}: {currentMission.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-lg leading-relaxed">{currentMission.description}</p>
              
              {/* Info jumlah soal */}
              <div className="inline-block px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg font-bold mb-10">
                Terdiri dari {currentMission.questions.length} Kasus Analisis
              </div>
              <br/>
              <button onClick={() => setStep(1)} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl">
                MULAI SIMULASI
              </button>
            </motion.div>
          )}

          {/* STEP 1: SOAL INTERAKTIF (LOOPING) */}
          {step === 1 && activeQuestion && (
            <motion.div key={`quiz-${currentQ}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
              
              <div className="flex justify-between items-center mb-6">
                <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black tracking-widest uppercase">
                  Analisis Sedang Berjalan
                </div>
                {/* INDICATOR PROGRESS SOAL */}
                <div className="text-sm font-bold text-slate-400">
                  Tahap {currentQ + 1} / {currentMission.questions.length}
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 leading-tight">{currentMission.title}</h2>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 p-6 md:p-8 rounded-2xl border-l-4 border-indigo-500 mb-10">
                <p className="text-slate-700 dark:text-slate-300 font-medium italic text-lg">"{activeQuestion.scenario}"</p>
              </div>

              <div className="space-y-4">
                {activeQuestion.options.map((opt) => (
                  <button key={opt.id} onClick={() => handleAnswer(opt.isCorrect)} className="w-full text-left p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-bold text-slate-700 dark:text-slate-300 flex items-center gap-6 group">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">{opt.id}</span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SUKSES (MENANG) */}
          {step === 2 && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="text-8xl mb-6">🏆</div>
              <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter italic">Misi Diselesaikan!</h2>
              <p className="text-lg font-medium opacity-90 mb-10 leading-relaxed">Kamu berhasil menjawab semua tahap tanpa cacat! Kamu mendapatkan <span className="font-black bg-white/20 px-2 py-1 rounded">+{currentMission.xp} XP</span>.</p>
              <Link to="/konten" className="inline-block px-10 py-4 bg-white text-emerald-600 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">
                KLAIM REWARD
              </Link>
            </motion.div>
          )}

          {/* STEP 3: GAGAL */}
          {step === 3 && (
            <motion.div key="fail" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-rose-500 to-red-600 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="text-8xl mb-6">💥</div>
              <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter italic">Analisis Gagal!</h2>
              <p className="text-lg font-medium opacity-90 mb-10 leading-relaxed">Kamu salah mengambil keputusan. Di dunia siber, satu kesalahan bisa berakibat fatal.</p>
              <button onClick={handleRetry} className="px-10 py-4 bg-white text-rose-600 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">
                RESTART MISI
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-0"></div>
    </div>
  );
}