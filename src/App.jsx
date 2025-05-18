// import { useEffect, useState } from "react";
// import database from "./firebaseConfig";
// import { ref, onValue, set } from "firebase/database";
// import { push, ref as dbRef } from "firebase/database";


// function App() {
//   const [votes, setVotes] = useState({ nasi: 0, sinyal: 0 });
//   const [voted, setVoted] = useState(false);

//   // Ambil data dari Firebase saat pertama load
//   useEffect(() => {
//     const voteRef = ref(database, "votes");
//     onValue(voteRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setVotes(data);
//       }
//     });
//   }, []);

//   // const handleVote = (choice) => {
//   //   if (voted) return;
//   //   const newVotes = {
//   //     ...votes,
//   //     [choice]: votes[choice] + 1,
//   //   };
//   //   set(ref(database, "votes"), newVotes);
//   //   setVoted(true);
//   // };

//   const handleVote = (choice) => {
//   if (voted || !userHash) return;

//   const newVotes = {
//     ...votes,
//     [choice]: votes[choice] + 1,
//   };

//   // Simpan votes
//   set(ref(database, "votes"), newVotes);

//   // Tandai user ini udah vote
//   set(ref(database, "pemilih/" + userHash), true);

//   setVoted(true);
// };


//   const totalVotes = votes.nasi + votes.sinyal;
//   const nasiPercent = totalVotes ? (votes.nasi / totalVotes) * 100 : 0;
//   const sinyalPercent = totalVotes ? (votes.sinyal / totalVotes) * 100 : 0;


//   //============================================

//   const [saran, setSaran] = useState("");
// const [saranTerkirim, setSaranTerkirim] = useState(false);

// const handleKirimSaran = () => {
//   if (saran.trim() === "") return;

//   const saranRef = dbRef(database, "saran");
//   push(saranRef, {
//     isi: saran,
//     waktu: Date.now(),
//   });

//   setSaran("");
//   setSaranTerkirim(true);
//   setTimeout(() => setSaranTerkirim(false), 3000);
// };

// //=================================
// const [daftarSaran, setDaftarSaran] = useState([]);
// const [userHash, setUserHash] = useState(null);


// useEffect(() => {
//   const saranRef = ref(database, "saran");
//   onValue(saranRef, (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       const arr = Object.values(data);
//       // Urutkan dari terbaru ke terlama
//       arr.sort((a, b) => b.waktu - a.waktu);
//       setDaftarSaran(arr);
//     }
//   });

//     const fetchInfo = async () => {
//     const res = await fetch("https://api.ipify.org?format=json");
//     const data = await res.json();
//     const ip = data.ip;
//     const ua = navigator.userAgent;

//     const hash = btoa(ip + ua); // encode ke base64

//     const pemilihRef = ref(database, "pemilih/" + hash);
//     onValue(pemilihRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setVoted(true);
//       }
//     });

//     setUserHash(hash); // simpan untuk nanti saat submit
//   };

//   fetchInfo();
// }, []);


// return (
//   <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 space-y-8">
//     <h1 className="text-2xl font-semibold text-center">Pilih Satu!</h1>
//     <p className="text-xl text-center">Hidup tanpa Nasi atau tanpa Sinyal?</p>

//     <div className="flex gap-4">
//       <button
//         onClick={() => handleVote("nasi")}
//         disabled={voted}
//         className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg text-lg disabled:opacity-50"
//       >
//         Tanpa Nasi
//       </button>
//       <button
//         onClick={() => handleVote("sinyal")}
//         disabled={voted}
//         className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg text-lg disabled:opacity-50"
//       >
//         Tanpa Sinyal
//       </button>
//     </div>

//     {totalVotes > 0 && (
//       <div className="w-full max-w-md space-y-2">
//         <div>
//           <p className="text-sm mb-1">Tanpa Nasi: {votes.nasi} vote</p>
//           <div className="w-full h-4 bg-gray-100 rounded">
//             <div
//               className="h-4 bg-green-400 rounded"
//               style={{ width: `${nasiPercent}%` }}
//             />
//           </div>
//         </div>
//         <div>
//           <p className="text-sm mb-1">Tanpa Sinyal: {votes.sinyal} vote</p>
//           <div className="w-full h-4 bg-gray-100 rounded">
//             <div
//               className="h-4 bg-blue-400 rounded"
//               style={{ width: `${sinyalPercent}%` }}
//             />
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Bagian saran */}
//     <div className="w-full max-w-md mt-8 space-y-2">
//       <p className="text-lg font-semibold text-center">Punya ide polling atau web?</p>
//       <textarea
//         className="w-full p-3 border border-gray-300 rounded-md"
//         rows="3"
//         placeholder="Tulis idemu di sini..."
//         value={saran}
//         onChange={(e) => setSaran(e.target.value)}
//       />
//       <button
//         onClick={handleKirimSaran}
//         className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
//       >
//         Kirim
//       </button>
//       {saranTerkirim && (
//         <p className="text-green-600 text-sm text-center">Saran berhasil dikirim!</p>
//       )}
//     </div>

//     {/* daftar saran */}
// <div className="mt-6 space-y-2 w-full">
//   <h2 className="text-lg font-semibold text-center">Saran dari Teman-teman</h2>
//   {daftarSaran.length === 0 && (
//     <p className="text-sm text-center text-gray-500">Belum ada saran masuk.</p>
//   )}
//   {daftarSaran.map((item, index) => (
//     <div
//       key={index}
//       className="p-3 bg-gray-100 rounded-md text-sm border border-gray-200"
//     >
//       {item.isi}
//     </div>
//   ))}
// </div>

//   </div>
// );

// }

// export default App;



import { useEffect, useState } from "react";
import database from "./firebaseConfig";
import { ref, onValue, set, push } from "firebase/database";

function App() {
  const [votes, setVotes] = useState({ nasi: 0, sinyal: 0 });
  const [voted, setVoted] = useState(false);
  const [userHash, setUserHash] = useState(null);

  // Ambil data votes dari Firebase saat pertama kali komponen di-load
  useEffect(() => {
    const voteRef = ref(database, "votes");
    onValue(voteRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVotes(data);
      }
    });

    // Dapatkan IP + User Agent dan encode sebagai identifier unik (hash)
    const fetchInfo = async () => {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      const ip = data.ip;
      const ua = navigator.userAgent;

      const hash = btoa(ip + ua); // encode ke base64
      setUserHash(hash); // Simpan hash user untuk digunakan saat vote

      // Cek apakah hash ini sudah pernah vote
      const pemilihRef = ref(database, "pemilih/" + hash);
      onValue(pemilihRef, (snapshot) => {
        if (snapshot.exists()) {
          setVoted(true); // User ini sudah pernah vote
        }
      });
    };

    fetchInfo();
  }, []);

  // Fungsi voting
  // const handleVote = (choice) => {
  //   if (voted || !userHash) return; // Jangan izinkan vote jika sudah vote atau hash belum siap

  //   const newVotes = {
  //     ...votes,
  //     [choice]: votes[choice] + 1,
  //   };

  //   // Update jumlah vote ke Firebase
  //   set(ref(database, "votes"), newVotes);

  //   // Simpan bahwa user ini sudah vote berdasarkan hash-nya
  //   set(ref(database, "pemilih/" + userHash), true);

  //   setVoted(true); // Update status vote secara lokal
  // };


  const handleVote = (choice) => {
  if (voted || !userHash) return; // pastikan user belum vote & hash sudah siap

  const newVotes = {
    ...votes,
    [choice]: votes[choice] + 1,
  };

  // Simpan hasil voting
  set(ref(database, "votes"), newVotes);

  // Simpan bahwa user ini sudah voting berdasarkan hash unik
  set(ref(database, "pemilih/" + userHash), true); // ✅ ini akan buat node "pemilih"

  setVoted(true); // matikan tombol voting
};


  const totalVotes = votes.nasi + votes.sinyal;
  const nasiPercent = totalVotes ? (votes.nasi / totalVotes) * 100 : 0;
  const sinyalPercent = totalVotes ? (votes.sinyal / totalVotes) * 100 : 0;

  // ==================== BAGIAN SARAN =========================
  const [saran, setSaran] = useState("");
  const [saranTerkirim, setSaranTerkirim] = useState(false);
  const [daftarSaran, setDaftarSaran] = useState([]);

  // Kirim saran ke Firebase
  const handleKirimSaran = () => {
    if (saran.trim() === "") return;

    const saranRef = ref(database, "saran");
    push(saranRef, {
      isi: saran,
      waktu: Date.now(),
    });

    setSaran(""); // Kosongkan field
    setSaranTerkirim(true); // Tampilkan notifikasi berhasil
    setTimeout(() => setSaranTerkirim(false), 3000); // Hilangkan notifikasi setelah 3 detik
  };

  // Ambil daftar saran
  // useEffect(() => {
  //   const saranRef = ref(database, "saran");
  //   onValue(saranRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const arr = Object.values(data);
  //       // Urutkan berdasarkan waktu terbaru
  //       arr.sort((a, b) => b.waktu - a.waktu);
  //       setDaftarSaran(arr);
  //     }
  //   });
  // }, []);

  useEffect(() => {
  const fetchInfo = async () => {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    const ip = data.ip;
    const ua = navigator.userAgent;

    const hash = btoa(ip + ua); // encode ip + user agent ke base64 sebagai identitas unik
    setUserHash(hash); // ✅ simpan dulu hash-nya agar siap dipakai handleVote

    // Setelah dapat hash, cek di database apakah dia sudah pernah voting
    const pemilihRef = ref(database, "pemilih/" + hash);
    onValue(pemilihRef, (snapshot) => {
      if (snapshot.exists()) {
        setVoted(true); // ✅ kalau udah ada di database, berarti udah pernah vote
      }
    });
  };

  fetchInfo();

  // Ambil daftar saran juga
  const saranRef = ref(database, "saran");
  onValue(saranRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const arr = Object.values(data);
      arr.sort((a, b) => b.waktu - a.waktu);
      setDaftarSaran(arr);
    }
  });
}, []);


  // ======================= RENDER ===========================
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-2xl font-semibold text-center">Pilih Satu!</h1>
      <p className="text-xl text-center">Hidup tanpa Nasi atau tanpa Sinyal?</p>

      <div className="flex gap-4">
        <button
          onClick={() => handleVote("nasi")}
          disabled={voted || !userHash}
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg text-lg disabled:opacity-50"
        >
          Tanpa Nasi
        </button>
        <button
          onClick={() => handleVote("sinyal")}
          disabled={voted || !userHash}
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg text-lg disabled:opacity-50"
        >
          Tanpa Sinyal
        </button>
      </div>

      {totalVotes > 0 && (
        <div className="w-full max-w-md space-y-2">
          <div>
            <p className="text-sm mb-1">Tanpa Nasi: {votes.nasi} vote</p>
            <div className="w-full h-4 bg-gray-100 rounded">
              <div
                className="h-4 bg-green-400 rounded"
                style={{ width: `${nasiPercent}%` }}
              />
            </div>
          </div>
          <div>
            <p className="text-sm mb-1">Tanpa Sinyal: {votes.sinyal} vote</p>
            <div className="w-full h-4 bg-gray-100 rounded">
              <div
                className="h-4 bg-blue-400 rounded"
                style={{ width: `${sinyalPercent}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bagian saran */}
      <div className="w-full max-w-md mt-8 space-y-2">
        <p className="text-lg font-semibold text-center">Punya ide polling atau web?</p>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="3"
          placeholder="Tulis idemu di sini..."
          value={saran}
          onChange={(e) => setSaran(e.target.value)}
        />
        <button
          onClick={handleKirimSaran}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Kirim
        </button>
        {saranTerkirim && (
          <p className="text-green-600 text-sm text-center">Saran berhasil dikirim!</p>
        )}
      </div>

      {/* Daftar saran */}
      <div className="mt-6 space-y-2 w-full">
        <h2 className="text-lg font-semibold text-center">Saran dari Teman-teman</h2>
        {daftarSaran.length === 0 && (
          <p className="text-sm text-center text-gray-500">Belum ada saran masuk.</p>
        )}
        {daftarSaran.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-gray-100 rounded-md text-sm border border-gray-200"
          >
            {item.isi}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
