import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Settings,
  Shield,
  Bell,
  Edit3,
  Camera,
  Save,
  Check,
  Trash2,
  Upload,
  MessageSquare,
  FileVideo,
  FileCode,
  XCircle,
  AlertTriangle,
  ExternalLink,
  KeyRound,
  ShieldCheck,
  Download,
  FolderDown,
} from "lucide-react";

export default function ProfilePage() {
  // حالة بيانات الطالب الشخصية
  const [studentInfo, setStudentInfo] = useState({
    name: "أحمد محمود الفخراني",
    email: "ahmed.m.elfakharany@zed-platform.com",
    role: "طالب متفوق - مسار Full-Stack & Data Science",
    phone: "+20 1012345678",
    country: "جمهورية مصر العربية",
    city: "القاهرة",
    joinDate: "سبتمبر 2024",
    bio: "شغوف بتطوير الويب وتحليل البيانات، أسعى لبناء مشاريع برمجية قوية وخدمة المجتمع التقني.",
    github: "github.com/ahmed-elfakharany",
    linkedin: "linkedin.com/in/ahmed-elfakharany",
  });

  // حالة صورة البروفايل
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // حالة وضع التعديل ورسائل النجاح
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // حالات نافذة تغيير كلمة المرور
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // قاعدة بيانات الكورسات المسجلة مع ملفاتها وفيديوهاتها الخاصة المتاحة للتحميل
  const [enrolledDiplomas, setEnrolledDiplomas] = useState([
    {
      id: 1,
      name: "دبلوم تطوير الويب المتقدم Full-Stack",
      progress: 95,
      status: "مكتمل بامتياز",
      instructor: "م. أسامة الزيرو",
      category: "برمجة",
      downloadableFiles: [
        { title: "ملفات شرح الكورس والمصادر (PDF)", size: "24.5 MB", type: "PDF" },
        { title: "الأكواد البرمجية والمشاريع التطبيقية (ZIP)", size: "112.0 MB", type: "ZIP" },
        { title: "فيديوهات المحاضرات الحية المسجلة (MP4)", size: "1.4 GB", type: "Video" },
      ],
    },
    {
      id: 2,
      name: "دبلوم تصميم واجهات وتجربة المستخدم UI/UX",
      progress: 88,
      status: "نشط",
      instructor: "أ. سارة أحمد",
      category: "تصميم",
      downloadableFiles: [
        { title: "ملفات تصميم Figma وملفات الـ UI Kit", size: "85.2 MB", type: "Figma" },
        { title: "كتيب قواعد التخطيط وتجربة المستخدم (PDF)", size: "18.1 MB", type: "PDF" },
        { title: "فيديوهات التطبيق العملي ونقد التصميمات", size: "850 MB", type: "Video" },
      ],
    },
    {
      id: 3,
      name: "دبلوم قواعد البيانات المتقدمة SQL & NoSQL",
      progress: 92,
      status: "نشط",
      instructor: "د. خالد المنصور",
      category: "قواعد بيانات",
      downloadableFiles: [
        { title: "سكربتات وهياكل قواعد البيانات الجاهزة (SQL)", size: "12.4 MB", type: "SQL" },
        { title: "دليلك الشامل لهندسة البيانات (PDF)", size: "15.0 MB", type: "PDF" },
      ],
    },
    {
      id: 4,
      name: "دبلوم تحليل البيانات وعلم البيانات Data Science",
      progress: 87,
      status: "نشط",
      instructor: "د. رامي العبدالله",
      category: "ذكاء اصطناعي",
      downloadableFiles: [
        { title: "مكتبات بايثون وملفات Jupyter Notebooks", size: "45.0 MB", type: "IPYNB" },
        { title: "مجموعات البيانات الحقيقية للتدريب (CSV/Excel)", size: "65.2 MB", type: "Dataset" },
      ],
    },
  ]);

  // حالات نافذة الشات وإلغاء الكورس
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeInstructor, setActiveInstructor] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "instructor", text: "أهلاً بك يا بطل! أنا جاهز للإجابة على استفساراتك ومتابعة ملفات الكورس." }
  ]);

  const [courseToCancel, setCourseToCancel] = useState<any | null>(null);

  // معالجة تغيير الصورة الشخصية
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setSuccessMessage("تم تحديث صورة الملف الشخصي بنجاح! 📸");
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  // حفظ التعديلات الشخصية
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage("تم حفظ وتحديث كافة بياناتك الشخصية بنجاح! ✨");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // محاكاة تحميل ملف كورس لجهاز الطالب
  const handleDownloadFile = (fileName: string, courseName: string) => {
    setSuccessMessage(`جاري الآن تحميل (${fileName}) الخاصة بكورس "${courseName}" إلى جهازك... 📥`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  // تغيير كلمة المرور
  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف.");
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setPasswordError("يجب أن تحتوي كلمة المرور على حرف كبير (A-Z) ورقم واحد (0-9) على الأقل.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("كلمة المرور الجديدة وتأكيدها غير متطابقين.");
      return;
    }

    setIsPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccessMessage("تم تغيير كلمة المرور بنجاح وحماية الحساب بمعايير الأمان الجديدة! 🔒✨");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  // إلغاء الكورس
  const confirmCancelCourse = () => {
    if (courseToCancel) {
      setEnrolledDiplomas((prev) => prev.filter((d) => d.id !== courseToCancel.id));
      setSuccessMessage(`تم إلغاء الاشتراك في (${courseToCancel.name}) بنجاح (ملاحظة: وفقاً لسياسة المنصة، الرسوم غير قابلة للاسترداد).`);
      setCourseToCancel(null);
      setTimeout(() => setSuccessMessage(""), 6000);
    }
  };

  // فتح الشات
  const openChat = (instructorName: string) => {
    setActiveInstructor(instructorName);
    setChatHistory([
      { sender: "instructor", text: `أهلاً بك يا أحمد معك الأستاذ (${instructorName}). تفضل بطرح استفسارك بخصوص الكورس.` }
    ]);
    setIsChatOpen(true);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "student", text: chatMessage }]);
    setChatMessage("");

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: "instructor", text: "تم استلام رسالتك وسأقوم بمراجعتها والرد عليك بالتفاصيل قريباً." }
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-8 bg-white text-slate-800 min-h-screen pb-16" dir="rtl">
      
      {/* 1. رأس الصفحة والغلاف */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-10 shadow-xl text-white border border-blue-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
            
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-1 shadow-xl overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-[22px]" />
                ) : (
                  <div className="w-full h-full bg-slate-800 rounded-[22px] flex items-center justify-center text-3xl font-black text-white">
                    👨‍💻
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 left-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all"
                title="تغيير الصورة الشخصية"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold rounded-full inline-flex items-center gap-1.5 border border-white/30">
                <Sparkles size={12} />
                حساب طالب موثق وخاص بك وحدك - منصة zed
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-wide">
                {studentInfo.name}
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 font-semibold">
                {studentInfo.role} | منضم منذ {studentInfo.joinDate}
              </p>
            </div>
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

      {/* رسالة النجاح والتنبيه */}
      {successMessage && (
        <div className="p-4 bg-blue-50 border-2 border-blue-200 text-blue-900 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-sm">
          <Check size={18} className="text-blue-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50/50 border-2 border-blue-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm"><BookOpen size={24} /></div>
          <div><p className="text-xs font-bold text-slate-500">الدبلومات النشطة</p><h3 className="text-lg font-black text-slate-800">{enrolledDiplomas.length} دبلومات</h3></div>
        </div>
        <div className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm"><Award size={24} /></div>
          <div><p className="text-xs font-bold text-slate-500">الشهادات المحققة</p><h3 className="text-lg font-black text-slate-800">6 شهادات معتمدة</h3></div>
        </div>
        <div className="bg-indigo-50/50 border-2 border-indigo-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-sm"><CheckCircle2 size={24} /></div>
          <div><p className="text-xs font-bold text-slate-500">المعدل التراكمي</p><h3 className="text-lg font-black text-slate-800">89.3% (امتياز)</h3></div>
        </div>
        <div className="bg-purple-50/50 border-2 border-purple-100 rounded-3xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-sm"><FolderDown size={24} /></div>
          <div><p className="text-xs font-bold text-slate-500">ملفات الكورسات المتاحة</p><h3 className="text-lg font-black text-slate-800">جاهزة للتحميل الفوري</h3></div>
        </div>
      </div>

      {/* قسم تعديل البيانات والأمان */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* نموذج البيانات الشخصية */}
        <div className="lg:col-span-2 bg-white border-2 border-blue-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-blue-50">
            <div className="flex items-center gap-2.5">
              <User size={20} className="text-blue-600" />
              <h2 className="text-base font-black text-slate-800">التحكم بالبيانات الشخصية ومعلومات الحساب</h2>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Edit3 size={14} />
              <span>{isEditing ? "إلغاء التعديل" : "تعديل بياناتي"}</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">الاسم الكامل</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 disabled:opacity-75"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">البريد الإلكتروني</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={studentInfo.email}
                  onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 disabled:opacity-75"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">رقم الهاتف</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={studentInfo.phone}
                  onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 disabled:opacity-75"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">الدولة والمدينة</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={`${studentInfo.country} - ${studentInfo.city}`}
                  onChange={(e) => setStudentInfo({ ...studentInfo, city: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 disabled:opacity-75"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">نبذة تعريفية شخصية (Bio)</label>
              <textarea
                disabled={!isEditing}
                rows={3}
                value={studentInfo.bio}
                onChange={(e) => setStudentInfo({ ...studentInfo, bio: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 disabled:opacity-75 resize-none"
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Save size={16} />
                <span>حفظ التعديلات الجديدة</span>
              </button>
            )}
          </form>
        </div>

        {/* إعدادات الأمان وتغيير كلمة المرور */}
        <div className="space-y-6">
          <div className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <Shield size={18} className="text-blue-600" /> أمان الحساب وكلمة المرور
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              قم بتحديث كلمة المرور الخاصة بك بشكل دوري وحماية حسابك الأكاديمي.
            </p>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <KeyRound size={15} />
              <span>تعديل وتغيير كلمة المرور</span>
            </button>
          </div>

          <div className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <Bell size={18} className="text-blue-600" /> إشعارات البروفايل
            </h3>
            <div className="space-y-3 text-xs font-semibold text-slate-600">
              <label className="flex items-center justify-between cursor-pointer">
                <span>تنبيهات تعديل المشاريع والتقييمات</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>رسائل المدرسين المباشرة</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
              </label>
            </div>
          </div>
        </div>

      </div>

      {/* قسم الدبلومات المسجلة مع إمكانية تحميل ملفات وفيديوهات كل كورس على حدة */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" /> كورساتك المشترك فيها وملفاتها المتاحة للتحميل الداخلي ({enrolledDiplomas.length})
          </h3>
          <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
            ⚠️ ملاحظة: إلغاء الكورس نهائي ولا يشمل استرداد الرسوم.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledDiplomas.map((dip) => (
            <div key={dip.id} className="bg-white border-2 border-blue-100 rounded-3xl p-6 shadow-xs space-y-5 hover:border-blue-300 transition-all flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
                    {dip.status}
                  </span>
                  <span className="text-xs font-black text-slate-700">الإنجاز: {dip.progress}%</span>
                </div>

                <h4 className="text-sm font-black text-slate-900">{dip.name}</h4>
                <p className="text-xs text-slate-500 font-bold">المدرس المسؤول: <strong className="text-slate-800">{dip.instructor}</strong></p>

                {/* شريط التقدم */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${dip.progress}%` }} />
                </div>
              </div>

              {/* قسم ملفات وفيديوهات الكورس المتاحة للتحميل لجهاز الطالب */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <h5 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <FolderDown size={15} className="text-blue-600" /> ملفات وفيديوهات هذا الكورس (للتحميل لجهازك):
                </h5>
                <div className="space-y-2">
                  {dip.downloadableFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                      <div className="space-y-0.5 truncate max-w-[200px] sm:max-w-[240px]">
                        <p className="font-bold text-slate-800 truncate" title={file.title}>{file.title}</p>
                        <span className="text-[10px] text-slate-400 font-semibold">{file.size}</span>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(file.title, dip.name)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all flex items-center gap-1 shrink-0 shadow-xs"
                      >
                        <Download size={13} />
                        <span>تحميل</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* أزرار التفاعل: التحدث مع المدرس أو إلغاء الكورس */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold">
                <button
                  onClick={() => openChat(dip.instructor)}
                  className="px-3 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <MessageSquare size={14} />
                  <span>تحدث مع المدرس</span>
                </button>

                <button
                  onClick={() => setCourseToCancel(dip)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl transition-all flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  <span>إلغاء الكورس</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* نافذة تغيير كلمة المرور */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-blue-200 overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-600" /> تغيير كلمة المرور بأمان
              </h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <XCircle size={20} />
              </button>
            </div>

            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">كلمة المرور الحالية</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="8 أحرف، حرف كبير، ورقم واحد على الأقل"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-[11px] text-blue-900 font-semibold space-y-1">
                <span>📌 متطلبات الأمان لكلمة المرور:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li>ألا تقل عن 8 أحرف.</li>
                  <li>تحتوي على حرف كبير واحد على الأقل (A-Z).</li>
                  <li>تحتوي على رقم واحد على الأقل (0-9).</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-md"
                >
                  حفظ كلمة المرور الجديدة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تأكيد إلغاء الكورس */}
      {courseToCancel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-red-200 overflow-hidden p-6 space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle size={28} />
              <h3 className="text-base font-black text-slate-900">تأكيد إلغاء الدبلوم/الكورس</h3>
            </div>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              هل أنت متأكد من رغبتك في إلغاء الاشتراك في <strong className="text-slate-900">({courseToCancel.name})</strong>؟ 
              <br /><br />
              <span className="text-red-600 font-black">تحذير:</span> وفقاً لسياسة المنصة، هذا الإجراء نهائي ولا يمكن التراجع عنه، **ولا يتم استرداد الرسوم المالية المدفوعة نهائياً**.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setCourseToCancel(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                تراجع
              </button>
              <button
                onClick={confirmCancelCourse}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                تأكيد الإلغاء النهائي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة الشات الخاص مع المدرس */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px]">
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">👨‍🏫</div>
                <div>
                  <h3 className="text-sm font-black">محادثة مع الأستاذ: {activeInstructor}</h3>
                  <p className="text-[10px] text-slate-300">استفسارات الكورس والمتابعة الأكاديمية</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white hover:bg-white/20 p-1.5 rounded-xl transition-all">
                <XCircle size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-semibold ${msg.sender === "student" ? "bg-blue-600 text-white rounded-bl-none shadow-sm" : "bg-white text-slate-900 border border-slate-200 shadow-xs rounded-br-none"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="اكتب رسالتك للمدرس هنا..."
                className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600"
              />
              <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md">
                إرسال
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}