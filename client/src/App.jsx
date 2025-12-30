import React from "react";
import { NavLink, Route, Router, Routes } from "react-router-dom";
import Main from "./app/main/Main";
import Dashboard from "./app/dashboard/Dashboard";
import Home from "./app/main/Home/Home";
import Contact from "./app/main/Contact/Contact";
import About from "./app/main/About/About";
import Faqs from "./app/main/Home/Faqs";
import Courses from "./app/main/Courses/Courses";
import Fee from "./app/main/FeePlans/Fee";
import Books from "./app/main/Books/Books";
import RegStudent from "./app/main/student Reg/RegStudent";
import AdminLogin from "./app/dashboard/AdminLogin";
import RegisterAdmin from "./app/dashboard/RegisterAdmin";
import Reset from "./app/dashboard/Reset";
import Otp from "./app/dashboard/Otp";
import Forgot from "./app/dashboard/Forgot";
import CourseDetail from "./app/main/course details/CourseDetail";
import Analyics from "./app/dashboard/Analytics";
import StudentManagement from "./app/dashboard/StudentManagement";
import CourseManagement from "./app/dashboard/CourseManagement";
import AdminsManagement from "./app/dashboard/AdminsManagement";
import Settings from "./app/dashboard/Settings";
import BooksManagement from "./app/dashboard/Books";
import NotFound from "./app/main/Not Found/NotFound";
import AllStudents from "./app/dashboard/AllStudents";
import TeacherDetails from "./app/dashboard/TeacherDetails";
import TeacherDetail from "./app/main/Teacher Details/TeacherDetail";
import StudentDetails from "./app/dashboard/StudentDetails";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/library" element={<Books />} />
          <Route path="/register-student" element={<RegStudent />} />
          <Route path="/course-detail/:id" element={<CourseDetail />} />
          <Route path="/teacher-detail/:id" element={<TeacherDetail />} />

          <Route path="/fee" element={<Fee />} />
        </Route>
        <Route path="/NotFound" element={<NotFound />}></Route>
        <Route path="/admin-Login" element={<AdminLogin />} />
        <Route path="/admin-Register" element={<RegisterAdmin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset" element={<Reset />} />

        <Route path="/admin-dashboard" element={<Dashboard />}>
          <Route index element={<Analyics />} />
          <Route path="student-management" element={<StudentManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="admin-management" element={<AdminsManagement />} />
          <Route path="books" element={<BooksManagement />} />
          <Route path="all-students" element={<AllStudents />} />
          <Route path="teacher-detail/:id" element={<TeacherDetails />} />
          <Route path="student-detail/:id" element={<StudentDetails />} />

          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
