import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  FileText,
  Bookmark,
  Share2,
  Download,
  Send,
  User,
  Star,
  Clock,
  Users,
  Award,
  Sparkles,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function VideosPage() {
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [activeTab, setActiveTab] = useState("content");
  const [newComment, setNewComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareNotification, setShareNotification] = useState(false);
  
  // تتبع الوحدات المفتوحة والمغلقة في قائمة المنهج الجانبية
  const [openModules, setOpenModules] = useState<{ [key: number]: boolean }>({ 1: true, 2: true });

  // إحصائيات الكورس الحالية
  const courseStats = {
    progress: 75,
    totalHours: "18 ساعة",
    enrolledStudents: 1420,
    rating: 4.9,
    completedLessonsCount: 4,
    totalLessonsCount: 6,
  };

  // وحدات ودروس الكورس كاملة
  const [courseModules, setCourseModules] = useState([
    {
      id: 1,
      moduleTitle: "الوحدة الأولى: مدخل وأساسيات المادة وتأسيس البيئة",
      lessons: [
        {
          id: 1,
          title: "الدرس 1: الترحيب بنظرة عامة على محتوى الكورس",
          duration: "10:15 دقيقة",
          isCompleted: true,
          isLocked: false,
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: 2,
          title: "الدرس 2: إعداد بيئة العمل والأدوات المطلوبة باحترافية",
          duration: "18:30 دقيقة",
          isCompleted: true,
          isLocked: false,
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: 3,
          title: "الدرس 3: المفاهيم الأساسية وكيفية تدفق البيانات والذاكرة",
          duration: "25:00 دقيقة",
          isCompleted: true,
          isLocked: false,
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      ],
    },
    {
      id: 2,
      moduleTitle: "الوحدة الثانية: التعمق وبناء التطبيقات العملية المتقدمة",
      lessons: [
        {
          id: 4,
          title: "الدرس 4: بناء أول تطبيق مصغر خطوة بخطوة وتطبيق الأكواد",
          duration: "32:10 دقيقة",
          isCompleted: true,
          isLocked: false,
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: 5,
          title: "الدرس 5: معالجة الأخطاء الشائعة وحل المشكلات البرمجية",
          duration: "20:45 دقيقة",
          isCompleted: false,
          isLocked: false,
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: 6,
          title: "الدرس 6: التعامل مع الواجهات البرمجية APIs وربط قواعد البيانات",
          duration: "40:00 دقيقة",
          isCompleted: false,
          isLocked: true,
          videoUrl: "",
        },
      ],
    },
  ]);

  // كورسات مقترحة لتطوير المهارات (بنفس الكارت التفصيلي المطلوب)
  const [suggestedCourses] = useState([
    {
      id: 7,
      courseName: "إدارة المشاريع الرقمية والفرق التقنية",
      description: "منهجيات Agile و Scrum، كيفية إدارة المهام البرمجية، وتوجيه فرق العمل التقنية بكفاءة عالية.",
      instructor: "أ. ريم عبد الرحيم",
      instructorRole: "مديرة مشاريع معتمدة PMP",
      categoryName: "إدارة الأعمال",
      level: "مبتدئ",
      duration: "10 ساعات",
      totalLessons: 14,
      enrolledStudents: 850,
      rating: 4.6,
      reviewsCount: 140,
      hasCertificate: true,
      price: "250 ر.س",
      imageBg: "from-blue-600 to-cyan-700",
    },
    {
      id: 5,
      courseName: "الذكاء الاصطناعي وتطبيقات التعلم الآلي العملية",
      description: "مدخل شامل لفهم خوارزميات التعلم الآلي، بناء نماذج تنبؤية باستخدام بايثون ومكتبات الذكاء الاصطناعي.",
      instructor: "د. طارق السعيد",
      instructorRole: "باحث ومطور في الذكاء الاصطناعي",
      categoryName: "الذكاء الاصطناعي",
      level: "متقدم",
      duration: "25 ساعة",
      totalLessons: 25,
      enrolledStudents: 740,
      rating: 5.0,
      reviewsCount: 180,
      hasCertificate: true,
      price: "450 ر.س",
      imageBg: "from-blue-500 to-indigo-500",
    },
    {
      id: 6,
      courseName: "الأمن السيبراني وأساسيات حماية الأنظمة",
      description: "تعرف على ثغرات الويب الشائعة، أساليب الاختراق الأخلاقي، وكيفية تأمين وحماية الخوادم والبيانات.",
      instructor: "م. عمر الفاروق",
      instructorRole: "خبير أمن معلومات واختبار اختراق",
      categoryName: "الأمن السيبراني",
      level: "متوسط",
      duration: "16 ساعة",
      totalLessons: 22,
      enrolledStudents: 1120,
      rating: 4.8,
      reviewsCount: 290,
      hasCertificate: true,
      price: "350 ر.س",
      imageBg: "from-indigo-700 to-blue-900",
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "محمد علي",
      time: "منذ ساعتين",
      text: "شرح ممتاز جداً يا بشمهندس، النقطة الخاصة بإعداد بيئة العمل وضحت لي أمور كتير.",
    },
    {
      id: 2,
      user: "فاطمة الزهراء",
      time: "منذ أمس",
      text: "هل فيه مصادر إضافية ممكن نقراها عشان نثبت المعلومات دي؟",
    },
  ]);

  const allLessons = courseModules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === currentLessonId) || allLessons[0];

  // دالة إضافة تعليق جديد
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        user: "أنت (طالب منصة zed)",
        time: "الآن",
        text: newComment,
      },
    ]);
    setNewComment("");
  };

  // تبديل فتح وإغلاق الوحدات
  const toggleModule = (id: number) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // حفظ الدرس
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    alert(isBookmarked ? "تم إزالة الدرس من القائمة المحفوظة." : "تم حفظ الدرس بنجاح في قائمتك المفضلة!");
  };

  // مشاركة الدرس
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareNotification(true);
    setTimeout(() => setShareNotification(false), 3000);
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen 
   " dir="rtl">
      
      {/* إشعار المشاركة العائم */}
      {shareNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50
         bg-blue-600 text-white px-5 py-2.5 rounded-2xl shadow-xl
          text-xs font-bold animate-bounce">
          تم نسخ رابط الدرس الحالى بنجاح! 🔗
        </div>
      )}

      {/* شريط التنقل العلوي البسيط */}
      <div className="flex items-center justify-between bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <Link
            to="/courses"
            className="p-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 rounded-xl border border-blue-200 transition-all shadow-xs flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowRight size={16} />
            <span>العودة لقائمة الكورسات</span>
          </Link>
          <div className="h-5 w-px bg-blue-200 hidden sm:block" />
          <div>
            <span className="text-[10px] text-blue-600 font-bold block">كورس البرمجة بلغة جافاسكريبت المتقدمة</span>
            <h1 className="text-sm sm:text-base font-black text-slate-800">{currentLesson.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-xl border transition-all text-xs font-bold flex items-center gap-1 ${
              isBookmarked ? "bg-blue-600 text-white border-blue-600" : "bg-white hover:bg-blue-50 text-slate-600 border-blue-200"
            }`}
          >
            <Bookmark size={15} />
            <span className="hidden md:inline">{isBookmarked ? "محفوظ" : "حفظ الدرس"}</span>
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white hover:bg-blue-50 text-slate-600 rounded-xl border border-blue-200 transition-all text-xs font-bold flex items-center gap-1"
          >
            <Share2 size={15} />
            <span className="hidden md:inline">مشاركة</span>
          </button>
        </div>
      </div>

      {/* لوحة الإحصائيات السريعة للكورس */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-xs">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-bold block">إجمالي مدة الكورس</span>
            <span className="text-sm font-black text-slate-800">{courseStats.totalHours}</span>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-xs">
            <Users size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-bold block">الطلاب المسجلين</span>
            <span className="text-sm font-black text-slate-800">{courseStats.enrolledStudents} طالب</span>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-xs">
            <Star size={20} className="fill-white" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-bold block">تقييم الكورس</span>
            <span className="text-sm font-black text-slate-800">{courseStats.rating} / 5.0</span>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-xs">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-bold block">نسبة إنجازك</span>
            <span className="text-sm font-black text-slate-800">{courseStats.progress}%</span>
          </div>
        </div>
      </div>

      {/* التخطيط الرئيسي: المشغل والمحتوى + قائمة الدروس الجانبية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* مشغل الفيديو والتبويبات (عمودين) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* مشغل الفيديو */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border-2 border-blue-900/20 aspect-video relative flex items-center justify-center">
            {currentLesson.isLocked ? (
              <div className="text-center space-y-3 p-6 text-white">
                <Lock size={48} className="mx-auto text-blue-400" />
                <h3 className="text-lg font-black">هذا الدرس مغلق حالياً</h3>
                <p className="text-xs text-slate-300 max-w-sm">يجب عليك إتمام الدروس السابقة بالترتيب لفتح هذا الدرس واستكمال مشاهدة المحتوى.</p>
              </div>
            ) : (
              <video
                key={currentLesson.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"
              >
                <source src={currentLesson.videoUrl} type="video/mp4" />
                متصفحك لا يدعم عرض الفيديو.
              </video>
            )}
          </div>

          {/* تبويبات المحتوى والمصادر والأسئلة */}
          <div className="bg-white border-2 border-blue-100 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-blue-100 pb-3">
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "content" ? "bg-blue-600 text-white shadow-xs" : "bg-blue-50/50 text-slate-600 hover:bg-blue-100"
                }`}
              >
                ملخص الدرس والمصادر
              </button>
              <button
                onClick={() => setActiveTab("discussion")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "discussion" ? "bg-blue-600 text-white shadow-xs" : "bg-blue-50/50 text-slate-600 hover:bg-blue-100"
                }`}
              >
                النقاشات والأسئلة ({comments.length})
              </button>
            </div>

            {activeTab === "content" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-slate-800">وصف ومحاور الدرس الحالي:</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    في هذا الدرس ({currentLesson.title}) سنتناول شرح تفصيلي وعملي، مع استعراض أهم الأفكار البرمجية وتطبيقها بشكل مباشر لضمان استيعابها بالكامل.
                  </p>
                </div>

                <div className="pt-3 border-t border-blue-50 space-y-2">
                  <h3 className="text-sm font-black text-slate-800">الملفات المرفقة:</h3>
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <FileText size={18} className="text-blue-600" />
                      <div>
                        <span className="text-xs font-bold block text-slate-800">ملف الأكواد المصدرية (Source Code).zip</span>
                        <span className="text-[10px] text-slate-500">الحجم: 4.2 ميجابايت</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert("جاري تحميل ملف الأكواد بنجاح...")}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <Download size={14} />
                      <span>تحميل</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "discussion" && (
              <div className="space-y-4">
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="اكتب سؤالك أو استفسارك حول الدرس..."
                    className="flex-1 px-4 py-2 bg-blue-50/40 border border-blue-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                  >
                    <Send size={14} />
                    <span>إرسال</span>
                  </button>
                </form>

                <div className="space-y-3 pt-2">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3.5 bg-blue-50/30 border border-blue-100 rounded-2xl space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-900 flex items-center gap-1.5">
                          <User size={13} className="text-blue-600" /> {comment.user}
                        </span>
                        <span className="text-[10px] text-slate-400">{comment.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed pr-5">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* قائمة وحدات ودروس الكورس الجانبية (مع إمكانية الفتح والإغلاق وتغيير الدرس) */}
        <div className="space-y-4">
          <div className="bg-white border-2 border-blue-100 rounded-3xl p-5 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <BookOpen size={16} className="text-blue-600" /> محتوى المنهج الدراسي
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                {courseStats.completedLessonsCount} / {courseStats.totalLessonsCount} مكتمل
              </span>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pl-1">
              {courseModules.map((module) => {
                const isOpen = openModules[module.id];
                return (
                  <div key={module.id} className="space-y-2 border border-blue-100 rounded-2xl p-2 bg-blue-50/20">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between text-xs font-black text-blue-900 p-2 rounded-xl bg-blue-50/80 hover:bg-blue-100/70 transition-all"
                    >
                      <span>{module.moduleTitle}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isOpen && (
                      <div className="space-y-1.5 pr-2 pt-1">
                        {module.lessons.map((lesson) => {
                          const isSelected = lesson.id === currentLessonId;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => !lesson.isLocked && setCurrentLessonId(lesson.id)}
                              className={`w-full text-right p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                isSelected
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                  : lesson.isLocked
                                  ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                                  : "bg-white hover:bg-blue-50/50 text-slate-700 border-blue-100"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                {lesson.isLocked ? (
                                  <Lock size={15} className="shrink-0 text-slate-400" />
                                ) : lesson.isCompleted ? (
                                  <CheckCircle2 size={15} className={`shrink-0 ${isSelected ? "text-white" : "text-blue-600"}`} />
                                ) : (
                                  <PlayCircle size={15} className={`shrink-0 ${isSelected ? "text-white" : "text-blue-600"}`} />
                                )}
                                <div className="truncate">
                                  <span className="text-xs font-bold block truncate">{lesson.title}</span>
                                  <span className={`text-[10px] block ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* قسم الكورسات المقترحة لتطوير مهاراتك 🚀 (بالكارت التفصيلي المطلوب بالظبط) */}
      <div className="pt-8 border-t-2 border-blue-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1 mb-1">
              <Sparkles size={14} /> مسارات تدريبية مقترحة
            </span>
            <h2 className="text-xl font-black text-slate-800">كورسات مقترحة لتطوير مهاراتك 🚀</h2>
          </div>
          <Link
            to="/courses"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>استعراض كل الكورسات</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedCourses.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-blue-100 rounded-3xl overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* ترويسة الكارت */}
              <div className={`p-5 bg-gradient-to-r ${item.imageBg} text-white relative`}>
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/25 backdrop-blur-md rounded-lg text-[10px] font-bold border border-white/20">
                    {item.level}
                  </span>
                </div>

                <div className="space-y-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-white/25 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                    {item.categoryName}
                  </span>
                  <h3 className="text-base font-black tracking-wide line-clamp-1">{item.courseName}</h3>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs text-blue-100">
                  <div>
                    <span className="font-bold block text-white">{item.instructor}</span>
                    <span className="text-[10px] opacity-90">{item.instructorRole}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shrink-0">
                    <Star size={13} className="fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                    <span className="text-[10px] opacity-75">({item.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* تفاصيل الكارت */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-50 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-600" /> {item.duration} ({item.totalLessons} درس)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-blue-600" /> {item.enrolledStudents} طالب مسجل
                    </span>
                    <span className="flex items-center gap-1.5 col-span-2">
                      <Award size={13} className="text-blue-600" /> {item.hasCertificate ? "يمنح شهادة إتمام معتمدة" : "بدون شهادة"}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-blue-50 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">سعر الاستثمار:</span>
                    <span className="font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-100/60">
                  <button
                    onClick={() => alert(`تم إرسال طلب الاشتراك في كورس: ${item.courseName}`)}
                    className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold shadow-xs"
                  >
                    <GraduationCap size={16} />
                    <span>الاشتراك في الكورس الآن</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}