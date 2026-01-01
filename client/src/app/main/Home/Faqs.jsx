import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Star,
  Quote,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Faqs() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "What age groups do you cater to?",
      answer:
        "We welcome students of all ages, from young children (4+) to adults. Our experienced teachers adapt their teaching methods according to each student's age, learning pace, and comprehension level. We have specialized programs for kids, teenagers, and adults.",
    },
    {
      question: "Do I need any prior knowledge of Arabic to start?",
      answer:
        "Not at all! We offer courses for complete beginners who have never read Arabic before, as well as advanced students looking to perfect their Tajweed. Our 'Noorani Qaida' program is specifically designed for those starting from scratch.",
    },
    {
      question: "How are the online classes conducted?",
      answer:
        "Classes are conducted via Zoom, Skype, or our custom learning platform. Each session is one-on-one with a qualified teacher, ensuring personalized attention. You'll need a stable internet connection, a device with camera/microphone, and a quiet learning environment.",
    },
    {
      question: "What is included in the free trial class?",
      answer:
        "The free trial includes a 30-minute session with one of our qualified teachers. They will assess your current level, understand your learning goals, demonstrate our teaching methodology, and recommend the most suitable course for you. No payment required!",
    },
    {
      question: "Are your teachers qualified and certified?",
      answer:
        "Yes, all our teachers are highly qualified with Ijazah (certification) in Quran recitation and Tajweed. They have years of teaching experience and undergo continuous training to maintain the highest standards of Islamic education.",
    },
    {
      question: "What courses do you offer?",
      answer:
        "We offer: Quran Reading with Tajweed, Hifz (Memorization), Arabic Language, Islamic Studies, Noorani Qaida for beginners, and specialized courses for kids. Each program is designed to meet specific learning objectives.",
    },
    {
      question: "How flexible are the class timings?",
      answer:
        "Very flexible! We understand our students are from different time zones worldwide. You can choose your preferred time slots, and we'll match you with available teachers. Classes can be rescheduled with 24-hour notice.",
    },
    {
      question: "What if I miss a class?",
      answer:
        "If you inform us at least 2 hours before the class, it can be rescheduled without any penalty. Emergency situations are handled case-by-case. We also provide recorded sessions for review when possible.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl px-6 mx-auto lg:px-2">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
            ❓ Common Questions
          </div>
          <h2 className="mb-2 text-xl font-bold text-blue-700 md:text-2xl lg:text-3xl">
            Frequently <span className="text-green-600">Asked Questions</span>
          </h2>
          <div className="flex justify-center my-3">
            <img
              src="https://elitequrantutors.com/wp-content/uploads/2023/02/Saperator-1-300x25.png"
              alt="Separator"
              className="w-56 h-auto"
            />
          </div>

          <p className="max-w-2xl mx-auto text-sm md:text-lg text-slate-600">
            Find answers to common questions about our Quran learning programs
            and teaching methodology
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden transition-shadow bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors hover:bg-gray-50"
              >
                <h3 className="pr-4 text-sm font-semibold lg:text-lg text-slate-900">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <Minus className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>

              {openFAQ === index ? (
                <>
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="leading-relaxed text-[11px] md:text-sm text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="p-8 mt-12 text-center text-white bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl">
          <h3 className="mb-4 text-xl font-bold lg:text-2xl">
            Still have questions?
          </h3>
          <p className="mb-6 text-[13px] md:text-lg text-blue-100">
            Our friendly support team is here to help you get started on your
            Quran learning journey
          </p>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=alnoorisledu@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-xs font-semibold text-blue-600 transition-colors bg-white rounded-lg md:text-sm md:py-2 hover:bg-gray-100"
            >
              Email Us
            </a>
            <NavLink
              to={"/register-student"}
              className="px-6 py-2 text-xs font-semibold text-white transition-colors rounded-lg md:text-sm md:py-2 bg-emerald-500 hover:bg-emerald-600"
            >
              Book Free Trial
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
