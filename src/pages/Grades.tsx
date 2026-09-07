import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  BarChart3,
  FileText,
  Loader2,
  ArrowRight,
  CheckCircle2,
  Clock,
  User,
  Trash2
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface GradesPageProps {
  userId: string; // ✅ استقبل userId من props
}

export default function GradesPage({ userId }: GradesPageProps) {
  const [gradesData, setGradesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ استدعاء البيانات عند تحميل الصفحة أو تغيير userId
  useEffect(() => {
    if (userId) { // ✅ تأكد إن userId موجود
      fetchStudentGrades();
    }
  }, [userId]); // ✅ أعد الاستدعاء عند تغيير userId

  const fetchStudentGrades = async () => {
    try {
      setLoading(true);
      
      // ✅ اضيف filter للطالب الحالي
      const { data: subsData, error: subsError } = await supabase
        .from('student_submissions')
        .select(`
          *,
          quizzes (
            id,
            title,
            course_name,
            instructor,
            teacher_name,
            category,
            course_specialty,
            courses (
              id,
              course_name,
              course_specialty,
              category
            )
          )
        `)
        .eq('student_id', userId); // ✅ حديد الطالب الحالي

      if (subsError) {
        // fallback إذا جاب خطأ
        const { data: simpleSubs } = await supabase
          .from('student_submissions')
          .select('*')
          .eq('student_id', userId); // ✅ حديد الطالب الحالي
          
        const { data: quizzesData } = await supabase.from('quizzes').select('*');
        const { data: coursesData } = await supabase.from('courses').select('*');

        processGrades(simpleSubs || [], quizzesData || [], coursesData || []);
        return;
      }

      processGradesWithRelation(subsData || []);

    } catch (err) {
      console.error("خطأ في جلب الدرجات:", err);
      setLoading(false);
    }
  };

  const processGradesWithRelation = (subsData: any[]) => {
    const formattedGrades = subsData.map((item: any, index: number) => {
      const quiz = item.quizzes || {};
      const course = quiz.courses || {};

      return {
        id: item.id || index + 1,
        courseName: course.course_name || quiz.course_name || item.course_name || item.title || "كورس برمجة وتطوير الواجهات",
        instructor: quiz.teacher_name || quiz.instructor || course.instructor || "أحمد محمود",
        category: course.course_specialty || course.category || quiz.course_specialty || quiz.category || "تطوير الويب",
        quizScore: `${item.score ?? item.grade ?? 0} / 100`,
        finalPercentage: item.score ?? item.grade ?? 0,
        status: (item.score ?? item.grade ?? 0) >= 50 ? "ناجح" : "قيد المراجعة",
        feedback: item.feedback || item.notes || "تم استلام الحل بنجاح وجاري الاعتماد النهائي.",
      };
    });

    setGradesData(formattedGrades);
    setLoading(false);
  };

  const processGrades = (subsData: any[], quizzesData: any[], coursesData: any[]) => {
    const quizzesMap = new Map(quizzesData.map(q => [q.id, q]));
    const coursesMap = new Map(coursesData.map(c => [c.id, c]));

    const formattedGrades = subsData.map((item: any, index: number) => {
      const quiz: any = quizzesMap.get(item.quiz_id || item.test_id) || {};
      const course: any = coursesMap.get(quiz.course_id) || coursesData[0] || {};

      return {
        id: item.id || index + 1,
        courseName: item.course_name || quiz.course_name || course.course_name || "مقدمة في البرمجة الحديثة",
        instructor: quiz.teacher_name || quiz.instructor || course.instructor || "أحمد محمود",
        category: course.course_specialty || course.category || quiz.category || "تطوير البرمجيات",
        quizScore: `${item.score ?? 0} / 100`,
        finalPercentage: item.score ?? 0,
        status: (item.score ?? 0) >= 50 ? "ناجح" : "قيد المراجعة",
        feedback: item.feedback || "تم رصد الدرجة بنجاح.",
      };
    });

    setGradesData(formattedGrades);
    setLoading(false);
  };

  const handleDeleteGrade = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه النتيجة؟")) return;

    try {
      const { error } = await supabase
        .from('student_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("خطأ أثناء الحذف:", error.message);
        alert("تعذر حذف النتيجة من قاعدة البيانات.");
        return;
      }

      setGradesData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("خطأ غير متوقع:", err);
    }
  };

  return (
    <div className="w-full max-w-9xl mx-auto space-y-6 sm:space-y-8 text-slate-800 min-h-screen" dir="rtl">
      
      {/* قسم الترويسة العلوي */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl text-white border border-white/20">
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2 sm:space-y-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold rounded-full inline-flex items-center gap-1.5 border border-white/30 shadow-xs">
              <Sparkles size={14} />
              لوحة متابعة الدرجات الفورية - منصة Z E D 
            </span>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              سجل إنجازاتك ودرجاتك الفعلية 📊🏆
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              هنا تظهر درجاتك بشكل آلي فور الانتهاء من حل الواجبات والاختبارات واعتمادها من المدرس.
            </p>
          </div>

          <Link
            to="/courses"
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white text-blue-700 hover:bg-blue-50 active:scale-95 rounded-xl sm:rounded-2xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 self-stretch sm:self-auto shrink-0"
          >
            <ArrowRight size={16} />
            <span>العودة للكورسات</span>
          </Link>
        </div>
      </div>

      {/* محتوى الصفحة والبطاقات */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" /> نتائج الواجبات والاختبارات المسجلة
          </h2>
          {!loading && gradesData.length > 0 && (
            <span className="text-xs font-bold px-3 py-1 bg-blue-100/70 text-blue-800 rounded-full border border-blue-200">
              الإجمالي: {gradesData.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Loader2 size={36} className="animate-spin text-blue-600" />
            <p className="text-xs font-bold text-slate-600">جاري جلب درجاتك الحديثة...</p>
          </div>
        ) : gradesData.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <BarChart3 size={40} className="text-blue-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">لا توجد درجات مسجلة حتى الآن.</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">قم بحل الواجبات أو الاختبارات المتاحة لتظهر نتائجها هنا فوراً وتتبع مستواك الدراسي.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {gradesData.map((item) => {
              const isSuccess = item.finalPercentage >= 50;
              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 sm:space-y-5 group relative"
                >
                  {/* رأس الكارت: التصنيف والنسبة */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200 truncate max-w-[130px]">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border inline-flex items-center gap-1 shrink-0 ${
                        isSuccess 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {isSuccess ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        النسبة: {item.finalPercentage}%
                      </span>
                      
                      {/* زر الحذف */}
                      <button
                        onClick={() => handleDeleteGrade(item.id)}
                        title="حذف هذه النتيجة"
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* اسم الكورس وواجهة الموبايل المنظمة في أسطر */}
                  <div className="space-y-3 flex-1">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block">اسم المادة / الكورس</span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {item.courseName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <User size={14} className="text-blue-500 shrink-0" />
                      <div className="flex flex-col sm:flex-row sm:gap-1 truncate">
                        <span className="text-slate-400 text-[10px]">المعلم:</span>
                        <span className="font-bold text-slate-700 truncate">{item.instructor}</span>
                      </div>
                    </div>
                  </div>

                  {/* قسم الدرجات والملاحظات في الأسفل */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs font-semibold">
                    <div className="flex justify-between items-center bg-blue-50/60 p-2.5 rounded-xl border border-blue-100/60">
                      <span className="text-slate-600 text-[11px]">درجة التقييم الفعلية:</span>
                      <strong className="text-blue-700 text-sm font-black">{item.quizScore}</strong>
                    </div>

                    <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-amber-900 text-[11px] space-y-0.5">
                      <strong className="block font-black text-amber-800 text-[11px]">ملاحظات المعلم:</strong>
                      <p className="text-slate-600 leading-relaxed text-[11px]">{item.feedback}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}