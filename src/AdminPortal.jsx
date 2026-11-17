import React, { useState } from 'react';
import { 
  Crown, DollarSign, CheckCircle, FileText, Star, Users, Settings, 
  Key, Upload, Image as ImageIcon, ArrowLeft, LogOut, Trash2, Eye, EyeOff, Download
} from 'lucide-react';

export default function AdminPortal({
  brandTitle, setBrandTitle,
  brandSubtitle, setBrandSubtitle,
  logoUrl, setLogoUrl,
  partnerName, setPartnerName,
  partnerRole, setPartnerRole,
  partnerAvatar, setPartnerAvatar,
  partnerLogoUrl, setPartnerLogoUrl,
  bkashNumber, setBkashNumber,
  nagadNumber, setNagadNumber,
  imoNumber, setImoNumber,
  noticeText, setNoticeText,
  drawDateText, setDrawDateText,
  countdownTarget, setCountdownTarget,
  sarPrice, setSarPrice,
  bdtPrice, setBdtPrice,
  upcomingPaperImage, setUpcomingPaperImage,
  setIsUnlocked,
  pendingPayments, setPendingPayments,
  pastPapers, setPastPapers,
  reviews, setReviews,
  loginHistory
}) {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => sessionStorage.getItem('glo_admin_auth') === 'true');
  const [activeAdminTab, setActiveAdminTab] = useState('upcoming');

  // States for uploading new past winning paper directly via file
  const [newPastDate, setNewPastDate] = useState('');
  const [newPastImg, setNewPastImg] = useState('');
  const [newPast3up, setNewPast3up] = useState('');
  const [newPastDown, setNewPastDown] = useState('');

  const handleFileUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('glo_admin_auth', 'true');
    } else {
      alert('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('glo_admin_auth');
  };

  const goToViewerSite = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
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

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020E0B] text-gray-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-[#041E18] border-2 border-amber-500/60 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Key size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">Admin Control Portal</h1>
            <p className="text-xs text-amber-300/80">Restricted Access • Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={adminPassword} 
              onChange={e => setAdminPassword(e.target.value)} 
              className="w-full bg-black/50 border border-amber-500/40 rounded-xl px-4 py-3.5 text-center text-white focus:outline-none focus:border-amber-400"
              required
            />
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold py-3.5 rounded-xl shadow-lg hover:brightness-110 transition-all"
            >
              Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020E0B] text-gray-100 font-sans flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#062C22] border-b border-amber-500/40 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Crown className="text-amber-400" size={28} />
          <div>
            <h1 className="text-lg md:text-xl font-black text-white">VIP Portal — Dedicated Admin Panel</h1>
            <p className="text-[11px] text-amber-300/80">Direct Image Upload & Full Site Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={goToViewerSite}
            className="flex items-center gap-2 bg-black/40 hover:bg-black/60 text-amber-300 border border-amber-500/40 font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            <ArrowLeft size={14} /> View Live Website
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Admin Body */}
      <div className="flex flex-col md:flex-row flex-grow max-w-7xl w-full mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#041E18] border-b md:border-b-0 md:border-r border-amber-500/30 p-4 flex md:flex-col gap-2 overflow-x-auto">
          {[
            { id: 'upcoming', label: 'Upcoming & Pricing', icon: DollarSign },
            { id: 'payments', label: `Payments (${pendingPayments.filter(p => p.status === 'Pending').length})`, icon: CheckCircle },
            { id: 'past', label: 'Past Win Proofs', icon: FileText },
            { id: 'reviews', label: `Reviews (${reviews.filter(r => r.status === 'Pending').length})`, icon: Star },
            { id: 'logins', label: 'Login History', icon: Users },
            { id: 'settings', label: 'Logos & Settings', icon: Settings },
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
        </aside>

        {/* Main Workspace */}
        <main className="flex-grow p-6 md:p-8 space-y-8 overflow-y-auto">
          
          {/* TAB 1: UPCOMING PAPER & PRICING */}
          {activeAdminTab === 'upcoming' && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-amber-300">Upcoming VIP Paper & Pricing</h2>
              
              <div className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-5 space-y-4">
                <label className="block text-xs text-gray-300 font-bold">Upcoming VIP Paper (ডিরেক্ট ইমেজ আপলোড করুন)</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img src={upcomingPaperImage} alt="Upcoming Preview" className="w-28 h-36 object-cover rounded-xl border border-amber-400/50 bg-black" />
                  <label className="flex-grow w-full border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-2xl p-6 text-center cursor-pointer bg-black/30 transition-all">
                    <Upload size={24} className="text-amber-400 mx-auto mb-2" />
                    <span className="block text-xs font-bold text-amber-200">নতুন ভিআইপি পেপার আপলোড করতে ক্লিক করুন</span>
                    <span className="text-[10px] text-gray-400">JPG, PNG বা WEBP ফাইল সাপোর্টেড</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, setUpcomingPaperImage)} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-bold">SAR Price</label>
                  <input type="number" value={sarPrice} onChange={e => setSarPrice(Number(e.target.value))} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-bold">BDT Price</label>
                  <input type="number" value={bdtPrice} onChange={e => setBdtPrice(Number(e.target.value))} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-bold">Next Draw Date Text</label>
                  <input type="text" value={drawDateText} onChange={e => setDrawDateText(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-bold">Countdown Target Date/Time</label>
                  <input type="datetime-local" value={countdownTarget.slice(0, 16)} onChange={e => setCountdownTarget(e.target.value + ':00')} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-3 text-xs text-white" />
                </div>
              </div>

              <button onClick={() => alert('সব তথ্য সফলভাবে সেভ ও আপডেট হয়েছে!')} className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-8 py-3 rounded-xl text-xs shadow-lg">
                Save Changes
              </button>
            </div>
          )}

          {/* TAB 2: PAYMENTS */}
          {activeAdminTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-300">Payment Verification Requests</h2>
              <div className="space-y-3">
                {pendingPayments.map(p => (
                  <div key={p.id} className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-bold text-white text-sm">{p.name} <span className="text-xs text-gray-400">({p.email})</span></p>
                      <p className="text-xs text-amber-300">Method: <strong>{p.method}</strong> | Last 4 Digits: <strong className="font-mono text-white text-sm bg-amber-500/20 px-2 py-0.5 rounded">{p.last4}</strong></p>
                      <p className="text-[11px] text-gray-400">Amount: {p.amountSar} SAR | ৳ {p.amountBdt} BDT • {p.time}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {p.status === 'Pending' ? (
                        <>
                          <button onClick={() => { setPendingPayments(pendingPayments.map(item => item.id === p.id ? {...item, status: 'Approved'} : item)); setIsUnlocked(true); alert('Payment approved! VIP paper unlocked.'); }} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1">
                            <CheckCircle size={14} /> Approve
                          </button>
                          <button onClick={() => { setPendingPayments(pendingPayments.map(item => item.id === p.id ? {...item, status: 'Rejected'} : item)); alert('Payment rejected.'); }} className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs">
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

          {/* TAB 3: PAST WIN PROOFS (DIRECT UPLOAD ONLY) */}
          {activeAdminTab === 'past' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-300">Past Winning Papers Archive</h2>
              
              <div className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-6 space-y-4 max-w-2xl">
                <h3 className="font-bold text-white text-sm">+ নতুন উইনিং পেপার আপলোড করুন</h3>
                <input type="text" placeholder="Draw Date (যেমন: 01 December 2026)" value={newPastDate} onChange={e => setNewPastDate(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                
                <div className="flex items-center gap-4">
                  {newPastImg && (
                    <img src={newPastImg} alt="Preview" className="w-16 h-20 object-cover rounded-lg border border-amber-400" />
                  )}
                  <label className="flex-grow border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-xl p-4 text-center cursor-pointer bg-black/30">
                    <ImageIcon size={20} className="text-amber-400 mx-auto mb-1" />
                    <span className="text-xs font-bold text-amber-200">{newPastImg ? 'ছবি পরিবর্তন করুন' : 'উইনিং পেপারের ছবি সিলেক্ট করুন'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, setNewPastImg)} />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="3UP (যেমন: 654)" value={newPast3up} onChange={e => setNewPast3up(e.target.value)} className="bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                  <input type="text" placeholder="DOWN (যেমন: 82)" value={newPastDown} onChange={e => setNewPastDown(e.target.value)} className="bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>

                <button onClick={() => {
                  if (!newPastDate || !newPastImg) {
                    alert('দয়া করে তারিখ লিখুন এবং ছবি আপলোড করুন।');
                    return;
                  }
                  setPastPapers([{
                    id: Date.now(),
                    date: newPastDate,
                    image: newPastImg,
                    up3: newPast3up || '---',
                    down: newPastDown || '--',
                    caption: `Verified Direct Winning VIP Paper (${newPastDate})`
                  }, ...pastPapers]);
                  setNewPastDate('');
                  setNewPastImg('');
                  setNewPast3up('');
                  setNewPastDown('');
                  alert('নতুন উইনিং পেপার সফলভাবে পাবলিশ হয়েছে!');
                }} className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs">
                  Publish Win Proof
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastPapers.map(p => (
                  <div key={p.id} className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-14 h-16 object-cover rounded-lg border border-amber-500/30" />
                      <div>
                        <p className="font-bold text-white text-xs">{p.date}</p>
                        <p className="text-[11px] text-amber-300">3UP: {p.up3} | DOWN: {p.down}</p>
                      </div>
                    </div>
                    <button onClick={() => setPastPapers(pastPapers.filter(item => item.id !== p.id))} className="text-red-400 hover:text-red-300 p-2 rounded-lg bg-red-500/10">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeAdminTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-300">Moderate Customer Reviews</h2>
              <div className="space-y-3">
                {reviews.map(r => (
                  <div key={r.id} className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-bold text-white text-sm">{r.name} <span className="text-xs text-amber-400">({r.rating} Stars)</span></p>
                      <p className="text-xs text-gray-300">"{r.comment}"</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {r.status === 'Pending' ? (
                        <button onClick={() => setReviews(reviews.map(item => item.id === r.id ? {...item, status: 'Approved'} : item))} className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                          <Eye size={14} /> Approve
                        </button>
                      ) : (
                        <button onClick={() => setReviews(reviews.map(item => item.id === r.id ? {...item, status: 'Pending'} : item))} className="bg-yellow-600 text-black font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                          <EyeOff size={14} /> Hide
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LOGIN HISTORY */}
          {activeAdminTab === 'logins' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-amber-300">Google Login History</h2>
                <button onClick={exportLoginHistoryCsv} className="bg-amber-500 text-black font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5">
                  <Download size={14} /> Download CSV
                </button>
              </div>

              <div className="bg-[#041E18] border border-amber-500/30 rounded-2xl overflow-hidden">
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

          {/* TAB 6: LOGOS & SETTINGS (DIRECT IMAGE UPLOADS ONLY - NO URL FIELDS) */}
          {activeAdminTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-amber-300">Brand Logo, Partner Profile & Settings</h2>
              
              {/* Top Header Thailand Government Lottery Logo Upload */}
              <div className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <label className="block text-xs text-amber-300 font-bold">১. উপরে Thailand Government Lottery-এর লোগো আপলোড করুন</label>
                <div className="flex items-center gap-4">
                  <img src={logoUrl} alt="Main Logo" className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover bg-black p-0.5" />
                  <label className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer inline-flex items-center gap-2 shadow-md">
                    <Upload size={15} /> লোগো আপলোড করুন
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, setLogoUrl)} />
                  </label>
                </div>
              </div>

              {/* Bottom Partner Avatar & Partner Logo Upload */}
              <div className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-5 space-y-5">
                <h3 className="text-xs text-amber-300 font-bold">২. নিচে আরিয়ান চৌধুরীর প্রোফাইল ছবি ও পাশের লোগো আপলোড করুন</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 border border-amber-500/20 rounded-xl p-4 space-y-3">
                    <span className="block text-[11px] text-gray-300 font-semibold">আরিয়ান চৌধুরীর প্রোফাইল ছবি</span>
                    <div className="flex items-center gap-3">
                      <img src={partnerAvatar} alt="Partner Avatar" className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover" />
                      <label className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-2 rounded-xl text-xs cursor-pointer inline-flex items-center gap-1.5">
                        <Upload size={14} /> ছবি আপলোড
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, setPartnerAvatar)} />
                      </label>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-amber-500/20 rounded-xl p-4 space-y-3">
                    <span className="block text-[11px] text-gray-300 font-semibold">আরিয়ান চৌধুরীর পাশের লোগো</span>
                    <div className="flex items-center gap-3">
                      <img src={partnerLogoUrl} alt="Partner Badge Logo" className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover bg-black p-0.5" />
                      <label className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-2 rounded-xl text-xs cursor-pointer inline-flex items-center gap-1.5">
                        <Upload size={14} /> লোগো আপলোড
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, setPartnerLogoUrl)} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">Partner Name</label>
                    <input type="text" value={partnerName} onChange={e => setPartnerName(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">Partner Role</label>
                    <input type="text" value={partnerRole} onChange={e => setPartnerRole(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                </div>
              </div>

              {/* Brand Title & Contact Details */}
              <div className="bg-[#041E18] border border-amber-500/30 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">Brand Title</label>
                    <input type="text" value={brandTitle} onChange={e => setBrandTitle(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">Brand Subtitle</label>
                    <input type="text" value={brandSubtitle} onChange={e => setBrandSubtitle(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">bKash Number</label>
                    <input type="text" value={bkashNumber} onChange={e => setBkashNumber(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300 font-bold">Nagad Number</label>
                    <input type="text" value={nagadNumber} onChange={e => setNagadNumber(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-bold">Imo Helpline Number</label>
                  <input type="text" value={imoNumber} onChange={e => setImoNumber(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-bold">Notice Bar Text</label>
                  <textarea rows="2" value={noticeText} onChange={e => setNoticeText(e.target.value)} className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white" />
                </div>
              </div>

              <button onClick={() => alert('সব সেটিংস এবং লোগো সফলভাবে সেভ হয়েছে!')} className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-8 py-3 rounded-xl text-xs shadow-lg">
                Save All Settings
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
