import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  User,
  MessageSquare,
  AlertCircle,
  FileText,
  UserCheck,
} from "lucide-react";

export default function AttendancePage() {
  // حالة فتح نافذة الشات الخاص مع المدرس بخصوص الحضور
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "instructor", text: "أهلاً بك يا بطل! أنا متاح لمناقشة أي استفسار بخصوص حضورك أو تقديم أعذار الغياب للمحاضرات." }
  ]);

  // قاعدة بيانات شاملة لمتابعة حضور وغياب الطالب في مختلف الدبلومات
  const [attendanceData] = useState([
    {
      id: 1,
      courseName: "دبلوم تطوير الويب المتقدم Full-Stack",
      instructor: "م. أسامة الزيرو",
      category: "برمجة وتطوير الويب",
      totalLectures: 24,
      attendedLectures: 23,
      absentLectures: 1,
      attendanceRate: 96,
      status: "ممتاز (منتظم جداً)",
      lastLecture: "محاضرة بناء لوحة التحكم المتقدمة (حاضر)",
    },
    {
      id: 2,
      courseName: "دبلوم تصميم واجهات وتجربة المستخدم UI/UX",
      instructor: "أ. سارة أحمد",
      category: "التصميم الرقمي",
      totalLectures: 20,
      attendedLectures: 18,
      absentLectures: 2,
      attendanceRate: 90,
      status: "جيد جداً (منتظم)",
      lastLecture: "محاضرة اختبار النماذج الأولية (حاضر)",
    },
    {
      id: 3,
      courseName: "دبلوم قواعد البيانات المتقدمة SQL & NoSQL",
      instructor: "د. خالد المنصور",
      category: "قواعد البيانات",
      totalLectures: 18,
      attendedLectures: 17,
      absentLectures: 1,
      attendanceRate: 94,
      status: "ممتاز (منتظم)",
      lastLecture: "محاضرة تحسين أداء الاستعلامات (حاضر)",
    },
    {
      id: 4,
      courseName: "دبلوم تحليل البيانات وعلم البيانات Data Science",
      instructor: "د. رامي العبدالله",
      category: "الذكاء الاصطناعي والبيانات",
      totalLectures: 22,
      attendedLectures: 19,
      absentLectures: 3,
      attendanceRate: 86,
      status: "جيد (يحتاج التزام أكثر)",
      lastLecture: "محاضرة تحليل البيانات الإحصائية (غائب بعذر)",
    },
    {
      id: 5,
      courseName: "دبلوم الأمن السيبراني واختبار الاختراق",
      instructor: "م. طارق الحكيم",
      category: "الأمن السيبراني",
      totalLectures: 20,
      attendedLectures: 20,
      absentLectures: 0,
      attendanceRate: 100,
      status: "مثالي (حضور تامة 100%)",
      lastLecture: "محاضرة تأمين الثغرات البرمجية (حاضر)",
    },
    {
      id: 6,
      courseName: "دبلوم التسويق الرقمي وإدارة الإعلانات الممولة",
      instructor: "أ. نور الهدى",
      category: "التسويق الرقمي",
      totalLectures: 16,
      attendedLectures: 14,
      absentLectures: 2,
      attendanceRate: 87,
      status: "جيد جداً (منتظم)",
      lastLecture: "محاضرة حساب عائد الاستثمار ROI (حاضر)",
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
        { sender: "instructor", text: "تم الاطلاع على رسالتك بخصوص الحضور، وسأقوم بتحديث سجلك أو اعتماد عذر الغياب فوراً." }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-16" dir="rtl">
      
      {/* 1. رأس الصفحة وإحصائيات عامة */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-700 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-white/25 backdrop-blur-md text-white text-xs font-bold rounded-full inline-flex items-center gap-1.5 border border-white/30">
              <Sparkles size={13} />
              لوحة متابعة الحضور والغياب للمحاضرات المباشرة - منصة zed
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
              سجل حضورك والتزامك بالمحاضرات الحية 📅🎯
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              تابع نسب حضورك في مختلف الدبلومات، اطلع على تفاصيل المحاضرات السابقة، وتواصل مع الأساتذة لتقديم أعذار الغياب بكل سهولة.
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

      {/* ملخص إحصائي سريع للحضور */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50/50 border-2 border-blue-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm">
            <CalendarCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">متوسط نسبة الحضور</p>
            <h3 className="text-lg font-black text-slate-800">92.1% (منتظم)</h3>
          </div>
        </div>

        <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">المحاضرات الحضورية</p>
            <h3 className="text-lg font-black text-slate-800">101 محاضرة</h3>
          </div>
        </div>

        <div className="bg-amber-50/50 border-2 border-amber-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-sm">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">حالات الغياب المسجلة</p>
            <h3 className="text-lg font-black text-slate-800">9 محاضرات</h3>
          </div>
        </div>

        <div className="bg-indigo-50/50 border-2 border-indigo-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-sm">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">حالة الالتزام الأكاديمي</p>
            <h3 className="text-lg font-black text-slate-800">ممتاز جداً</h3>
          </div>
        </div>
      </div>

      {/* قائمة سجلات الحضور لكل دبلوم */}
      <div className="space-y-6">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <FileText size={20} className="text-blue-600" /> تفاصيل الحضور والغياب لكل دبلوم ({attendanceData.length} دبلوم)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendanceData.map((item) => (
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
                    نسبة الحضور: {item.attendanceRate}%
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
                    <span>تقديم عذر غياب</span>
                  </button>
                </div>
              </div>

              {/* تفاصيل الحضور والغياب */}
              <div className="space-y-3 pt-4 border-t border-blue-50 text-xs font-semibold text-slate-600">
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl">
                  <span>إجمالي المحاضرات الحية:</span>
                  <strong className="text-slate-800">{item.totalLectures} محاضرة</strong>
                </div>
                <div className="flex justify-between items-center bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                  <span className="flex items-center gap-1 text-emerald-800"><CheckCircle2 size={14} /> المحاضرات الحضورة:</span>
                  <strong className="text-emerald-700">{item.attendedLectures}</strong>
                </div>
                <div className="flex justify-between items-center bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                  <span className="flex items-center gap-1 text-amber-800"><XCircle size={14} /> غياب بدون/بعذر:</span>
                  <strong className="text-amber-700">{item.absentLectures}</strong>
                </div>

                {/* آخر محاضرة */}
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-blue-900 text-[11px]">
                  <strong className="block font-black mb-0.5">آخر حالة مسجلة:</strong>
                  {item.lastLecture}
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
                  <p className="text-[10px] text-blue-100">مناقشة الحضور وتقديم أعذار الغياب</p>
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
                placeholder="اكتب عذر الغياب أو استفسارك للمدرس..."
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