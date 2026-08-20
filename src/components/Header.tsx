import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, GraduationCap, Bell, Search, BookOpen, X, Award, User } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // قائمة العناصر والمسارات الحقيقية الموجودة في التطبيق
  const searchResults = [
    { id: 1, title: 'صفحة الكورسات والدبلومات', type: 'صفحة', path: '/courses', icon: <BookOpen size={14} /> },
    { id: 2, title: 'الملف الشخصي وإعدادات الحساب', type: 'صفحة', path: '/profile', icon: <User size={14} /> },
    { id: 3, title: 'الشهادات المعتمدة', type: 'صفحة', path: '/certificates', icon: <Award size={14} /> },
    { id: 4, title: 'دبلوم تطوير الويب المتقدم Full-Stack', type: 'كورس', path: '/courses/full-stack', icon: <BookOpen size={14} /> },
    { id: 5, title: 'دبلوم تصميم واجهات وتجربة المستخدم UI/UX', type: 'كورس', path: '/courses/ui-ux', icon: <BookOpen size={14} /> },
  ];

  // تصفية النتائج بناءً على الكتابة
  const filteredResults = searchQuery.trim() === '' 
    ? [] 
    : searchResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // إغلاق نافذة البحث عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // وظيفة الانتقال الفعلي عند الضغط على النتيجة
  const handleSelectResult = (path: string) => {
    navigate(path); // التوجيه الفعلي للصفحة الحقيقية
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 border-b border-slate-200 transition-all shadow-xs w-full" dir="rtl">
      
      {/* 1. الجانب الأيمن: زر القائمة، الشعار، وشريط البحث التفاعلي */}
      <div className="flex items-center gap-4 flex-1 max-w-xl relative" ref={searchRef}>
        <button 
          onClick={onOpenSidebar} 
          aria-label="فتح القائمة الجانبية"
          className="lg:hidden p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200 shrink-0"
        >
          <Menu size={20} />
        </button>

        {/* الشعار للموبايل */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-sm shadow-blue-600/30">
            <GraduationCap size={18} />
          </div>
          <span className="text-base font-black text-slate-900 tracking-wider">zed</span>
        </div>

        {/* شريط البحث الحقيقي */}
        <div className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl w-full max-w-md hover:border-blue-400 focus-within:border-blue-600 focus-within:bg-white transition-all shadow-2xs relative">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="ابحث عن صفحة، كورس، أو قسم..." 
            className="bg-transparent text-xs text-slate-700 placeholder:text-slate-400 outline-none w-full font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}

          {/* نافذة النتائج المنسدلة المرتبطة بمسارات حقيقية */}
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto">
              <div className="p-2.5 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500">
                نتائج البحث الفعلي عن: "{searchQuery}"
              </div>
              {filteredResults.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {filteredResults.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => handleSelectResult(item.path)}
                      className="p-3 hover:bg-blue-50/60 transition-all cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{item.title}</p>
                          <span className="text-[10px] text-blue-600 font-semibold">{item.path}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 font-semibold">
                  عذراً، لم نجد أي تطابق حقيقي لبحثك.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. الجانب الأيسر: الإشعارات ومعلومات الطالب */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* زر الإشعارات */}
        <button 
          aria-label="الإشعارات"
          onClick={() => navigate('/notifications')}
          className="relative p-2.5 bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl border border-slate-200 transition-all"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
        </button>

        {/* فاصل */}
        <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />

        {/* معلومات الطالب (تنقل لصفحة البروفايل عند النقر) */}
        <div 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-[2px] shadow-md shadow-blue-600/20 flex items-center justify-center text-white font-bold shrink-0 group-hover:scale-105 transition-all">
            <span className="text-sm">أ</span>
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 tracking-wide group-hover:text-blue-600 transition-all">أحمد محمد</p>
            <p className="text-[10px] text-blue-600 font-semibold tracking-wider uppercase">
              Student Account
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}