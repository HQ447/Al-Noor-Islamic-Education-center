import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Globe,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert(
        "Thank you for your message! We will get back to you within 24 hours."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "alnoorisledu@gmail.com",
      secondary: "alnoorisledu@gmail.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "+92 336 7191936",
      secondary: "+92 336 7191936",
      description: "24/7 Support Available",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "Islamabad",
      secondary: " Pakistan",
      description: "Main Campus Location",
    },
    {
      icon: Clock,
      title: "Operating Hours",
      primary: "Mon - Fri: 8:00 AM - 10:00 PM",
      secondary: "Sat - Sun: 9:00 AM - 8:00 PM",
      description: "Local Time Zone",
    },
  ];

  const faqItems = [
    {
      question: "How quickly will I receive a response?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.",
    },
    {
      question: "Can I schedule a consultation?",
      answer:
        "Yes! We offer free 30-minute consultations to discuss your learning goals and recommend the best program for you.",
    },
    {
      question: "Do you offer technical support?",
      answer:
        "Absolutely. Our technical support team is available to help you with any platform-related issues or questions.",
    },
  ];
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden text-white bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M30 0l15 15-15 15-15-15zM0 30l15 15-15 15-15-15zM30 30l15 15-15 15-15-15zM60 30l15 15-15 15-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-6xl px-6 mx-auto text-center lg:px-12">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-black bg-white rounded-full bg-opacity-20">
              📞 Contact Us
            </div>
          </div>
          <h1 className="mb-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            Get in Touch
            <span className="block text-yellow-300">We're Here to Help</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-green-100 md:text-lg">
            Have questions about our courses or need guidance on your Islamic
            learning journey? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="p-6 text-center transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-800">
                    {info.title}
                  </h3>
                  <p className="mb-1 font-semibold text-green-600">
                    {info.primary}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">{info.secondary}</p>
                  <p className="text-xs text-gray-500">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 bg-white shadow-xl rounded-2xl">
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">
                  Send us a Message
                </h2>
                <p className="text-sm text-gray-600">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg placeholder:text-sm md:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg placeholder:text-sm md:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg placeholder:text-sm md:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-sm transition-colors border border-gray-300 rounded-lg placeholder:text-sm md:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg placeholder:text-sm md:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg resize-none placeholder:text-sm md:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full gap-2 px-6 py-2 font-semibold text-white transition-colors rounded-lg lg:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
                <div className="relative flex items-center justify-center h-64 bg-gradient-to-br from-green-100 to-emerald-100">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <h3 className="mb-2 text-lg font-bold text-gray-800 lg:text-xl">
                      Visit Our Campus
                    </h3>
                    <p className="text-sm text-gray-600">
                      Islamabad
                    </p>
                    <p className="text-sm text-gray-600">Pakistan</p>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute w-8 h-8 bg-green-200 rounded-full top-4 right-4 opacity-60"></div>
                  <div className="absolute w-6 h-6 rounded-full bottom-4 left-4 bg-emerald-200 opacity-60"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-xs text-green-600" />
                      <span>Mon-Fri: 8AM-10PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      <span>Online Classes 24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="p-6 bg-white shadow-xl rounded-2xl">
                <h3 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-800">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div
                      key={index}
                      className="pb-4 border-b border-gray-100 last:border-b-0"
                    >
                      <h4 className="mb-2 font-semibold text-gray-800">
                        {faq.question}
                      </h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Hours */}
              <div className="p-6 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                  <Users className="w-6 h-6" />
                  24/7 Support Available
                </h3>
                <p className="mb-4 text-sm text-green-100">
                  Our dedicated support team is here to help you succeed in your
                  Islamic learning journey.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="px-4 py-2 text-sm font-semibold text-green-600 transition-colors bg-white rounded-lg hover:bg-gray-100">
                    Live Chat
                  </button>
                  <button className="px-4 py-2 text-sm font-semibold text-white transition-colors border rounded-lg bg-emerald-500 hover:bg-emerald-600 border-emerald-400">
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
