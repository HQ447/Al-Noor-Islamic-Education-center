import React, { useEffect, useState } from "react";
import {
  Check,
  Star,
  Gift,
  Clock,
  Users,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router";

function Fee() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  const plans = [
    
    {
      id: "monthly",
      name: "Online Quran Course",
      description: "Most popular choice for regular learning",
      price: {
        weekly: 30,
        monthly: 60,
        yearly: 799,
      },
      originalPrice: {
        weekly: 40,
        monthly: 90,
        yearly: 1100,
      },
      popular: true,
      features: [
        "3 Classes per week",
        "1-on-1 Premium Teaching",
        "Complete Course Materials",
        "Priority Email & Chat Support",
        "Advanced Progress Analytics",
      ],
      badge: "Most Popular",
      icon: Star,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "yearly",
      name: "Arabic Learning ",
      description: "Best value for serious learners",
      price: {
        weekly: 35,
        monthly: 70,
        yearly: 699,
      },
      originalPrice: {
        weekly: 50,
        monthly: 100,
        yearly: 1000,
      },
      popular: false,
      features: [
        "Daily Classes Available",
        "1-on-1 Expert Teaching",
        "Premium Course Materials",
        "24/7 Priority Support",
        "Comprehensive Analytics",
      ],
      badge: "Best Value",
      icon: Award,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const additionalServices = [
    {
      name: "Private Group Classes",
      description: "Family or friend group sessions",
      price: "$15",
      unit: "per person/class",
      icon: Users,
    },
    {
      name: "Intensive Courses",
      description: "Accelerated learning programs",
      price: "$199",
      unit: "per month",
      icon: Zap,
    },
    {
      name: "Specialized Workshops",
      description: "Tajweed, Arabic, Islamic Studies",
      price: "$49",
      unit: "per workshop",
      icon: BookOpen,
    },
    {
      name: "Consultation Session",
      description: "Learning path guidance",
      price: "Free",
      unit: "30 minutes",
      icon: Gift,
    },
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    navigate("/register-student");
  };

  const getBillingLabel = () => {
    switch (billingCycle) {
      case "weekly":
        return "per week";
      case "monthly":
        return "per month";
      case "yearly":
        return "per year";
      default:
        return "per month";
    }
  };

  const getDiscount = (plan) => {
    const original = plan.originalPrice[billingCycle];
    const current = plan.price[billingCycle];
    return Math.round(((original - current) / original) * 100);
  };

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
          <div className="mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-black bg-white rounded-full bg-opacity-20">
              💰 Pricing Plans
            </div>
          </div>
          <h1 className="mb-5 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            Choose Your
            <span className="block text-yellow-300">Learning Journey</span>
          </h1>
          <p className="max-w-3xl mx-auto mb-5 text-sm leading-relaxed text-green-100 md:text-lg">
            Flexible pricing plans designed to make quality Islamic education
            accessible to everyone
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-white rounded-full bg-opacity-20">
            {["weekly", "monthly", "yearly"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === cycle
                    ? "bg-white text-green-600 shadow-lg"
                    : "text-green-600 hover:bg-white hover:bg-opacity-10"
                }`}
              >
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="flex items-center justify-center py-16 bg-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              const discount = getDiscount(plan);

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    plan.popular
                      ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute transform -translate-x-1/2 -top-4 left-1/2">
                      <div className="px-2 py-2 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-600">
                        ⭐ {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="p-5 md:p-8">
                    {/* Plan Header */}
                    <div className="mb-8 text-center">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${plan.color} rounded-full mb-4`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                          ${plan.price[billingCycle]}
                        </span>
                        <div className="text-left">
                          <div className="text-sm text-gray-500 line-through">
                            ${plan.originalPrice[billingCycle]}
                          </div>
                          <div className="text-sm text-gray-600">
                            {getBillingLabel()}
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        <Gift className="w-4 h-4" />
                        Fee is Negotiable
                       
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8 space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700 ">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full py-1 md:py-2 text-sm rounded-lg font-semibold transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-green-300"
                      }`}
                    >
                      {plan.popular ? "Start Learning Now" : "Choose This Plan"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              ➕ Additional Services
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
              Enhance Your Learning Experience
            </h2>
            <p className="max-w-2xl mx-auto text-sm text-gray-600 lg:text-lg">
              Complement your main subscription with specialized services and
              workshops
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="mb-2 font-bold text-gray-800">
                      {service.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {service.description}
                    </p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-green-600">
                        {service.price}
                      </span>
                      <div className="text-sm text-gray-500">
                        {service.unit}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
              Why Choose Our Plans?
            </h2>
            <p className="text-sm text-gray-600">
              All plans include our core commitment to quality Islamic education
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Certified Teachers
              </h3>
              <p className="text-sm text-gray-600">
                Learn from qualified Islamic scholars with Ijazah and years of
                teaching experience.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Personalized Learning
              </h3>
              <p className="text-sm text-gray-600">
                One-on-one classes tailored to your learning pace, goals, and
                schedule.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Comprehensive Curriculum
              </h3>
              <p className="text-sm text-gray-600">
                From basic Quran reading to advanced Tajweed and Islamic studies
                programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-16 text-white bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl px-6 mx-auto text-center lg:px-12">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full bg-opacity-20">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              30-Day Money Back Guarantee
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-sm text-green-100">
              We're confident you'll love our teaching approach. If you're not
              completely satisfied within 30 days, we'll provide a full refund.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <NavLink
              to={"/register-student"}
              className="px-8 py-2 font-semibold text-green-600 transition-colors bg-white rounded-lg shadow-lg md:py-3 hover:bg-gray-100"
            >
              Start Free Trial
            </NavLink>
            <NavLink
              to={"/contact"}
              className="px-8 py-2 font-semibold text-white transition-colors border-2 rounded-lg md:py-4 bg-emerald-500 hover:bg-emerald-600 border-emerald-400"
            >
              Contact Sales Team
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Fee;
