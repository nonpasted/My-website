import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ── Utility: useInView hook ──────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <div className="logo-mark">NP</div>
        </div>
        <ul className="nav-links">
          {['home', 'projects', 'contact'].map((item) => (
            <li key={item}>
              <button
                className={`nav-btn ${active === item ? 'active' : ''}`}
                onClick={() => scrollTo(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ── Hero / Home ──────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      <div className={`hero-content ${loaded ? 'loaded' : ''}`}>
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for work
        </div>
        <h1 className="hero-title">
          <span className="line line-1">Front End</span>
          <span className="line line-2">Developer</span>
        </h1>
        <p className="hero-sub">
          Based in Hawaiʻi · UH Mānoa &amp; Leeward CC · 4 years building
          web experiences — and occasionally breaking games for fun.
        </p>
        <div className="hero-tags">
          <span className="tag">React</span>
          <span className="tag">CSS</span>
          <span className="tag">C++</span>
          <span className="tag">JavaScript</span>
          <span className="tag">UI / UX</span>
        </div>
        <div className="hero-cta">
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            View Projects
          </button>
          <button
            className="btn-ghost"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Get in Touch
          </button>
        </div>
      </div>

      <div className={`hero-card-float ${loaded ? 'loaded' : ''}`}>
        <div className="mac-window">
          <div className="mac-titlebar">
            <span className="mac-btn red" />
            <span className="mac-btn yellow" />
            <span className="mac-btn green" />
          </div>
          <div className="mac-body">
            <pre className="code-block">{`const me = {
  location: "Oʻahu, Hawaiʻi 🌺",
  education: [
    "UH Mānoa",
    "Leeward CC"
  ],
  skills: {
    frontend: "4 years",
    cpp:      "2 years"
  },
  currentlyOn: "solace 🎮",
  passion:     "∞"
};`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About strip ──────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useInView();
  const stats = [
    { value: '4+', label: 'Years Front End' },
    { value: '2+', label: 'Years C++' },
    { value: '∞',  label: 'Passion' },
    { value: 'HI', label: 'Based in Hawaiʻi' },
  ];
  return (
    <section className="about-strip" ref={ref}>
      <div className={`stats-row ${visible ? 'visible' : ''}`}>
        {stats.map((s, i) => (
          <div className="stat-card" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, visible] = useInView();
  const skills = [
    { name: 'React / JSX',   level: 92, color: '#c4a4e8' },
    { name: 'HTML & CSS',    level: 96, color: '#e05c7a' },
    { name: 'JavaScript',    level: 90, color: '#f4a26a' },
    { name: 'C++',           level: 72, color: '#c0392b' },
    { name: 'UI / UX Design',level: 85, color: '#8b2be2' },
    { name: 'Git & GitHub',  level: 88, color: '#d44c8a' },
  ];

  return (
    <section className="skills-section" ref={ref}>
      <div className="section-inner">
        <h2 className={`section-title ${visible ? 'visible' : ''}`}>Skills &amp; Tools</h2>
        <div className="skills-grid">
          {skills.map((sk, i) => (
            <div
              className={`skill-row ${visible ? 'visible' : ''}`}
              key={sk.name}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="skill-meta">
                <span className="skill-name">{sk.name}</span>
                <span className="skill-pct">{sk.level}%</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{
                    width: visible ? `${sk.level}%` : '0%',
                    background: sk.color,
                    transitionDelay: `${i * 70 + 200}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Solace',
    desc: 'A private video game cheat written in C++. Features low-level memory manipulation, ESP overlays, and a clean internal hook system. Built as a deep dive into reverse engineering and Windows internals.',
    tags: ['C++', 'Memory', 'Win32 API', 'Reverse Eng.'],
    color: '#c0392b',
    emoji: '🎮',
  },
];

function ProjectCard({ project, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`project-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="card-glow"
        style={{ background: project.color, opacity: hovered ? 0.1 : 0 }}
      />
      <div className="card-top">
        <span className="project-emoji">{project.emoji}</span>
        <div className="card-accent" style={{ background: project.color }} />
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((t) => (
          <span
            className="project-tag"
            key={t}
            style={{ borderColor: project.color, color: project.color }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [ref, visible] = useInView();
  return (
    <section id="projects" className="projects-section">
      <div className="section-inner" ref={ref}>
        <h2 className={`section-title ${visible ? 'visible' : ''}`}>Projects</h2>
        <p className={`section-sub ${visible ? 'visible' : ''}`}>
          Stuff I've actually shipped — web and low-level alike.
        </p>
        <div className="projects-grid-single">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const mailto = `mailto:your@email.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="section-inner">
        <h2 className={`section-title ${visible ? 'visible' : ''}`}>Get in Touch</h2>
        <p className={`section-sub ${visible ? 'visible' : ''}`}>
          Got a project or just want to chat? I'm usually pretty responsive.
        </p>

        <div className={`contact-grid ${visible ? 'visible' : ''}`}>
          <div className="contact-info">
            <div className="info-card">
              <span className="info-icon">📍</span>
              <div>
                <p className="info-label">Location</p>
                <p className="info-value">Oʻahu, Hawaiʻi</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🎓</span>
              <div>
                <p className="info-label">Education</p>
                <p className="info-value">UH Mānoa &amp; Leeward CC</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">💼</span>
              <div>
                <p className="info-label">Fiverr</p>
                <p className="info-value">Open for freelance</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">⚡</span>
              <div>
                <p className="info-label">Response Time</p>
                <p className="info-value">Within 24 hours</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {sent ? (
              <div className="sent-msg">
                <span>🎉</span>
                <p>Thanks! Opening your mail client…</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <label>Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-row">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-row">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project…"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary full-width">
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p>Built with React · Deployed on GitHub Pages · Made in Hawaiʻi 🌺</p>
      <p className="footer-copy">© {new Date().getFullYear()} — All rights reserved</p>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = ['home', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
