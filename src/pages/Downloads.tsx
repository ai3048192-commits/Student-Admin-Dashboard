import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  Search,
  BookOpen,
  FileCode,
  FileSpreadsheet,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  // قاعدة بيانات ضخمة ومجهزة بمحتوى نصي حقيقي داخل الملفات لكي يتم تحميلها فعلياً
  const [downloads] = useState([
    {
      id: 1,
      title: "دليل الجافاسكريبت المتقدم ES6+ الشامل والمحدث",
      courseName: "البرمجة بلغة جافاسكريبت المتقدمة",
      category: "programming",
      type: "pdf",
      typeName: "ملف PDF مرجعي",
      size: "8.4 ميجابايت",
      downloadsCount: 1250,
      date: "15 أغسطس 2026",
      icon: FileText,
      color: "bg-red-50 text-red-600 border-red-200",
      content: "--- دليل الجافاسكريبت المتقدم ES6+ ---\n1. Arrow Functions\n2. Destructuring\n3. Promises & Async/Await\n4. Modules\nتم إعداد هذا الدليل خصيصاً لطلاب منصة zed التعليمية.",
      fileExtension: "txt", // سنصدّره كملف نصي منظم يمكن فتحه بكل سهولة
    },
    {
      id: 2,
      title: "الأكواد المصدرية لمشروع التطبيق العملي الكامل",
      courseName: "البرمجة بلغة جافاسكريبت المتقدمة",
      category: "programming",
      type: "code",
      typeName: "أكواد برمجية (Source Code)",
      size: "4.2 ميجابايت",
      downloadsCount: 940,
      date: "12 أغسطس 2026",
      icon: FileCode,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      content: "// الأكواد المصدرية لمشروع الجافاسكريبت\nconsole.log('Welcome to zed Platform App!');\nconst app = () => {\n  console.log('Application is running successfully...');\n};\napp();",
      fileExtension: "js",
    },
    {
      id: 3,
      title: "كتيب إرشادات وتصميم واجهات المستخدم UI/UX الاحترافية",
      courseName: "تصميم واجهات المستخدم UI/UX",
      category: "design",
      type: "pdf",
      typeName: "ملف PDF مرجعي",
      size: "15.1 ميجابايت",
      downloadsCount: 810,
      date: "10 أغسطس 2026",
      icon: FileText,
      color: "bg-red-50 text-red-600 border-red-200",
      content: "--- كتيب مبادئ وتصميم واجهات المستخدم UI/UX ---\n- نظرية الألوان (Color Theory)\n- التسلسل الهرمي البصري (Visual Hierarchy)\n- دراسة تجربة المستخدم (User Research & Wireframing)",
      fileExtension: "txt",
    },
    {
      id: 4,
      title: "ملخص أهم استعلامات قواعد البيانات SQL Cheatsheet",
      courseName: "أساسيات قواعد البيانات SQL",
      category: "database",
      type: "notes",
      typeName: "ملخص ومذكرات سريعة",
      size: "2.1 ميجابايت",
      downloadsCount: 1650,
      date: "05 أغسطس 2026",
      icon: FileSpreadsheet,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      content: "--- SQL Cheatsheet ---\nSELECT * FROM users;\nINSERT INTO users (name, email) VALUES ('Ahmed', 'ahmed@zed.com');\nUPDATE users SET name = 'Ali' WHERE id = 1;\nDELETE FROM users WHERE id = 1;",
      fileExtension: "sql",
    },
    {
      id: 5,
      title: "أمثلة عملية وتمارين تطبيقية لمكتبة React.js",
      courseName: "تطوير تطبيقات الويب بـ React.js",
      category: "programming",
      type: "code",
      typeName: "أكواد برمجية (Source Code)",
      size: "6.5 ميجابايت",
      downloadsCount: 720,
      date: "01 أغسطس 2026",
      icon: FileCode,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      content: "import React from 'react';\nexport default function App() {\n  return (\n    <div>\n      <h1>Hello from zed React Course!</h1>\n    </div>\n  );\n}",
      fileExtension: "jsx",
    },
    {
      id: 6,
      title: "شرح خوارزميات الذكاء الاصطناعي الأساسية ونماذج بايثون",
      courseName: "الذكاء الاصطناعي وتطبيقات التعلم الآلي",
      category: "ai",
      type: "pdf",
      typeName: "ملف PDF مرجعي",
      size: "11.8 ميجابايت",
      downloadsCount: 530,
      date: "28 يوليو 2026",
      icon: FileText,
      color: "bg-red-50 text-red-600 border-red-200",
      content: "--- مقدمة في خوارزميات الذكاء الاصطناعي ---\nimport numpy as np\nprint('AI Model Initialized successfully on zed platform.')",
      fileExtension: "py",
    },
    {
      id: 7,
      title: "ملخص ثغرات الويب الشائعة وأساليب الحماية المتقدمة",
      courseName: "الأمن السيبراني وأساسيات حماية الأنظمة",
      category: "security",
      type: "notes",
      typeName: "ملخص ومذكرات سريعة",
      size: "3.4 ميجابايت",
      downloadsCount: 420,
      date: "25 يوليو 2026",
      icon: FileSpreadsheet,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      content: "--- ملخص الأمن السيبراني ---\n1. SQL Injection Prevention\n2. XSS Protection\n3. Hashing Passwords using Bcrypt",
      fileExtension: "txt",
    },
    {
      id: 8,
      title: "نماذج وقوالب إدارة المشاريع Agile و Scrum بـ Excel",
      courseName: "إدارة المشاريع الرقمية والفرق التقنية",
      category: "business",
      type: "code",
      typeName: "قوالب وأدوات عمل",
      size: "5.0 ميجابايت",
      downloadsCount: 890,
      date: "20 يوليو 2026",
      icon: FileCode,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      content: "Sprint Name,Task Title,Assignee,Status\nSprint 1,Setup Environment,Ahmed,Done\nSprint 1,API Integration,Fatma,In Progress",
      fileExtension: "csv",
    },
  ]);

  // دالة تصفية الملفات
  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // دالة التحميل الفعلي الميكانيكي الحقيقي 100%
  const handleRealDownload = (item: typeof downloads[0]) => {
    setDownloadingId(item.id);

    setTimeout(() => {
      // إنشاء Blob يحتوي على محتوى الملف
      const blob = new Blob([item.content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      
      // إنشاء عنصر رابط وهمي لتنفيذ التحميل التلقائي
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.title.replace(/\s+/g, "_")}.${item.fileExtension}`;
      document.body.appendChild(link);
      link.click();
      
      // تنظيف الرابط بعد الانتهاء
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadingId(null);
    }, 800); // محاكاة سرعة التحميل بشكل احترافي
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-16" dir="rtl">
      
      {/* 1. رأس الصفحة الترحيفي */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full flex items-center gap-1.5 border border-white/25">
                <Sparkles size={13} />
                مركز التحميل والمصادر - منصة zed (تحميل فعلي مباشر)
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
              المذكرات، الكتب، والأكواد المصدرية 📂
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              اضغط على أي زر تحميل لتحفظ الملف مباشرة على جهازك وتستعرض محتواه البرمجي أو المرجعي في أي وقت بدون إنترنت.
            </p>
          </div>

          <Link
            to="/courses"
            className="px-5 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-2xl text-xs font-black shadow-lg transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <ArrowRight size={16} />
            <span>العودة للكورسات</span>
          </Link>
        </div>
      </div>

      {/* 2. شريط البحث والتحكم المتقدم (الفلاتر) */}
      <div className="bg-blue-50/50 border-2 border-blue-100 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-blue-600">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم الملف أو الكورس..."
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-blue-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-blue-200 w-full md:w-auto justify-center overflow-x-auto">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                filterType === "all" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilterType("pdf")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                filterType === "pdf" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              ملفات PDF
            </button>
            <button
              onClick={() => setFilterType("code")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                filterType === "code" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              أكواد برمجية
            </button>
            <button
              onClick={() => setFilterType("notes")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                filterType === "notes" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              ملخصات
            </button>
          </div>
        </div>

        {/* فلاتر الأقسام التخصصية */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-blue-100/60 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 shrink-0 ml-1">التصنيف:</span>
          {[
            { id: "all", name: "كل الأقسام" },
            { id: "programming", name: "برمجة وتطوير الويب" },
            { id: "design", name: "التصميم UI/UX" },
            { id: "database", name: "قواعد البيانات" },
            { id: "ai", name: "الذكاء الاصطناعي" },
            { id: "security", name: "الأمن السيبراني" },
            { id: "business", name: "إدارة الأعمال" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterCategory === cat.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. شبكة عرض الملفات والمذكرات */}
      {filteredDownloads.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-blue-50/30 border-2 border-blue-100 rounded-3xl">
          <FileText size={40} className="text-blue-600 mx-auto" />
          <p className="text-sm font-bold text-slate-700">عذراً، لم نتمكن من العثور على ملفات تطابق خيارات البحث الحالية.</p>
          <button
            onClick={() => { setSearchTerm(""); setFilterType("all"); setFilterCategory("all"); }}
            className="text-xs font-bold text-blue-600 underline hover:text-blue-800"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDownloads.map((item) => {
            const IconComponent = item.icon;
            const isDownloading = downloadingId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white border-2 border-blue-100 rounded-3xl p-5 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`p-2.5 rounded-2xl border ${item.color} shadow-xs`}>
                      <IconComponent size={20} />
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                      {item.typeName}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-blue-600 font-bold flex items-center gap-1">
                      <BookOpen size={13} /> {item.courseName}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-50 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>الحجم: {item.size}</span>
                    <span>التحميلات: {item.downloadsCount} مرة</span>
                  </div>

                  {/* زر التحميل الفعلي الحقيقي */}
                  <button
                    onClick={() => handleRealDownload(item)}
                    disabled={isDownloading}
                    className={`w-full py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold shadow-xs ${
                      isDownloading
                        ? "bg-emerald-600 text-white cursor-wait"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <CheckCircle2 size={16} className="animate-spin" />
                        <span>جاري تجهيز وتحميل الملف...</span>
                      </>
                    ) : (
                      <>
                        <Download size={15} />
                        <span>تحميل الملف الآن</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}