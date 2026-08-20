import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  User,
  MessageSquare,
  XCircle,
  TrendingUp,
  BarChart3,
  CheckSquare,
  FileText,
} from "lucide-react";

export default function GradesPage() {
  const [selectedCourseGrade, setSelectedCourseGrade] = useState<number | null>(null);

  // حالة فتح نافذة الشات الخاص مع المدرس بخصوص الدرجات
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "instructor", text: "أهلاً بك يا بطل! أنا متاح معك لمناقشة تفاصيل درجاتك وأي استفسار حول تقييمك." }
  ]);

  // قاعدة بيانات شاملة لدرجات ومتابعة تقدم الطالب في مختلف الدبلومات
  const [gradesData, setGradesData] = useState([
    {
      id: 1,
      courseName: "دبلوم تطوير الويب المتقدم Full-Stack",
      instructor: "م. أسامة الزيرو",
      category: "برمجة وتطوير الويب",
      quizScore: "95 / 100",
      assignmentScore: "90 / 100",
      projectScore: "98 / 100",
      finalPercentage: 94,
      status: "ممتاز (ناجح بمتياز)",
      feedback: "أداء استثنائي جداً في المشاريع البرمجية واستخدام الأكواد النظيفة. استمر بهذا المستوى الرائع!",
    },
    {
      id: 2,
      courseName: "دبلوم تصميم واجهات وتجربة المستخدم UI/UX",
      instructor: "أ. سارة أحمد",
      category: "التصميم الرقمي",
      quizScore: "85 / 100",
      assignmentScore: "88 / 100",
      projectScore: "90 / 100",
      finalPercentage: 88,
      status: "جيد جداً (ناجح)",
      feedback: "تصاميم إبداعية وفهم ممتاز لمسارات المستخدم، يرجى الاهتمام أكثر بتفاصيل الألوان المتناسقة.",
    },
    {
      id: 3,
      courseName: "دبلوم قواعد البيانات المتقدمة SQL & NoSQL",
      instructor: "د. خالد المنصور",
      category: "قواعد البيانات",
      quizScore: "90 / 100",
      assignmentScore: "92 / 100",
      projectScore: "95 / 100",
      finalPercentage: 92,
      status: "ممتاز (ناجح)",
      feedback: "قدرة عالية جداً على كتابة استعلامات SQL المعقدة وتصميم الجداول بكفاءة عالية.",
    },
    {
      id: 4,
      courseName: "دبلوم تحليل البيانات وعلم البيانات Data Science",
      instructor: "د. رامي العبدالله",
      category: "الذكاء الاصطناعي والبيانات",
      quizScore: "88 / 100",
      assignmentScore: "85 / 100",
      projectScore: "89 / 100",
      finalPercentage: 87,
      status: "جيد جداً (ناجح)",
      feedback: "تحليلات إحصائية دقيقة باستخدام مكتبات بايثون، عمل ممتاز في معالجة البيانات الضخمة.",
    },
    {
      id: 5,
      courseName: "دبلوم الأمن السيبراني واختبار الاختراق",
      instructor: "م. طارق الحكيم",
      category: "الأمن السيبراني",
      quizScore: "92 / 100",
      assignmentScore: "94 / 100",
      projectScore: "96 / 100",
      finalPercentage: 94,
      status: "ممتاز (ناجح بامتياز)",
      feedback: "اكتشاف رائع للثغرات البرمجية وتقديم تقارير حماية وتأمين متكاملة باحترافية.",
    },
    {
      id: 6,
      courseName: "دبلوم التسويق الرقمي وإدارة الإعلانات الممولة",
      instructor: "أ. نور الهدى",
      category: "التسويق الرقمي",
      quizScore: "80 / 100",
      assignmentScore: "85 / 100",
      projectScore: "82 / 100",
      finalPercentage: 82,
      status: "جيد (ناجح)",
      feedback: "خطط تسويقية جيدة، يرجى التركيز أكثر على حساب عوائد الاستثمار ROI في المشاريع القادمة.",
    },
  ]);

  // إرسال رسالة في الشات مع المدرس
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMsg = { sender: "student", text: chatMessage };
    setChatHistory((prev) => [...prev, newMsg]);
    setChatMessage("");

    // رد تلقائي محاكي من المدرس
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: "instructor", text: "أهلاً بك! لقد اطلعت على استفسارك بخصوص الدرجات، وسأقوم بتوضيح كافة التفاصيل لك." }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-16" dir="rtl">
      
      {/* 1. رأس الصفحة وإحصائيات عامة */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-emerald-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-white/25 backdrop-blur-md text-white text-xs font-bold rounded-full inline-flex items-center gap-1.5 border border-white/30">
              <Sparkles size={13} />
              لوحة متابعة الدرجات والتقارير الأكاديمية - منصة zed
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
              سجل إنجازاتك ودرجاتك التفصيلية 📊🏆
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              تابع درجات اختباراتك، تقييمات الواجبات والمشاريع، والمعدل التراكمي العام لكافة الدبلومات مع إمكانية مناقشة الأساتذة مباشرة.
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

      {/* ملخص إحصائي سريع */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50/50 border-2 border-blue-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">المعدل التراكمي العام</p>
            <h3 className="text-lg font-black text-slate-800">89.3% (امتياز)</h3>
          </div>
        </div>

        <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">الدبلومات المكتملة</p>
            <h3 className="text-lg font-black text-slate-800">6 دبلومات</h3>
          </div>
        </div>

        <div className="bg-indigo-50/50 border-2 border-indigo-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-sm">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">الشهادات الصادرة</p>
            <h3 className="text-lg font-black text-slate-800">6 شهادات معتمدة</h3>
          </div>
        </div>

        <div className="bg-amber-50/50 border-2 border-amber-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-sm">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">مستوى الأداء العام</p>
            <h3 className="text-lg font-black text-slate-800">تصاعدي ممتاز</h3>
          </div>
        </div>
      </div>

      {/* قائمة الدرجات لكل دبلوم */}
      <div className="space-y-6">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <FileText size={20} className="text-blue-600" /> تفاصيل درجات الدبلومات والكورسات ({gradesData.length} دبلوم)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gradesData.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-200 inline-block">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    النسبة: {item.finalPercentage}%
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                  {item.courseName}
                </h3>

                {/* بيانات المدرس وزر الشات الخاص */}
                <div className="flex items-center justify-between pt-1 text-xs text-slate-600 font-bold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-blue-600" />
                    <span>المدرس: <strong className="text-slate-800">{item.instructor}</strong></span>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="text-[11px] bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
                  >
                    <MessageSquare size={13} />
                    <span>ناقش الدرجة</span>
                  </button>
                </div>
              </div>

              {/* تفاصيل الدرجات الفرعية */}
              <div className="space-y-3 pt-4 border-t border-blue-50 text-xs font-semibold text-slate-600">
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl">
                  <span>درجة الاختبارات الشاملة:</span>
                  <strong className="text-blue-700">{item.quizScore}</strong>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl">
                  <span>درجة تسليم الواجبات:</span>
                  <strong className="text-indigo-700">{item.assignmentScore}</strong>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl">
                  <span>درجة المشروع النهائي:</span>
                  <strong className="text-emerald-700">{item.projectScore}</strong>
                </div>

                {/* ملاحظات المدرس وتوضيح الطالب */}
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                  <strong className="block font-black mb-0.5">تقييم المدرس:</strong>
                  {item.feedback}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* نافذة الشات الخاص مع المدرس */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col h-[500px]">
            
            {/* رأس الشات */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-sm font-black">الشات الخاص مع المدرس</h3>
                  <p className="text-[10px] text-blue-100">مناقشة الدرجات والتقييمات الأكاديمية</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-xl transition-all"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* رسائل الشات */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-semibold ${
                      msg.sender === "student"
                        ? "bg-blue-600 text-white rounded-bl-none"
                        : "bg-white text-slate-800 border border-blue-100 shadow-xs rounded-br-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* إرسال رسالة جديدة */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="اكتب استفسارك عن الدرجة للمدرس..."
                className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                إرسال
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}