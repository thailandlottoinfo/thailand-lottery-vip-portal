import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Unlock, Crown, Sparkles, Copy, CheckCircle, 
  Phone, Globe, Star, ZoomIn, X, Award, Bell, ExternalLink, LogOut
} from 'lucide-react';
import AdminPortal from './AdminPortal';

export default function App() {
  // Detect separate Admin URL (/admin or #admin)
  const checkIsAdminRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/admin' || path === '/admin/' || hash === '#admin';
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdminRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Persistent States with LocalStorage
  const [brandTitle, setBrandTitle] = useState(() => localStorage.getItem('glo_brandTitle') || 'Thailand Government Lottery');
  const [brandSubtitle, setBrandSubtitle] = useState(() => localStorage.getItem('glo_brandSubtitle') || 'สำนักงานสลากกินแบ่งรัฐบาล • Official Portal');
  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem('glo_logoUrl') || 'https://www.glo.or.th/assets/img/logo.png');

  const [partnerName, setPartnerName] = useState(() => localStorage.getItem('glo_partnerName') || 'Ariyan chaudhari');
  const [partnerRole, setPartnerRole] = useState(() => localStorage.getItem('glo_partnerRole') || 'Authorized VIP Distributor & Official Analyst');
  const [partnerAvatar, setPartnerAvatar] = useState(() => localStorage.getItem('glo_partnerAvatar') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300');
  const [partnerLogoUrl, setPartnerLogoUrl] = useState(() => localStorage.getItem('glo_partnerLogoUrl') || 'https://www.glo.or.th/assets/img/logo.png');

  const [bkashNumber, setBkashNumber] = useState(() => localStorage.getItem('glo_bkash') || '01700-000000 (Personal)');
  const [nagadNumber, setNagadNumber] = useState(() => localStorage.getItem('glo_nagad') || '01800-000000 (Personal)');
  const [imoNumber, setImoNumber] = useState(() => localStorage.getItem('glo_imo') || '+8801700000000');
  const [noticeText, setNoticeText] = useState(() => localStorage.getItem('glo_notice') || '⚠️ বিশেষ ঘোষণা: আগামী ১৬ ডিসেম্বর ড্র-এর ১০০% নিশ্চিত ভিআইপি পেপার বুকিং চলছে। বিকাশ বা নগদ সেন্ড মনি করে শেষ ৪ ডিজিট দিয়ে পেপার আনলক করুন।');
  const [drawDateText, setDrawDateText] = useState(() => localStorage.getItem('glo_drawDate') || '16 December 2026');
  const [countdownTarget, setCountdownTarget] = useState(() => localStorage.getItem('glo_countdown') || '2026-12-16T16:00:00');

  const [sarPrice, setSarPrice] = useState(() => Number(localStorage.getItem('glo_sarPrice')) || 125);
  const [bdtPrice, setBdtPrice] = useState(() => Number(localStorage.getItem('glo_bdtPrice')) || 4000);
  const [upcomingPaperImage, setUpcomingPaperImage] = useState(() => localStorage.getItem('glo_upcomingImg') || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginHistory, setLoginHistory] = useState([
    { name: 'Rafiqul Islam', email: 'rafiqul.official@gmail.com', time: '2026-11-20 14:30:12' },
    { name: 'Tanvir Ahmed', email: 'tanvir99@gmail.com', time: '2026-11-20 12:15:00' }
  ]);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [senderLast4, setSenderLast4] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bkash');
  const [pendingPayments, setPendingPayments] = useState([
    { id: 1, name: 'Rafiqul Islam', email: 'rafiqul.official@gmail.com', last4: '4829', method: 'bKash', amountSar: 125, amountBdt: 4000, time: '2026-11-20 14:35:00', status: 'Pending' }
  ]);

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

  const [reviews, setReviews] = useState([
    { id: 1, name: 'Nazmul Hossain', rating: 5, comment: 'আলহামদুলিল্লাহ, ভিআইপি পেপার নিয়ে প্রথমবারেই সরাসরি ৩UP উইন করেছি। অনেক ধন্যবাদ আরিয়ান ভাই!', status: 'Approved' },
    { id: 2, name: 'Jahangir Alam', rating: 5, comment: 'খুব বিশ্বস্ত সার্ভিস। পেমেন্ট করার ৫ মিনিটের মধ্যে পেপার পেয়ে গেছি।', status: 'Approved' }
  ]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const [zoomImage, setZoomImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Persist updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('glo_brandTitle', brandTitle);
      localStorage.setItem('glo_brandSubtitle', brandSubtitle);
      localStorage.setItem('glo_logoUrl', logoUrl);
      localStorage.setItem('glo_partnerName', partnerName);
      localStorage.setItem('glo_partnerRole', partnerRole);
      localStorage.setItem('glo_partnerAvatar', partnerAvatar);
      localStorage.setItem('glo_partnerLogoUrl', partnerLogoUrl);
      localStorage.setItem('glo_bkash', bkashNumber);
      localStorage.setItem('glo_nagad', nagadNumber);
      localStorage.setItem('glo_imo', imoNumber);
      localStorage.setItem('glo_notice', noticeText);
      localStorage.setItem('glo_drawDate', drawDateText);
      localStorage.setItem('glo_countdown', countdownTarget);
      localStorage.setItem('glo_sarPrice', String(sarPrice));
      localStorage.setItem('glo_bdtPrice', String(bdtPrice));
      localStorage.setItem('glo_upcomingImg', upcomingPaperImage);
    } catch (e) {
      console.warn('LocalStorage quota reached');
    }
  }, [
    brandTitle, brandSubtitle, logoUrl, partnerName, partnerRole, partnerAvatar, 
    partnerLogoUrl, bkashNumber, nagadNumber, imoNumber, noticeText, drawDateText, 
    countdownTarget, sarPrice, bdtPrice, upcomingPaperImage
  ]);

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

  // If URL is /admin or #admin, render ONLY the dedicated Admin Portal (completely isolated from Viewer page)
  if (isAdminRoute) {
    return (
      <AdminPortal
        brandTitle={brandTitle} setBrandTitle={setBrandTitle}
        brandSubtitle={brandSubtitle} setBrandSubtitle={setBrandSubtitle}
        logoUrl={logoUrl} setLogoUrl={setLogoUrl}
        partnerName={partnerName} setPartnerName={setPartnerName}
        partnerRole={partnerRole} setPartnerRole={setPartnerRole}
        partnerAvatar={partnerAvatar} setPartnerAvatar={setPartnerAvatar}
        partnerLogoUrl={partnerLogoUrl} setPartnerLogoUrl={setPartnerLogoUrl}
        bkashNumber={bkashNumber} setBkashNumber={setBkashNumber}
        nagadNumber={nagadNumber} setNagadNumber={setNagadNumber}
        imoNumber={imoNumber} setImoNumber={setImoNumber}
        noticeText={noticeText} setNoticeText={setNoticeText}
        drawDateText={drawDateText} setDrawDateText={setDrawDateText}
        countdownTarget={countdownTarget} setCountdownTarget={setCountdownTarget}
        sarPrice={sarPrice} setSarPrice={setSarPrice}
        bdtPrice={bdtPrice} setBdtPrice={setBdtPrice}
        upcomingPaperImage={upcomingPaperImage} setUpcomingPaperImage={setUpcomingPaperImage}
        setIsUnlocked={setIsUnlocked}
        pendingPayments={pendingPayments} setPendingPayments={setPendingPayments}
        pastPapers={pastPapers} setPastPapers={setPastPapers}
        reviews={reviews} setReviews={setReviews}
        loginHistory={loginHistory}
      />
    );
  }

  const handleGoogleLoginSimulate = () => {
    const randomNames = ['Imran Khan', 'Abdul Rahim', 'Nasir Uddin', 'Kamal Hossain', 'Sumon Ahmed'];
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const email = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 900 + 100) + '@gmail.com';
    const userObj = { name, email, photo: partnerAvatar };
    setCurrentUser(userObj);
    setIsLoginModalOpen(false);

    const newRecord = { name, email, time: new Date().toLocaleString() };
    setLoginHistory([newRecord, ...loginHistory]);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
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

  // Pure Viewer Landing Page (zero admin UI or links)
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

      {/* 2. Top Header with Thailand Government Lottery Logo */}
      <header className="bg-[#041E18]/90 backdrop-blur-md border-b border-amber-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 p-0.5 bg-black/40 overflow-hidden shadow-lg shadow-amber-500/20 flex-shrink-0">
              <img src={logoUrl} alt="Thailand Government Lottery Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                {brandTitle}
              </h1>
              <p className="text-xs text-amber-300/80 font-medium tracking-wide">{brandSubtitle}</p>
            </div>
          </div>

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
            <div className="text-center space-y-3 w-full">
              <Crown size={40} className="text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-amber-200">Live VIP Purchase Ticker</h3>
              <div className="bg-[#031410] border border-amber-500/30 rounded-xl p-4 text-left w-full space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-300 font-semibold">👤 Al-Amin (Dhaka)</span>
                  <span className="text-amber-400 font-bold">{sarPrice} SAR | ৳ {bdtPrice.toLocaleString()} BDT</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-300 font-semibold">👤 Jahangir (Riyadh)</span>
                  <span className="text-amber-400 font-bold">{sarPrice} SAR | ৳ {bdtPrice.toLocaleString()} BDT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-semibold">👤 Belal Hossain (Chittagong)</span>
                  <span className="text-amber-400 font-bold">{sarPrice} SAR | ৳ {bdtPrice.toLocaleString()} BDT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming VIP Paper Section */}
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
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
              <img 
                src={upcomingPaperImage} 
                alt="VIP Paper" 
                className={`w-full h-full object-cover transition-all duration-500 ${isUnlocked ? 'filter-none' : 'blur-xl scale-105 opacity-40'}`}
              />

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

              {isUnlocked && (
                <div className="absolute top-4 left-4 bg-emerald-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-400">
                  <CheckCircle size={14} /> Unlocked & Verified
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Past Games Winning Archive */}
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
                <div className="relative bg-white/5 aspect-[3/4] overflow-hidden">
                  <img 
                    src={paper.image} 
                    alt={paper.date} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 contrast-125 brightness-105" 
                  />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Award size={13} /> WIN PROOF
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-amber-500/50 text-amber-300 font-mono text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                    <span>3UP: <strong className="text-white">{paper.up3}</strong></span>
                    <span className="text-gray-500">|</span>
                    <span>DOWN: <strong className="text-white">{paper.down}</strong></span>
                  </div>
                </div>

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
                  onClick={() => handleCopy(imoNumber)}
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

      {/* Footer & Authorized Partner Section (With Partner Avatar & Partner Logo beside Ariyan Choudhari) */}
      <footer className="bg-[#020C0A] border-t border-amber-500/30 mt-16 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full border border-amber-400 p-0.5 bg-black/40 overflow-hidden">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-extrabold text-white text-lg">{brandTitle}</h3>
            </div>
            <p className="text-xs text-gray-400">{brandSubtitle}</p>
          </div>

          <div className="bg-gradient-to-r from-[#062C22] to-[#041E18] border border-amber-500/50 rounded-3xl p-5 shadow-2xl flex items-center gap-4">
            <img src={partnerAvatar} alt={partnerName} className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover shadow-md flex-shrink-0" />
            <div className="space-y-1 flex-grow">
              <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <ShieldCheck size={12} /> Authorized VIP Partner
              </div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-white text-base">{partnerName}</h4>
                <img src={partnerLogoUrl} alt="Partner Official Logo" className="w-6 h-6 rounded-full border border-amber-400 object-cover bg-black p-0.5" />
              </div>
              <p className="text-xs text-amber-300/80 font-medium">{partnerRole}</p>
            </div>
          </div>

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

      {/* Payment Modal */}
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

            <div className="bg-black/40 border border-amber-500/30 rounded-2xl p-4 text-center space-y-1">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Total Payable Amount</span>
              <div className="text-2xl font-black text-amber-400">
                {sarPrice} SAR <span className="text-gray-400 text-base">|</span> ৳ {bdtPrice.toLocaleString()} BDT
              </div>
            </div>

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

            <div className="bg-black/50 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase">{selectedPaymentMethod.toUpperCase()} Personal Number</span>
                <p className="font-mono font-bold text-amber-300 text-sm">{selectedPaymentMethod === 'bkash' ? bkashNumber : nagadNumber}</p>
              </div>
              <button 
                onClick={() => handleCopy(selectedPaymentMethod === 'bkash' ? bkashNumber : nagadNumber)}
                className="bg-amber-500 text-black p-2 rounded-xl text-xs font-bold flex items-center gap-1 hover:brightness-110"
              >
                <Copy size={14} /> Copy
              </button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-200 space-y-1">
              <p className="font-bold">নির্দেশনা:</p>
              <p>১. আপনার বিকাশ/নগদ অ্যাপ থেকে উপরে দেওয়া নম্বরে <strong>৳ {bdtPrice.toLocaleString()} BDT</strong> সেন্ড করুন।</p>
              <p>২. টাকা পাঠানোর পর আপনার মোবাইল নম্বরের শেষ ৪ ডিজিট নিচে লিখুন।</p>
            </div>

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

      {/* Lightbox Modal */}
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

    </div>
  );
}
