import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Sparkles,
  ArrowRight,
  Edit3,
  Camera,
  Save,
  Check,
  Shield,
  KeyRound,
  ShieldCheck,
  XCircle,
  AlertTriangle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ProfilePage() {
  const [studentId] = useState(1);

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    country: "",
    city: "",
    joinDate: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    async function fetchStudentData() {
      const { data, error } = await supabase
        .from("students_profile")
        .select("*")
        .eq("id", studentId)
        .single();

      if (data && !error) {
        setStudentInfo({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          phone: data.phone || "",
          country: data.country || "",
          city: data.city || "",
          joinDate: data.join_date || "",
          bio: data.bio || "",
        });
        if (data.profile_image_url) {
          setProfileImage(data.profile_image_url);
        }
      } else {
        console.error("خطأ في جلب البيانات:", error);
      }
    }
    fetchStudentData();
  }, [studentId]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${studentId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      setIsLoading(true);
      const { error: uploadError } = await supabase.storage
        .from("student-avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("خطأ الرفع:", uploadError);
        setSuccessMessage("فشل رفع الصورة، تأكد من إعدادات الـ Storage.");
        setIsLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("student-avatars")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("students_profile")
        .update({ profile_image_url: imageUrl })
        .eq("id", studentId);

      if (updateError) {
        console.error("خطأ تحديث الرابط بالجدول:", updateError);
      }

      setProfileImage(imageUrl);
      setIsLoading(false);
      setSuccessMessage("تم تحديث وحفظ صورة الملف الشخصي بنجاح! 📸");
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from("students_profile")
      .upsert({
        id: studentId,
        name: studentInfo.name,
        email: studentInfo.email,
        phone: studentInfo.phone,
        country: studentInfo.country,
        city: studentInfo.city,
        bio: studentInfo.bio,
        role: studentInfo.role || "طالب ",
        join_date: studentInfo.joinDate || "2026",
        updated_at: new Date().toISOString(),
      });

    setIsLoading(false);
    if (!error) {
      setIsEditing(false);
      setSuccessMessage("تم حفظ وتحديث كافة بياناتك الشخصية بنجاح! ✨");
      setTimeout(() => setSuccessMessage(""), 4000);
    } else {
      console.error("خطأ الحفظ بالتفصيل:", error.message);
      setSuccessMessage(`فشل الحفظ: ${error.message}`);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف.");
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setPasswordError("يجب أن تحتوي كلمة المرور على حرف كبير ورقم واحد على الأقل.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("كلمة المرور الجديدة وتأكيدها غير متطابقين.");
      return;
    }

    const { error } = await supabase
      .from("student_security")
      .update({
        password_hash: newPassword,
        last_password_update: new Date(),
      })
      .eq("student_id", studentId);

    if (!error) {
      setIsPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccessMessage("تم تغيير كلمة المرور وحفظها بأمان! 🔒✨");
      setTimeout(() => setSuccessMessage(""), 5000);
    } else {
      console.error("خطأ كلمة المرور:", error);
      setPasswordError("حدث خطأ أثناء تحديث كلمة المرور.");
    }
  };

  return (
    <div className="min-h-screen text-slate-800  space-y-6 sm:space-y-8" dir="rtl">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-10 shadow-2xl text-white border border-white/10">
        {/* Background Glow Elements */}
        <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 text-center sm:text-right">
            {/* Avatar Profile Box */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-1.5 shadow-2xl overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-[20px]" />
                ) : (
                  <div className="w-full h-full bg-slate-900 rounded-[20px] flex items-center justify-center text-4xl shadow-inner">
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
                disabled={isLoading}
                className="absolute bottom-1 left-1 p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 border border-white/20"
                title="تغيير الصورة الشخصية"
              >
                <Camera size={16} />
              </button>
            </div>

            {/* Profile Meta Data */}
            <div className="space-y-2.5">
              <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md text-cyan-300 text-[11px] font-bold rounded-full inline-flex items-center gap-1.5 border border-white/15 shadow-inner">
                <Sparkles size={13} />
                بوابة الطالب الأكاديمية - منصة Z E D
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {studentInfo.name || "جاري التحميل..."}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-slate-300 font-medium">
                <span className="text-blue-400 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                  {studentInfo.role || "طالب برمجة"}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar size={14} /> منضم منذ {studentInfo.joinDate}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/courses"
            className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-2xl text-xs font-black shadow-lg transition-all border border-white/15 flex items-center justify-center gap-2 self-stretch sm:self-auto hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowRight size={16} />
            <span>العودة للكورسات</span>
          </Link>
        </div>
      </div>

      {/* Success Alert Floating Banner */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-md animate-fade-in">
          <div className="p-1.5 bg-emerald-500 text-white rounded-xl shadow-xs">
            <Check size={16} />
          </div>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Personal Details Form Section */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">البيانات الشخصية والمعلومات</h2>
                <p className="text-xs text-slate-500">إدارة معلومات حسابك وتفاصيل الاتصال</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isEditing
                  ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <Edit3 size={15} />
              <span>{isEditing ? "إلغاء التعديل" : "تعديل بياناتي"}</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <User size={13} className="text-slate-400" /> الاسم الكامل
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" /> البريد الإلكتروني
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={studentInfo.email}
                  onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Phone size={13} className="text-slate-400" /> رقم الهاتف
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={studentInfo.phone}
                  onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Globe size={13} className="text-slate-400" /> الدولة
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={studentInfo.country}
                  onChange={(e) => setStudentInfo({ ...studentInfo, country: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <MapPin size={13} className="text-slate-400" /> نبذة تعريفية شخصية (Bio)
              </label>
              <textarea
                disabled={!isEditing}
                rows={3}
                value={studentInfo.bio}
                onChange={(e) => setStudentInfo({ ...studentInfo, bio: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all disabled:opacity-75 disabled:cursor-not-allowed resize-none"
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Save size={16} />
                <span>{isLoading ? "جاري الحفظ..." : "حفظ التعديلات الجديدة"}</span>
              </button>
            )}
          </form>
        </div>

        {/* Sidebar Security Column */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">أمان الحساب</h3>
                <p className="text-xs text-slate-500">حماية الكلمات السرية وكلمات المرور</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              احرص على استخدام كلمة مرور قوية تتكون من أحرف وأرقام لضمان حماية مسارك الأكاديمي.
            </p>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 hover:shadow-blue-600/20 active:scale-[0.99]"
            >
              <KeyRound size={16} />
              <span>تعديل وتغيير كلمة المرور</span>
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-sm font-black text-slate-900">تغيير كلمة المرور بأمان</h3>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(false)} 
                className="text-slate-400 hover:text-slate-700 transition-colors p-1"
              >
                <XCircle size={22} />
              </button>
            </div>

            {passwordError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold flex items-center gap-2.5 shadow-xs">
                <AlertTriangle size={16} className="shrink-0 text-rose-500" />
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-blue-500/20 active:scale-[0.99]"
                >
                  حفظ كلمة المرور الجديدة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}