import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  User,
  MessageSquare,
  XCircle,
  AlertTriangle,
  Paperclip,
  CheckSquare,
} from "lucide-react";

export default function AssignmentsPage() {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3); // عدد المحاولات المتاحة

  // حالة فتح نافذة الشات الخاص مع المدرس
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "instructor", text: "أهلاً بك يا بطل! أنا متاح معك لأي استفسار بخصوص الواجبات، ارفع أي ملف بأي حجم وسأراجعه لك." }
  ]);

  // قاعدة بيانات واسعة وشاملة للواجبات ببيانات حقيقية ومتنوعة
  const [assignments] = useState([
    {
      id: 1,
      title: "واجب بناء منصة تجارة إلكترونية متكاملة E-Commerce",
      courseName: "دبلوم تطوير الويب المتقدم Full-Stack",
      instructor: "م. أسامة الزيرو",
      category: "برمجة وتطوير الويب",
      dueDate: "2026-03-15",
      totalGrade: "100 درجة",
      passingGrade: "75 درجة",
      instructions: "قم بتطوير منصة تجارة إلكترونية كاملة تتضمن صفحة المنتجات، سلة المشتريات، ونظام الدفع. يمكنك رفع ملفات مضغوطة (.zip, .rar) أو مجلدات المشروع بأي حجم دون قيود.",
    },
    {
      id: 2,
      title: "تصميم النظام البصري الكامل لتطبيق تسوق ذكي",
      courseName: "دبلوم تصميم واجهات وتجربة المستخدم UI/UX",
      instructor: "أ. سارة أحمد",
      category: "التصميم الرقمي",
      dueDate: "2026-03-18",
      totalGrade: "80 درجة",
      passingGrade: "60 درجة",
      instructions: "صمم واجهات التطبيق كاملة على برنامج Figma أو Adobe XD، وارفد ملفات التصميم الأصلية أو ملفات الوسائط والفيديوهات التوضيحية بأي حجم تريده.",
    },
    {
      id: 3,
      title: "مشروع تصميم هيكل قاعدة بيانات مستشفى مركزي ضخم",
      courseName: "دبلوم قواعد البيانات المتقدمة SQL & NoSQL",
      instructor: "د. خالد المنصور",
      category: "قواعد البيانات",
      dueDate: "2026-03-22",
      totalGrade: "90 درجة",
      passingGrade: "70 درجة",
      instructions: "أنشئ مخطط قاعدة البيانات (ERD) مع كتابة كافة استعلامات الجداول والربط والتخزين المؤقت. يمكنك رفع ملفات التكليف مهما كان حجمها (.sql, .pdf, .docx).",
    },
    {
      id: 4,
      title: "مشروع تحليل البيانات المالية لشركة ناشئة باستخدام بايثون",
      courseName: "دبلوم تحليل البيانات وعلم البيانات Data Science",
      instructor: "د. رامي العبدالله",
      category: "الذكاء الاصطناعي والبيانات",
      dueDate: "2026-03-25",
      totalGrade: "100 درجة",
      passingGrade: "80 درجة",
      instructions: "قم بتحليل مجموعة البيانات المرفقة واستخراج الرسوم البيانية الإحصائية باستخدام مكتبات بايثون (Pandas, Matplotlib). ارفع ملفات الكود (.ipynb أو .py) أو جداول البيانات الضخمة.",
    },
    {
      id: 5,
      title: "تأمين وحماية تطبيق ويب ضد ثغرات الحقن والاختراق",
      courseName: "دبلوم الأمن السيبراني واختبار الاختراق",
      instructor: "م. طارق الحكيم",
      category: "الأمن السيبراني",
      dueDate: "2026-03-28",
      totalGrade: "100 درجة",
      passingGrade: "85 درجة",
      instructions: "قم بإجراء فحص أمني لكود التطبيق المرفق، واكتشف الثغرات وقدم تقريراً مفصلاً مع سكريبتات المعالجة. مسموح برفع ملفات السجلات وفيديوهات التوثيق بأي حجم.",
    },
    {
      id: 6,
      title: "إدارة حملة تسويق إلكتروني رقمية شاملة الميزانية",
      courseName: "دبلوم التسويق الرقمي وإدارة الإعلانات الممولة",
      instructor: "أ. نور الهدى",
      category: "التسويق الرقمي",
      dueDate: "2026-04-02",
      totalGrade: "70 درجة",
      passingGrade: "50 درجة",
      instructions: "صمم خطة تسويقية متكاملة لمنتج تقني على منصات التواصل الاجتماعي مع حساب عائد الاستثمار (ROI). ارفع عروض التقديم (PowerPoint) أو ملفات الـ PDF الضخمة.",
    },
  ]);

  const activeAssignment = assignments.find((a) => a.id === selectedAssignmentId);

  // السماح برفع عدة ملفات وبأي حجم دون قيود
  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) {
      alert("يرجى إرفاق ملف واحد على الأقل قبل تأكيد التسليم!");
      return;
    }
    setIsSubmitted(true);
  };

  const handleResetSubmission = () => {
    if (attemptsLeft <= 1) {
      alert("للأسف لقد استنفدت كافة محاولات رفع الواجب!");
      return;
    }
    setUploadedFiles([]);
    setIsSubmitted(false);
    setAttemptsLeft((prev) => prev - 1);
  };

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
        { sender: "instructor", text: "تم استلام رسالتك بخصوص الواجب، سأتابع الملفات المرفوعة وأرد عليك بالتفصيل قريباً." }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-16" dir="rtl">
      
      {/* 1. رأس الصفحة */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-white/25 backdrop-blur-md text-white text-xs font-bold rounded-full inline-flex items-center gap-1.5 border border-white/30">
              <Sparkles size={13} />
              منصة التسليم المتقدمة للواجبات الأكاديمية - بدون قيود على الحجم أو النوع
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
              ارفع واجباتك بكل حرية وتواصل مع أساتذتك مباشرة 📂🚀
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              استعرض كافة تكاليف الدبلومات، ارفع ملفاتك البرمجية، التصميمية، أو المرئية بأي حجم، وتابع الملاحظات والدرجات بكل سهولة.
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

      {!selectedAssignmentId ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <CheckSquare size={20} className="text-blue-600" /> كافة الواجبات والتكاليف المتاحة ({assignments.length} واجب دبلوم)
            </h2>
          </div>

          {/* شبكة الكروت الموسعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-200 inline-block">
                      {assignment.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      الدرجة: {assignment.totalGrade}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                    {assignment.title}
                  </h3>

                  <p className="text-xs text-blue-600 font-bold flex items-center gap-1">
                    <BookOpen size={14} /> {assignment.courseName}
                  </p>

                  {/* بيانات المدرس وزر الشات الخاص */}
                  <div className="flex items-center justify-between pt-1 text-xs text-slate-600 font-bold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <User size={15} className="text-blue-600" />
                      <span>المدرس: <strong className="text-slate-800">{assignment.instructor}</strong></span>
                    </div>
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="text-[11px] bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
                    >
                      <MessageSquare size={13} />
                      <span>اسأل المدرس</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-blue-50">
                  <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                    <Clock size={14} className="text-amber-600" /> آخر موعد للتسليم: <strong className="text-slate-700">{assignment.dueDate}</strong>
                  </div>

                  <button
                    onClick={() => { setSelectedAssignmentId(assignment.id); setIsSubmitted(false); setUploadedFiles([]); }}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold shadow-xs"
                  >
                    <span>تفاصيل وتسليم الواجب</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 bg-blue-50/20 border-2 border-blue-100 rounded-3xl p-6 sm:p-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 pb-4">
            <div>
              <button
                onClick={() => setSelectedAssignmentId(null)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-1"
              >
                <ArrowRight size={14} /> العودة لقائمة الواجبات
              </button>
              <h2 className="text-lg sm:text-xl font-black text-slate-800">{activeAssignment?.title}</h2>
              <div className="flex items-center gap-4 mt-1 text-xs font-semibold text-slate-500">
                <span>المدرس المسؤول: <strong className="text-blue-600">{activeAssignment?.instructor}</strong></span>
                <span className="text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  المحاولات المتاحة للرفع: <strong>{attemptsLeft}</strong>
                </span>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-black bg-white text-blue-700 border border-blue-200 shadow-sm">
              <Clock size={16} className="text-blue-600" />
              <span>الموعد النهائي: {activeAssignment?.dueDate}</span>
            </div>
          </div>

          {/* تنبيه تعليمات الواجب */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-semibold flex items-start gap-2">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-black mb-0.5">تعليمات هامة لتسليم الواجب (بدون قيود على الملفات):</strong>
              {activeAssignment?.instructions}
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-3xl border-2 border-emerald-300 bg-emerald-50 text-emerald-900 text-center space-y-4 shadow-lg">
              <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
              <div className="space-y-1">
                <h3 className="text-xl font-black">تم تسليم جميع ملفات الواجب بنجاح يا بطل! 🎉</h3>
                <p className="text-sm font-semibold">
                  تم رفع ({uploadedFiles.length}) ملف وإرسالها بنجاح إلى أستاذ المادة للمراجعة.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleResetSubmission}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all"
                >
                  <UploadCloud size={15} />
                  <span>تعديل وإعادة رفع ملفات جديدة (متبقي {attemptsLeft})</span>
                </button>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare size={15} />
                  <span>مناقشة الواجب مع المدرس</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitAssignment} className="bg-white border-2 border-blue-100 rounded-2xl p-6 space-y-6 shadow-xs">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Paperclip size={16} className="text-blue-600" />
                  <span>ارفع أي عدد من الملفات وبأي حجم (برمجية، مضغوطة، فيديو، مستندات، صور):</span>
                </label>
                
                <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-2xl p-8 text-center bg-blue-50/30 transition-all relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleMultipleFilesChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="space-y-2 pointer-events-none">
                    <UploadCloud size={36} className="mx-auto text-blue-600" />
                    <p className="text-xs font-bold text-slate-700">
                      اسحب الملفات هنا أو انقر لاختيار عدة ملفات من جهازك (لا يوجد حد أقصى للحجم أو النوع)
                    </p>
                    <p className="text-[10px] text-emerald-600 font-bold">مسموح بكافة الصيغ: .zip, .rar, .mp4, .sql, .pdf, .docx, .py, .fig</p>
                  </div>
                </div>

                {/* عرض الملفات التي تم اختيارها */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 pt-3">
                    <p className="text-xs font-black text-slate-700">الملفات المرفقة حالياً ({uploadedFiles.length}):</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs font-semibold">
                          <span className="truncate max-w-[80%] text-slate-700">📎 {file.name} <span className="text-[10px] text-slate-400">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span></span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="text-red-600 hover:text-red-800 text-[11px] font-bold"
                          >
                            حذف
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black shadow-lg transition-all flex items-center gap-2"
                >
                  <UploadCloud size={16} />
                  <span>تأكيد وتسليم الواجبات للمدرس</span>
                </button>
              </div>
            </form>
          )}

        </div>
      )}

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
                  <p className="text-[10px] text-blue-100">استفسر عن الواجبات وأحجام الملفات</p>
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
                placeholder="اكتب رسالتك للمدرس هنا..."
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