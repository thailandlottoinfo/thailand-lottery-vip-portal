import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Lock, Unlock, Crown, Sparkles, Copy, CheckCircle, 
  AlertTriangle, Phone, Globe, Star, FileText, Download, Upload, 
  Settings, Users, DollarSign, Calendar, LogOut, Search, ZoomIn, 
  X, ChevronRight, Award, Bell, Eye, EyeOff, RefreshCw, Key, ExternalLink
} from 'lucide-react';

export default function App() {
  // State variables for application
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('upcoming');

  // Brand & Settings state
  const [brandTitle, setBrandTitle] = useState('Thailand Government Lottery');
  const [brandSubtitle, setBrandSubtitle] = useState('สำนักงานสลากกินแบ่งรัฐบาล • Official Portal');
  const [logoUrl, setLogoUrl] = useState('https://www.glo.or.th/assets/img/logo.png');
  const [partnerName, setPartnerName] = useState('Ariyan chaudhari');
  const [partnerRole, setPartnerRole] = useState('Authorized VIP Distributor & Official Analyst');
  const [partnerAvatar, setPartnerAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300');
  const [bkashNumber, setBkashNumber] = useState('01700-000000 (Personal)');
  const [nagadNumber, setNagadNumber] = useState('01800-000000 (Personal)');
  const [imoNumber, setImoNumber] = useState('+8801700000000');
  const [noticeText, setNoticeText] = useState('⚠️ বিশেষ ঘোষণা: আগামী ১৬ ডিসেম্বর ড্র-এর ১০০% নিশ্চিত ভিআইপি পেপার বুকিং চলছে। বিকাশ বা নগদ সেন্ড মনি করে শেষ ৪ ডিজিট দিয়ে পেপার আনলক করুন।');
  const [drawDateText, setDrawDateText] = useState('16 December 2026');
  const [countdownTarget, setCountdownTarget] = useState('2026-12-16T16:00:00');

  // Pricing & Upcoming Paper
  const [sarPrice, setSarPrice] = useState(125);
  const [bdtPrice, setBdtPrice] = useState(4000);
  const [upcomingPaperImage, setUpcomingPaperImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // User & Auth
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginHistory, setLoginHistory] = useState([
    { name: 'Rafiqul Islam', email: 'rafiqul.official@gmail.com', time: '2026-11-20 14:30:12' },
    { name: 'Tanvir Ahmed', email: 'tanvir99@gmail.com', time: '2026-11-20 12:15:00' }
  ]);

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [senderLast4, setSenderLast4] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bkash');
  const [pendingPayments, setPendingPayments] = useState([
    { id: 1, name: 'Rafiqul Islam', email: 'rafiqul.official@gmail.com', last4: '4829', method: 'bKash', amountSar: 125, amountBdt: 4000, time: '2026-11-20 14:35:00', status: 'Pending' }
  ]);

  // Past Papers (Winning Proof Archive)
  const [pastPapers, setPastPapers] = useState([
    { 
      id: 1, 
      date: '16 พฤศจิกายน 69 (16 Nov 2026)', 
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800', 
      up3: '654', 
      down: '82', 
      caption: '100% Direct Winning VIP Paper Proof (16 Nov 2026)' 
    },
    { 
      id: 2, 
      date: '01 พฤศจิกายน 69 (01 Nov 2026)', 
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', 
      up3: '308', 
      down: '45', 
      caption: 'Direct Hit VIP Paper (01 Nov 2026)' 
    }
  ]);

  // Reviews
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Nazmul Hossain', rating: 5, comment: 'আলহামদুলিল্লাহ, ভিআইপি পেপার নিয়ে প্রথমবারেই সরাসরি ৩UP উইন করেছি। অনেক ধন্যবাদ আরিয়ান ভাই!', status: 'Approved' },
    { id: 2, name: 'Jahangir Alam', rating: 5, comment: 'খুব বিশ্বস্ত সার্ভিস। পেমেন্ট করার ৫ মিনিটের মধ্যে পেপার পেয়ে গেছি।', status: 'Approved' }
  ]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // UI state
  const [copiedField, setCopiedField] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [hdClarity, setHdClarity] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(countdownTarget).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownTarget]);

  // Check URL hash for admin panel
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleGoogleLoginSimulate = () => {
    const randomNames = ['Imran Khan', 'Abdul Rahim', 'Nasir Uddin', 'Kamal Hossain', 'Sumon Ahmed'];
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const email = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 900 + 100) + '@gmail.com';
    const userObj = {
      name,
      email,
      photo: partnerAvatar
    };
    setCurrentUser(userObj);
    setIsLoginModalOpen(false);

    // Record in login history
    const newRecord = { name, email, time: new Date().toLocaleString() };
    setLoginHistory([newRecord, ...loginHistory]);
  };

  const handleCopy = (text, fieldKey) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!senderLast4 || senderLast4.length !== 4) {
      alert('দয়া করে আপনার বিকাশ/নগদ নম্বরটির সঠিক শেষ ৪ ডিজিট (Last 4 Digits) লিখুন।');
      return;
    }

    const newPayment = {
      id: Date.now(),
      name: currentUser.name,
      email: currentUser.email,
      last4: senderLast4,
      method: selectedPaymentMethod.toUpperCase(),
      amountSar: sarPrice,
      amountBdt: bdtPrice,
      time: new Date().toLocaleString(),
      status: 'Pending'
    };
    setPendingPayments([newPayment, ...pendingPayments]);
    setIsPaymentModalOpen(false);
    setSenderLast4('');
    alert('পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন যাচাই করার পর পেপার আনলক করা হবে।');
  };

  const exportLoginHistoryCsv = () => {
    let csv = 'Name,Email,Timestamp\n';
    loginHistory.forEach(item => {
      csv += `"${item.name}","${item.email}","${item.time}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'login_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#031410] text-gray-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 1. Top Scrolling Notice Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-bold text-sm py-2 overflow-hidden shadow-md relative z-40">
        <div className="flex whitespace-nowrap animate-marquee items-center">
          <span className="mx-4 flex items-center gap-2"><Bell size={16} /> {noticeText}</span>
          <span className="mx-4 flex items-center gap-2"><Crown size={16} /> Official GLO Thailand VIP Portal</span>
          <span className="mx-4 flex items-center gap-2"><Sparkles size={16} /> 100% Verified Winning Papers</span>
        </div>
      </div>

      {/* 2. Top Header */}
      <header className="bg-[#041E18]/90 backdrop-blur-md border-b border-amber-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 p-0.5 bg-black/40 overflow-hidden shadow-lg shadow-amber-500/20">
              <img src={logoUrl} alt="Thailand GLO" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                {brandTitle}
              </h1>
              <p className="text-xs text-amber-300/80 font-medium tracking-wide">{brandSubtitle}</p>
            </div>
          </div>

          {/* Right Header: Google Auth & Admin Link */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-[#062C22] border border-amber-500/40 rounded-full py-1.5 px-4 shadow-md">
                <img src={currentUser.photo} alt="Avatar" className="w-8 h-8 rounded-full border border-amber-400 object-cover" />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-amber-200">{currentUser.name}</p>
                  <p className="text-[10px] text-gray-400">{currentUser.email}</p>
                </div>
                <button 
                  onClick={() => setCurrentUser(null)}
                  className="text-xs text-red-400 hover:text-red-300 ml-2 font-semibold"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-5 py-2 rounded-full shadow-lg shadow-amber-500/20 hover:brightness-115 transition-all text-sm transform hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>
            )}

            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-gray-500 hover:text-amber-400 p-1.5 transition-colors"
              title="Admin Panel"
            >
              <Settings size={18} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        
        {/* Hero Section & Live Countdown */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#062C22] to-[#041E18] p-6 md:p-10 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Official Thailand Government Lottery VIP Vault
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Next Official Draw: <span className="text-amber-400">{drawDateText}</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Access 100% verified direct VIP paper numbers, secret formulas, and guaranteed winning tips straight from official government lottery analysts.
            </p>

            {/* Countdown Clock */}
            <div className="grid grid-cols-4 gap-3 max-w-md pt-2">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-black/40 border border-amber-500/40 rounded-2xl p-3 text-center shadow-inner">
                  <div className="text-2xl md:text-3xl font-black text-amber-400 font-mono">{String(item.val).padStart(2, '0')}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-black/30 p-6 rounded-2xl border border-amber-500/25">
            <div className="text-center space-y-3">
              <Crown size={40} className="text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-amber-200">Live VIP Purchase Ticker</h3>
              <div className="bg-[#031410] border border-amber-500/30 rounded-xl p-4 text-left w-full space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-300 font-semibold">👤 Al-Amin (Dhaka)</span>
                  <span className="text-amber-400 font-bold">125 SAR | ৳ 4,000 BDT</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-300 font-semibold">👤 Jahangir (Riyadh)</span>
                  <span className="text-amber-400 font-bold">125 SAR | ৳ 4,000 BDT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-semibold">👤 Belal Hossain (Chittagong)</span>
                  <span className="text-amber-400 font-bold">125 SAR | ৳ 4,000 BDT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming VIP Paper Section (Locked / Unlocked) */}
        <section className="bg-gradient-to-b from-[#062C22] to-[#041E18] border border-amber-500/40 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Exclusive VIP Release
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white">Upcoming Draw VIP Paper</h2>
            <p className="text-sm text-gray-300">
              Official government certified paper sheet for the upcoming draw. Unlock instantly via SAR or BDT payment verification.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-black/60 border-2 border-amber-500/50 rounded-2xl p-4 relative overflow-hidden shadow-2xl">
            {/* Paper Preview */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
              <img 
                src={upcomingPaperImage} 
                alt="VIP Paper" 
                className={`w-full h-full object-cover transition-all duration-500 ${isUnlocked ? 'filter-none' : 'blur-xl scale-105 opacity-40'}`}
              />

              {/* Lock Overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/30 animate-pulse">
                    <Lock size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-amber-200">VIP Paper is Locked</h3>
                    <p className="text-xs text-gray-300 max-w-xs mx-auto">
                      Unlock full high-resolution access to direct 3UP & DOWN numbers for this draw.
                    </p>
                  </div>

                  {/* Dual Price Tag */}
                  <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-extrabold px-6 py-3 rounded-2xl shadow-xl text-lg flex items-center gap-3">
                    <span>{sarPrice} SAR</span>
                    <span className="text-black/50">|</span>
                    <span>৳ {bdtPrice.toLocaleString()} BDT</span>
                  </div>

                  <button 
                    onClick={() => {
                      if (!currentUser) {
                        setIsLoginModalOpen(true);
                      } else {
                        setIsPaymentModalOpen(true);
                      }
                    }}
                    className="w-full max-w-xs bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-black font-extrabold py-3.5 rounded-xl shadow-xl hover:brightness-110 transition-all text-base transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Unlock size={20} /> Unlock Paper Now
                  </button>
                  <p className="text-[11px] text-amber-300/80">পেমেন্ট করার পর অ্যাডমিন যাচাই করে পেপার আনলক করবেন।</p>
                </div>
              )}

              {/* Unlocked View Badge */}
              {isUnlocked && (
                <div className="absolute top-4 left-4 bg-emerald-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-400">
                  <CheckCircle size={14} /> Unlocked & Verified
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Past Games Winning Archive (বিগত ড্র-গুলোতে আমাদের ভিআইপি পেপারের সফলতার প্রমাণপত্র) */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Verified Success History
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white">বিগত ড্র-গুলোতে আমাদের ভিআইপি পেপারের সফলতার প্রমাণপত্র</h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              Explore our proven track record of direct winning numbers and high-accuracy tip sheets from past government draws.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastPapers.map((paper) => (
              <div key={paper.id} className="bg-[#062C22] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col group hover:border-amber-400 transition-all duration-300">
                
                {/* Paper Image Container */}
                <div className="relative bg-white/5 aspect-[3/4] overflow-hidden">
                  <img 
                    src={paper.image} 
                    alt={paper.date} 
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${hdClarity ? 'contrast-125 brightness-105' : ''}`} 
                  />
                  
                  {/* WIN PROOF Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Award size={13} /> WIN PROOF
                  </div>

                  {/* 3UP / DOWN Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-amber-500/50 text-amber-300 font-mono text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                    <span>3UP: <strong className="text-white">{paper.up3}</strong></span>
                    <span className="text-gray-500">|</span>
                    <span>DOWN: <strong className="text-white">{paper.down}</strong></span>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs text-amber-400 font-semibold">{paper.date}</span>
                    <p className="text-sm text-gray-200 font-medium">{paper.caption}</p>
                  </div>

                  <button 
                    onClick={() => setZoomImage(paper)}
                    className="w-full bg-black/40 hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/40 font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
                  >
                    <ZoomIn size={16} /> পূর্ণ স্ক্রিনে পেপার দেখুন (Zoom Win Proof)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="bg-gradient-to-r from-[#062C22] to-[#041E18] border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">VIP Member Reviews & Feedback</h2>
            <p className="text-sm text-gray-300">See what our successful members are saying about our VIP service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.filter(r => r.status === 'Approved').map(rev => (
              <div key={rev.id} className="bg-black/40 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-200 text-sm">{rev.name}</h4>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">"{rev.comment}"</p>
              </div>
            ))}
          </div>

          {/* Submit Review Form */}
          <div className="bg-black/60 border border-amber-500/30 rounded-2xl p-6 max-w-xl mx-auto space-y-4">
            <h3 className="text-base font-bold text-amber-300 text-center">আপনার মূল্যবান রিভিউ প্রদান করুন</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="আপনার নাম" 
                value={newReviewName} 
                onChange={e => setNewReviewName(e.target.value)} 
                className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <textarea 
                rows="3" 
                placeholder="আপনার মতামত লিখুন..." 
                value={newReviewComment} 
                onChange={e => setNewReviewComment(e.target.value)} 
                className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
              ></textarea>
              <button 
                onClick={() => {
                  if (!newReviewName || !newReviewComment) {
                    alert('দয়া করে নাম ও মন্তব্য লিখুন।');
                    return;
                  }
                  const newRev = {
                    id: Date.now(),
                    name: newReviewName,
                    rating: 5,
                    comment: newReviewComment,
                    status: 'Pending'
                  };
                  setReviews([...reviews, newRev]);
                  setNewReviewName('');
                  setNewReviewComment('');
                  alert('আপনার রিভিউ সফলভাবে জমা হয়েছে! অ্যাডমিন অনুমোদন করার পর প্রদর্শিত হবে।');
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold py-2.5 rounded-xl text-xs shadow-lg hover:brightness-110 transition-all"
              >
                রিভিউ জমা দিন
              </button>
            </div>
          </div>
        </section>

        {/* Official GLO & Imo Support Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#062C22] border border-amber-500/30 rounded-3xl p-6 flex items-center gap-5 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Globe size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">Official Thailand GLO</h3>
              <p className="text-xs text-gray-300">Verify official draw results directly on the Government Lottery Office website.</p>
              <a 
                href="https://www.glo.or.th" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs hover:underline"
              >
                Visit www.glo.or.th <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="bg-[#062C22] border border-amber-500/30 rounded-3xl p-6 flex items-center gap-5 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Phone size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">VIP Imo Helpline</h3>
              <p className="text-xs text-gray-300">Direct assistance and VIP paper support via Imo messenger.</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-300 font-bold text-sm">{imoNumber}</span>
                <button 
                  onClick={() => handleCopy(imoNumber, 'imo')}
                  className="bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black p-1.5 rounded-lg text-xs transition-colors"
                  title="Copy Number"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer & Authorized Section */}
      <footer className="bg-[#020C0A] border-t border-amber-500/30 mt-16 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Brand Col */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full border border-amber-400 p-0.5 bg-black/40 overflow-hidden">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-extrabold text-white text-lg">{brandTitle}</h3>
            </div>
            <p className="text-xs text-gray-400">{brandSubtitle}</p>
          </div>

          {/* Authorized VIP Partner Card */}
          <div className="bg-gradient-to-r from-[#062C22] to-[#041E18] border border-amber-500/50 rounded-3xl p-5 shadow-2xl flex items-center gap-4">
            <img src={partnerAvatar} alt={partnerName} className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover shadow-md" />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <ShieldCheck size={12} /> Authorized VIP Partner
              </div>
              <h4 className="font-extrabold text-white text-base">{partnerName}</h4>
              <p className="text-xs text-amber-300/80 font-medium">{partnerRole}</p>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="text-center md:text-right space-y-2 text-xs text-gray-400">
            <p>&copy; 2026 Thailand Government Lottery. All Rights Reserved.</p>
            <p className="text-[10px] text-gray-500">Official Secure Portal for Authorized International VIP Members.</p>
          </div>

        </div>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#062C22] border border-amber-500/50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="text-center space-y-2">
              <Crown size={36} className="text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Sign in to VIP Portal</h3>
              <p className="text-xs text-gray-300">Select your Google account to continue to the secure lottery vault.</p>
            </div>

            <button 
              onClick={handleGoogleLoginSimulate}
              className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google Account
            </button>
          </div>
        </div>
      )}

      {/* Simplified Payment Modal (bKash & Nagad) */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#062C22] border border-amber-500/50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">VIP Paper Payment</h3>
              <p className="text-xs text-gray-300">নিচে দেওয়া বিকাশ বা নগদ নম্বরে সেন্ড মনি করুন।</p>
            </div>

            {/* Price Box */}
            <div className="bg-black/40 border border-amber-500/30 rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Total Payable Amount</span>
              <div className="text-2xl font-black text-amber-400">
                {sarPrice} SAR <span className="text-gray-400 text-base">|</span> ৳ {bdtPrice.toLocaleString()} BDT
              </div>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSelectedPaymentMethod('bkash')}
                className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${selectedPaymentMethod === 'bkash' ? 'bg-pink-600 text-white border-pink-400 shadow-lg' : 'bg-black/40 text-gray-300 border-gray-700'}`}
              >
                bKash Send Money
              </button>
              <button 
                onClick={() => setSelectedPaymentMethod('nagad')}
                className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${selectedPaymentMethod === 'nagad' ? 'bg-orange-600 text-white border-orange-400 shadow-lg' : 'bg-black/40 text-gray-300 border-gray-700'}`}
              >
                Nagad Send Money
              </button>
            </div>

            {/* Number Display & Copy */}
            <div className="bg-black/50 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase">{selectedPaymentMethod.toUpperCase()} Personal Number</span>
                <p className="font-mono font-bold text-amber-300 text-sm">{selectedPaymentMethod === 'bkash' ? bkashNumber : nagadNumber}</p>
              </div>
              <button 
                onClick={() => handleCopy(selectedPaymentMethod === 'bkash' ? bkashNumber : nagadNumber, 'paynum')}
                className="bg-amber-500 text-black p-2 rounded-xl text-xs font-bold flex items-center gap-1 hover:brightness-110"
              >
                <Copy size={14} /> Copy
              </button>
            </div>

            {/* Bengali Instructions */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-200 space-y-1">
              <p className="font-bold">নির্দেশনা:</p>
              <p>১. আপনার বিকাশ/নগদ অ্যাপ থেকে উপরে দেওয়া নম্বরে <strong>৳ {bdtPrice.toLocaleString()} BDT</strong> সেন্ড করুন।</p>
              <p>২. টাকা পাঠানোর পর আপনার মোবাইল নম্বরের শেষ ৪ ডিজিট নিচে লিখুন।</p>
            </div>

            {/* Form */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-medium">যে নম্বর থেকে টাকা পাঠিয়েছেন তার শেষ ৪ ডিজিট (Last 4 Digits):</label>
                <input 
                  type="text" 
                  maxLength="4" 
                  placeholder="যেমন: 4829" 
                  value={senderLast4} 
                  onChange={e => setSenderLast4(e.target.value)} 
                  className="w-full bg-black/40 border border-amber-500/40 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold text-white tracking-widest focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold py-3.5 rounded-xl shadow-xl hover:brightness-110 transition-all text-sm"
              >
                পেমেন্ট কনফার্ম করুন (Submit Payment)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Winning Papers */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-[#062C22] border border-amber-500/50 rounded-3xl p-4 overflow-hidden shadow-2xl">
            <button 
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="text-center pb-3 border-b border-amber-500/30">
              <h3 className="text-lg font-bold text-amber-300">{zoomImage.date}</h3>
              <p className="text-xs text-gray-300">{zoomImage.caption}</p>
            </div>
            <div className="my-4 max-h-[75vh] overflow-auto flex items-center justify-center">
              <img src={zoomImage.image} alt="Zoomed Win Proof" className="max-w-full object-contain rounded-xl contrast-125 brightness-105" />
            </div>
            <div className="text-center">
              <span className="bg-black/60 border border-amber-500/40 text-amber-300 font-mono text-sm px-4 py-2 rounded-xl inline-block">
                Winning 3UP: <strong>{zoomImage.up3}</strong> | DOWN: <strong>{zoomImage.down}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Secret Admin Panel Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#041E18] border-2 border-amber-500 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Admin Header */}
            <div className="bg-[#062C22] border-b border-amber-500/40 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="text-amber-400" size={24} />
                <h2 className="text-lg font-extrabold text-white">Secret Admin Control Panel</h2>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="text-gray-400 hover:text-white">
                <X size={22} />
              </button>
            </div>

            {!isAdminAuthenticated ? (
              <div className="p-8 max-w-sm mx-auto my-auto text-center space-y-4">
                <Key size={40} className="text-amber-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Admin Authentication</h3>
                <p className="text-xs text-gray-300">Enter administrator password to access controls (Default: admin123)</p>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={adminPassword} 
                  onChange={e => setAdminPassword(e.target.value)} 
                  className="w-full bg-black/50 border border-amber-500/40 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-amber-400"
                />
                <button 
                  onClick={() => {
                    if (adminPassword === 'admin123') {
                      setIsAdminAuthenticated(true);
                    } else {
                      alert('ভুল পাসওয়ার্ড!');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold py-3 rounded-xl shadow-lg"
                >
                  Login to Admin
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                {/* Admin Sidebar Tabs */}
                <div className="w-full md:w-64 bg-[#062C22]/80 border-r border-amber-500/30 p-4 flex md:flex-col gap-2 overflow-x-auto">
                  {[
                    { id: 'upcoming', label: 'Upcoming & Pricing', icon: DollarSign },
                    { id: 'payments', label: `Payments (${pendingPayments.filter(p=>p.status==='Pending').length})`, icon: CheckCircle },
                    { id: 'past', label: 'Past Papers', icon: FileText },
                    { id: 'reviews', label: `Reviews (${reviews.filter(r=>r.status==='Pending').length})`, icon: Star },
                    { id: 'logins', label: 'Login History', icon: Users },
                    { id: 'settings', label: 'Settings & Logos', icon: Settings },
                  ].map(tab => {
                    const IconComp = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveAdminTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${activeAdminTab === tab.id ? 'bg-amber-500 text-black shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
                      >
                        <IconComp size={16} /> {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Admin Tab Content */}
                <div className="flex-grow p-6 overflow-y-auto space-y-6">
                  
                  {activeAdminTab === 'upcoming' && (
                    <div className="space-y-6 max-w-xl">
                      <h3 className="text-xl font-bold text-amber-300">Upcoming VIP Paper & Pricing Control</h3>
                      
                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">VIP Paper Image URL / Upload</label>
                        <input 
                          type="text" 
                          value={upcomingPaperImage} 
                          onChange={e => setUpcomingPaperImage(e.target.value)} 
                          className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-300 font-bold">SAR Price</label>
                          <input 
                            type="number" 
                            value={sarPrice} 
                            onChange={e => setSarPrice(Number(e.target.value))} 
                            className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-300 font-bold">BDT Price</label>
                          <input 
                            type="number" 
                            value={bdtPrice} 
                            onChange={e => setBdtPrice(Number(e.target.value))} 
                            className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Draw Date Text</label>
                        <input 
                          type="text" 
                          value={drawDateText} 
                          onChange={e => setDrawDateText(e.target.value)} 
                          className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Countdown Target Date/Time</label>
                        <input 
                          type="datetime-local" 
                          value={countdownTarget.slice(0, 16)} 
                          onChange={e => setCountdownTarget(e.target.value + ':00')} 
                          className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <button 
                        onClick={() => alert('Upcoming settings updated successfully!')}
                        className="bg-amber-500 text-black font-bold px-6 py-2.5 rounded-xl text-xs"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}

                  {activeAdminTab === 'payments' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-amber-300">Pending Payment Verifications</h3>
                      <div className="space-y-3">
                        {pendingPayments.map(p => (
                          <div key={p.id} className="bg-black/40 border border-amber-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="space-y-1">
                              <p className="font-bold text-white text-sm">{p.name} <span className="text-xs text-gray-400">({p.email})</span></p>
                              <p className="text-xs text-amber-300">Method: <strong>{p.method}</strong> | Last 4 Digits: <strong className="font-mono text-white text-sm bg-amber-500/20 px-2 py-0.5 rounded">{p.last4}</strong></p>
                              <p className="text-[11px] text-gray-400">Amount: {p.amountSar} SAR | ৳ {p.amountBdt} BDT • {p.time}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              {p.status === 'Pending' ? (
                                <>
                                  <button 
                                    onClick={() => {
                                      setPendingPayments(pendingPayments.map(item => item.id === p.id ? {...item, status: 'Approved'} : item));
                                      setIsUnlocked(true);
                                      alert('Payment approved! VIP paper unlocked for user.');
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                                  >
                                    <CheckCircle size={14} /> Approve
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setPendingPayments(pendingPayments.map(item => item.id === p.id ? {...item, status: 'Rejected'} : item));
                                      alert('Payment rejected.');
                                    }}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <span className={`font-bold text-xs px-3 py-1 rounded-full ${p.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                                  {p.status}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeAdminTab === 'past' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-amber-300">Manage Past Winning Papers Archive</h3>
                      
                      <div className="bg-black/40 border border-amber-500/30 rounded-2xl p-4 space-y-3 max-w-xl">
                        <h4 className="font-bold text-white text-sm">+ Upload New Win Proof</h4>
                        <input 
                          type="text" 
                          id="newPastDate" 
                          placeholder="Draw Date (e.g. 01 December 2026)" 
                          className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white"
                        />
                        <input 
                          type="text" 
                          id="newPastImg" 
                          placeholder="Image URL" 
                          className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" id="newPast3up" placeholder="3UP (e.g. 654)" className="bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                          <input type="text" id="newPastDown" placeholder="DOWN (e.g. 82)" className="bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                        </div>
                        <button 
                          onClick={() => {
                            const date = document.getElementById('newPastDate').value;
                            const image = document.getElementById('newPastImg').value;
                            const up3 = document.getElementById('newPast3up').value;
                            const down = document.getElementById('newPastDown').value;
                            if(!date || !image) {
                              alert('Please fill date and image URL');
                              return;
                            }
                            const newItem = { id: Date.now(), date, image, up3: up3 || '---', down: down || '--', caption: 'Verified Winning Paper' };
                            setPastPapers([newItem, ...pastPapers]);
                            alert('Win proof published successfully!');
                          }}
                          className="bg-amber-500 text-black font-bold px-4 py-2 rounded-xl text-xs"
                        >
                          Publish Win Proof
                        </button>
                      </div>

                      <div className="space-y-3">
                        {pastPapers.map(p => (
                          <div key={p.id} className="bg-black/40 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt="" className="w-12 h-16 object-cover rounded" />
                              <div>
                                <p className="font-bold text-white text-xs">{p.date}</p>
                                <p className="text-[11px] text-amber-300">3UP: {p.up3} | DOWN: {p.down}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => setPastPapers(pastPapers.filter(item => item.id !== p.id))}
                              className="text-red-400 hover:text-red-300 text-xs font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeAdminTab === 'reviews' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-amber-300">Moderate Customer Reviews</h3>
                      <div className="space-y-3">
                        {reviews.map(r => (
                          <div key={r.id} className="bg-black/40 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="font-bold text-white text-sm">{r.name} <span className="text-xs text-amber-400">({r.rating} Stars)</span></p>
                              <p className="text-xs text-gray-300">"{r.comment}"</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {r.status === 'Pending' ? (
                                <button 
                                  onClick={() => setReviews(reviews.map(item => item.id === r.id ? {...item, status: 'Approved'} : item))}
                                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                                >
                                  Approve
                                </button>
                              ) : (
                                <button 
                                  onClick={() => setReviews(reviews.map(item => item.id === r.id ? {...item, status: 'Pending'} : item))}
                                  className="bg-yellow-600 text-black font-bold px-3 py-1.5 rounded-xl text-xs"
                                >
                                  Hide
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeAdminTab === 'logins' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-amber-300">Google Login History Records</h3>
                        <button 
                          onClick={exportLoginHistoryCsv}
                          className="bg-amber-500 text-black font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                        >
                          <Download size={14} /> Download CSV
                        </button>
                      </div>

                      <div className="bg-black/40 border border-amber-500/30 rounded-2xl overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#062C22] text-amber-300 border-b border-amber-500/30">
                            <tr>
                              <th className="p-3">Name</th>
                              <th className="p-3">Email</th>
                              <th className="p-3">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {loginHistory.map((item, idx) => (
                              <tr key={idx}>
                                <td className="p-3 font-bold text-white">{item.name}</td>
                                <td className="p-3 text-gray-300">{item.email}</td>
                                <td className="p-3 text-amber-400 font-mono">{item.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeAdminTab === 'settings' && (
                    <div className="space-y-6 max-w-xl">
                      <h3 className="text-xl font-bold text-amber-300">Settings, Logos & Contact Numbers</h3>
                      
                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Brand Title</label>
                        <input type="text" value={brandTitle} onChange={e => setBrandTitle(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Logo URL (Thailand Emblem)</label>
                        <input type="text" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Partner Name</label>
                        <input type="text" value={partnerName} onChange={e => setPartnerName(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Partner Profile Picture URL</label>
                        <input type="text" value={partnerAvatar} onChange={e => setPartnerAvatar(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-300 font-bold">bKash Number</label>
                          <input type="text" value={bkashNumber} onChange={e => setBkashNumber(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-300 font-bold">Nagad Number</label>
                          <input type="text" value={nagadNumber} onChange={e => setNagadNumber(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Imo Helpline Number</label>
                        <input type="text" value={imoNumber} onChange={e => setImoNumber(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-300 font-bold">Notice Bar Text (Bengali)</label>
                        <textarea rows="2" value={noticeText} onChange={e => setNoticeText(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2 text-xs text-white" />
                      </div>

                      <button onClick={() => alert('Settings saved successfully!')} className="bg-amber-500 text-black font-bold px-6 py-2.5 rounded-xl text-xs">
                        Save Settings
                      </button>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
