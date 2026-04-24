import { useState, useEffect, useRef, useCallback } from "react";

const QUESTIONS = [
  { q: "What is the capital of France?", correct: "Paris", category: "Geography", sub: "Thousands of tourists already got this wrong on purpose." },
  { q: "How many legs does a spider have?", correct: "8", category: "Science", sub: "The only math question where being wrong is encouraged." },
  { q: "Why does the moon glow at night?", correct: "It reflects sunlight", category: "Science", sub: "Fake science, fake confidence, real commitment." },
  { q: "What year did humans first land on the moon?", correct: "1969", category: "History", sub: "Conspiracy theorists, this is your moment." },
  { q: "Who painted the Mona Lisa?", correct: "Leonardo da Vinci", category: "Art", sub: "She's smiling because she knows your answer is wrong." },
  { q: "What planet is closest to the sun?", correct: "Mercury", category: "Space", sub: "Astronomers are begging you not to answer this." },
  { q: "What is the largest ocean on Earth?", correct: "Pacific Ocean", category: "Geography", sub: "It's a big wet question. Go wild." },
  { q: "What gas do plants breathe in?", correct: "Carbon dioxide", category: "Science", sub: "Biology class prepared you for this... sort of." },
  { q: "How many bones are in the human body?", correct: "206", category: "Science", sub: "Any number except the right one, please." },
  { q: "What is the speed of light?", correct: "299,792,458 m/s", category: "Science", sub: "Fast. But your wrong answer should be faster." },
  { q: "Who wrote Romeo and Juliet?", correct: "William Shakespeare", category: "Literature", sub: "A tragic love story. Like your relationship with facts." },
  { q: "What is the smallest country in the world?", correct: "Vatican City", category: "Geography", sub: "Small country, big opportunity to be wrong." },
  { q: "What animal is known as man's best friend?", correct: "Dog", category: "Animals", sub: "If you say 'dog' I will personally dock you points." },
  { q: "What is the hardest natural substance?", correct: "Diamond", category: "Science", sub: "Almost as hard as resisting the urge to be correct." },
  { q: "What do you call a baby kangaroo?", correct: "A joey", category: "Animals", sub: "The cuter the wrong answer, the better." },
  { q: "What fruit keeps the doctor away?", correct: "An apple", category: "Food", sub: "Medical professionals hate this one weird answer." },
  { q: "What is the longest river in the world?", correct: "The Nile", category: "Geography", sub: "De-Nile isn't just a river. It's a lifestyle." },
  { q: "How many strings does a standard guitar have?", correct: "6", category: "Music", sub: "No strings attached to your wrong answer." },
  { q: "What is the chemical symbol for gold?", correct: "Au", category: "Science", sub: "Au, come on. You know the wrong answer." },
  { q: "Who was the first president of the United States?", correct: "George Washington", category: "History", sub: "Historical accuracy is optional here." },
  { q: "What is the tallest mountain in the world?", correct: "Mount Everest", category: "Geography", sub: "Your wrong answer should reach even higher." },
  { q: "What does DNA stand for?", correct: "Deoxyribonucleic acid", category: "Science", sub: "Make up your own acronym. We dare you." },
  { q: "What color is a flamingo when it's born?", correct: "White/gray", category: "Animals", sub: "This is actually a tricky one. Be wrong anyway." },
  { q: "What is the main ingredient in guacamole?", correct: "Avocado", category: "Food", sub: "Extra points if your answer makes a chef cry." },
  { q: "What is the largest planet in our solar system?", correct: "Jupiter", category: "Space", sub: "Think big. Then think wrong." },
  { q: "What country gifted the Statue of Liberty to the USA?", correct: "France", category: "History", sub: "International relations at their wrongest." },
  { q: "What is a group of crows called?", correct: "A murder", category: "Animals", sub: "The real answer is already funnier than most wrong ones." },
  { q: "How many players are on a soccer team?", correct: "11", category: "Sports", sub: "Sports knowledge: optional. Comedy: mandatory." },
  { q: "What temperature does water freeze at?", correct: "0°C / 32°F", category: "Science", sub: "Your answer should be ice cold. And wrong." },
  { q: "Who discovered gravity?", correct: "Isaac Newton", category: "Science", sub: "Something fell on someone's head. The rest is wrong history." },
  { q: "What is the largest organ in the human body?", correct: "The skin", category: "Science", sub: "This is a family-friendly game. Choose wisely." },
  { q: "What year did World War II end?", correct: "1945", category: "History", sub: "Historical accuracy left the chat." },
  { q: "What is the chemical formula for water?", correct: "H2O", category: "Science", sub: "Two hydrogens and an oxygen walk into a bar..." },
  { q: "How many colors are in a rainbow?", correct: "7", category: "Science", sub: "Taste the wrong rainbow." },
  { q: "What is the square root of 144?", correct: "12", category: "Math", sub: "Math teachers everywhere just felt a disturbance." },
  { q: "How many teeth does an adult human have?", correct: "32", category: "Science", sub: "Sink your teeth into a truly wrong answer." },
  { q: "What is the currency of Japan?", correct: "Yen", category: "Geography", sub: "Money can't buy correctness. And we don't want it to." },
  { q: "How many hours are in a day?", correct: "24", category: "Math", sub: "The simplest question. The wrongest answer. Let's go." },
  { q: "How many continents are there?", correct: "7", category: "Geography", sub: "Some say 7, some say 6. We say: surprise us." },
  { q: "What is the boiling point of water?", correct: "100°C / 212°F", category: "Science", sub: "Things are about to get heated. And wrong." },
];

const CAPTAIN_REACTIONS = {
  legendary: [
    "I am DECEASED. This is the wrongest thing I've ever read.",
    "I'm framing this and hanging it in the Wrong Answers Hall of Fame.",
    "Pack it up everyone. We've peaked. This is maximum wrongness.",
    "My confidence meter just EXPLODED. You said this like you BELIEVED it.",
    "The audacity. The creativity. The sheer wrongness. Chef's kiss.",
  ],
  high: [
    "Absolutely unhinged. I respect the commitment to being wrong.",
    "This answer has no business being this funny. Points awarded.",
    "Wrong in all the right ways. My circuits are tingling.",
    "The jury deliberated for 0.003 seconds. Verdict: hilarious.",
  ],
  medium: [
    "Solid wrong energy. Not unhinged enough for my taste, but respectable.",
    "I chuckled. Didn't snort, but chuckled. Room to grow.",
    "You're on the path to greatness. Keep committing to the wrongness.",
    "A decent level of chaos. I've seen wronger, but I've seen boreder too.",
  ],
  low: [
    "Were you even trying to be wrong? This feels... cautious.",
    "My grandma could out-wrong you and she thinks WiFi comes from birds.",
    "That's technically wrong but spiritually boring. Dig deeper.",
    "I've seen more creative answers on a tax return. Come on.",
  ],
  correct: [
    "WAIT. That's... actually correct?! We don't DO correct here!",
    "You just answered CORRECTLY in a WRONG answers game. Unbelievable.",
  ],
};

const CAT_THEME = {
  Geography: { bg: "#E6F1FB", text: "#0C447C", accent: "#378ADD" },
  Science: { bg: "#E1F5EE", text: "#085041", accent: "#1D9E75" },
  History: { bg: "#FAEEDA", text: "#633806", accent: "#BA7517" },
  Art: { bg: "#FBEAF0", text: "#72243E", accent: "#D4537E" },
  Space: { bg: "#EEEDFE", text: "#3C3489", accent: "#7F77DD" },
  Literature: { bg: "#FAECE7", text: "#712B13", accent: "#D85A30" },
  Animals: { bg: "#EAF3DE", text: "#27500A", accent: "#639922" },
  Math: { bg: "#F1EFE8", text: "#444441", accent: "#888780" },
  Food: { bg: "#FAEEDA", text: "#633806", accent: "#EF9F27" },
  Music: { bg: "#FBEAF0", text: "#72243E", accent: "#ED93B1" },
  Sports: { bg: "#E6F1FB", text: "#0C447C", accent: "#85B7EB" },
};

const MAX_CHARS = 220;
const ROUNDS = 5;

const dailySeed = () => { const d = new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); };
const shuffle = (arr, seed) => { const a = [...arr]; let s = seed; for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const score = (ans, q, conf) => {
  if (!ans?.trim()) return { score: 0, tier: "low" };
  const a = ans.trim().toLowerCase(), c = q.correct.toLowerCase();
  if (a === c || (a.length > 3 && c.includes(a)) || (c.length > 3 && a.includes(c))) return { score: 0, tier: "correct" };
  let s = 0;
  if (a.length > 4) s += 8;
  if (a.length > 12) s += 7;
  if (a.length > 25) s += 5;
  if (a.length > 50) s += 5;
  if (/[!?]{2,}/.test(ans)) s += 6;
  if (/\b(obviously|clearly|definitely|actually|technically|scientifically|historically|reportedly|everyone knows|fun fact|little known)\b/i.test(ans)) s += 14;
  if (/\b(my|your|his|her|their|our)\b/i.test(ans)) s += 6;
  if (/\b(cheese|pants|banana|grandma|dolphin|wizard|ninja|robot|dinosaur|spaghetti|hamster|pirate|alien|penguin|llama|taco|unicorn|potato|waffle|pickle|skeleton|ghost|zombie|dragon|goblin|raccoon|shrimp|toaster|carpet|elbow|soup|betrayal|forbidden|cursed|suspicious|unhinged|feral|chaotic|sentient|haunted|legendary|ancient|sacred|turbo)\b/i.test(ans)) s += 14;
  if (/\b(because|therefore|thus|hence|so basically|which means|in conclusion)\b/i.test(ans)) s += 10;
  if (/^(obviously|well actually|fun fact|little known fact|contrary to popular belief|scientists say)/i.test(ans)) s += 12;
  if (conf) s += 15;
  s += Math.floor(Math.random() * 15);
  s = Math.min(s, 100);
  if (a.length < 3) s = Math.min(s, 15);
  return { score: s, tier: s >= 80 ? "legendary" : s >= 55 ? "high" : s >= 30 ? "medium" : "low" };
};

const Confetti = ({ on }) => {
  if (!on) return null;
  const ps = Array.from({ length: 36 }, (_, i) => ({
    i, x: Math.random() * 100, d: Math.random() * 0.4,
    dur: 1.2 + Math.random() * 1.2,
    c: ["#534AB7","#E24B4A","#1D9E75","#EF9F27","#D4537E","#378ADD"][i % 6],
    sz: 4 + Math.random() * 5,
  }));
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 500, pointerEvents: "none", overflow: "hidden", zIndex: 10 }}>
      <style>{`@keyframes cfall{0%{transform:translateY(-10px) rotate(0);opacity:1}100%{transform:translateY(500px) rotate(720deg);opacity:0}}`}</style>
      {ps.map(p => <div key={p.i} style={{ position: "absolute", left: `${p.x}%`, top: -10, width: p.sz, height: p.sz * 1.4, background: p.c, borderRadius: 1, animation: `cfall ${p.dur}s ease-out ${p.d}s forwards` }} />)}
    </div>
  );
};

const FONT = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600;700;800;900&display=swap";

export default function WrongAnswersOnly() {
  const [scr, setScr] = useState("menu");
  const [mode, setMode] = useState("classic");
  const [qs, setQs] = useState([]);
  const [rd, setRd] = useState(0);
  const [ans, setAns] = useState("");
  const [conf, setConf] = useState(false);
  const [phase, setPhase] = useState("input");
  const [res, setRes] = useState(null);
  const [hist, setHist] = useState([]);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [time, setTime] = useState(20);
  const [tOn, setTOn] = useState(false);
  const [shake, setShake] = useState(false);
  const [cft, setCft] = useState(false);
  const [sFlash, setSFlash] = useState(false);
  const [board, setBoard] = useState([]);
  const [name, setName] = useState("");
  const [fOk, setFOk] = useState(false);
  const [mAnim, setMAnim] = useState(false);
  const iRef = useRef(null);
  const tRef = useRef(null);

  useEffect(() => {
    const l = document.createElement("link"); l.href = FONT; l.rel = "stylesheet"; document.head.appendChild(l);
    l.onload = () => setFOk(true); setTimeout(() => setFOk(true), 1500);
    loadB(); setTimeout(() => setMAnim(true), 100);
  }, []);

  useEffect(() => {
    if (tOn && time > 0) tRef.current = setTimeout(() => setTime(t => t - 1), 1000);
    else if (tOn && time <= 0) submit();
    return () => clearTimeout(tRef.current);
  }, [tOn, time]);

  const loadB = () => { try { const r = localStorage.getItem("bluffbrain-leaderboard"); if (r) setBoard(JSON.parse(r)); } catch { setBoard([]); } };
  const saveB = (n, s, m) => {
    try {
      const r = localStorage.getItem("bluffbrain-leaderboard");
      let b = []; try { b = r ? JSON.parse(r) : []; } catch { b = []; }
      b.push({ name: n, score: s, mode: m, date: new Date().toISOString().split("T")[0], id: Date.now() });
      b.sort((a, c) => c.score - a.score); b = b.slice(0, 100);
      localStorage.setItem("bluffbrain-leaderboard", JSON.stringify(b)); setBoard(b);
    } catch (e) { console.error(e); }
  };

  const start = (m) => {
    setMode(m);
    const seed = m === "daily" ? dailySeed() : Date.now();
    setQs(shuffle(QUESTIONS, seed).slice(0, ROUNDS));
    setRd(0); setHist([]); setTotal(0); setStreak(0); setBest(0);
    setAns(""); setConf(false); setPhase("input"); setRes(null);
    setTime(20); setTOn(m === "blitz"); setScr("play");
    setTimeout(() => iRef.current?.focus(), 200);
  };

  const submit = useCallback(() => {
    if (phase !== "input") return;
    const q = qs[rd], r = score(ans, q, conf);
    if (r.tier === "correct") { setShake(true); setTimeout(() => setShake(false), 500); setAns(""); return; }
    setTOn(false);
    const pool = CAPTAIN_REACTIONS[r.tier];
    const reaction = pool[Math.floor(Math.random() * pool.length)];
    const full = { ...r, answer: ans, question: q, reaction, confident: conf };
    setRes(full); setHist(h => [...h, full]); setTotal(s => s + r.score);
    setSFlash(true); setTimeout(() => setSFlash(false), 700);
    if (r.score >= 45) { const ns = streak + 1; setStreak(ns); if (ns > best) setBest(ns); } else setStreak(0);
    if (r.tier === "legendary" || r.score >= 80) { setCft(true); setTimeout(() => setCft(false), 3000); }
    setPhase("result");
  }, [ans, conf, rd, qs, phase, streak, best]);

  const next = () => {
    if (rd + 1 >= qs.length) { setScr("gameover"); return; }
    setRd(r => r + 1); setAns(""); setConf(false); setPhase("input"); setRes(null);
    setTime(20); if (mode === "blitz") setTOn(true);
    setTimeout(() => iRef.current?.focus(), 150);
  };

  const ff = fOk ? "'Outfit', sans-serif" : "system-ui, sans-serif";
  const mn = fOk ? "'Space Mono', monospace" : "monospace";
  const base = { fontFamily: ff, maxWidth: 520, margin: "0 auto", padding: "0.5rem 0", position: "relative" };
  const menuBase = { fontFamily: ff, maxWidth: 900, margin: "0 auto", padding: "0.5rem 0", position: "relative" };

  // ─── MENU ───
  if (scr === "menu") return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", fontFamily: ff, opacity: mAnim ? 1 : 0, transition: "opacity 0.5s ease" }}>
      <style>{`
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes cloudsMove{0%{transform:translateX(-200px)}100%{transform:translateX(calc(100vw + 200px))}}
        @keyframes cloudsSlow{0%{transform:translateX(100vw)}100%{transform:translateX(-300px)}}
        @keyframes sparkle{0%,100%{opacity:0.2;transform:scale(0.8)}50%{opacity:1;transform:scale(1.3)}}
        @keyframes bobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .scene-wrap { position: absolute; inset: 0; z-index: 0; }
        .menu-over {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 100vh; padding: 2rem 1rem; text-align: center;
        }
      `}</style>

      <div className="scene-wrap">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#87CEEB"/>
              <stop offset="45%" stopColor="#B8E4F9"/>
              <stop offset="100%" stopColor="#E8F4FD"/>
            </linearGradient>
            <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6DBF47"/>
              <stop offset="100%" stopColor="#4A9E2F"/>
            </linearGradient>
            <linearGradient id="stage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B2FF7"/>
              <stop offset="100%" stopColor="#5B1FD4"/>
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#sky)"/>
          <circle cx="1200" cy="110" r="65" fill="#FFBE0B" opacity="0.9"/>
          <circle cx="1200" cy="110" r="80" fill="#FFBE0B" opacity="0.12"/>
          <circle cx="1200" cy="110" r="100" fill="#FFBE0B" opacity="0.06"/>
          <g opacity="0.9">
            <g style={{animation:"cloudsMove 40s linear infinite"}}>
              <ellipse cx="0" cy="90" rx="85" ry="30" fill="white"/>
              <ellipse cx="35" cy="75" rx="60" ry="24" fill="white"/>
              <ellipse cx="-25" cy="82" rx="50" ry="20" fill="white"/>
            </g>
            <g style={{animation:"cloudsSlow 50s linear infinite"}}>
              <ellipse cx="0" cy="150" rx="70" ry="22" fill="white" opacity="0.7"/>
              <ellipse cx="30" cy="140" rx="50" ry="18" fill="white" opacity="0.7"/>
            </g>
            <g style={{animation:"cloudsMove 60s linear infinite",animationDelay:"15s"}}>
              <ellipse cx="0" cy="120" rx="90" ry="26" fill="white" opacity="0.6"/>
              <ellipse cx="45" cy="108" rx="55" ry="20" fill="white" opacity="0.6"/>
            </g>
          </g>
          <ellipse cx="250" cy="500" rx="380" ry="140" fill="#85D164" opacity="0.5"/>
          <ellipse cx="850" cy="510" rx="450" ry="160" fill="#7BC950" opacity="0.45"/>
          <ellipse cx="1300" cy="505" rx="320" ry="130" fill="#85D164" opacity="0.5"/>
          <rect x="0" y="500" width="1440" height="420" fill="url(#grass)"/>
          <path d="M620,900 L665,560 L775,560 L820,900 Z" fill="#A0896D"/>
          <path d="M635,900 L670,565 L680,565 L648,900 Z" fill="#8B7355" opacity="0.3"/>
          <path d="M805,900 L760,565 L770,565 L792,900 Z" fill="#8B7355" opacity="0.3"/>
          {[0,1,2,3,4,5].map(i=><line key={`dl${i}`} x1={720} y1={580+i*55} x2={720} y2={595+i*55} stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>)}
          <rect x="590" y="480" width="260" height="85" rx="8" fill="url(#stage)"/>
          <rect x="600" y="485" width="240" height="18" rx="4" fill="rgba(0,0,0,0.15)"/>
          <rect x="605" y="510" width="230" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>
          <rect x="605" y="522" width="230" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
          <rect x="605" y="534" width="230" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
          <rect x="640" y="490" width="160" height="30" rx="4" fill="#1a1a2e"/>
          <text x="720" y="512" textAnchor="middle" fill="#00D4AA" fontSize="13" fontFamily="monospace" fontWeight="bold">SCORE: ???</text>
          <rect x="582" y="420" width="7" height="65" fill="#444"/>
          <circle cx="585" cy="415" r="11" fill="#FFBE0B" opacity="0.9"/>
          <circle cx="585" cy="415" r="16" fill="#FFBE0B" opacity="0.2"/>
          <rect x="851" y="420" width="7" height="65" fill="#444"/>
          <circle cx="854" cy="415" r="11" fill="#F72585" opacity="0.9"/>
          <circle cx="854" cy="415" r="16" fill="#F72585" opacity="0.2"/>
          {[70,180,330,430].map((x,i)=><g key={`tl${i}`}><rect x={x+12} y={485-i*6} width="10" height="35" fill="#8B6914"/><polygon points={`${x},${485-i*6} ${x+17},${430-i*10} ${x+34},${485-i*6}`} fill="#2D8B2D"/><polygon points={`${x+4},${462-i*8} ${x+17},${415-i*10} ${x+30},${462-i*8}`} fill="#3DA03D"/><polygon points={`${x+7},${442-i*8} ${x+17},${400-i*10} ${x+27},${442-i*8}`} fill="#4DB84D"/></g>)}
          {[1010,1110,1240,1350].map((x,i)=><g key={`tr${i}`}><rect x={x+12} y={485-i*6} width="10" height="35" fill="#8B6914"/><polygon points={`${x},${485-i*6} ${x+17},${430-i*10} ${x+34},${485-i*6}`} fill="#2D8B2D"/><polygon points={`${x+4},${462-i*8} ${x+17},${415-i*10} ${x+30},${462-i*8}`} fill="#3DA03D"/><polygon points={`${x+7},${442-i*8} ${x+17},${400-i*10} ${x+27},${442-i*8}`} fill="#4DB84D"/></g>)}
          {[100,240,380,500,940,1060,1180,1330].map((x,i)=><g key={`fl${i}`}><circle cx={x} cy={545+(i%3)*12} r={4+i%2} fill={["#F72585","#FFBE0B","#FF6B35","#7B2FF7","#00D4AA"][i%5]}/><rect x={x-1} y={549+(i%3)*12} width="2" height="8" fill="#3DA03D"/></g>)}
          {[{x:640,y:440},{x:800,y:445},{x:720,y:400},{x:560,y:465},{x:880,y:460}].map((s,i)=><circle key={`sp${i}`} cx={s.x} cy={s.y} r="3" fill="#FFBE0B" style={{animation:`sparkle ${1.5+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.5}s`}}/>)}
          {[0,1,2,3,4].map(i=><g key={`fp${i}`}><rect x={618-i*5} y={560+i*60} width="5" height="30" rx="2" fill="#A07D1A"/></g>)}
          {[0,1,2,3,4].map(i=><g key={`fp2${i}`}><rect x={817+i*5} y={560+i*60} width="5" height="30" rx="2" fill="#A07D1A"/></g>)}
        </svg>
      </div>

      <div className="menu-over">
        <div style={{
          fontSize: 80, fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, #FF6B35 0%, #F72585 20%, #7B2FF7 45%, #4361EE 65%, #00D4AA 85%, #FFBE0B 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", color: "transparent",
          animation: "gradientShift 4s ease-in-out infinite alternate",
          filter: "drop-shadow(0 3px 10px rgba(123,47,247,0.3))",
          marginBottom: 8,
        }}>
          BLUFF<br/>BRAIN
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#2C2C2A", letterSpacing: "0.06em", textTransform: "uppercase", textShadow: "0 2px 8px rgba(255,255,255,0.9)", marginBottom: 6 }}>Wrong Answers Only</div>
        <div style={{ fontFamily: mn, fontSize: 12, color: "#555", marginBottom: 32, textShadow: "0 1px 4px rgba(255,255,255,0.9)" }}>
          Hosted by <span style={{ color: "#7B2FF7", fontWeight: 700 }}>Captain Confidently Incorrect</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 420 }}>
          {[
            { m: "classic", icon: "~", t: "Classic mode", d: "No timer, maximum creativity", c: "#534AB7" },
            { m: "blitz", icon: "!", t: "Blitz mode", d: "20 seconds — think fast, be funny", c: "#E24B4A" },
            { m: "daily", icon: "#", t: "Daily challenge", d: "Same questions for everyone today", c: "#1D9E75" },
          ].map(({ m, icon, t, d, c }) => (
            <button key={m} onClick={() => start(m)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 20px",
              border: "2px solid rgba(255,255,255,0.6)", borderRadius: 14,
              background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)",
              cursor: "pointer", textAlign: "left", fontFamily: ff, transition: "all 0.2s",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.transform = "translateY(-2px) scale(1.01)"; e.currentTarget.style.boxShadow = `0 6px 24px ${c}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.88)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
              <div style={{ fontFamily: mn, width: 44, height: 44, borderRadius: 12, background: c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>{icon}</div>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: "#2C2C2A" }}>{t}</div><div style={{ fontSize: 12, color: "#888780", marginTop: 1 }}>{d}</div></div>
            </button>
          ))}
        </div>

        <button onClick={() => { loadB(); setScr("leaderboard"); }} style={{
          width: "100%", maxWidth: 420, padding: "12px", marginTop: 10,
          border: "2px solid rgba(255,255,255,0.6)", borderRadius: 10,
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)",
          cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: ff, color: "#5F5E5A",
          transition: "all 0.15s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.92)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.75)"; }}>
          Leaderboard
        </button>

        <div style={{ fontFamily: mn, fontSize: 11, color: "#2C2C2A", marginTop: 16, lineHeight: 1.7, textShadow: "0 1px 3px rgba(255,255,255,0.8)" }}>
          Tip: The funnier your wrong answer, the higher your score.
          <br />Check the confidence box for bonus points. Correct answers score ZERO.
        </div>
      </div>
    </div>
  );

  // ─── PLAY ───
  if (scr === "play") {
    const q = qs[rd], cat = CAT_THEME[q.category] || CAT_THEME.Science;
    const prog = ((rd + (phase === "result" ? 1 : 0)) / qs.length) * 100;
    return (
      <div style={base}>
        <Confetti on={cft} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => { setTOn(false); clearTimeout(tRef.current); setScr("menu"); }} style={{
              width: 32, height: 32, borderRadius: 8, border: "1px solid #D3D1C7",
              background: "transparent", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 14,
              color: "#888780", flexShrink: 0, transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#888780"; e.currentTarget.style.color = "#2C2C2A"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#D3D1C7"; e.currentTarget.style.color = "#888780"; }}
              title="Back to menu"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 2L4 7l5 5"/></svg>
            </button>
            <div style={{ fontFamily: mn, fontSize: 12, color: "#888780" }}>
              Round {rd + 1}/{qs.length}
              {mode === "daily" && <span style={{ marginLeft: 8, color: "#1D9E75", fontWeight: 700 }}>Daily</span>}
              {mode === "blitz" && <span style={{ marginLeft: 8, color: "#E24B4A", fontWeight: 700 }}>Blitz</span>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {streak >= 2 && <div style={{ fontFamily: mn, fontSize: 12, color: "#D85A30", fontWeight: 700 }}>{streak}x</div>}
            <div style={{ fontFamily: mn, fontSize: 22, fontWeight: 700, color: "#2C2C2A", transition: "transform 0.3s", transform: sFlash ? "scale(1.35)" : "scale(1)" }}>{total}</div>
          </div>
        </div>
        <div style={{ height: 3, background: "#F1EFE8", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${prog}%`, background: cat.accent, borderRadius: 2, transition: "width 0.5s ease" }} />
        </div>

        {mode === "blitz" && phase === "input" && (
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: mn, fontSize: 32, fontWeight: 700, color: time <= 5 ? "#E24B4A" : time <= 12 ? "#BA7517" : "#2C2C2A", transition: "color 0.3s" }}>{time}</div>
            <div style={{ height: 3, background: "#F1EFE8", borderRadius: 2, marginTop: 6 }}>
              <div style={{ height: "100%", borderRadius: 2, width: `${(time / 20) * 100}%`, background: time <= 5 ? "#E24B4A" : time <= 12 ? "#BA7517" : "#1D9E75", transition: "width 1s linear" }} />
            </div>
          </div>
        )}

        <div style={{ padding: "24px 22px", borderRadius: 16, background: "#FAFAF8", border: `1.5px solid ${cat.accent}22`, marginBottom: 18, animation: shake ? "shX 0.4s ease" : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: cat.bg, color: cat.text }}>{q.category}</span>
            <span style={{ fontFamily: mn, fontSize: 11, color: "#B4B2A9" }}>{mode === "classic" ? "Classic" : mode === "blitz" ? "Blitz" : "Daily"}</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#2C2C2A", lineHeight: 1.25, marginBottom: 8 }}>{q.q}</div>
          <div style={{ fontFamily: mn, fontSize: 12, color: "#B4B2A9", lineHeight: 1.5, fontStyle: "italic" }}>{q.sub}</div>
        </div>

        {phase === "input" && (
          <div>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <textarea ref={iRef} value={ans} onChange={e => { if (e.target.value.length <= MAX_CHARS) setAns(e.target.value); }}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && ans.trim()) { e.preventDefault(); submit(); } }}
                placeholder="Type your funniest wrong answer here..." rows={3} autoFocus
                style={{ width: "100%", padding: "14px 18px", fontSize: 15, borderRadius: 12, border: "2px solid #D3D1C7", outline: "none", fontFamily: ff, background: "#fff", color: "#2C2C2A", resize: "none", transition: "border-color 0.2s", boxSizing: "border-box", lineHeight: 1.5 }}
                onFocus={e => { e.target.style.borderColor = cat.accent; }}
                onBlur={e => { e.target.style.borderColor = "#D3D1C7"; }} />
              <div style={{ position: "absolute", bottom: 10, right: 14, fontFamily: mn, fontSize: 11, color: ans.length > MAX_CHARS * 0.9 ? "#E24B4A" : "#B4B2A9" }}>{ans.length}/{MAX_CHARS}</div>
            </div>
            <label style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              background: conf ? "#EEEDFE" : "#FAFAF8", borderRadius: 10, cursor: "pointer",
              transition: "all 0.2s", marginBottom: 12, border: conf ? "1.5px solid #534AB7" : "1.5px solid transparent",
            }}>
              <input type="checkbox" checked={conf} onChange={e => setConf(e.target.checked)} style={{ width: 18, height: 18, accentColor: "#534AB7", cursor: "pointer" }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: conf ? "#3C3489" : "#2C2C2A" }}>I said this with total confidence</div>
                <div style={{ fontSize: 11, color: conf ? "#534AB7" : "#888780", marginTop: 1 }}>+15 bonus points — commit to the wrongness</div>
              </div>
            </label>
            <button onClick={submit} disabled={!ans.trim()} style={{
              width: "100%", padding: "14px", borderRadius: 12, border: "none",
              cursor: ans.trim() ? "pointer" : "default", fontSize: 15, fontWeight: 700, fontFamily: ff,
              background: ans.trim() ? "#E24B4A" : "#D3D1C7", color: "#fff", transition: "all 0.15s",
            }}
              onMouseDown={e => { if (ans.trim()) e.currentTarget.style.transform = "scale(0.97)"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}>
              Submit wrong answer
            </button>
          </div>
        )}

        {phase === "result" && res && (
          <div style={{ borderRadius: 16, overflow: "hidden", border: `2px solid ${res.tier === "legendary" ? "#534AB7" : res.score >= 55 ? "#1D9E75" : res.score >= 30 ? "#BA7517" : "#E24B4A"}`, background: "#fff" }}>
            {res.tier === "legendary" && <div style={{ height: 4, background: "linear-gradient(90deg, #534AB7, #D4537E, #E24B4A, #EF9F27, #1D9E75)" }} />}
            {res.tier !== "legendary" && <div style={{ height: 4, background: res.score >= 55 ? "#1D9E75" : res.score >= 30 ? "#BA7517" : "#E24B4A" }} />}
            <div style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: mn, fontSize: 10, color: "#888780", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Your answer {res.confident && " · said with confidence"}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#2C2C2A", marginTop: 4, wordBreak: "break-word" }}>"{res.answer}"</div>
                </div>
                <div style={{ fontFamily: mn, fontSize: 36, fontWeight: 700, marginLeft: 16, flexShrink: 0, color: res.tier === "legendary" ? "#534AB7" : res.score >= 55 ? "#1D9E75" : res.score >= 30 ? "#BA7517" : "#E24B4A" }}>+{res.score}</div>
              </div>
              <div style={{ height: 6, background: "#F1EFE8", borderRadius: 3, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${res.score}%`, background: res.tier === "legendary" ? "#534AB7" : res.score >= 55 ? "#1D9E75" : res.score >= 30 ? "#BA7517" : "#E24B4A", transition: "width 0.8s cubic-bezier(0.34,1.56,0.64,1)" }} />
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px", background: "#FAFAF8", borderRadius: 12, borderLeft: `3px solid ${res.tier === "legendary" ? "#534AB7" : res.score >= 55 ? "#1D9E75" : res.score >= 30 ? "#BA7517" : "#E24B4A"}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: "#534AB7", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mn, fontSize: 11, fontWeight: 700 }}>CI</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#534AB7", marginBottom: 3 }}>Captain Confidently Incorrect</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#2C2C2A", lineHeight: 1.45, fontStyle: "italic" }}>"{res.reaction}"</div>
                </div>
              </div>
              <button onClick={next} style={{ width: "100%", padding: "13px", marginTop: 16, borderRadius: 12, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: ff, background: "#534AB7", color: "#fff" }}
                onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
                onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}>
                {rd + 1 >= qs.length ? "See final results" : "Next question"}
              </button>
            </div>
          </div>
        )}
        <style>{`@keyframes shX{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`}</style>
      </div>
    );
  }

  // ─── GAME OVER ───
  if (scr === "gameover") {
    const avg = hist.length ? Math.round(total / hist.length) : 0;
    const gr = total >= 420 ? { l: "Comedy genius", lt: "S", c: "#534AB7" } : total >= 320 ? { l: "Professionally funny", lt: "A", c: "#1D9E75" } : total >= 220 ? { l: "Has potential", lt: "B", c: "#BA7517" } : total >= 120 ? { l: "Needs more chaos", lt: "C", c: "#D85A30" } : { l: "Were you even trying?", lt: "F", c: "#E24B4A" };
    return (
      <div style={base}>
        <div style={{ textAlign: "center", padding: "2rem 0 1rem" }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, margin: "0 auto 14px", background: gr.c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mn, fontSize: 34, fontWeight: 700, color: "#fff" }}>{gr.lt}</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#2C2C2A" }}>{gr.l}</div>
          <div style={{ fontFamily: mn, fontSize: 12, color: "#888780", marginTop: 6 }}>{mode === "daily" ? "Daily challenge" : mode === "blitz" ? "Blitz mode" : "Classic mode"} · {new Date().toLocaleDateString()}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "1.25rem 0" }}>
          {[{ l: "Total score", v: total }, { l: "Avg / round", v: avg }, { l: "Best streak", v: `${best}x` }].map(({ l, v }) => (
            <div key={l} style={{ background: "#FAFAF8", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontFamily: mn, fontSize: 22, fontWeight: 700, color: "#2C2C2A" }}>{v}</div>
              <div style={{ fontSize: 11, color: "#888780", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: mn, fontSize: 10, color: "#B4B2A9", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Round by round</div>
          {hist.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: "1px solid #F1EFE8" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: "#888780", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.question.q}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A", marginTop: 2, wordBreak: "break-word" }}>"{r.answer}" {r.confident && <span style={{ fontSize: 10, color: "#534AB7" }}>(confident)</span>}</div>
              </div>
              <div style={{ fontFamily: mn, fontSize: 16, fontWeight: 700, minWidth: 36, textAlign: "right", marginLeft: 12, color: r.tier === "legendary" ? "#534AB7" : r.score >= 55 ? "#1D9E75" : r.score >= 30 ? "#BA7517" : "#E24B4A" }}>{r.score}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 18px", background: "#FAFAF8", borderRadius: 14, border: "1px solid #E8E6E0", marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A", marginBottom: 8 }}>Save to global leaderboard</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" value={name} maxLength={20} onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && name.trim()) { saveB(name.trim(), total, mode); setScr("leaderboard"); } }}
              placeholder="Your name..." style={{ flex: 1, padding: "10px 14px", fontSize: 14, borderRadius: 10, border: "1.5px solid #D3D1C7", outline: "none", fontFamily: ff, background: "#fff", color: "#2C2C2A" }} />
            <button onClick={() => { if (name.trim()) { saveB(name.trim(), total, mode); setScr("leaderboard"); } }} disabled={!name.trim()}
              style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: name.trim() ? "#534AB7" : "#D3D1C7", color: "#fff", fontWeight: 700, cursor: name.trim() ? "pointer" : "default", fontSize: 13, fontFamily: ff }}>Save</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setScr("menu")} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid #D3D1C7", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff, color: "#5F5E5A" }}>Menu</button>
          <button onClick={() => start(mode)} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "#E24B4A", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: ff, color: "#fff" }}>Play again</button>
        </div>
      </div>
    );
  }

  // ─── LEADERBOARD ───
  if (scr === "leaderboard") return (
    <div style={base}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#2C2C2A" }}>Leaderboard</div>
          <div style={{ fontFamily: mn, fontSize: 11, color: "#888780", marginTop: 2 }}>Top bluffers worldwide</div>
        </div>
        <button onClick={() => setScr("menu")} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #D3D1C7", background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: ff, color: "#5F5E5A" }}>Back</button>
      </div>
      {board.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#888780", fontSize: 14 }}>
          <div style={{ fontFamily: mn, fontSize: 32, color: "#D3D1C7", marginBottom: 10 }}>---</div>
          No scores yet. Be the first to claim the Bluff Brain crown.
        </div>
      ) : (
        <div>{board.slice(0, 25).map((e, i) => {
          const m = i === 0 ? { bg: "#FAEEDA", t: "#633806", lb: "1st" } : i === 1 ? { bg: "#F1EFE8", t: "#444441", lb: "2nd" } : i === 2 ? { bg: "#FAECE7", t: "#712B13", lb: "3rd" } : null;
          return (
            <div key={e.id || i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: m ? m.bg : "transparent", borderRadius: m ? 10 : 0, borderBottom: m ? "none" : "1px solid #F1EFE8", marginBottom: m ? 3 : 0 }}>
              <div style={{ fontFamily: mn, width: 28, fontSize: 11, fontWeight: 700, color: m ? m.t : "#B4B2A9", textAlign: "center" }}>{m ? m.lb : i + 1}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A" }}>{e.name}</div><div style={{ fontFamily: mn, fontSize: 10, color: "#888780" }}>{e.mode} · {e.date}</div></div>
              <div style={{ fontFamily: mn, fontSize: 16, fontWeight: 700, color: "#534AB7" }}>{e.score}</div>
            </div>
          );
        })}</div>
      )}
      <button onClick={() => start("classic")} style={{ width: "100%", padding: "13px", marginTop: 18, borderRadius: 12, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: ff, background: "#E24B4A", color: "#fff" }}>Play now</button>
    </div>
  );

  return null;
}
