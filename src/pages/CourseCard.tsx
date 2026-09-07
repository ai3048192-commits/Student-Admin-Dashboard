import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  PlayCircle,
  GraduationCap,
  Sparkles,
  Star,
  Layers,
  X,
  Smartphone,
  Building2,
  Upload,
  Check
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCourseToSubscribe, setSelectedCourseToSubscribe] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("vodafone");
  const [studentNameInput, setStudentNameInput] = useState("");
  const [studentCodeInput, setStudentCodeInput] = useState("");
  const [paymentNumberInput, setPaymentNumberInput] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSupabaseCourses = async () => {
    try {
      setLoading(true);

      // 1. جلب الكورسات
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .order("id", { ascending: false });
      
      if (coursesError) throw coursesError;

      // 2. جلب بيانات المعلم من جدول teachers_profile (الاسم الشخصي)
      const { data: teacherData, error: teacherError } = await supabase
        .from("teachers_profile")
        .select("name")
        .maybeSingle();

      if (teacherError) console.error("Error fetching teacher profile:", teacherError.message);
      
      const realTeacherName = teacherData?.name || "المعلم";

      // 3. جلب الاشتراكات
      const { data: subsData, error: subsError } = await supabase
        .from("subscriptions")
        .select("course_id, status");

      if (subsError) console.error("Error fetching subscriptions:", subsError.message);

      const activeCourseIds = new Set(
        (subsData || [])
          .filter((sub: any) => sub.status === "active")
          .map((sub: any) => sub.course_id)
      );

      if (coursesData) {
        const formattedSupabaseCourses = coursesData.map((item: any) => {
          let displayPrice = "مجاني بالكامل";
          let rawPriceValue = item.price || "0";
          if (!item.is_free) {
            displayPrice = item.price !== null && item.price !== undefined && item.price !== "" 
              ? `${item.price} ج.م` 
              : "مدفوع برسوم";
          }

          const isEnrolled = activeCourseIds.has(item.id);

          // تحديد اسم المعلم (إذا كان مسجلاً بالكورس أو جلب الاسم الحقيقي من الملف الشخصي)
          const courseInstructor = item.instructor && item.instructor !== "المعلم" ? item.instructor : realTeacherName;

          return {
            id: item.id,
            courseName: item.course_name || "بدون اسم",
            description: item.description || "لا يوجد وصف مضاف لهذا الكورس حالياً.",
            instructor: courseInstructor,
            instructorRole: "محاضر معتمد",
            category: item.course_specialty || "عام",
            categoryName: item.course_specialty || "عام",
            level: "متاحة الآن",
            duration: item.show_times || "مفتوح دائماً",
            totalLessons: item.video_count || 0,
            status: isEnrolled ? "enrolled" : "available",
            imageBg: "from-blue-600 to-indigo-700",
            rating: 4.8,
            reviewsCount: 15,
            hasCertificate: true,
            price: displayPrice,
            rawPrice: rawPriceValue,
            isFree: item.is_free,
            videosList: item.videos_list || [],
          };
        });

        setCourses(formattedSupabaseCourses);
      }
    } catch (err: any) {
      console.error("Error fetching courses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupabaseCourses();

    const coursesChannel = supabase
      .channel("public:courses")
      .on("postgres_changes", { event: "*", schema: "public", table: "courses" }, () => fetchSupabaseCourses())
      .subscribe();

    const subsChannel = supabase
      .channel("public:subscriptions")
      .on("postgres_changes", { event: "*", schema: "public", table: "subscriptions" }, () => fetchSupabaseCourses())
      .subscribe();

    return () => {
      supabase.removeChannel(coursesChannel);
      supabase.removeChannel(subsChannel);
    };
  }, []);

  const handleCreateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentNameInput || !studentCodeInput || !paymentNumberInput || !receiptFile) {
      alert("الرجاء إكمال جميع البيانات وإرفاق صورة الإيصال");
      return;
    }

    try {
      setIsSubmitting(true);

      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(filePath, receiptFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('payment-receipts')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from('subscriptions').insert([
        {
          course_id: selectedCourseToSubscribe.id,
          course_name: selectedCourseToSubscribe.courseName,
          student_name: studentNameInput,
          student_code: studentCodeInput,
          payment_method: paymentMethod,
          sender_number: paymentNumberInput,
          receipt_image_url: publicUrlData.publicUrl,
          status: 'pending'
        }
      ]);

      if (insertError) throw insertError;

      setSuccessMessage(`تم تقديم طلب الاشتراك في كورس "${selectedCourseToSubscribe.courseName}" بنجاح، وفي انتظار مراجعة المعلم وتفعيله! 🎉`);
      setSelectedCourseToSubscribe(null);
      setStudentNameInput("");
      setStudentCodeInput("");
      setPaymentNumberInput("");
      setReceiptFile(null);
      setTimeout(() => setSuccessMessage(""), 6000);
    } catch (error: any) {
      console.error("Detailed Error:", error);
      alert(`خطأ تقني: ${error.message || "تأكد من إعدادات التخزين وصلاحيات Supabase"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dynamicCategories = [
    { id: "all", name: "كل الأقسام" },
    ...Array.from(new Set(courses.map((c) => c.category))).map((cat) => ({
      id: cat,
      name: cat,
    })),
  ];

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
    <div className="space-y-6 text-slate-800 min-h-screen" dir="rtl">
      
      {/* رأس الصفحة */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg text-white border border-blue-400/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold rounded-full inline-flex items-center gap-1 border border-white/25">
              <Sparkles size={12} />
              أكاديمية الكورسات المتكاملة - منصة Z E D 
            </span>
            <h1 className="text-xl sm:text-3xl font-black tracking-wide leading-tight">
              دليلك الشامل لجميع الكورسات والمواد 📚
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              استعرض الكورسات المتاحة، اشترك عبر وسائل الدفع، وتابع محتواك بمجرد اعتماد المعلم.
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shrink-0">
            <div className="text-center px-2">
              <span className="block text-lg sm:text-xl font-black">{courses.length}</span>
              <span className="text-[10px] text-blue-100">إجمالي الكورسات</span>
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-sm">
          <Check size={18} className="text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* شريط البحث والفلترة */}
      <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-blue-600">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم الكورس، التخصص، أو الوصف..."
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full md:w-auto">
            <button
              onClick={() => setFilterStatus("all")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${filterStatus === "all" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-200"}`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilterStatus("enrolled")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${filterStatus === "enrolled" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-200"}`}
            >
              المفعلة
            </button>
            <button
              onClick={() => setFilterStatus("available")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center ${filterStatus === "available" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-200"}`}
            >
              المتاحة
            </button>
          </div>
        </div>

        {/* التخصصات */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 ml-1">
            <Layers size={14} className="text-blue-600" /> التخصصات:
          </span>
          {dynamicCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterCategory === cat.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* شبكة عرض الكورسات */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs font-bold">
          جاري التحقق من الاشتراكات والكورسات...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white border-2 border-slate-200 rounded-2xl shadow-xs">
          <BookOpen size={40} className="text-blue-600 mx-auto" />
          <p className="text-sm font-bold text-slate-700">عذراً، لم نتمكن من العثور على كورسات تطابق بحثك.</p>
          <button
            onClick={() => { setSearchTerm(""); setFilterCategory("all"); setFilterStatus("all"); }}
            className="text-xs font-bold text-blue-600 underline hover:text-blue-800"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* ترويسة الكارت */}
              <div className={`p-4 bg-gradient-to-r ${course.imageBg} text-white relative`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-white/25 backdrop-blur-md rounded-lg text-[10px] font-bold border border-white/20">
                    {course.categoryName}
                  </span>
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold border border-white/20">
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-wide line-clamp-2 leading-snug">
                  {course.courseName}
                </h3>
              </div>

              {/* تفاصيل الكارت */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div className="space-y-3">
                  <p className="text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {course.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700">
                      <span className="text-slate-500">المحاضر:</span>
                      <span className="font-bold text-slate-900">{course.instructor}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700">
                      <span className="text-slate-500">التقييم العام:</span>
                      <div className="flex items-center gap-1 font-bold text-slate-900">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700">
                      <span className="text-slate-500">حجم المحتوى:</span>
                      <span className="flex items-center gap-1 font-bold text-blue-600">
                        <PlayCircle size={14} /> {course.totalLessons} فيديو تعليمي
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 font-bold">
                      <span className="text-slate-600">حالة الاشتراك:</span>
                      <span className={`px-2.5 py-1 rounded-lg border ${course.status === 'enrolled' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                        {course.status === 'enrolled' ? 'مفعل ورسمي ✓' : course.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="pt-2 border-t border-slate-100">
                  {course.status === 'enrolled' ? (
                    <Link
                      to={`/videos?courseId=${course.id}`}
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center justify-center gap-1.5 font-bold shadow-xs"
                    >
                      <PlayCircle size={16} />
                      <span>مشاهدة محتوى الكورس</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSelectedCourseToSubscribe(course)}
                      className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center gap-1.5 font-bold shadow-xs"
                    >
                      <GraduationCap size={16} />
                      <span>الدفع والاشتراك الآن</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* نافذة الدفع وإرفاق الإيصال */}
      {selectedCourseToSubscribe && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl relative my-6 border border-slate-100" dir="rtl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-black rounded-md">
                  {selectedCourseToSubscribe.categoryName}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">اشتراك في: {selectedCourseToSubscribe.courseName}</h3>
              </div>
              <button
                onClick={() => setSelectedCourseToSubscribe(null)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSubscription} className="space-y-3.5 text-xs">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <span className="font-bold text-emerald-800">السعر المطلوب:</span>
                <span className="text-sm sm:text-base font-black text-emerald-700">{selectedCourseToSubscribe.price}</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">اسم الطالب الثلاثي:</label>
                <input
                  type="text"
                  required
                  placeholder="أدخل اسمك كاملاً"
                  value={studentNameInput}
                  onChange={(e) => setStudentNameInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">كود الطالب:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: STU-2026-901"
                  value={studentCodeInput}
                  onChange={(e) => setStudentCodeInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">اختر وسيلة الدفع:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("vodafone")}
                    className={`p-2.5 rounded-xl border-2 font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "vodafone"
                        ? "border-red-500 bg-red-50/50 text-red-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Smartphone size={16} className="text-red-600 shrink-0" />
                    <span>فودافون كاش</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("instapay")}
                    className={`p-2.5 rounded-xl border-2 font-bold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "instapay"
                        ? "border-purple-500 bg-purple-50/50 text-purple-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Building2 size={16} className="text-purple-600 shrink-0" />
                    <span>إنستاباي</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1 text-center">
                <span className="font-bold text-slate-600 block">حول المبلغ على الرقم التالي:</span>
                <span className="text-xs sm:text-sm font-black text-blue-900 select-all block">
                  {paymentMethod === "vodafone" ? "01012345678 (فودافون كاش)" : "teacher.zed@instapay"}
                </span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">رقم هاتفك أو حسابك المحول منه:</label>
                <input
                  type="text"
                  required
                  placeholder={paymentMethod === "vodafone" ? "رقم هاتفك المحول منه" : "اسم المستخدم على انستاباي"}
                  value={paymentNumberInput}
                  onChange={(e) => setPaymentNumberInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">إرفاق صورة إيصال التحويل:</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-all">
                  <Upload size={18} className="mx-auto text-slate-400 mb-1" />
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setReceiptFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-[11px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {receiptFile && (
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                      تم اختيار: {receiptFile.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCourseToSubscribe(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-black shadow-md transition-all"
                >
                  {isSubmitting ? "جاري الإرسال..." : "تأكيد وإرسال الإيصال"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}