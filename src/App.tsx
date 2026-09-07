import { useState } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Courses from "./pages/Courses";
import Videos from "./pages/Videos";
import Downloads from "./pages/Downloads";
import Quizzes from "./pages/Quizzes";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Profile from "./pages/Profile";
import CourseCard from "./pages/CourseCard";
import Notifications from "./pages/Notifications";

import "./index.css";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams(); // ✅ اضيف

  // ✅ اقرأ userId من URL
  const userId = searchParams.get('userId');

  // ✅ تحقق من وجود userId
  if (!userId) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-600" dir="rtl">
        <div className="text-center space-y-4">
          <p>⚠️ معرف المستخدم غير موجود</p>
          <p className="text-xs text-slate-500">يرجى تسجيل الدخول من خلال صفحة تسجيل الدخول</p>
          <a href="/auth" className="text-blue-600 hover:underline text-sm">
            ذهب لصفحة تسجيل الدخول
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" dir="rtl">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full overflow-hidden lg:pr-72 transition-all">
        {/* ✅ مرر userId لـ Header */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} userId={userId} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-[1600px] mx-auto">
            <Routes>
              {/* ✅ مرر userId لـ جميع الـ pages */}
              <Route path="/" element={<HomePage userId={userId} />} />
              <Route path="/courses" element={<Courses userId={userId} />} />
              <Route path="/videos" element={<Videos userId={userId} />} />
              <Route path="/subscriptions" element={<CourseCard userId={userId} />} />
              <Route path="/files" element={<Downloads userId={userId} />} />
              <Route path="/live" element={<Quizzes userId={userId} />} />
              <Route path="/assignments" element={<Assignments userId={userId} />} />
              <Route path="/notifications" element={<Notifications userId={userId} />} />
              <Route path="/profile" element={<Profile userId={userId} />} />
              <Route path="/Grades" element={<Grades userId={userId} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}