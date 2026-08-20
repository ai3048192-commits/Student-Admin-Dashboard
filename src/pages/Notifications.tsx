import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  MessageSquare,
  XCircle,
  FileText,
  Award,
  CalendarCheck,
  Megaphone,
  CheckCheck,
  AlertTriangle,
  ShieldAlert,
  Flame,
  Info,
  ChevronLeft,
} from "lucide-react";

export default function NotificationsPage() {
  // قاعدة بيانات ضخمة وغنية بكل تفاصيل الإشعارات والحالات المختلفة
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "🚨 تنبيه عاجل: خطر الفصل الأكاديمي لغياب متكرر",
      summary: "تجاوزت الحد الأقصى المسموح للغياب (أكثر من 4 محاضرات متتالية دون عذر مقنع).",
      detailedReason: "بناءً على نظام الحضور والغياب المعتمد في منصة zed، تبيّن أنك تغيبت عن آخر 4 محاضرات حية لدبلوم تطوير الويب المتقدم. ووفقاً للسياسة الأكاديمية، فإن تجاوز 20% غياب يعرض الطالب لعقوبة الفصل النهائي من الدبلوم وضياع حق الحصول على الشهادة المعتمدة. يتطلب منك الأمر تقديم عذر رسمي أو توضيح سبب الغياب للمدرس فوراً خلال 24 ساعة.",
      time: "منذ 15 دقيقة",
      type: "warning_expulsion",
      isRead: false,
      course: "دبلوم تطوير الويب المتقدم Full-Stack",
      instructor: "م. أسامة الزيرو",
      actionRequired: "تقديم عذر رسمي أو مناقشة المدرس فورا",
    },
    {
      id: 2,
      title: "⚠️ تنبيه رسمي: خصم درجات بسبب تجاوز قوانين الاختبار",
      summary: "تم رصد مخالفة أو اشتباه في بيئة الاختبار الشامل لقواعد البيانات.",
      detailedReason: "أثناء جلسة الاختبار النهائي لمادة قواعد البيانات المتقدمة، تم رصد خروج متكرر من متصفح الاختبار ومحاولة فتح مصادر خارجية ممنوعة بناءً على نظام الرقابة التلقائي. بناءً عليه، قرر مدرس المادة تطبيق لائحة الجزاءات وخصم 15 درجة من رصيدك الكلي للاختبار كإجراء تأديبي وتحذيري.",
      time: "منذ ساعة",
      type: "penalty_exam",
      isRead: false,
      course: "دبلوم قواعد البيانات المتقدمة SQL & NoSQL",
      instructor: "د. خالد المنصور",
      actionRequired: "مراجعة سياسة الاختبارات ومناقشة الأستاذ للتوضيح",
    },
    {
      id: 3,
      title: "🏆 إشعار إنجاز استثنائي وتكريم خاص!",
      summary: "مشروعك البرمجى تم اختياره ضمن أفضل 3 مشاريع على مستوى المنصة لهذا الشهر.",
      detailedReason: "أداء خارق للعادة وتطبيق احترافي لمكتبات معالجة البيانات الضخمة في مشروع تحليل البيانات. لجنة التقييم والأساتذة أبدوا إعجابهم الشديد بنظافة الأكواد البرمجية ودقة الرسومات البيانية المقدمة. تم منحك شهادة تميز خاصة وإضافة 10 درجات إضافية كمكافأة تفوق.",
      time: "منذ 3 ساعات",
      type: "achievement",
      isRead: false,
      course: "دبلوم تحليل البيانات وعلم البيانات Data Science",
      instructor: "د. رامي العبدالله",
      actionRequired: "استلام جائزة التميز وتحميل الشهادة",
    },
    {
      id: 4,
      title: "📝 تم تصحيح وتسليم الواجب البرمجي بنجاح",
      summary: "تم تقييم واجب منصة التجارة الإلكترونية ومنحك درجة عالية.",
      detailedReason: "قام مدرس المادة بمراجعة وتدقيق كود الواجب الخاص بصفحة الدفع وسلة التسوق. تم تقييم الهيكل البرمجي ومنحك 95 / 100 مع ملاحظات بسيطة بخصوص تنظيم المكونات (Components) لتكون أكثر سرعة واحترافية.",
      time: "منذ 5 ساعات",
      type: "grade",
      isRead: true,
      course: "دبلوم تطوير الويب المتقدم Full-Stack",
      instructor: "م. أسامة الزيرو",
      actionRequired: "لا يوجد إجراء مطلوب، اطلع على الملاحظات",
    },
    {
      id: 5,
      title: "💬 رسالة جديدة في الشات الخاص من المدرس",
      summary: "أ. سارة أحمد ردت على استفسارك بخصوص مسارات واجهات المستخدم وتجربة المستخدم.",
      detailedReason: "أرسلت لك المدرسـة توجيهات مفصلة حول كيفية توزيع عناصر واجهة المستخدم (UI) ومطابقتها لمعايير الوصول الشامل (Accessibility)، مع إرفاق رابط خارجي لأدوات تصميم مفيدة في مشروعك القادم.",
      time: "أمس",
      type: "chat",
      isRead: true,
      course: "دبلوم تصميم واجهات وتجربة المستخدم UI/UX",
      instructor: "أ. سارة أحمد",
      actionRequired: "متابعة الشات وتطبيق التعديلات",
    },
    {
      id: 6,
      title: "🔔 تنبيه بدء المحاضرة الحية المباشرة",
      summary: "موعد محاضرة الأمن السيبراني واختبار الاختراق سيبدأ خلال نصف ساعة.",
      detailedReason: "استعد لحضور المحاضرة الحية عبر منصة البث المباشر. سنتناول في هذه الجلسة كيفية اكتشاف ثغرات الحقن SQL Injection وتأمين قواعد البيانات ضد الاختراقات المتقدمة. يرجى تجهيز بيئة العمل الخاصة بك.",
      time: "أمس",
      type: "lecture",
      isRead: true,
      course: "دبلوم الأمن السيبراني واختبار الاختراق",
      instructor: "م. طارق الحكيم",
      actionRequired: "الدخول لقاعة البث المباشر في الموعد المحدد",
    },
    {
      id: 7,
      title: "📢 إعلان هام: تحديث شامل في منصة الاختبارات والواجبات",
      summary: "تم إطلاق ميزات جديدة كلياً لتحسين تجربة تسليم المشاريع الأكاديمية.",
      detailedReason: "أعلنت إدارة المنصة عن إطلاق التحديث البرمجي الجديد الذي يتيح للطلاب رفع ملفات ذات أحجام أكبر، وتتبع حالة التصحيح لحظة بلحظة عبر الإشعارات الفورية، مع إضافة أدوات جديدة لاختبار الأكواد تلقائياً قبل التسليم النهائي.",
      time: "منذ يومين",
      type: "announcement",
      isRead: true,
      course: "عام / إدارة منصة zed التعليمية",
      instructor: "إدارة المنصة",
      actionRequired: "تحديث الصفحة لاستخدام الميزات الجديدة",
    },
    {
      id: 8,
      title: "🎓 تهانينا! إصدار شهادة إتمام دبلوم التسويق الرقمي",
      summary: "تم اعتماد وتوثيق شهادتك بنجاح وأصبحت جاهزة للتحميل والمشاركة.",
      detailedReason: "أتممت بنجاح جميع متطلبات دبلوم التسويق الرقمي وإدارة الإعلانات الممولة بنسبة نجاح نهائية 92% (تقدير امتياز). الشهادة الآن موثقة برقم تسلسلي فريد وخاص بك على شبكة المنصة ويمكنك مشاركتها مباشرة على لينكد إن.",
      time: "منذ 3 أيام",
      type: "award",
      isRead: true,
      course: "دبلوم التسويق الرقمي وإدارة الإعلانات",
      instructor: "أ. نور الهدى",
      actionRequired: "تحميل الشهادة أو مشاركتها",
    }
  ]);

  // حالات نافذة التفاصيل (Modal)
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);

  // حالة فتح نافذة الشات الخاص مع المدرس
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeInstructor, setActiveInstructor] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "instructor", text: "أهلاً بك يا بطل. أنا أتابع معك تفاصيل هذا الإشعار، تفضل بطرح استفسارك أو عذرك." }
  ]);

  // تحديد إشعار معين كمقروء وفتح نافذة التفاصيل الخاصة به
  const handleOpenNotificationDetails = (notif: any) => {
    setSelectedNotification(notif);
    // تحديث الحالة ليصبح مقروءاً تلقائياً عند فتحه
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
  };

  // تحديد الكل كمقروء
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  // فتح الشات مع مدرس معين بناءً على الإشعار الحالي
  const openChatWithInstructor = (instructorName: string, notifTitle: string) => {
    setActiveInstructor(instructorName);
    setChatHistory([
      { sender: "instructor", text: `أهلاً بك. بخصوص موضوع (${notifTitle})، أنا أسمعك تماماً، تفضل بتوضيح ما لديك لنحل المشكلة سوياً.` }
    ]);
    setIsChatOpen(true);
  };

  // إرسال رسالة في الشات
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
        { sender: "instructor", text: "تم استلام رسالتك وتوضيحك بنجاح، سأقوم بمراجعة الحالة الأكاديمية واتخاذ الإجراء اللازم معك فوراً." }
      ]);
    }, 1000);
  };

  // تصميم أيقونات وأنماط الإشعارات
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "warning_expulsion":
        return {
          icon: <ShieldAlert className="text-red-600 animate-bounce" size={22} />,
          bgClass: "bg-red-50/80 border-red-300 shadow-sm",
          badgeClass: "bg-red-100 text-red-800",
        };
      case "penalty_exam":
        return {
          icon: <AlertTriangle className="text-amber-600" size={22} />,
          bgClass: "bg-amber-50/80 border-amber-300 shadow-sm",
          badgeClass: "bg-amber-100 text-amber-800",
        };
      case "achievement":
        return {
          icon: <Flame className="text-purple-600" size={22} />,
          bgClass: "bg-purple-50/80 border-purple-200 shadow-sm",
          badgeClass: "bg-purple-100 text-purple-800",
        };
      case "grade":
        return {
          icon: <Award className="text-emerald-600" size={20} />,
          bgClass: "bg-white border-slate-200",
          badgeClass: "bg-emerald-100 text-emerald-800",
        };
      case "chat":
        return {
          icon: <MessageSquare className="text-blue-600" size={20} />,
          bgClass: "bg-white border-slate-200",
          badgeClass: "bg-blue-100 text-blue-800",
        };
      case "lecture":
        return {
          icon: <CalendarCheck className="text-indigo-600" size={20} />,
          bgClass: "bg-white border-slate-200",
          badgeClass: "bg-indigo-100 text-indigo-800",
        };
      default:
        return {
          icon: <Megaphone className="text-blue-500" size={20} />,
          bgClass: "bg-white border-slate-200",
          badgeClass: "bg-blue-100 text-blue-800",
        };
    }
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-16" dir="rtl">
      
      {/* 1. رأس الصفحة */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full inline-flex items-center gap-1.5 border border-white/30">
              <Sparkles size={13} />
              مركز الإشعارات والتنبيهات المتقدم - منصة zed
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
              سجل التنبيهات الشامل والتقارير الحرجة 🔔⚡
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              اضغط على أي إشعار لاستعراض القصة الكاملة، تفاصيل ما حدث، وأسباب العقوبات أو التحذيرات، مع إمكانية التحدث مع المدرس فوراً.
            </p>
          </div>

          <Link
            to="/courses"
            className="px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl text-xs font-black shadow-lg transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <ArrowRight size={16} />
            <span>العودة للكورسات</span>
          </Link>
        </div>
      </div>

      {/* شريط التحكم */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-blue-600" />
          <h2 className="text-sm font-black text-slate-800">
            إجمالي التنبيهات ({notifications.length}) - غير المقروء ({notifications.filter(n => !n.isRead).length})
          </h2>
        </div>

        <button
          onClick={handleMarkAllAsRead}
          className="px-4 py-2 bg-white hover:bg-slate-100 text-blue-700 rounded-xl text-xs font-black transition-all shadow-xs border border-blue-200 inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <CheckCheck size={16} />
          <span>تحديد الكل كمقروء</span>
        </button>
      </div>

      {/* قائمة الإشعارات */}
      <div className="space-y-4">
        {notifications.map((notif) => {
          const style = getNotificationStyle(notif.type);
          return (
            <div
              key={notif.id}
              onClick={() => handleOpenNotificationDetails(notif)}
              className={`p-5 rounded-3xl border-2 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:border-blue-400 hover:shadow-md ${
                notif.isRead ? "bg-white border-slate-200 opacity-80 hover:opacity-100" : style.bgClass
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl shrink-0 bg-white shadow-sm border border-slate-100">
                  {style.icon}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${style.badgeClass}`}>
                      {notif.course}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      المسؤول: {notif.instructor}
                    </span>
                    {!notif.isRead && (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    )}
                  </div>

                  <h3 className="text-sm font-black text-slate-900">
                    {notif.title}
                  </h3>

                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                    {notif.summary}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold pt-1">
                    <Clock size={13} />
                    <span>{notif.time}</span>
                  </div>
                </div>
              </div>

              {/* زر عرض التفاصيل والشات */}
              <div className="flex items-center gap-2 self-end md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 w-full md:w-auto justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenNotificationDetails(notif);
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Info size={14} />
                  <span>عرض التفاصيل الكاملة</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* نافذة التفاصيل المنبثقة (Modal) عند الضغط على أي إشعار */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* رأس النافذة */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/25 backdrop-blur-md rounded-xl text-white">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold text-blue-200">
                    {selectedNotification.course}
                  </span>
                  <h3 className="text-sm sm:text-base font-black mt-0.5">تفاصيل الإشعار الأكاديمي</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-white hover:bg-white/20 p-1.5 rounded-xl transition-all"
              >
                <XCircle size={22} />
              </button>
            </div>

            {/* محتوى التفاصيل الكاملة */}
            <div className="p-6 space-y-5 overflow-y-auto bg-slate-50/50 flex-1 text-xs sm:text-sm">
              <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <h4 className="font-black text-slate-900 text-base">{selectedNotification.title}</h4>
                <p className="text-slate-600 font-semibold leading-relaxed">{selectedNotification.summary}</p>
              </div>

              {/* القصة الكاملة والسبب الجذري */}
              <div className="space-y-2 bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
                <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                  <Info size={15} className="text-blue-600" /> القصة الكاملة وماذا حدث بالضبط:
                </span>
                <p className="text-slate-700 font-medium leading-relaxed text-xs sm:text-sm">
                  {selectedNotification.detailedReason}
                </p>
              </div>

              {/* معلومات إضافية والمدرس المسؤول */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">المدرس المسؤول:</span>
                  <strong className="text-slate-900 font-black">{selectedNotification.instructor}</strong>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">الإجراء المطلوب منك:</span>
                  <strong className="text-blue-700 font-black">{selectedNotification.actionRequired}</strong>
                </div>
              </div>
            </div>

            {/* أزرار أسفل نافذة التفاصيل */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
              >
                إغلاق
              </button>

              <button
                onClick={() => {
                  const instructor = selectedNotification.instructor;
                  const title = selectedNotification.title;
                  setSelectedNotification(null);
                  openChatWithInstructor(instructor, title);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-2"
              >
                <MessageSquare size={15} />
                <span>فتح الشات الفوري مع المدرس</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* نافذة الشات الفوري مع المدرس */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px]">
            
            {/* رأس الشات */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="text-sm font-black">محادثة مع الأستاذ: {activeInstructor}</h3>
                  <p className="text-[10px] text-slate-300">محادثة خاصة لحل المشكلة الأكاديمية وتقديم الأعذار</p>
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
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-semibold ${
                      msg.sender === "student"
                        ? "bg-blue-600 text-white rounded-bl-none shadow-sm"
                        : "bg-white text-slate-900 border border-slate-200 shadow-xs rounded-br-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* إرسال رسالة جديدة */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="اكتب ردك أو عذرك للمدرس هنا..."
                className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
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