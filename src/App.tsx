import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Courses from "./pages/Courses";
import Videos from "./pages/Videos";
import Downloads from "./pages/Downloads";
import Quizzes from "./pages/Quizzes";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";

import Notifications from "./pages/Notifications";

import "./index.css";
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" dir="rtl">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full overflow-hidden lg:pr-72 transition-all">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-[1600px] mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/files" element={<Downloads />} />
              <Route path="/exams" element={<Quizzes />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/attendance" element={<Attendance />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />

              <Route path="/Grades" element={<Grades />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
