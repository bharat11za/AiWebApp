import React, { useState } from "react";
import axios from "axios";


export default function App() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/guide", { city, date });
    setResult(res.data.data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌍 Local Guide AI</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input 
          type="text" 
          placeholder="Enter city name" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          required
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required
        />
        <button type="submit">Get Guide</button>
      </form>

       <GuideResult result={result} />
    </div>
  );
}







import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect } from "react";

 function GuideResult({ result }) {
  const [sections, setSections] = useState({});
  const [activeSection, setActiveSection] = useState("events");

  useEffect(() => {
    if (!result) return;

    // Split based on headings
    const eventsMatch = result.match(/### 1\..*?(?=### 2)/s);
    const recsMatch = result.match(/### 2\..*?(?=### 3)/s);
    const tipsMatch = result.match(/### 3\..*/s);

    setSections({
      events: eventsMatch ? eventsMatch[0] : "",
      recommendations: recsMatch ? recsMatch[0] : "",
      tips: tipsMatch ? tipsMatch[0] : "",
    });
  }, [result]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b mb-4 pb-2">
        <button
          onClick={() => setActiveSection("events")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "events"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveSection("recommendations")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "recommendations"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Recommendations
        </button>
        <button
          onClick={() => setActiveSection("tips")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "tips"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Tips
        </button>
      </div>

      {/* Dynamic Section Display */}
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {sections[activeSection]}
        </ReactMarkdown>
      </div>
    </div>
  );
}


