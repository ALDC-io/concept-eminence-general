import React, { useState } from "react";
import { track } from "@vercel/analytics";
import {
  ChevronLeft,
  X,
  MessageSquare,
  Package,
  Users,
  Leaf,
  Award,
  Globe,
  Target,
  Heart,
  TreePine,
  Sparkles,
} from "lucide-react";

interface Metric {
  id: string;
  title: string;
  value: string;
  status: "green" | "yellow" | "red";
  progress: number;
  target: number;
  details: string;
  trend: string;
  view: string;
}

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "overview" | "business-model" | string
  >("overview");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hello! I'm Eclipse AI, your intelligent assistant for optimizing Éminence Organics' organic skincare business. How can I help you analyze spa partnerships, product performance, or sustainability metrics?",
    },
  ]);

  const metrics: Metric[] = [
    {
      id: "spa-partners",
      title: "Active Spa Partners",
      value: "2,847",
      status: "green",
      progress: 87,
      target: 3000,
      details: "Professional spa partnerships across North America",
      trend: "+12% QoQ",
      view: "partners",
    },
    {
      id: "organic-revenue",
      title: "Organic Product Revenue",
      value: "$42.3M",
      status: "green",
      progress: 92,
      target: 45000000,
      details: "YTD revenue from certified organic product lines",
      trend: "+18% YoY",
      view: "revenue",
    },
    {
      id: "sustainability-score",
      title: "Sustainability Score",
      value: "94/100",
      status: "green",
      progress: 94,
      target: 100,
      details: "B-Corp certification metrics and environmental impact",
      trend: "+3 points",
      view: "sustainability",
    },
    {
      id: "product-lines",
      title: "Active Product Lines",
      value: "12",
      status: "green",
      progress: 100,
      target: 12,
      details: "Specialized collections for different skin concerns",
      trend: "Stable",
      view: "products",
    },
    {
      id: "spa-retention",
      title: "Spa Partner Retention",
      value: "91%",
      status: "green",
      progress: 91,
      target: 95,
      details: "Annual retention rate for professional partners",
      trend: "+2% YoY",
      view: "partners",
    },
    {
      id: "online-sales",
      title: "E-commerce Growth",
      value: "+34%",
      status: "green",
      progress: 85,
      target: 40,
      details: "YoY growth in direct-to-consumer online sales",
      trend: "Accelerating",
      view: "revenue",
    },
    {
      id: "trees-planted",
      title: "Trees Planted",
      value: "23.8M",
      status: "green",
      progress: 79,
      target: 30000000,
      details: "Forests for the Future™ program lifetime impact",
      trend: "+2.1M YTD",
      view: "sustainability",
    },
    {
      id: "product-certification",
      title: "Certified Organic Products",
      value: "89%",
      status: "yellow",
      progress: 89,
      target: 95,
      details: "Percentage of products with USDA organic certification",
      trend: "+4% YTD",
      view: "products",
    },
    {
      id: "customer-satisfaction",
      title: "Customer Satisfaction",
      value: "4.7/5",
      status: "green",
      progress: 94,
      target: 100,
      details: "Average rating across all channels and products",
      trend: "Stable",
      view: "customers",
    },
    {
      id: "inventory-turnover",
      title: "Inventory Turnover",
      value: "8.2x",
      status: "yellow",
      progress: 82,
      target: 10,
      details: "Annual inventory turnover rate",
      trend: "+0.5x QoQ",
      view: "operations",
    },
    {
      id: "spa-education",
      title: "Partners Trained",
      value: "4,239",
      status: "green",
      progress: 88,
      target: 5000,
      details: "Estheticians completed online education programs",
      trend: "+523 MTD",
      view: "partners",
    },
    {
      id: "new-product-success",
      title: "NPD Success Rate",
      value: "78%",
      status: "yellow",
      progress: 78,
      target: 85,
      details: "New products meeting first-year revenue targets",
      trend: "+5% YoY",
      view: "products",
    },
    {
      id: "global-reach",
      title: "International Markets",
      value: "38",
      status: "green",
      progress: 95,
      target: 40,
      details: "Countries with active distribution",
      trend: "+3 YTD",
      view: "expansion",
    },
    {
      id: "ingredient-sourcing",
      title: "Biodynamic Ingredients",
      value: "67%",
      status: "yellow",
      progress: 67,
      target: 80,
      details: "Ingredients from certified biodynamic farms",
      trend: "+8% YoY",
      view: "sustainability",
    },
    {
      id: "social-impact",
      title: "Kids Foundation Impact",
      value: "$2.3M",
      status: "green",
      progress: 92,
      target: 2500000,
      details: "Funds raised for seriously ill children",
      trend: "+$430K YTD",
      view: "social",
    },
    {
      id: "marketing-roi",
      title: "Marketing ROI",
      value: "5.8:1",
      status: "green",
      progress: 87,
      target: 6,
      details: "Return on marketing investment",
      trend: "+0.6 QoQ",
      view: "marketing",
    },
  ];

  const getViewMetrics = (view: string) => {
    return metrics.filter((m) => m.view === view);
  };

  const getStatusColor = (status: "green" | "yellow" | "red") => {
    switch (status) {
      case "green":
        return "text-green-400";
      case "yellow":
        return "text-yellow-400";
      case "red":
        return "text-red-400";
    }
  };

  const getProgressBarColor = (status: "green" | "yellow" | "red") => {
    switch (status) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    track("Chat Message Sent", {
      messageLength: chatInput.length,
      conversationLength: chatMessages.length
    });

    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);

    // Simulate Claude's response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'll analyze that for you. Based on Éminence's current metrics, I recommend focusing on expanding spa partnerships in underserved markets while maintaining your strong sustainability scores. Would you like me to create a detailed action plan?`,
        },
      ]);
      track("Chat Response Received");
    }, 1000);

    setChatInput("");
  };

  const renderMetric = (metric: Metric) => (
    <div
      key={metric.id}
      onClick={() => {
        track("Metric Card Clicked", {
          metricId: metric.id,
          metricTitle: metric.title,
          view: metric.view,
          value: metric.value,
          status: metric.status
        });
        setCurrentView(metric.view);
      }}
      className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-green-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-green-500/20"
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-gray-300 text-xs font-medium">{metric.title}</h3>
        <span className={`text-xs ${getStatusColor(metric.status)}`}>
          {metric.status === "green"
            ? "✓"
            : metric.status === "yellow"
            ? "!"
            : "✗"}
        </span>
      </div>
      <div className="text-lg font-bold text-white mb-1">{metric.value}</div>
      <div className="text-xs text-gray-400 mb-2 line-clamp-2">
        {metric.details}
      </div>
      <div className="space-y-1">
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div
            className={`h-1 rounded-full ${getProgressBarColor(metric.status)}`}
            style={{ width: `${metric.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500 truncate">
            Target: {metric.target.toLocaleString()}
          </span>
          <span className="text-gray-400">{metric.trend}</span>
        </div>
      </div>
    </div>
  );

  const renderBusinessModel = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            track("Navigation - Back to Overview", {
              from: "business-model"
            });
            setCurrentView("overview");
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Overview
        </button>
        <h2 className="text-2xl font-bold text-white">
          Business Model Canvas - Éminence Organics
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Key Partners
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Professional spas & salons</li>
            <li>• Organic farmers & suppliers</li>
            <li>• Retail distributors</li>
            <li>• Certification bodies</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Key Activities
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Organic product R&D</li>
            <li>• Spa partner training</li>
            <li>• Sustainable farming</li>
            <li>• Quality control</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 col-span-2">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Value Propositions
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Certified organic skincare</li>
            <li>• Professional-grade formulations</li>
            <li>• Environmental responsibility</li>
            <li>• Results-driven treatments</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Customer Segments
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Professional spas</li>
            <li>• Eco-conscious consumers</li>
            <li>• Premium skincare users</li>
            <li>• International markets</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Key Resources
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Organic farms</li>
            <li>• R&D laboratories</li>
            <li>• Brand reputation</li>
            <li>• Partner network</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 col-span-2">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Channels
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Professional spa distribution</li>
            <li>• E-commerce platform</li>
            <li>• Select retail partners</li>
            <li>• International distributors</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Customer Relationships
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Professional education</li>
            <li>• Personal consultations</li>
            <li>• Loyalty programs</li>
            <li>• Community building</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 col-span-2">
          <h3 className="text-red-400 font-semibold mb-3">💰 Cost Structure</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Organic ingredient sourcing</li>
            <li>• Manufacturing & quality control</li>
            <li>• Partner support & training</li>
            <li>• Sustainability initiatives</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 col-span-3">
          <h3 className="text-green-400 font-semibold mb-3">
            💵 Revenue Streams
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Professional product sales to spas</li>
            <li>• Direct-to-consumer e-commerce</li>
            <li>• Training & certification programs</li>
            <li>• International distribution</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-700">
          <h3 className="text-green-400 font-semibold mb-2">
            🌱 Sustainability Impact
          </h3>
          <p className="text-sm text-gray-300">
            23.8M trees planted through Forests for the Future™ program
          </p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-700">
          <h3 className="text-blue-400 font-semibold mb-2">
            🏆 Market Position
          </h3>
          <p className="text-sm text-gray-300">
            Leading organic professional skincare brand in North America
          </p>
        </div>
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700">
          <h3 className="text-purple-400 font-semibold mb-2">
            💡 Innovation Focus
          </h3>
          <p className="text-sm text-gray-300">
            Biodynamic ingredients and sustainable packaging solutions
          </p>
        </div>
      </div>
    </div>
  );

  const renderDetailView = (view: string) => {
    const viewMetrics = getViewMetrics(view);
    const viewTitles: { [key: string]: string } = {
      partners: "Spa Partner Performance",
      revenue: "Revenue Analytics",
      sustainability: "Sustainability Metrics",
      products: "Product Portfolio",
      customers: "Customer Insights",
      operations: "Operations Excellence",
      expansion: "Global Expansion",
      social: "Social Impact",
      marketing: "Marketing Performance",
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              track("Navigation - Back to Overview", {
                from: view
              });
              setCurrentView("overview");
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Overview
          </button>
          <h2 className="text-2xl font-bold text-white">
            {viewTitles[view] || view}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewMetrics.map(renderMetric)}
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Key Insights
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              • Strong performance in {view} with most metrics exceeding targets
            </li>
            <li>• Focus areas identified for improvement in Q2</li>
            <li>• Sustainable growth trajectory maintained across all KPIs</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Leaf className="w-10 h-10 text-green-500" />
            <div>
              <h1 className="text-3xl font-bold">
                Éminence Organics Eclipse Dashboard
              </h1>
              <p className="text-gray-400">
                Organic Skincare Performance Metrics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-400">B-Corp Score</div>
              <div className="text-2xl font-bold text-green-400">94/100</div>
            </div>
            <button
              onClick={() => {
                track("Navigation - Business Model Opened");
                setCurrentView("business-model");
              }}
              className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              title="View Business Model"
            >
              ♞
            </button>
          </div>
        </div>

        {currentView === "overview" ? (
          <>
            {/* Dashboard takes 2/3 of screen height */}
            <div className="h-[50vh] overflow-y-auto mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {metrics.map(renderMetric)}
              </div>
            </div>

            {/* Priority Actions / Sustainability takes 1/3 of screen height */}
            <div className="h-[30vh] grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  Priority Actions
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 text-xs">•</span>
                    <div>
                      <div className="font-medium text-sm">
                        Expand Biodynamic Sourcing
                      </div>
                      <div className="text-xs text-gray-400">
                        Increase certified biodynamic ingredients to 80% by Q3
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1 text-xs">•</span>
                    <div>
                      <div className="font-medium text-sm">
                        Accelerate Spa Partner Training
                      </div>
                      <div className="text-xs text-gray-400">
                        Train 761 more estheticians to meet annual target
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1 text-xs">•</span>
                    <div>
                      <div className="font-medium text-sm">
                        Launch Sustainable Packaging
                      </div>
                      <div className="text-xs text-gray-400">
                        Roll out refillable containers for top 5 products
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-green-500" />
                  Sustainability Highlights
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Trees Planted This Month
                    </span>
                    <span className="text-green-400 font-semibold text-sm">
                      182,450
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Carbon Neutral Products
                    </span>
                    <span className="text-green-400 font-semibold text-sm">
                      76%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Plastic Reduction YTD
                    </span>
                    <span className="text-green-400 font-semibold text-sm">
                      -23%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Green Spa Partners
                    </span>
                    <span className="text-green-400 font-semibold text-sm">
                      1,892
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentView === "business-model" ? (
          renderBusinessModel()
        ) : (
          renderDetailView(currentView)
        )}

        {/* Eclipse AI Chat */}
        <button
          onClick={() => {
            track("Chat Opened");
            setChatOpen(true);
          }}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 p-4 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-green-500/50 group"
          title="Eclipse AI Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -inset-1 bg-green-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </div>
        </button>

        {chatOpen && (
          <div className="fixed bottom-24 right-8 w-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-750">
              <h3 className="font-semibold flex items-center gap-2">
                <div className="relative">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <div className="absolute -inset-1 bg-green-500 rounded-full blur-sm opacity-30"></div>
                </div>
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Eclipse AI
                </span>
                <span className="text-gray-300 text-sm font-normal">
                  - Éminence Advisor
                </span>
              </h3>
              <button
                onClick={() => {
                  track("Chat Closed");
                  setChatOpen(false);
                }}
                className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700 rounded-lg p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${msg.role === "user" ? "text-right" : ""}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleChatSubmit}
              className="p-4 border-t border-gray-700"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about spa performance, sustainability..."
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
