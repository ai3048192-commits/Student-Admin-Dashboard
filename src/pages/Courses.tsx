import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  PlayCircle,
  Clock,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Star,
  Users,
  Award,
  BookMarked,
  Layers,
} from "lucide-react";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all"); // all, enrolled, available

  // قائمة الأقسام المتاحة للمنصة
  const categories = [
    { id: "all", name: "كل الأقسام" },
    { id: "programming", name: "برمجة وتطوير الويب" },
    { id: "design", name: "التصميم الرقمي UI/UX" },
    { id: "database", name: "قواعد البيانات" },
    { id: "ai", name: "الذكاء الاصطناعي" },
    { id: "security", name: "الأمن السيبراني" },
    { id: "business", name: "إدارة الأعمال" },
  ];

  // بيانات الكورسات الموسعة والمليئة بالتفاصيل
  const [courses] = useState([
    {
      id: 1,
      courseName: "البرمجة بلغة جافاسكريبت المتقدمة ES6+",
      description: "احترف الجافاسكريبت الحديثة وفهم الآليات المتقدمة مثل Closures, Promises, Async/Await.",
      instructor: "م. أحمد عبد الله",
      instructorRole: "خبير تطوير واجهات أمامية",
      category: "programming",
      categoryName: "برمجة وتطوير الويب",
      level: "متقدم",
      duration: "18 ساعة",
      totalLessons: 24,
      completedLessons: 18,
      enrolledStudents: 1420,
      status: "enrolled", // مشترك بها
      imageBg: "from-blue-600 to-indigo-700",
      rating: 4.9,
      reviewsCount: 320,
      hasCertificate: true,
      price: "مجاني ضمن الاشتراك",
      progress: 75,
    },
    {
      id: 2,
      courseName: "تصميم واجهات المستخدم وتجربة المستخدم UI/UX",
      description: "تعلم مبادئ التصميم الاحترافي، تصميم النماذج الأولية باستخدام Figma، وعمل اختبارات المستخدم.",
      instructor: "أ. سارة محمود",
      instructorRole: "مصممة منتجات رقمية رائدة",
      category: "design",
      categoryName: "التصميم الرقمي UI/UX",
      level: "متوسط",
      duration: "14 ساعة",
      totalLessons: 20,
      completedLessons: 8,
      enrolledStudents: 980,
      status: "enrolled",
      imageBg: "from-blue-700 to-blue-500",
      rating: 4.8,
      reviewsCount: 215,
      hasCertificate: true,
      price: "مجاني ضمن الاشتراك",
      progress: 40,
    },
    {
      id: 3,
      courseName: "أساسيات قواعد البيانات وعمل الاستعلامات SQL",
      description: "فهم هيكلة قواعد البيانات العلائقية، كتابة استعلامات معقدة، وتحسين أداء قواعد البيانات.",
      instructor: "د. خالد عادل",
      instructorRole: "استشاري قواعد بيانات وبنية تحتية",
      category: "database",
      categoryName: "قواعد البيانات",
      level: "مبتدئ إلى متوسط",
      duration: "12 ساعة",
      totalLessons: 16,
      completedLessons: 14,
      enrolledStudents: 2150,
      status: "enrolled",
      imageBg: "from-indigo-600 to-blue-600",
      rating: 4.7,
      reviewsCount: 410,
      hasCertificate: true,
      price: "مجاني ضمن الاشتراك",
      progress: 90,
    },
    {
      id: 4,
      courseName: "تطوير تطبيقات الويب الحديثة بـ React.js",
      description: "بناء تطبيقات ويب تفاعلية وقوية باستخدام مكتبة React وموجهات النist ودورة حياة المكونات.",
      instructor: "م. إبراهيم ناصر",
      instructorRole: "مهندس برمجيات أول",
      category: "programming",
      categoryName: "برمجة وتطوير الويب",
      level: "متوسط",
      duration: "22 ساعة",
      totalLessons: 30,
      completedLessons: 6,
      enrolledStudents: 1890,
      status: "enrolled",
      imageBg: "from-blue-800 to-indigo-800",
      rating: 4.9,
      reviewsCount: 520,
      hasCertificate: true,
      price: "مجاني ضمن الاشتراك",
      progress: 20,
    },
    {
      id: 5,
      courseName: "الذكاء الاصطناعي وتطبيقات التعلم الآلي العملية",
      description: "مدخل شامل لفهم خوارزميات التعلم الآلي، بناء نماذج تنبؤية باستخدام بايثون ومكتبات الذكاء الاصطناعي.",
      instructor: "د. طارق السعيد",
      instructorRole: "باحث ومطور في الذكاء الاصطناعي",
      category: "ai",
      categoryName: "الذكاء الاصطناعي",
      level: "متقدم",
      duration: "25 ساعة",
      totalLessons: 25,
      completedLessons: 0,
      enrolledStudents: 740,
      status: "available", // متاح للاشتراك
      imageBg: "from-blue-500 to-indigo-500",
      rating: 5.0,
      reviewsCount: 180,
      hasCertificate: true,
      price: "450 ر.س",
      progress: 0,
    },
    {
      id: 6,
      courseName: "الأمن السيبراني وأساسيات حماية الأنظمة",
      description: "تعرف على ثغرات الويب الشائعة، أساليب الاختراق الأخلاقي، وكيفية تأمين وحماية الخوادم والبيانات.",
      instructor: "م. عمر الفاروق",
      instructorRole: "خبير أمن معلومات واختبار اختراق",
      category: "security",
      categoryName: "الأمن السيبراني",
      level: "متوسط",
      duration: "16 ساعة",
      totalLessons: 22,
      completedLessons: 0,
      enrolledStudents: 1120,
      status: "available",
      imageBg: "from-indigo-700 to-blue-900",
      rating: 4.8,
      reviewsCount: 290,
      hasCertificate: true,
      price: "350 ر.س",
      progress: 0,
    },
    {
      id: 7,
      courseName: "إدارة المشاريع الرقمية والفرق التقنية",
      description: "منهجيات Agile و Scrum، كيفية إدارة المهام البرمجية، وتوجيه فرق العمل التقنية بكفاءة عالية.",
      instructor: "أ. ريم عبد الرحيم",
      instructorRole: "مديرة مشاريع معتمدة PMP",
      category: "business",
      categoryName: "إدارة الأعمال",
      level: "مبتدئ",
      duration: "10 ساعات",
      totalLessons: 14,
      completedLessons: 0,
      enrolledStudents: 850,
      status: "available",
      imageBg: "from-blue-600 to-cyan-700",
      rating: 4.6,
      reviewsCount: 140,
      hasCertificate: true,
      price: "250 ر.س",
      progress: 0,
    }
  ]);

  // فلترة الكورسات حسب البحث، الفئة، وحالة الاشتراك
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "enrolled" && course.status === "enrolled") ||
      (filterStatus === "available" && course.status === "available");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-12" dir="rtl">
      
      {/* 1. رأس الصفحة الترحيفي */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full flex items-center gap-1.5 border border-white/25">
                <Sparkles size={13} />
                أكاديمية الكورسات المتكاملة - منصة zed
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
              دليلك الشامل لجميع الكورسات والمواد 📚
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              استعرض موادك المسجلة لمتابعة تحصيلك العلمي، أو استكشف مسارات تدريبية جديدة مع نخبة من الخبراء والمعلمين لرفع كفاءتك المهنية.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/20">
            <div className="px-4 py-1.5 text-center border-l border-white/20">
              <span className="block text-xl font-black">4</span>
              <span className="text-[10px] text-blue-100">نشطة حالياً</span>
            </div>
            <div className="px-4 py-1.5 text-center">
              <span className="block text-xl font-black">{courses.length}</span>
              <span className="text-[10px] text-blue-100">إجمالي الكورسات</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. شريط البحث وأزرار الفلترة المتقدمة */}
      <div className="bg-blue-50/50 border-2 border-blue-100 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* حقل البحث */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-blue-600">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم الكورس، المحاضر، أو الوصف..."
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-blue-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-xs"
            />
          </div>

          {/* فلتر حالة الاشتراك (الكل / المشترك بها / المتاحة للاشتراك) */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-blue-200 w-full md:w-auto justify-center">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "all" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilterStatus("enrolled")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "enrolled" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              كورساتي المسجلة
            </button>
            <button
              onClick={() => setFilterStatus("available")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "available" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              المتاحة للاشتراك
            </button>
          </div>
        </div>

        {/* فئات الأقسام الأفقية */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-blue-100/60 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 ml-1">
            <Layers size={14} className="text-blue-600" /> التصنيفات:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
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

      {/* 3. شبكة عرض الكورسات التفصيلية */}
      {filteredCourses.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-blue-50/30 border-2 border-blue-100 rounded-3xl">
          <BookOpen size={40} className="text-blue-600 mx-auto" />
          <p className="text-sm font-bold text-slate-700">عذراً، لم نتمكن من العثور على كورسات تطابق خيارات البحث الحالية.</p>
          <button
            onClick={() => { setSearchTerm(""); setFilterCategory("all"); setFilterStatus("all"); }}
            className="text-xs font-bold text-blue-600 underline hover:text-blue-800"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border-2 border-blue-100 rounded-3xl overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* ترويسة الكورس الملونة */}
              <div className={`p-5 bg-gradient-to-r ${course.imageBg} text-white relative`}>
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold border border-white/20">
                    {course.level}
                  </span>
                </div>

                <div className="space-y-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                    {course.categoryName}
                  </span>
                  <h3 className="text-base font-black tracking-wide line-clamp-1">{course.courseName}</h3>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs text-blue-100">
                  <div>
                    <span className="font-bold block text-white">{course.instructor}</span>
                    <span className="text-[10px] opacity-90">{course.instructorRole}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shrink-0">
                    <Star size={13} className="fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                    <span className="text-[10px] opacity-75">({course.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* جسم الكارت: التفاصيل والبيانات */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* وصف مختصر للكورس */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* معلومات إضافية (المدة، عدد الدروس، عدد الطلاب، الشهادة) */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-50 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-600" /> {course.duration} ({course.totalLessons} درس)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-blue-600" /> {course.enrolledStudents} طالب مسجل
                    </span>
                    <span className="flex items-center gap-1.5 col-span-2">
                      <Award size={13} className="text-blue-600" /> {course.hasCertificate ? "يمنح شهادة إتمام معتمدة" : "بدون شهادة"}
                    </span>
                  </div>

                  {/* شريط التقدم (للمشترك بها) أو السعر (للمتاحة) */}
                  {course.status === "enrolled" ? (
                    <div className="space-y-1.5 pt-2 border-t border-blue-50">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>نسبة الإنجاز ({course.completedLessons}/{course.totalLessons} درس)</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-blue-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-blue-50 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-500">سعر الاستثمار:</span>
                      <span className="font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        {course.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* أزرار الإجراء السريعة */}
                <div className="pt-3 border-t border-blue-100/60">
                  {course.status === "enrolled" ? (
                    <Link
                      to="/videos"
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold shadow-xs"
                    >
                      <PlayCircle size={16} />
                      <span>متابعة الدروس ومشاهدة الفيديو</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => alert(`تم إرسال طلب الاشتراك في كورس: ${course.courseName}`)}
                      className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold"
                    >
                      <GraduationCap size={16} />
                      <span>الاشتراك في الكورس الآن</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}