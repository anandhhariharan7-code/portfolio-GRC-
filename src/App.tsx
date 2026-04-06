/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Shield, 
  Lock, 
  Bot, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  Camera, 
  ChevronRight, 
  X, 
  Menu,
  Award,
  BookOpen,
  Zap,
  Layout,
  Search,
  ArrowRight,
  FileText,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Editable content states
  const [name, setName] = useState('Arihara Suthan A');
  const [role, setRole] = useState('Junior GRC Analyst · UAE Regulatory Compliance Specialist');
  const [bio, setBio] = useState('B.Com Honours graduate & Company Secretary (CS Executive, ICSI) — channelling a strong foundation in corporate governance, company law, and securities regulation into practical GRC frameworks for UAE\'s most regulated sectors. Every project here is built to regulator-facing standard.');
  const [email, setEmail] = useState('ariharasuthan@email.com');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkProjectId, setLinkProjectId] = useState<string | null>(null);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [projects, setProjects] = useState([
    {
      id: 'aml',
      category: 'aml',
      title: 'Virtual Asset AML/CFT Compliance Programme',
      entity: 'CryptoNexus Exchange LLC · Dubai, UAE',
      desc: 'A complete AML/CFT programme for a VARA-licensed crypto exchange — 5 regulatory frameworks mapped, a 3-tier customer risk model, 15 crypto-specific red flag typologies, and a Travel Rule implementation aligned to FATF Recommendation 16.',
      files: [] as { name: string, url: string }[],
      stats: [
        { num: '5', label: 'Regulatory Frameworks' },
        { num: '3-Tier', label: 'Customer Risk Model' },
        { num: '15', label: 'AML Red Flag Typologies' }
      ],
      tags: ['VARA Rulebook', 'FATF R.16', 'FL No.10/2025', 'Travel Rule', 'KYC/CDD'],
      color: 'from-amber-500 to-red-500',
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      badges: ['AML / CFT', 'VARA Licensed']
    },
    {
      id: 'pdpl',
      category: 'pdpl',
      title: 'UAE PDPL Compliance Toolkit — VASP Data Protection',
      entity: 'NovaCoin Exchange LLC · Dubai, UAE',
      desc: 'A complete UAE PDPL readiness programme for a VARA-licensed crypto exchange — ROPA with 8 processing activities, a worked DPIA for biometric KYC, DSR workflow, consent framework for 3 mechanisms, and a 90-day remediation roadmap.',
      files: [] as { name: string, url: string }[],
      stats: [
        { num: '8', label: 'ROPA Activities' },
        { num: '5', label: 'Critical Gaps Found' },
        { num: '90d', label: 'Remediation Roadmap' }
      ],
      tags: ['UAE PDPL', 'ROPA', 'DPIA', 'Biometric KYC', 'SCCs'],
      color: 'from-sky-500 to-cyan-500',
      icon: <Lock className="w-6 h-6 text-sky-500" />,
      badges: ['Data Protection', 'UAE PDPL']
    },
    {
      id: 'ai',
      category: 'ai',
      title: 'AI Governance & Risk Framework — Credit AI & Fraud Detection',
      entity: 'Emirates Horizon Bank FSC LLC · Dubai, UAE',
      desc: 'A structured AI governance framework for a UAE bank\'s credit decisioning and fraud detection AI systems — 6-domain risk taxonomy, 8-control library, 5×5 risk matrix, accountability structure, regulatory mapping (CBUAE, ISO 42001, EU AI Act), and 90-day corrective action plan.',
      files: [] as { name: string, url: string }[],
      stats: [
        { num: '6', label: 'Risk Domains' },
        { num: 'HIGH', label: 'Overall Risk Rating' },
        { num: '2', label: 'Critical Findings' }
      ],
      tags: ['ISO/IEC 42001', 'CBUAE', 'EU AI Act', 'Algorithmic Bias', 'Model Risk'],
      color: 'from-violet-500 to-sky-500',
      icon: <Bot className="w-6 h-6 text-violet-500" />,
      badges: ['AI Governance', 'Risk: HIGH']
    },
    {
      id: 'cyber',
      category: 'cyber',
      title: 'Cybersecurity Compliance Gap Assessment — NESA IAR vs ISO 27001:2022',
      entity: 'Emirates Digital Authority PJSC · UAE Government',
      desc: 'A full cybersecurity gap assessment for a UAE government CII operator — 15 control domains, 75 individual controls, risk heat map with likelihood × impact scoring, dual-framework mapping (NESA IAR + ISO 27001:2022), and a phased 180-day remediation roadmap.',
      files: [] as { name: string, url: string }[],
      stats: [
        { num: '15', label: 'Control Domains' },
        { num: '2.4/5', label: 'Overall Maturity' },
        { num: '5', label: 'Critical Domains' }
      ],
      tags: ['NESA IAR', 'ISO 27001:2022', 'UAE Cyber Law', 'Risk Heat Map', 'CII'],
      color: 'from-emerald-500 to-sky-500',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
      badges: ['Cybersecurity', 'CII Operator']
    }
  ]);

  const addProjectLink = (projectId: string) => {
    setLinkProjectId(projectId);
    setNewLinkName('');
    setNewLinkUrl('');
    setIsAddingLink(true);
  };

  const submitNewLink = () => {
    if (newLinkName && newLinkUrl && linkProjectId) {
      setProjects(prev => prev.map(p => p.id === linkProjectId ? { ...p, files: [...p.files, { name: newLinkName, url: newLinkUrl }] } : p));
      setIsAddingLink(false);
      setLinkProjectId(null);
    }
  };

  const removeProjectLink = (projectId: string, index: number) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, files: p.files.filter((_, i) => i !== index) } : p));
  };

  const filteredProjects = activeTab === 'all' ? projects : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#060D18] text-slate-50 font-sans selection:bg-sky-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 h-16 flex items-center justify-between border-b border-slate-800/50 backdrop-blur-xl ${scrolled ? 'bg-slate-950/80 shadow-lg' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 font-heading font-bold text-lg tracking-tight">
          <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
          {isEditMode ? (
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-none rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500"
            />
          ) : name}
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <a href="#profile" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-lg transition-all">Profile</a>
          <a href="#projects" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-lg transition-all">Projects</a>
          <a href="#skills" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 rounded-lg transition-all">Skills</a>
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`ml-4 px-4 py-2 text-sm font-bold rounded-lg transition-all ${isEditMode ? 'bg-emerald-500 text-white' : 'bg-sky-500 text-white hover:bg-sky-600'}`}
          >
            {isEditMode ? 'Save Changes' : 'Edit Mode'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-sky-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_400px] gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/25 px-4 py-1.5 rounded-full text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-8">
              <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
              Open to UAE GRC Opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-black leading-[1.1] tracking-tighter mb-4">
              {isEditMode ? (
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-800 border-none rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500 w-full"
                />
              ) : (
                <>
                  {name.split(' ').slice(0, -1).join(' ')}<br />
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
                    {name.split(' ').slice(-1)}
                  </span>
                </>
              )}
            </h1>

            <div className="text-xl text-slate-300 font-medium mb-6">
              {isEditMode ? (
                <input 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-slate-800 border-none rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500 w-full"
                />
              ) : role}
            </div>

            <div className="text-slate-400 leading-relaxed max-w-xl mb-10">
              {isEditMode ? (
                <textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-slate-800 border-none rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500 w-full h-32 resize-none"
                />
              ) : bio}
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {['CS Executive (ICSI)', 'B.Com Honours', 'UAE PDPL', 'VARA AML/CFT', 'NESA IAR', 'ISO 27001:2022'].map(tag => (
                <span key={tag} className="bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-md text-xs font-medium text-slate-300">{tag}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20">
                <CheckCircle2 className="w-4 h-4" />
                View Projects
              </a>
              <a href="#profile" className="border border-slate-700 hover:border-sky-500/50 hover:bg-sky-500/5 text-sky-400 px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                <User className="w-4 h-4" />
                My Profile
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-500" />
              
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Portfolio at a Glance</div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: '4', label: 'GRC Projects Delivered', color: 'text-sky-400' },
                  { num: '8+', label: 'UAE / Intl Frameworks', color: 'text-cyan-400' },
                  { num: '15', label: 'Control Domains Assessed', color: 'text-emerald-400' },
                  { num: '90+', label: 'Controls Mapped', color: 'text-amber-400' }
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl text-center">
                    <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.num}</div>
                    <div className="text-[10px] leading-tight text-slate-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Regulatory Expertise</div>
                <div className="flex flex-wrap gap-1.5">
                  {['VARA', 'PDPL', 'NESA IAR', 'CBUAE', 'ISO 27001', 'ISO 42001', 'FATF'].map(fw => (
                    <span key={fw} className="bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded text-[10px] font-bold">{fw}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-24 px-6 md:px-10 bg-slate-950/50 border-y border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sky-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            <div className="w-6 h-[2px] bg-sky-500" />
            About Me
          </div>
          <h2 className="text-4xl font-heading font-black tracking-tight mb-4">Professional Profile</h2>
          <p className="text-slate-500 max-w-xl mb-16">A LinkedIn-style snapshot of my background, education, and the skills I bring to every GRC engagement.</p>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="h-40 bg-gradient-to-br from-slate-900 via-sky-900 to-sky-500 relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>
            
            <div className="px-8 pb-10 relative">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="-mt-16 relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden flex items-center justify-center shadow-xl relative">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-slate-600" />
                    )}
                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[10px] font-bold">
                      <Camera className="w-6 h-6 mb-1" />
                      Upload Photo
                      <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
                    </label>
                  </div>
                  <div className="absolute bottom-2 right-0 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg">Open to Work</div>
                </div>

                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Open to Work</span>
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full">GRC · Risk · Compliance</span>
                  </div>
                  <h3 className="text-2xl font-heading font-black mb-1">{name}</h3>
                  <p className="text-slate-300 font-medium mb-2">{role}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Dubai, UAE</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> B.Com Honours</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3" /> CS Executive</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2">
                    Get in Touch
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-12">
                <div className="space-y-6">
                  <div className="bg-slate-950/50 border border-slate-800/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-sm font-bold mb-4">
                      <div className="w-5 h-5 bg-sky-500/10 rounded flex items-center justify-center text-[10px]">👤</div>
                      About
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed space-y-4">
                      {isEditMode ? (
                        <textarea 
                          value={bio} 
                          onChange={(e) => setBio(e.target.value)}
                          className="bg-slate-800 border-none rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500 w-full h-48 resize-none"
                        />
                      ) : bio}
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-sm font-bold mb-6">
                      <div className="w-5 h-5 bg-sky-500/10 rounded flex items-center justify-center text-[10px]">🎓</div>
                      Education
                    </div>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[10px] font-black text-sky-400 shrink-0">B.Com</div>
                        <div>
                          <div className="text-sm font-bold">Subbalakshmi Lakshmipathy College of Arts and Science</div>
                          <div className="text-xs text-slate-400 mt-0.5">Bachelor of Commerce (Honours) · Commerce</div>
                          <div className="text-[10px] text-slate-500 mt-1">2019 — 2022</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[10px] font-black text-amber-400 shrink-0">CS</div>
                        <div>
                          <div className="text-sm font-bold">Institute of Company Secretaries of India (ICSI)</div>
                          <div className="text-xs text-slate-400 mt-0.5">Company Secretaryship — Executive Programme</div>
                          <div className="text-[10px] text-slate-500 mt-1">Completed — CS Executive</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-950/50 border border-slate-800/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-sm font-bold mb-4">
                      <div className="w-5 h-5 bg-sky-500/10 rounded flex items-center justify-center text-[10px]">⚡</div>
                      Core Competencies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Corporate Governance', 'Company Law', 'Risk Assessment', 'Gap Analysis', 'Control Mapping', 'ROPA', 'DPIA', 'AML Typologies', 'CDD/KYC', 'Policy Drafting'].map(skill => (
                        <span key={skill} className="bg-sky-500/5 border border-sky-500/10 text-sky-400 px-3 py-1 rounded-full text-[10px] font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-sm font-bold mb-4">
                      <div className="w-5 h-5 bg-sky-500/10 rounded flex items-center justify-center text-[10px]">📋</div>
                      Regulatory Knowledge
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['UAE PDPL', 'VARA AML/CFT', 'NESA IAR', 'CBUAE MRM', 'ISO 27001', 'ISO 42001', 'FATF R.16'].map(reg => (
                        <span key={reg} className="bg-amber-500/5 border border-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[10px] font-medium">{reg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sky-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            <div className="w-6 h-[2px] bg-sky-500" />
            Portfolio
          </div>
          <h2 className="text-4xl font-heading font-black tracking-tight mb-4">GRC Projects</h2>
          <p className="text-slate-500 max-w-xl mb-12">Four independently produced frameworks covering VASP compliance, data protection, AI governance, and cybersecurity gap assessment.</p>

          <div className="flex flex-wrap gap-2 mb-12">
            {['all', 'aml', 'pdpl', 'ai', 'cyber'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === tab ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group cursor-pointer hover:border-sky-500/50 transition-all hover:-translate-y-1 shadow-xl"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`} />
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                        {project.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        {project.badges.map(badge => (
                          <span key={badge} className="bg-slate-800 border border-slate-700 text-slate-400 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">{badge}</span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-2">{project.entity}</div>
                    <h3 className="text-xl font-heading font-black mb-4 leading-tight group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">{project.desc}</p>

                    {/* Project Files Section */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <FileText className="w-3 h-3" />
                          Project Files
                        </div>
                        {isEditMode && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); addProjectLink(project.id); }}
                            className="text-[10px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                          >
                            + Add Link
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {project.files.length > 0 ? (
                          project.files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30 border border-slate-800/50 hover:border-sky-500/30 transition-colors group/file">
                              <a 
                                href={file.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 overflow-hidden flex-1"
                              >
                                <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                <span className="text-[11px] text-slate-300 truncate font-medium">{file.name}</span>
                              </a>
                              <div className="flex items-center gap-2">
                                {isEditMode && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); removeProjectLink(project.id, idx); }}
                                    className="text-slate-600 hover:text-red-400 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                                <ExternalLink className="w-3 h-3 text-slate-600 group-hover/file:text-sky-400 transition-colors shrink-0" />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-[10px] text-slate-600 italic py-2 text-center border border-dashed border-slate-800 rounded-lg">
                            No project files added yet.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8 bg-slate-950/50 border border-slate-800 rounded-2xl p-4">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-sm font-black text-slate-200">{stat.num}</div>
                          <div className="text-[8px] text-slate-500 uppercase font-bold leading-tight mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-slate-800/50 border border-slate-700/50 text-slate-400 px-2 py-0.5 rounded text-[9px] font-medium">{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">March 2026</span>
                      <span className="text-xs font-bold text-sky-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 md:px-10 bg-slate-950/50 border-y border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sky-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            <div className="w-6 h-[2px] bg-sky-500" />
            Expertise
          </div>
          <h2 className="text-4xl font-heading font-black tracking-tight mb-4">Skills & Proficiency</h2>
          <p className="text-slate-500 max-w-xl mb-16">Built through independent research, practical framework application, and deliberate portfolio construction.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚖️',
                title: 'Regulatory Compliance',
                skills: [
                  { name: 'UAE PDPL & Data Protection', pct: 88 },
                  { name: 'VARA AML/CFT Rulebook', pct: 85 },
                  { name: 'NESA IAR / UAE Cyber Law', pct: 82 },
                  { name: 'CBUAE Model Risk Guidelines', pct: 78 }
                ]
              },
              {
                icon: '🔍',
                title: 'Risk & Governance',
                skills: [
                  { name: 'Risk Assessment & Matrices', pct: 90 },
                  { name: 'Control Frameworks (ISO 27001)', pct: 85 },
                  { name: 'DPIA & Privacy by Design', pct: 84 },
                  { name: 'AI Governance (ISO 42001)', pct: 80 }
                ]
              },
              {
                icon: '🛠️',
                title: 'Tools & Documentation',
                skills: [
                  { name: 'Excel / GRC Registers', pct: 92 },
                  { name: 'Policy & Framework Drafting', pct: 88 },
                  { name: 'PowerPoint / Board Decks', pct: 90 },
                  { name: 'ServiceNow GRC / OneTrust', pct: 70 }
                ]
              }
            ].map((group, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                <div className="text-3xl mb-4">{group.icon}</div>
                <h3 className="text-sm font-black mb-8 uppercase tracking-widest text-slate-200">{group.title}</h3>
                <div className="space-y-6">
                  {group.skills.map((skill, j) => (
                    <div key={j}>
                      <div className="flex justify-between text-[10px] font-bold mb-2">
                        <span className="text-slate-400">{skill.name}</span>
                        <span className="text-sky-400">{skill.pct}%</span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.pct}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-sky-500 to-cyan-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-10 bg-slate-950 border-t border-slate-900 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-xl font-heading font-black mb-2">{name}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Junior GRC Analyst · UAE Regulatory Compliance · Portfolio 2026</div>
          
          <div className="flex justify-center gap-8 mb-12">
            <a href="#home" className="text-xs font-bold text-slate-500 hover:text-sky-400 transition-colors">Home</a>
            <a href="#profile" className="text-xs font-bold text-slate-500 hover:text-sky-400 transition-colors">Profile</a>
            <a href="#projects" className="text-xs font-bold text-slate-500 hover:text-sky-400 transition-colors">Projects</a>
            <a href="#skills" className="text-xs font-bold text-slate-500 hover:text-sky-400 transition-colors">Skills</a>
          </div>

          <div className="text-sm font-medium text-slate-400">
            {isEditMode ? (
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-none rounded px-2 py-1 outline-none focus:ring-1 ring-sky-500 text-center"
              />
            ) : (
              <a href={`mailto:${email}`} className="hover:text-sky-400 transition-colors">{email}</a>
            )}
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10"
            >
              {projects.find(p => p.id === selectedProject) && (
                <>
                  <div className={`h-2 w-full bg-gradient-to-r ${projects.find(p => p.id === selectedProject)?.color}`} />
                  <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-2">{projects.find(p => p.id === selectedProject)?.entity}</div>
                        <h2 className="text-3xl font-black tracking-tight">{projects.find(p => p.id === selectedProject)?.title}</h2>
                      </div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500 transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Project Overview</div>
                        <p className="text-slate-400 leading-relaxed text-sm">{projects.find(p => p.id === selectedProject)?.desc}</p>
                      </div>

                      {/* Modal Project Files */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Documentation</div>
                          {isEditMode && (
                            <button 
                              onClick={() => addProjectLink(projects.find(p => p.id === selectedProject)!.id)}
                              className="text-[10px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                            >
                              + Add Link
                            </button>
                          )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {projects.find(p => p.id === selectedProject)?.files.length ? (
                            projects.find(p => p.id === selectedProject)?.files.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-sky-500/30 transition-all group/file">
                                <a 
                                  href={file.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 overflow-hidden flex-1"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4 text-sky-400" />
                                  </div>
                                  <div className="overflow-hidden">
                                    <div className="text-xs font-bold text-slate-200 truncate">{file.name}</div>
                                    <div className="text-[10px] text-slate-500 truncate">{file.url}</div>
                                  </div>
                                </a>
                                <div className="flex items-center gap-2">
                                  {isEditMode && (
                                    <button 
                                      onClick={() => removeProjectLink(projects.find(p => p.id === selectedProject)!.id, idx)}
                                      className="text-slate-600 hover:text-red-400 transition-colors"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
                                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover/file:text-sky-400 transition-colors shrink-0" />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="sm:col-span-2 text-xs text-slate-600 italic py-6 text-center border border-dashed border-slate-800 rounded-xl">
                              No project documentation links added yet.
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {projects.find(p => p.id === selectedProject)?.stats.map((stat, i) => (
                          <div key={i} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-center">
                            <div className="text-2xl font-black text-sky-400 mb-1">{stat.num}</div>
                            <div className="text-[9px] text-slate-500 uppercase font-bold leading-tight">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Key Deliverables</div>
                        <ul className="space-y-3">
                          {[
                            'Regulatory coverage matrix mapping multiple frameworks',
                            'Risk assessment with inherent vs residual scoring',
                            'Detailed control library with implementation status',
                            'Phased remediation roadmap with prioritised actions',
                            'Executive summary for Board-level reporting'
                          ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-400">
                              <ChevronRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8 border-t border-slate-800 flex flex-wrap justify-between items-center gap-6">
                        <div className="flex flex-wrap gap-2">
                          {projects.find(p => p.id === selectedProject)?.tags.map(tag => (
                            <span key={tag} className="bg-sky-500/10 border border-sky-500/20 text-sky-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Link Modal */}
      <AnimatePresence>
        {isAddingLink && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingLink(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl shadow-2xl relative z-10 p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white">Add Project Link</h3>
                <button 
                  onClick={() => setIsAddingLink(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Link Display Name</label>
                  <input 
                    type="text" 
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                    placeholder="e.g. VARA Compliance Policy"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">URL / Link</label>
                  <input 
                    type="text" 
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
                <button 
                  onClick={submitNewLink}
                  disabled={!newLinkName || !newLinkUrl}
                  className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all mt-4"
                >
                  Add to Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
