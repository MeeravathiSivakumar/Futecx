"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./ai-research.css";

export default function AIResearchPage() {
  const [metrics, setMetrics] = useState({ nodes: 14205, processed: 184, models: 24 });
  const [chatLog, setChatLog] = useState([
    { role: 'assistant', text: 'Initialize FUTECX Research Terminal v2.1.0...\nConnection established.\n\nHello! I am the FUTECX Research Assistant. How can I help you explore our AI capabilities today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        nodes: prev.nodes + Math.floor(Math.random() * 10),
        processed: prev.processed + Math.floor(Math.random() * 2),
        models: prev.models
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatLog(prev => [...prev, { role: 'user', text: chatInput }]);
    const query = chatInput;
    setChatInput('');
    setIsTyping(true);

    // Simulate network/thinking delay (800ms - 2000ms)
    const thinkingTime = Math.floor(Math.random() * 1200) + 800;

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "I'm the FUTECX Research Assistant. I can help you with information about our AI research, AgentOS, services, products, or how to contact our team. What would you like to know?";
      
      // 1. Highly Specific Queries (Multi-keyword matches)
      if ((q.includes('open') || q.includes('start') || q.includes('found') || q.includes('year') || q.includes('date') || q.includes('when')) && (q.includes('futecx') || q.includes('company') || q.includes('you'))) {
        reply = "FUTECX was officially established three years ago, starting as a deep-tech initiative. We are currently celebrating our 3rd Anniversary of relentless innovation and global growth!";
      }
      else if ((q.includes('event') || q.includes('conduct') || q.includes('program') || q.includes('hackathon')) && q.includes('futecx')) {
        reply = "FUTECX regularly conducts tech symposiums, AI hackathons, and web-development bootcamps. For example, we host the 'AgentOS Developer Meetup' and our annual 'FUTECX Innovation Summit'. Check out our Events page for the latest schedule!";
      }
      else if (q.includes('cost') || q.includes('price') || q.includes('fee') || q.includes('charge')) {
        reply = "Our pricing is highly customized based on the scope of the project. Whether it's an AI integration, AgentOS deployment, or a Full-Stack web app, we offer competitive enterprise rates. Please contact us at younginnovator2024@gmail.com for a quote.";
      }
      else if ((q.includes('where') || q.includes('location') || q.includes('address') || q.includes('situated')) && (q.includes('futecx') || q.includes('office') || q.includes('you'))) {
        reply = "We are headquartered at the 143 TN-Future Tech Park in Thanjavur, India. It's a massive facility where our core engineering and research teams operate.";
      }
      // 2. Greetings
      else if (q.match(/^(hello|hi|hey|how are you|how do you do|greetings|wassup|morning|afternoon)/)) {
        const greetings = [
          "Hello there! I am the FUTECX AI Assistant. I'm functioning optimally! How can I help you explore FUTECX's technology and services today?",
          "Hi! I'm doing great. Welcome to FUTECX Research. What are you looking to build or learn about today?",
          "Hey! Everything is running smoothly on my servers. I'm ready to answer any questions about FUTECX, our team, or our AI models."
        ];
        reply = greetings[Math.floor(Math.random() * greetings.length)];
      }
      // 3. Specific Core Technologies
      else if (q.includes('agentos') || q.includes('agent os') || q.includes('agent')) {
        reply = "FUTECX AgentOS Studio is our flagship multi-model AI agent workspace. It handles complex evidence evaluation, dynamic permissions, and fully autonomous workflow execution. It's designed to automate massive, multi-step enterprise tasks.";
      }
      else if (q.includes('traffic') || q.includes('vision') || q.includes('yolo') || q.includes('camera') || q.includes('congestion')) {
        reply = "Our Computer Vision systems utilize optimized edge-deployment (like YOLO) for real-time urban traffic monitoring with 99% accuracy. We can detect congestion and dynamically route emergency vehicles through city grids.";
      }
      else if (q.includes('nlp') || q.includes('emotion') || q.includes('language') || q.includes('text')) {
        reply = "Our NLP research focuses on detecting complex human subtext and emotional states using fine-tuned transformer models. This allows us to build highly empathetic and context-aware conversational interfaces.";
      }
      else if (q.includes('cyber') || q.includes('security') || q.includes('threat') || q.includes('hacker') || q.includes('vulnerability')) {
        reply = "We analyze how modern AI tools can proactively identify and patch zero-day vulnerabilities in React architectures and cloud systems. We use AI to stay one step ahead of automated threat vectors.";
      }
      // 4. People & Team
      else if (q.includes('ashwin') || q.includes('founder') || q.includes('ceo') || q.includes('who made') || q.includes('team') || q.includes('who created')) {
        reply = "FUTECX is driven by a passionate team of engineers and researchers, led by Ashwin. Our team specializes in pushing the boundaries of what is possible with Generative AI, Web3, and complex digital platforms.";
      }
      else if (q.includes('sai') || q.includes('meera')) {
        reply = "Sai Meera is one of our esteemed clients. We built a comprehensive UI/UX layout and digital presence for them, showcasing our capability in commercial design.";
      }
      // 5. Services & Contact
      else if (q.includes('service') || q.includes('what do you do') || q.includes('offer') || q.includes('build') || q.includes('create')) {
        reply = "FUTECX provides end-to-end tech solutions: AI Research & Integration, Full-Stack Web App Development (React/Next.js), E-Commerce platforms, and bespoke UI/UX design. We essentially build the future of digital business.";
      }
      else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
        reply = "You can reach the FUTECX team at younginnovator2024@gmail.com, or call us at +91 9876543210.";
      }
      else if (q.includes('whatsapp') || q.includes('join') || q.includes('group') || q.includes('community')) {
        reply = "You can join our Research Team on WhatsApp! Scroll down to find the invite link and collaborate with our core engineers directly to discuss beta tools and generative AI.";
      }
      // 6. Broad/General Fallbacks
      else if (q.includes('futecx') || q.includes('company') || q.includes('about you') || q.includes('yourself')) {
        const futecxInfo = [
          "FUTECX is an advanced technology company focused on bridging the gap between theoretical AI research and practical, enterprise-grade web solutions. We build everything from AgentOS to real-time traffic monitoring systems.",
          "At FUTECX, we are a collective of engineers and researchers operating out of Thanjavur. Our primary goal is to democratize advanced AI, creating tools like AgentOS and providing high-end full-stack web development for businesses globally.",
          "Think of FUTECX as a hybrid between a research lab and an elite software agency. We conduct deep research into NLP, Computer Vision, and Cybersecurity, and we use those findings to engineer hyper-advanced SaaS platforms and commercial websites for our clients.",
          "FUTECX is all about pushing digital boundaries. Whether it's training custom LLMs, building highly scalable Next.js architectures, or crafting stunning UI/UX, we deliver end-to-end digital excellence."
        ];
        reply = futecxInfo[Math.floor(Math.random() * futecxInfo.length)];
      }
      else if (q.length > 5) {
        const fallbacks = [
          "That's a fascinating question! My current knowledge base is focused on FUTECX's core operations. Could you rephrase that in the context of our AI research, web development services, or AgentOS?",
          "I'm still learning about that specific topic. However, if it relates to Generative AI, Full-Stack Engineering, or our company, feel free to ask for specifics!",
          "Interesting. While I don't have a pre-programmed response for that, our engineering team at FUTECX probably has a solution. Want to know how to contact them?"
        ];
        reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      setIsTyping(false);
      setChatLog(prev => [...prev, { role: 'assistant', text: reply }]);
    }, thinkingTime);
  };
  const PAPERS = [
    {
      id: "nlp",
      title: "Advanced NLP & Emotion Detection",
      field: "Artificial Intelligence",
      desc: "Research into detecting complex human subtext and emotional states using fine-tuned transformer models.",
      icon: "fa-solid fa-language"
    },
    {
      id: "cv",
      title: "Real-time Urban Traffic Vision",
      field: "Computer Vision",
      desc: "Optimizing YOLO models for edge-device deployment to monitor multi-lane traffic flow with 99% accuracy.",
      icon: "fa-solid fa-eye"
    },
    {
      id: "cyber",
      title: "Automated Threat Vectors in Web Systems",
      field: "Cybersecurity",
      desc: "Analyzing how modern AI tools can proactively identify and patch zero-day vulnerabilities in React architectures.",
      icon: "fa-solid fa-shield-halved"
    }
  ];

  return (
    <>
      <div className="bg-dark text-white py-5 position-relative overflow-hidden" style={{
        background: "url('/image/company/research-bg.jpg') center/cover no-repeat",
        paddingTop: "100px", paddingBottom: "100px"
      }}>
        {/* CSS Grid Pattern Overlay */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.2) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="position-absolute rounded-circle bg-info opacity-25" style={{ width: '40vw', height: '40vw', filter: 'blur(100px)', top: '-20%', left: '-10%' }}></div>
        <div className="position-absolute rounded-circle bg-primary opacity-25" style={{ width: '30vw', height: '30vw', filter: 'blur(100px)', bottom: '-10%', right: '-10%' }}></div>
        
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(11, 18, 32, 0.55)", backdropFilter: "blur(4px)" }}></div>
        <div className="container position-relative z-index-2 py-5 text-center">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down"><i className="fa-solid fa-microchip me-2"></i> FUTECX Research</span>
          <h1 className="display-3 fw-bold text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>AI & <span className="text-info fw-bolder">Research Lab</span></h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            Pushing the boundaries of what is possible. FUTECX Research focuses on natural language processing, computer vision, and the next generation of generative AI tools.
          </p>
        </div>
        
        {/* Animated Background Gradients */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="research-glow-1"></div>
          <div className="research-glow-2"></div>
        </div>
      </div>

      <section className="py-5" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e2e8f0 100%)" }}>
        <div className="container py-5">
          <div className="row mb-5 text-center">
            <div className="col-12">
              <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3">Our Focus Areas</span>
              <h2 className="display-6 fw-bolder">Current Research Domains</h2>
            </div>
          </div>
          
          <div className="row g-4">
            {PAPERS.map((paper, idx) => (
              <div className="col-lg-4" key={paper.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="research-glass-card h-100 p-4 p-xl-5 rounded-4 position-relative overflow-hidden transition-all">
                  <div className="position-absolute top-0 end-0 p-4 opacity-10">
                    <i className={`${paper.icon} fa-4x text-primary`}></i>
                  </div>
                  <div className="icon-wrapper-modern mb-4 d-inline-flex align-items-center justify-content-center shadow-sm">
                    <i className={`${paper.icon} fs-4 text-white`}></i>
                  </div>
                  <br />
                  <span className="badge bg-info bg-opacity-25 text-info border border-info border-opacity-25 rounded-pill px-3 py-2 mb-3 fw-bold shadow-sm">
                    {paper.field}
                  </span>
                  <h4 className="fw-bold mb-3 text-white">{paper.title}</h4>
                  <p className="text-light opacity-75 lh-lg mb-0">
                    {paper.desc}
                  </p>
                  
                  {/* Decorative glowing dot */}
                  <div className="position-absolute bottom-0 end-0 m-4">
                     <span className="d-flex h-3 w-3 position-relative">
                        <span className="animate-ping absolute inline-flex h-100 w-100 rounded-circle bg-info opacity-75"></span>
                        <span className="relative inline-flex rounded-circle h-3 w-3 bg-info"></span>
                      </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* RESEARCH ASSISTANT CHATBOT */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">Interactive AI</span>
              <h2 className="fw-bolder mb-4">Meet the FUTECX Research Assistant</h2>
              <p className="lead text-muted mb-4">
                Experience our internal LLM technology firsthand. Ask questions about our research, ongoing projects like AgentOS, or our capabilities in computer vision.
              </p>
              <ul className="list-unstyled mb-0">
                <li className="mb-3 d-flex align-items-center text-muted">
                  <i className="fa-solid fa-circle-check text-primary me-3"></i> Real-time context processing
                </li>
                <li className="mb-3 d-flex align-items-center text-muted">
                  <i className="fa-solid fa-circle-check text-primary me-3"></i> Direct access to FUTECX data
                </li>
                <li className="d-flex align-items-center text-muted">
                  <i className="fa-solid fa-circle-check text-primary me-3"></i> Powered by generative AI
                </li>
              </ul>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-dark text-white">
                <div className="card-header bg-black bg-opacity-50 border-bottom border-primary border-opacity-25 py-3 d-flex align-items-center">
                  <div className="d-flex gap-2 me-3">
                    <span className="rounded-circle bg-danger" style={{width: '12px', height: '12px'}}></span>
                    <span className="rounded-circle bg-warning" style={{width: '12px', height: '12px'}}></span>
                    <span className="rounded-circle bg-success" style={{width: '12px', height: '12px'}}></span>
                  </div>
                  <span className="font-monospace small text-muted">FUTECX Terminal v2.1.0</span>
                </div>
                <div className="card-body p-0 d-flex flex-column" style={{ height: '400px' }}>
                  <div className="flex-grow-1 p-4 overflow-auto custom-scrollbar" style={{ background: '#0a0f18' }}>
                    {chatLog.map((msg, i) => (
                      <div key={i} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : ''}`}>
                        <div className={`p-3 rounded-4 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-dark border border-secondary border-opacity-50 text-light'}`} style={{ maxWidth: '85%', whiteSpace: 'pre-wrap', fontFamily: msg.role === 'assistant' ? 'monospace' : 'inherit' }}>
                          {msg.role === 'assistant' && <i className="fa-solid fa-robot text-info me-2 mb-2 d-block fs-5"></i>}
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="d-flex mb-3">
                        <div className="p-3 rounded-4 bg-dark border border-secondary border-opacity-50 text-light d-flex align-items-center" style={{ maxWidth: '85%' }}>
                           <i className="fa-solid fa-robot text-info me-3 fs-5"></i>
                           <div className="typing-indicator">
                             <span></span><span></span><span></span>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-black bg-opacity-50 border-top border-primary border-opacity-25 p-3">
                    <form onSubmit={handleChat} className="input-group">
                      <input 
                        type="text" 
                        className="form-control bg-dark text-white border-secondary font-monospace" 
                        placeholder="Ask about AgentOS, Traffic AI, etc..." 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        style={{ boxShadow: 'none' }}
                      />
                      <button className="btn btn-primary px-4" type="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Research Cards */
        .research-glass-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%);
          border: 1px solid rgba(13, 202, 240, 0.2);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transform: translateY(0);
        }
        .research-glass-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(13, 202, 240, 0.2);
          border-color: rgba(13, 202, 240, 0.5);
        }
        .icon-wrapper-modern {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
        }
        .h-3 { height: 0.75rem; }
        .w-3 { width: 0.75rem; }
        .animate-ping { animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        .typing-indicator span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #0dcaf0;
          border-radius: 50%;
          margin: 0 2px;
          animation: typing 1s infinite alternate;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0% { transform: translateY(0); opacity: 0.5; }
          100% { transform: translateY(-5px); opacity: 1; box-shadow: 0 0 5px #0dcaf0; }
        }
      `}</style>
      
      {/* WHATSAPP COMMUNITY */}
      <section className="py-5 bg-white border-top">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border border-success border-opacity-25 shadow-sm rounded-4 overflow-hidden" data-aos="fade-up">
                <div className="row g-0 align-items-stretch">
                  <div className="col-md-8 p-4 p-md-5 d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px' }}>
                        <i className="fa-brands fa-whatsapp fs-4"></i>
                      </div>
                      <h3 className="fw-bolder mb-0">FUTECX RESEARCH TEAM</h3>
                    </div>
                    <p className="text-muted mb-4">
                      Join our exclusive WhatsApp community. Discuss the latest breakthroughs in Generative AI, collaborate with our core engineering team, and get early access to beta tools and open-source models.
                    </p>
                    <div>
                      <a href="#" className="btn btn-success rounded-pill fw-bold px-4 py-2 shadow-sm">
                        Join WhatsApp Group <i className="fa-solid fa-arrow-right ms-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4 bg-light d-none d-md-flex align-items-center justify-content-center position-relative overflow-hidden">
                    <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1) 0%, rgba(18, 140, 126, 0.2) 100%)' }}></div>
                    <i className="fa-brands fa-whatsapp text-success position-relative z-index-2" style={{ fontSize: '7rem', opacity: 0.8, filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light border-top">
        <div className="container py-5 text-center">
          <h3 className="fw-bold mb-4">Interested in Academic Collaboration?</h3>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            We frequently partner with universities, students, and independent researchers to build working prototypes of theoretical AI concepts.
          </p>
          <Link href="/contact" className="btn btn-dark rounded-pill px-5 py-3 fw-bold">
            Contact Research Team
          </Link>
        </div>
      </section>
    </>
  );
}



