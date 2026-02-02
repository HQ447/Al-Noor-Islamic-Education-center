import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { NavLink } from "react-router";
import logo from "../assets/logo2.png";

export default function Footer() {
  const [courses, setCourses] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const year = new Date();
  const currYear = year.getFullYear();

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <footer className="text-white bg-black ">
      {/* Top Footer */}
      <div className="grid grid-cols-1 gap-8 px-6 py-12 md:px-12 md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
        {/* Logo + Description */}
        <div className="text-center md:text-left">
          <img
            src={logo}
            alt="EliteQuranTutors.com"
            className="object-contain w-32 h-32 mx-auto bg-transparent md:mx-0"
          />
          <p className="mt-4 text-sm text-justify text-gray-300">
            <strong>Al Noor Islamic Education Center</strong> offers
            personalized, one-on-one online Quran classes with certified male
            and female tutors. Learn Quran with Tajweed, Hifz, and Islamic
            studies from the comfort of your home.
          </p>
        </div>

        {/* Popular Courses */}
        <div>
          <h2 className="mb-4 text-sm font-semibold md:text-lg">
            POPULAR COURSES
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {courses.map((course) => (
              <li key={course._id}>
                <NavLink
                  to={`/course-detail/${course._id}`}
                  className="hover:underline"
                >
                  {course.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h2 className="mb-4 text-sm font-semibold md:text-lg">
            NEED ANY HELP?
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <NavLink to={"/about"} className="hover:underline">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to={"/contact"} className="hover:underline">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to={"fee"} className="hover:underline">
                Fee
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h2 className="mb-4 text-sm font-semibold md:text-lg">
            FOLLOW US ON
          </h2>
          <div className="flex justify-center gap-4 text-xl">
            <a
              href="https://www.facebook.com/share/1BaNjFt7GP/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.facebook.com/share/1BaNjFt7GP/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.facebook.com/share/1BaNjFt7GP/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/share/1BaNjFt7GP/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Middle Footer */}
      <div className="flex justify-center gap-1 px-3 py-4 text-xs text-center text-gray-400 bg-black ">
        ©{currYear} <b>alnooredu.online</b> All rights reserved. Developed by
        <a
          href="https://hamadahmad.online"
          target="_blank"
          className="flex gap-1 font-bold text-green-500"
        >
          Hammad <span className="hidden md:flex "> Ahmad</span>
        </a>
      </div>
    </footer>
  );
}
