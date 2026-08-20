import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  RotateCcw,
  CheckSquare,
  Timer,
  Edit3,
  User,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

export default function QuizzesPage() {
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // نظام العداد التنازلي والمحاولات
  const [timeLeft, setTimeLeft] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(2); // عدد المحاولات المتاحة

  // حالة فتح نافذة الشات الخاص مع المدرس
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "instructor", text: "أهلاً بك يا بطل! أنا معك هنا لأي استفسار بخصوص الاختبار أو المنهج." }
  ]);

  // قاعدة البيانات الشاملة مع بيانات المدرسين والمحاولات
  const [quizzes] = useState([
    {
      id: 1,
      title: "الاختبار الشامل المتقدم لتطوير الويب Full-Stack",
      courseName: "دبلوم تطوير الويب المتقدم",
      instructor: "م. أسامة الزيرو",
      category: "برمجة وتطوير الويب",
      questionsCount: 15,
      durationMinutes: 8,
      passingScore: "75%",
      instructions: "يحتوي هذا الاختبار على 15 سؤالاً متنوعاً (اختيار مفرد، إجابات متعددة، وأسئلة مقالية). يرجى الانتباه للوقت، وفي حال مغادرة صفحة الاختبار سيتم إلغاء المحاولة فوراً واحتسابها رسوباً.",
      questions: [
        {
          id: 1,
          type: "single",
          question: "ما هي الكلمة المفتاحية المستخدمة لتعريف متغير ثابت في جافاسكريبت الحديثة؟",
          options: ["var", "let", "const", "static"],
          correctAnswer: 2,
        },
        {
          id: 2,
          type: "single",
          question: "أي من الآتي يعتبر طريقة صحيحة لإنشاء دالة سهمية (Arrow Function)؟",
          options: [
            "const add = (a, b) => a + b;",
            "function = add(a, b) => { return a + b; }",
            "arrow add(a, b) { return a + b; }",
            "const add => (a, b) { a + b }",
          ],
          correctAnswer: 0,
        },
        {
          id: 3,
          type: "single",
          question: "ما هي النتيجة المتوقعة لتنفيذ الكود: typeof [] ؟",
          options: ["array", "object", "undefined", "number"],
          correctAnswer: 1,
        },
        {
          id: 4,
          type: "single",
          question: "كيف يتم التعامل مع العمليات غير المتزامنة (Asynchronous) بشكل حديث؟",
          options: ["Callbacks فقط", "Loops", "Async / Await و Promises", "If / Else"],
          correctAnswer: 2,
        },
        {
          id: 5,
          type: "single",
          question: "ما هي الوظيفة الأساسية لمكتبة أو إطار عمل React.js؟",
          options: ["إدارة قواعد البيانات السحابية", "بناء واجهات المستخدم التفاعلية وتطبيقات الويب", "فحص الثغرات الأمنية", "إدارة السيرفرات"],
          correctAnswer: 1,
        },
        {
          id: 6,
          type: "multiple",
          question: "حدد الطرق الصحيحة لتعريف المتغيرات في جافاسكريبت الحديثة (اختر كل ما يناسب):",
          options: ["var", "let", "const", "define"],
          correctAnswers: [0, 1, 2],
        },
        {
          id: 7,
          type: "multiple",
          question: "أي من الآتي يعتبر من مكتبات أو أدوات تنسيق الواجهات أو تصميمها (اختر إجابتين):",
          options: ["Tailwind CSS", "React.js", "جداول Excel", "برنامج الكلمات المكتوبة"],
          correctAnswers: [0, 1],
        },
        {
          id: 8,
          type: "text",
          question: "سؤال مقالي: اكتب الأمر البرمجي المستخدم لطباعة رسالة في وحدة التحكم (Console) بجافاسكريبت:",
          correctAnswerKeywords: ["console.log", "console.log()"],
        },
        {
          id: 9,
          type: "text",
          question: "سؤال مقالي: ما هو اختصار تقنية تنسيق صفحات الويب الشهيرة؟",
          correctAnswerKeywords: ["css"],
        },
        {
          id: 10,
          type: "text",
          question: "سؤال مقالي: ما هو اسم لغة هيكلة صفحات الويب الأساسية؟",
          correctAnswerKeywords: ["html"],
        },
        {
          id: 11,
          type: "single",
          question: "أي خاصية في CSS تستخدم لتفعيل نظام Flexbox؟",
          options: ["display: flex;", "position: absolute;", "float: left;", "display: block;"],
          correctAnswer: 0,
        },
        {
          id: 12,
          type: "single",
          question: "ما هو الـ DOM في متصفحات الويب؟",
          options: ["Document Object Model", "Data Online Management", "Digital Operation Module", "Document Oriented Method"],
          correctAnswer: 0,
        },
        {
          id: 13,
          type: "text",
          question: "سؤال مقالي: ما هو نظام إدارة الإصدارات الشهير والمستخدم عالمياً؟",
          correctAnswerKeywords: ["git", "github"],
        },
        {
          id: 14,
          type: "text",
          question: "سؤال مقالي: ما هي المكتبة الأشهر لبناء واجهات المستخدم والمطورة من قبل Meta؟",
          correctAnswerKeywords: ["react", "react.js"],
        },
        {
          id: 15,
          type: "single",
          question: "ما هو البروتوكول الآمن لتصفح الويب؟",
          options: ["HTTP", "HTTPS", "FTP", "TELNET"],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 2,
      title: "الاختبار الشامل في تصميم واجهات وتجربة المستخدم UI/UX",
      courseName: "دبلوم تصميم واجهات المستخدم",
      instructor: "أ. سارة أحمد",
      category: "التصميم الرقمي",
      questionsCount: 10,
      durationMinutes: 5,
      passingScore: "70%",
      instructions: "يحتوي الاختبار على 10 أسئلة تقيس فهمك لتجربة المستخدم وأدوات التصميم. إغلاق الصفحة أو الخروج منها يلغي المحاولة تلقائياً.",
      questions: [
        {
          id: 1,
          type: "single",
          question: "ما الفرق الأساسي بين UI و UX؟",
          options: [
            "UI يهتم بالشكل البصري، و UX يهتم بتجربة ورضا المستخدم الشاملة",
            "لا يوجد أي فرق بينهما",
            "UX يهتم بالأكواد البرمجية",
            "UX خاص بالهواتف فقط",
          ],
          correctAnswer: 0,
        },
        {
          id: 2,
          type: "single",
          question: "ماذا تعني كلمة Wireframe في مراحل التصميم؟",
          options: [
            "التصميم النهائي بالألوان والصور",
            "رسم تخطيطي هيكلي أولي لتوزيع العناصر بدون تفاصيل لونية معقدة",
            "كتابة الأكواد البرمجية",
            "فحص أمان التطبيق",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          type: "single",
          question: "أي من التالي يعتبر عنصراً أساسياً لتوجيه انتباه المستخدم للضغط؟",
          options: ["لون النداء للعمل (CTA Color)", "حجم الشاشة", "سرعة الإنترنت", "نوع الخط الإنجليزي"],
          correctAnswer: 0,
        },
        {
          id: 4,
          type: "multiple",
          question: "ما هي البرامج أو الأدوات الشائعة لتصميم الـ UI/UX (اختر إجابتين):",
          options: ["Figma", "Adobe XD", "Microsoft Word", "Google Paint"],
          correctAnswers: [0, 1],
        },
        {
          id: 5,
          type: "text",
          question: "سؤال مقالي: ما هو اسم عملية اختبار المنتج مع مستخدمين حقيقيين لمعرفة مشاكل الاستخدام؟",
          correctAnswerKeywords: ["user testing", "اختبار المستخدم", "testing"],
        },
        {
          id: 6,
          type: "single",
          question: "ما هو الهدف الرئيسي من دراسة سلوك المستخدم (User Persona)؟",
          options: ["فهم احتياجات وتوقعات الجمهور المستهدف بدقة", "زيادة سرعة السيرفر", "كتابة أكواد جافاسكريبت", "تعديل إعدادات الشبكة"],
          correctAnswer: 0,
        },
        {
          id: 7,
          type: "multiple",
          question: "ما هي العوامل المؤثرة على سهولة الاستخدام Usability (اختر إجابتين):",
          options: ["الوضوح والبساطة", "سرعة التنقل وسهولة الوصول", "كثرة الإعلانات المزعجة", "إخفاء أزرار التحكم"],
          correctAnswers: [0, 1],
        },
        {
          id: 8,
          type: "text",
          question: "سؤال مقالي: اكتب اسم أداة التصميم الأشهر عالمياً حالياً والتي تعمل عبر المتصفح ومخصصة للـ UI/UX:",
          correctAnswerKeywords: ["figma"],
        },
        {
          id: 9,
          type: "text",
          question: "سؤال مقالي: ما هو المصطلح الذي يصف النماذج الأولية القابلة للنقر والتفاعل (Prototype)؟",
          correctAnswerKeywords: ["prototype", "نموذج أولي"],
        },
        {
          id: 10,
          type: "single",
          question: "ما هي الأداة المسؤولة عن تنسيق الألوان بشكل متناسق في التصميم؟",
          options: ["Color Palette", "CPU Speed", "RAM Memory", "SQL Query"],
          correctAnswer: 0,
        },
      ],
    },
    {
      id: 3,
      title: "الاختبار الشامل في قواعد البيانات وإدارة البيانات SQL",
      courseName: "دبلوم قواعد البيانات المتقدمة",
      instructor: "د. خالد المنصور",
      category: "قواعد البيانات",
      questionsCount: 10,
      durationMinutes: 5,
      passingScore: "80%",
      instructions: "اختبار شامل لمهارات SQL وقواعد البيانات العلائقية. تأكد من إنهاء الأسئلة قبل انتهاء الوقت المخصص.",
      questions: [
        {
          id: 1,
          type: "single",
          question: "ما هي الجملة البرمجية المستخدمة لاسترجاع البيانات من الجدول؟",
          options: ["GET", "SELECT", "RETRIEVE", "FETCH"],
          correctAnswer: 1,
        },
        {
          id: 2,
          type: "single",
          question: "أي أمر يستخدم لإضافة سجل جديد داخل جدول في قاعدة البيانات؟",
          options: ["ADD RECORD", "INSERT INTO", "UPDATE", "CREATE ROW"],
          correctAnswer: 1,
        },
        {
          id: 3,
          type: "single",
          question: "ما هو الشرط المستخدم لتصفية النتائج بناءً على معيار محدد؟",
          options: ["FILTER BY", "HAVING ONLY", "WHERE", "SORT BY"],
          correctAnswer: 2,
        },
        {
          id: 4,
          type: "multiple",
          question: "أي من الآتي يعتبر من أنواع قواعد البيانات الشهيرة (اختر إجابتين):",
          options: ["MySQL", "PostgreSQL", "HTML5", "CSS3"],
          correctAnswers: [0, 1],
        },
        {
          id: 5,
          type: "text",
          question: "سؤال مقالي: اكتب أمر SQL المستخدم لتحديث بيانات موجودة مسبقاً في الجدول:",
          correctAnswerKeywords: ["update"],
        },
        {
          id: 6,
          type: "single",
          question: "أي دالة تستخدم لحساب عدد الصفوف في الجدول؟",
          options: ["SUM()", "COUNT()", "TOTAL()", "NUMBER()"],
          correctAnswer: 1,
        },
        {
          id: 7,
          type: "multiple",
          question: "ما هي خصائص قواعد البيانات العلائقية RDBMS (اختر إجابتين):",
          options: ["تنظيم البيانات في جداول ذات صفوف وأعمدة", "استخدام مفاتيح أساسية Primary Keys", "عدم السماح نهائياً بتخزين أرقام", "الاعتماد على النصوص البسيطة فقط"],
          correctAnswers: [0, 1],
        },
        {
          id: 8,
          type: "text",
          question: "سؤال مقالي: ما هو اسم المفتاح الفريد الذي يميز كل سجل داخل الجدول بشكل فريد (بالإنجليزية)؟",
          correctAnswerKeywords: ["primary key", "primary"],
        },
        {
          id: 9,
          type: "text",
          question: "سؤال مقالي: اكتب أمر SQL المستخدم لحذف جدول بالكامل من قاعدة البيانات:",
          correctAnswerKeywords: ["drop table", "drop"],
        },
        {
          id: 10,
          type: "single",
          question: "ما هو الأمر المستخدم لترتيب نتائج الاستعلام تصاعدياً أو تنازلياً؟",
          options: ["ORDER BY", "ARRANGE", "SORT", "GROUP BY"],
          correctAnswer: 0,
        },
      ],
    },
  ]);

  const activeQuiz = quizzes.find((q) => q.id === selectedQuizId);

  // نظام التحذير عند محاولة الخروج أو إغلاق الصفحة أثناء الاختبار
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (selectedQuizId && !isSubmitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [selectedQuizId, isSubmitted]);

  // تشغيل العداد التنازلي
  useEffect(() => {
    if (!selectedQuizId || isSubmitted || !activeQuiz) return;

    setTimeLeft(activeQuiz.durationMinutes * 60);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFailQuizByTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedQuizId, isSubmitted]);

  const handleFailQuizByTimeout = () => {
    setScore(0);
    setIsSubmitted(true);
    setAttemptsLeft((prev) => Math.max(0, prev - 1));
  };

  const handleAnswerChange = (questionId: number, value: any, type: string) => {
    if (isSubmitted) return;

    if (type === "single") {
      setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
    } else if (type === "multiple") {
      const currentSelected = (userAnswers[questionId] as number[]) || [];
      let updated;
      if (currentSelected.includes(value)) {
        updated = currentSelected.filter((item) => item !== value);
      } else {
        updated = [...currentSelected, value];
      }
      setUserAnswers((prev) => ({ ...prev, [questionId]: updated }));
    } else if (type === "text") {
      setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
    }
  };

  const handleSubmitQuizAutomatic = () => {
    if (!activeQuiz) return;

    let correctCount = 0;

    activeQuiz.questions.forEach((q) => {
      const userAns = userAnswers[q.id];

      if (q.type === "single") {
        if (userAns === q.correctAnswer) {
          correctCount++;
        }
      } else if (q.type === "multiple") {
        const userArr = (userAns as number[] || []).sort();
        const correctArr = (q.correctAnswers as number[] || []).sort();
        if (
          userArr.length === correctArr.length &&
          userArr.every((val, idx) => val === correctArr[idx])
        ) {
          correctCount++;
        }
      } else if (q.type === "text") {
        if (userAns && typeof userAns === "string") {
          const cleanedUserAns = userAns.trim().toLowerCase();
          const isMatch = q.correctAnswerKeywords.some((keyword) =>
            cleanedUserAns.includes(keyword.toLowerCase())
          );
          if (isMatch) {
            correctCount++;
          }
        }
      }
    });

    const calculatedScore = Math.round((correctCount / activeQuiz.questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResetQuiz = () => {
    if (attemptsLeft <= 0) {
      alert("للأسف لقد استنفدت كافة محاولاتك لهذا الاختبار!");
      return;
    }
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setAttemptsLeft((prev) => prev - 1);
    if (activeQuiz) {
      setTimeLeft(activeQuiz.durationMinutes * 60);
    }
  };

  // إرسال رسالة في الشات مع المدرس
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMsg = { sender: "student", text: chatMessage };
    setChatHistory((prev) => [...prev, newMsg]);
    setChatMessage("");

    // رد تلقائي محاكي من المدرس بعد ثانية
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: "instructor", text: "أهلاً بك! لقد استلمت استفسارك وسأقوم بالرد عليك وتوضيح النقطة في أقرب وقت." }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-16" dir="rtl">
      
      {/* 1. رأس الصفحة */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-xl text-white border border-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 bg-white/25 backdrop-blur-md text-white text-xs font-bold rounded-full inline-flex items-center gap-1.5 border border-white/30">
              <Sparkles size={13} />
              قاعة الاختبارات المتقدمة ونظام المحاولات - منصة zed
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
              اختبر مهاراتك وتواصل مع المدرسين مباشرة 🎓
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              اختر اختبارك الشامل الموثق. تذكر أن مغادرة صفحة الاختبار تلغي المحاولة، ويمكنك التواصل مع المدرس المسؤول في أي وقت عبر الشات الخاص.
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

      {!selectedQuizId ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <CheckSquare size={20} className="text-blue-600" /> الاختبارات الشاملة المتاحة ({quizzes.length} اختبار)
            </h2>
          </div>

          {/* شبكة الكروت */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-200 inline-block">
                      {quiz.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      نجاح: {quiz.passingScore}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-blue-600 font-bold flex items-center gap-1">
                    <BookOpen size={14} /> {quiz.courseName}
                  </p>

                  {/* بيانات المدرس وزر الشات */}
                  <div className="flex items-center justify-between pt-1 text-xs text-slate-600 font-bold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <User size={15} className="text-blue-600" />
                      <span>المدرس: <strong className="text-slate-800">{quiz.instructor}</strong></span>
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
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <HelpCircle size={14} className="text-blue-600" /> {quiz.questionsCount} سؤالاً
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-blue-600" /> {quiz.durationMinutes} دقيقة
                    </span>
                  </div>

                  <button
                    onClick={() => { setSelectedQuizId(quiz.id); handleResetQuiz(); }}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold shadow-xs"
                  >
                    <span>ابدأ الاختبار الشامل الآن</span>
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
                onClick={() => {
                  if (confirm("هل أنت متأكد من الخروج؟ سيتم إلغاء المحاولة الحالية!")) {
                    setSelectedQuizId(null);
                  }
                }}
                className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 mb-1"
              >
                <ArrowRight size={14} /> الخروج من الاختبار (ستُلغى المحاولة)
              </button>
              <h2 className="text-lg sm:text-xl font-black text-slate-800">{activeQuiz?.title}</h2>
              <div className="flex items-center gap-4 mt-1 text-xs font-semibold text-slate-500">
                <span>المدرس المشرف: <strong className="text-blue-600">{activeQuiz?.instructor}</strong></span>
                <span className="text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  المحاولات المتبقية: <strong>{attemptsLeft}</strong>
                </span>
              </div>
            </div>

            {!isSubmitted && (
              <div className={`px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-sm font-black border shadow-sm ${
                timeLeft < 60 ? "bg-red-50 text-red-600 border-red-300 animate-pulse" : "bg-white text-blue-700 border-blue-200"
              }`}>
                <Timer size={20} className={timeLeft < 60 ? "text-red-600" : "text-blue-600"} />
                <span>الوقت المتبقي: {formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          {/* تنبيه تعليمات الطالب */}
          {!isSubmitted && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-semibold flex items-start gap-2">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-black mb-0.5">تعليمات هامة للطالب:</strong>
                {activeQuiz?.instructions}
              </div>
            </div>
          )}

          {isSubmitted && (
            <div className={`p-6 rounded-3xl border-2 text-center space-y-4 shadow-lg ${
              score >= parseInt(activeQuiz?.passingScore || "70")
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-red-50 border-red-300 text-red-900"
            }`}>
              <Award size={48} className="mx-auto text-blue-600" />
              <div className="space-y-1">
                <h3 className="text-xl font-black">
                  {score >= parseInt(activeQuiz?.passingScore || "70") ? "مبروك يا فنان! لقد اجتزت الاختبار بنجاح 🎉" : "للأسف، لم تصل لدرجة النجاح المطلوبة 💡"}
                </h3>
                <p className="text-sm font-semibold">
                  درجتك النهائية هي: <span className="font-black text-base">{score}%</span> (نسبة النجاح المطلوبة: {activeQuiz?.passingScore})
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  disabled={attemptsLeft <= 0}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all ${
                    attemptsLeft > 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-300 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <RotateCcw size={15} />
                  <span>إعادة المحاولة (متبقي {attemptsLeft})</span>
                </button>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare size={15} />
                  <span>مناقشة النتيجة مع المدرس</span>
                </button>
              </div>
            </div>
          )}

          {/* قائمة الأسئلة */}
          <div className="space-y-6">
            {activeQuiz?.questions.map((q, qIndex) => {
              return (
                <div key={q.id} className="bg-white border-2 border-blue-100 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-start gap-2">
                      <span className="p-1 bg-blue-600 text-white rounded-lg text-xs shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <span>{q.question}</span>
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 shrink-0">
                      {q.type === "single" && "اختيار مفرد"}
                      {q.type === "multiple" && "إجابات متعددة"}
                      {q.type === "text" && "سؤال مقالي"}
                    </span>
                  </div>

                  {/* 1. اختيار مفرد */}
                  {q.type === "single" && (
                    <div className="space-y-2 pr-6">
                      {q.options.map((option, optIndex) => {
                        const selectedOption = userAnswers[q.id];
                        const isChosen = selectedOption === optIndex;
                        let optionStyle = "bg-blue-50/40 border-blue-200 text-slate-700 hover:bg-blue-100/60";

                        if (isSubmitted) {
                          if (optIndex === q.correctAnswer) {
                            optionStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                          } else if (isChosen && optIndex !== q.correctAnswer) {
                            optionStyle = "bg-red-100 border-red-400 text-red-900";
                          }
                        } else if (isChosen) {
                          optionStyle = "bg-blue-600 text-white border-blue-600 shadow-xs font-bold";
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleAnswerChange(q.id, optIndex, "single")}
                            disabled={isSubmitted}
                            className={`w-full text-right p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                          >
                            <span>{option}</span>
                            {isSubmitted && optIndex === q.correctAnswer && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                            {isSubmitted && isChosen && optIndex !== q.correctAnswer && <XCircle size={18} className="text-red-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 2. إجابات متعددة */}
                  {q.type === "multiple" && (
                    <div className="space-y-2 pr-6">
                      <p className="text-[11px] text-blue-600 font-bold mb-1">💡 هذا السؤال يحتمل أكثر من إجابة صحيحة:</p>
                      {q.options.map((option, optIndex) => {
                        const userSelectedArr = (userAnswers[q.id] as number[]) || [];
                        const isChosen = userSelectedArr.includes(optIndex);
                        let optionStyle = "bg-blue-50/40 border-blue-200 text-slate-700 hover:bg-blue-100/60";

                        if (isSubmitted) {
                          if (q.correctAnswers.includes(optIndex)) {
                            optionStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                          } else if (isChosen && !q.correctAnswers.includes(optIndex)) {
                            optionStyle = "bg-red-100 border-red-400 text-red-900";
                          }
                        } else if (isChosen) {
                          optionStyle = "bg-blue-600 text-white border-blue-600 shadow-xs font-bold";
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleAnswerChange(q.id, optIndex, "multiple")}
                            disabled={isSubmitted}
                            className={`w-full text-right p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                          >
                            <span>{option}</span>
                            {isSubmitted && q.correctAnswers.includes(optIndex) && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                            {isSubmitted && isChosen && !q.correctAnswers.includes(optIndex) && <XCircle size={18} className="text-red-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 3. سؤال مقالي نصي */}
                  {q.type === "text" && (
                    <div className="space-y-2 pr-6">
                      <div className="relative">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-600">
                          <Edit3 size={16} />
                        </span>
                        <input
                          type="text"
                          value={(userAnswers[q.id] as string) || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value, "text")}
                          disabled={isSubmitted}
                          placeholder="اكتب إجابتك النصية هنا..."
                          className="w-full pr-10 pl-4 py-3 bg-blue-50/30 border border-blue-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-xs"
                        />
                      </div>
                      {isSubmitted && (
                        <div className="text-xs font-bold mt-2 p-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-2">
                          <span>الإجابة النموذجية المقبولة تتضمن:</span>
                          <span className="bg-white px-2 py-0.5 rounded text-blue-700 border border-blue-300">
                            {q.correctAnswerKeywords.join(" أو ")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {!isSubmitted && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSubmitQuizAutomatic}
                className="px-8 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-lg transition-all flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <CheckCircle2 size={18} />
                <span>تسليم الاختبار الشامل وإنهاء المحاولة</span>
              </button>
            </div>
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
                  <p className="text-[10px] text-blue-100">اسأل عن الاختبار والأسئلة مباشرة</p>
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