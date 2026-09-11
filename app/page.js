'use client';

import { useRef, useState } from 'react';

/* Parses a CSS declaration string into a React style object, so the markup below
   carries the same literal styles as the design source. */
const styleCache = new Map();
function s(css) {
  if (styleCache.has(css)) return styleCache.get(css);
  const out = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop || !val) continue;
    const key = prop
      .replace(/^-ms-/, 'ms-')
      .replace(/^-(webkit|moz|o)-/, (m, p) => p[0].toUpperCase() + p.slice(1) + '-')
      .replace(/-([a-z])/g, (m, c) => c.toUpperCase());
    out[key] = val;
  }
  styleCache.set(css, out);
  return out;
}

const KICKER = "font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent-700)";
const MONO_SM = "font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--color-neutral-700)";
const H2 = 'font-size: clamp(32px, 3.6vw, 46px); line-height: 1.02; letter-spacing: -0.03em; font-weight: 900';
const WRAP = 'max-width: 1240px; margin: 0 auto; padding: clamp(44px, 7vw, 72px) 32px';
const ROW = 'display: grid; grid-template-columns: 200px minmax(0, 1fr) minmax(0, 240px); gap: 32px; padding: 32px 0';
const STAT_CELL = 'background: var(--color-accent); padding: 44px 28px; box-shadow: inset -2px 0 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(255,255,255,0.35)';
const STAT_NUM = 'font-size: clamp(40px, 4.5vw, 60px); font-weight: 900; letter-spacing: -0.04em; line-height: 1';
const STAT_LBL = 'font-size: 14px; font-weight: 600; line-height: 1.4; margin-top: 10px';
const BODY_P = 'font-size: 16px; line-height: 1.55; color: var(--color-neutral-800); margin: 0 0 12px; max-width: 62ch';
const SKILL_CELL = 'background: var(--color-bg); padding: 22px';
const SKILL_LBL = "font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent-700); margin-bottom: 14px";
const SKILL_BODY = 'font-size: 15px; line-height: 1.9; color: var(--color-neutral-800)';
const QUOTE = 'font-size: 17px; line-height: 1.5; font-weight: 500; margin: 0 0 20px; letter-spacing: -0.005em';
const ATTRIB = "font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-neutral-700)";
const EDU_TITLE = 'font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15';

const STATS = [
  ['241', 'production processes owned, on 11 unattended bots'],
  ['85→94%', 'production success rate at Station Casinos'],
  ['$500K', 'annual expense reduction at Nielsen, plus $1M+ revenue'],
  ['−75%', 'daily developer troubleshooting, 4 hours down to under 1']
];

const ROLES = [
  {
    org: 'Station Casinos',
    dates: 'June 2025 — present',
    title: 'Lead Software Developer / Solution Architect, Compliance',
    body: 'Set automation strategy with the Director and VPs, and own production for 241 processes on 11 unattended bots — 180+ of them running daily. Built a reusable sequence framework, migrated 160 inherited automations, added 21 more on REFramework, and standardized the production VMs through a Windows 10 to 11 migration. Also shipped a SharePoint self-service portal on Power Automate and Orchestrator APIs, and a Kindo AI agent that screens ServiceNow access requests against compliance policy before UiPath picks them up. Owns licensing, budget, hiring and prioritization for a three-person team.',
    tags: ['UiPath REFramework', 'Orchestrator API', 'Power Automate', 'Kindo AI', 'SharePoint'],
    stat: '85→94%',
    statLabel: 'production success rate, and 75% less daily troubleshooting'
  },
  {
    org: 'Dish Network',
    dates: 'May 2024 — June 2025',
    title: 'Senior Software Developer / Architect, CFO Intelligent Automation',
    body: 'Full life-cycle automation for the Fixed Assets team across Oracle Fusion Cloud ERP, Aura Player, NexSysOne and Orbit, plus ABBYY OCR and AppZen for Accounts Payable. Chose the approach application by application, built the API calls from the documentation, and used Python and Document Understanding where the input was PDF or HTML. Exception handling held the success rate at 95%.',
    tags: ['Oracle Fusion Cloud', 'ABBYY', 'AppZen', 'Python'],
    stat: '95%',
    statLabel: 'automation success rate'
  },
  {
    org: 'Nielsen',
    dates: 'June 2019 — May 2024',
    title: 'RPA Developer / Architect',
    body: 'Designed the RPA portfolio with senior leadership across TLR, Salesforce, BI and iHeart reporting — cutting annual expenses by nearly $500,000 and standing up environments for automations generating over $1M in revenue a year. Ran architecture reviews, dispatcher/performer builds on REFramework, and advised management on licensing and resourcing. Started sourcing candidates with Process Mining and improving them with Communications Mining and Document Understanding; API-first design lifted efficiency 35% on average.',
    tags: ['Process Mining', 'Oracle EBS', 'C# / .NET', 'Salesforce', 'AWS'],
    stat: '$500K',
    statLabel: 'annual expense reduction, plus $1M+ revenue'
  },
  {
    org: 'Nielsen Audio',
    dates: 'Feb 2017 — June 2019',
    title: 'RPA Developer — PPM programs',
    body: 'Automation for Portable People Meter, PPM wearable and BT Collector on UiPath and Robot Framework, wired into Jenkins for CI/CD. Built four automated regression test rigs — motion simulation, networked power strips, circuit timers, decibel meters, audio playback — and custom .NET libraries that took coverage from 40% to 82% and the regression cycle from 60 days to 20.',
    tags: ['Robot Framework', 'Selenium', 'Jenkins', 'Raspberry Pi'],
    stat: '40→82%',
    statLabel: 'automation coverage; 60 days to 20'
  }
];

const RECOMMENDATIONS = [
  {
    text: "I highly commend Rajkumar's work at Nielsen with Robotic Process Automation (RPA). I have been extremely impressed with Raj's work ethic and creativity in creating solutions for internal and external customers. I enjoy working with Raj now and would work with him again in the future if the chance presented itself.",
    who: 'Patrick Kirk — Release Manager, Iron Mountain',
    pad: 'padding: 32px 28px 28px 0'
  },
  {
    text: 'Raj is an invaluable co-worker whose contributions and expertise in the automation and the development of innovative bots significantly transformed the speed and delivery of our radio Total Line Report distribution process. Rajkumar saved the Audio team substantial time and effort. His commitment to excellence is evident in the efficiency and accuracy these solutions brought to our operations.',
    who: 'Trish Craig — Director, Customer Success Operations (Revenue)',
    pad: 'padding: 32px 28px'
  },
  {
    text: 'I came to Rajkumar for help with Bot automation to help provide essential solutions that were highly desired by my client. Rajkumar immediately understood the need and quickly turned around a Bot automated solution and then continued to help with multiple Bot automated projects for my client thereafter. Raj is nothing short of a super star!',
    who: 'Janeen Becker — CX, client engagement and growth',
    pad: 'padding: 32px 0 28px 28px'
  }
];

const SKILLS = [
  ['Automation & AI', ['UiPath Studio · Orchestrator', 'REFramework', 'Power Automate', 'Kindo AI agents', 'Document Understanding', 'Process · Task · Comms Mining', 'Automation Hub · ABBYY OCR']],
  ['Development', ['Python', 'C# · .NET', 'SQL', 'HTML · XML', 'API integration · Postman']],
  ['Data & enterprise', ['Oracle ERP · Database', 'SQL Server · MySQL · Caché', 'Salesforce · ServiceNow', 'AppZen · SharePoint · SSRS']],
  ['Test automation', ['Robot Framework', 'Selenium WebDriver', 'HP UFT/QTP · HP ALM', 'Zephyr · TestNG · JUnit', 'AutoIt · Sikuli']],
  ['Dev tooling', ['Visual Studio · PyCharm', 'IntelliJ · Eclipse · RIDE', 'GitHub · GitLab · Bitbucket', 'Jenkins · NuGet']],
  ['Delivery & ops', ['PDD / SDD · process mapping', 'Code reviews · standards', 'Jira · Confluence · Aha!', 'MS Project · AgileCraft', 'Visio · Visual Paradigm', 'Monitoring · incident response']]
];

const EDUCATION = [
  ['Christian Brothers University', 'MS, Engineering Management — IT specialization', ['4.0 GPA']],
  ['Amrita Vishwa Vidyapeetham, Coimbatore', 'B.Tech, Computer Science', ['3.2 GPA']],
  ['Certifications', null, ['RPA Developer — UiPath', 'Orchestrator 2018.2 Diploma — UiPath', 'RPA Security Training Diploma — UiPath', 'Robotic Process Automation Professional — Blue Prism']]
];

const NAV = [
  ['#results', 'Results'],
  ['#ai', 'Ask AI'],
  ['#experience', 'Experience'],
  ['#skills', 'Skills'],
  ['#education', 'Education']
];

const SUGGESTIONS = [
  'What are you working on now?',
  'How do you work with Directors and VPs?',
  'How did you get to $500K in savings?',
  'Are you looking for a role?'
];

const GREETING =
  "Ask me anything about Raj's experience — a project, a tool, or where one of the numbers on this page came from.";

export default function Page() {
  const scrollRef = useRef(null);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [log, setLog] = useState([{ me: false, text: GREETING }]);

  const scroll = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  async function send(q) {
    const text = (q || '').trim();
    if (!text || typing) return;
    const history = log
      .map((m) => ({ role: m.me ? 'user' : 'assistant', content: m.text }))
      .concat([{ role: 'user', content: text }]);
    setDraft('');
    setTyping(true);
    setLog((l) => l.concat([{ me: true, text }]));
    requestAnimationFrame(scroll);
    let reply;
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      // The route returns { message } on both success and failure, so read the
      // body either way and surface what the server actually said.
      const data = await res.json().catch(() => null);
      if (data && typeof data.message === 'string') {
        reply = res.ok ? data.message : data.message + ' (HTTP ' + res.status + ')';
      } else {
        reply = 'The assistant returned an unreadable response (HTTP ' + res.status + ').';
      }
    } catch (e) {
      reply =
        'Could not reach the assistant: ' +
        (e && e.message ? e.message : 'network error') +
        '. Email Raj directly at rajkumar.thanudhasan@gmail.com.';
    }
    setTyping(false);
    setLog((l) => l.concat([{ me: false, text: reply }]));
    requestAnimationFrame(scroll);
  }

  return (
    <div style={s("font-family: 'Archivo', system-ui, sans-serif; color: var(--color-text); background: var(--color-bg); -webkit-font-smoothing: antialiased")}>
      <header style={s('position: sticky; top: 0; z-index: 20; background: var(--color-bg); border-bottom: 2px solid var(--color-text)')}>
        <div data-r="pad navbar" style={s('max-width: 1240px; margin: 0 auto; padding: 14px 32px; display: flex; align-items: center; gap: 32px')}>
          <a href="#top" data-navlink style={s('font-weight: 900; font-size: 18px; letter-spacing: -0.02em')}>
            RAJKUMAR THANUDHASAN
          </a>
          <nav data-r="nav" style={s('display: flex; gap: 24px; margin-left: auto; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase')}>
            {NAV.map(([href, label]) => (
              <a key={href} href={href} data-navlink>
                {label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary" href="mailto:rajkumar.thanudhasan@gmail.com" style={s('font-size: 13px')}>
            Contact
          </a>
        </div>
      </header>

      <section id="top" data-r="pad" style={s('max-width: 1240px; margin: 0 auto; padding: 0 32px')}>
        <div data-r="split" style={s('display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 0; align-items: stretch')}>
          <div data-r="hero-text" style={s('padding: 72px 48px 56px 0; border-right: 2px solid var(--color-divider)')}>
            <div style={s(KICKER + '; margin-bottom: 28px')}>
              Lead Developer &amp; Solution Architect — Intelligent Automation
            </div>
            <h1 style={s('font-size: clamp(44px, 6.2vw, 84px); line-height: 0.94; letter-spacing: -0.035em; font-weight: 900; margin: 0 0 28px; text-wrap: balance')}>
              I build automation that pays for itself in the first year.
            </h1>
            <p style={s('font-size: 19px; line-height: 1.5; max-width: 56ch; margin: 0 0 36px; color: var(--color-neutral-800)')}>
              Fourteen years in automation, the last eight running RPA programs for Station Casinos, Dish Network and
              Nielsen. I set automation strategy with Directors and VPs, own licensing, budget and hiring, and stay accountable for the production
              floor — 241 processes on 11 unattended bots that have to run every day.
            </p>
            <div style={s('display: flex; flex-wrap: wrap; gap: 12px')}>
              <a className="btn btn-primary" href="/Rajkumar_Thanudhasan_Resume.pdf" target="_blank" rel="noopener noreferrer">
                Download resume (PDF)
              </a>
              <a className="btn btn-secondary" href="#ai">
                Ask my AI about my work
              </a>
              <a className="btn btn-ghost" href="https://www.linkedin.com/in/rajkumarthanudhasan/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="grayscale" data-r="hero-img" style={s('margin: 72px 0 56px 48px; min-height: 420px; overflow: hidden; background: var(--color-neutral-200)')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portrait.jpg"
              alt="Rajkumar Thanudhasan"
              style={s('display: block; width: 100%; height: 100%; min-height: 420px; object-fit: cover; object-position: 50% 18%; filter: grayscale(1) contrast(1.12)')}
            />
          </div>
        </div>
      </section>

      <section id="results" style={s('border-top: 2px solid var(--color-text); border-bottom: 2px solid var(--color-text); background: var(--color-accent); color: #fff')}>
        <div data-r="pad" style={s('max-width: 1240px; margin: 0 auto; padding: 0 32px')}>
          <div data-r="resultgrid" style={s('display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); background: var(--color-accent); margin: 0 -28px')}>
            {STATS.map(([num, label]) => (
              <div key={num} style={s(STAT_CELL)}>
                <div style={s(STAT_NUM)}>{num}</div>
                <div style={s(STAT_LBL)}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ai" style={s('border-bottom: 2px solid var(--color-text)')}>
        <div data-r="pad" style={s(WRAP)}>
          <div data-r="split" style={s('display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr); gap: 56px; align-items: start')}>
            <div>
              <div style={s(KICKER + '; margin-bottom: 20px')}>01 — Ask first</div>
              <h2 style={s(H2 + '; margin: 0 0 20px')}>Interview me before you interview me.</h2>
              <p style={s('font-size: 17px; line-height: 1.55; color: var(--color-neutral-800); margin: 0 0 20px')}>
                An assistant trained on my resume, project history and the details behind every number on this page. Ask
                how a figure was measured, what the program cost to run, or how I work with the leadership team that
                funds it.
              </p>
              <p style={s("font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; color: var(--color-neutral-700); margin: 0")}>
                Answers cite the role and year they come from. Nothing invented. Powered by Google Gemini 2.5 Flash —
                replies can take a few seconds on the free tier.
              </p>
            </div>
            <div data-r="chat" style={s('border: 2px solid var(--color-text); background: var(--color-neutral-100); display: flex; flex-direction: column; min-height: 460px')}>
              <div style={s('display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 2px solid var(--color-text); background: var(--color-text); color: #fff')}>
                <span style={s('width: 8px; height: 8px; background: var(--color-accent-500); display: block')} />
                <span style={s("font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase")}>
                  Resume assistant
                </span>
              </div>
              <div ref={scrollRef} style={s('flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px; max-height: 340px')}>
                {log.map((m, i) => (
                  <div key={i} style={s('display: flex')}>
                    <div
                      style={s(
                        'max-width: 84%; padding: 12px 14px; font-size: 15px; line-height: 1.5; white-space: pre-wrap; border: 2px solid var(--color-text); background: ' +
                          (m.me ? 'var(--color-text)' : 'var(--color-bg)') +
                          '; color: ' +
                          (m.me ? '#f8f4f4' : 'var(--color-text)') +
                          '; margin-left: ' +
                          (m.me ? 'auto' : '0')
                      )}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing ? (
                  <div style={s("font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--color-neutral-700); animation: blink 1s infinite")}>
                    typing…
                  </div>
                ) : null}
              </div>
              <div style={s('padding: 14px 16px; border-top: 2px solid var(--color-divider); display: flex; flex-wrap: wrap; gap: 8px')}>
                {SUGGESTIONS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="tag tag-outline"
                    data-chip
                    onClick={() => send(label)}
                    style={s("cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 11px; border: 2px solid var(--color-divider); background: transparent; text-align: left")}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(draft);
                }}
                style={s('display: flex; border-top: 2px solid var(--color-text)')}
              >
                <input
                  className="input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask about a project, tool or number…"
                  style={s("flex: 1; border: 0; background: transparent; padding: 16px; font-size: 16px; font-family: 'Archivo', system-ui, sans-serif")}
                />
                <button className="btn btn-primary" type="submit" style={s('border: 0; padding-left: 24px; padding-right: 24px')}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" style={s('border-bottom: 2px solid var(--color-text)')}>
        <div data-r="pad" style={s(WRAP)}>
          <div style={s(KICKER + '; margin-bottom: 20px')}>02 — Track record</div>
          <h2 style={s(H2 + '; margin: 0 0 48px')}>Where the numbers came from</h2>

          {ROLES.map((r, i) => (
            <div key={r.org} data-r="row" style={s(ROW + '; border-top: 2px solid ' + (i === 0 ? 'var(--color-text)' : 'var(--color-divider)'))}>
              <div>
                <div style={s('font-size: 20px; font-weight: 800; letter-spacing: -0.02em')}>{r.org}</div>
                <div style={s(MONO_SM + '; margin-top: 6px')}>{r.dates}</div>
              </div>
              <div>
                <h3 style={s('font-size: 19px; font-weight: 700; margin: 0 0 10px')}>{r.title}</h3>
                <p style={s(BODY_P)}>{r.body}</p>
                <div style={s("display: flex; flex-wrap: wrap; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 11px")}>
                  {r.tags.map((t) => (
                    <span key={t} className="tag tag-neutral">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div data-r="stat" style={s('border-left: 2px solid var(--color-accent); padding-left: 16px')}>
                <div style={s('font-size: 30px; font-weight: 900; letter-spacing: -0.03em; color: var(--color-accent-700)')}>{r.stat}</div>
                <div style={s('font-size: 13px; line-height: 1.4; color: var(--color-neutral-800); margin-top: 4px')}>{r.statLabel}</div>
              </div>
            </div>
          ))}

          <div data-r="row" style={s(ROW + '; border-top: 2px solid var(--color-divider); border-bottom: 2px solid var(--color-divider)')}>
            <div>
              <div style={s('font-size: 20px; font-weight: 800; letter-spacing: -0.02em')}>Earlier</div>
              <div style={s(MONO_SM + '; margin-top: 6px')}>2011 — 2016</div>
            </div>
            <div>
              <h3 style={s('font-size: 19px; font-weight: 700; margin: 0 0 10px')}>
                BWAY Corporation · Christian Brothers University · Atlas Healthcare Software
              </h3>
              <p style={s('font-size: 16px; line-height: 1.55; color: var(--color-neutral-800); margin: 0; max-width: 62ch')}>
                RPA analyst intern at BWAY, automating web, Windows and mainframe applications end to end on UiPath.
                Research and graduate assistant at CBU, automating a doctoral data-collection pipeline. Before that, four
                years at Atlas Healthcare Software supervising three junior analysts and owning functional design across
                LabWorks EMR, EMPI and EHR for 200+ healthcare clients under HIPAA.
              </p>
            </div>
            <div />
          </div>
        </div>
      </section>

      <section style={s('border-bottom: 2px solid var(--color-text)')}>
        <div data-r="pad" style={s(WRAP)}>
          <div style={s(KICKER + '; margin-bottom: 32px')}>03 — Recommendations</div>
          <div style={s('display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2px; background: var(--color-divider)')}>
            {RECOMMENDATIONS.map((r) => (
              <div key={r.who} data-r="quote" style={s('background: var(--color-bg); ' + r.pad)}>
                <p style={s(QUOTE)}>{r.text}</p>
                <div style={s(ATTRIB)}>{r.who}</div>
              </div>
            ))}
          </div>
          <a
            className="btn btn-ghost"
            href="https://www.linkedin.com/in/rajkumarthanudhasan/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            style={s('margin-top: 28px')}
          >
            All recommendations on LinkedIn
          </a>
        </div>
      </section>

      <section id="skills" style={s('border-bottom: 2px solid var(--color-text)')}>
        <div data-r="pad" style={s(WRAP)}>
          <div data-r="split" style={s('display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 2fr); gap: 56px; align-items: start')}>
            <div>
              <div style={s(KICKER + '; margin-bottom: 20px')}>04 — Toolkit</div>
              <h2 style={s(H2 + '; margin: 0 0 20px')}>Certified on UiPath and Blue Prism. Fluent in the rest.</h2>
              <p style={s('font-size: 17px; line-height: 1.55; color: var(--color-neutral-800); margin: 0')}>
                Master&apos;s in Engineering Management with an IT specialization, 4.0 GPA. Fourteen years across gaming,
                media, telecom and healthcare — leading teams as often as writing the workflows.
              </p>
            </div>
            <div style={s('display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 2px; background: var(--color-divider); border: 2px solid var(--color-divider)')}>
              {SKILLS.map(([label, items]) => (
                <div key={label} style={s(SKILL_CELL)}>
                  <div style={s(SKILL_LBL)}>{label}</div>
                  <div style={s(SKILL_BODY)}>
                    {items.map((it, i) => (
                      <span key={it}>
                        {i > 0 ? <br /> : null}
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="education" style={s('border-bottom: 2px solid var(--color-text)')}>
        <div data-r="pad" style={s(WRAP)}>
          <div style={s(KICKER + '; margin-bottom: 32px')}>05 — Education &amp; certification</div>
          <div style={s('display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px')}>
            {EDUCATION.map(([kicker, title, lines], i) => (
              <div key={kicker} style={s('border-top: 2px solid ' + (i === 0 ? 'var(--color-text)' : 'var(--color-divider)') + '; padding-top: 20px')}>
                <div style={s(MONO_SM + '; margin-bottom: 10px')}>{kicker}</div>
                {title ? <div style={s(EDU_TITLE)}>{title}</div> : null}
                <div style={s(title ? 'font-size: 16px; color: var(--color-neutral-800); margin-top: 6px' : 'font-size: 16px; line-height: 1.8; color: var(--color-neutral-800)')}>
                  {lines.map((l, j) => (
                    <span key={l}>
                      {j > 0 ? <br /> : null}
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={s('background: var(--color-text); color: var(--color-neutral-100)')}>
        <div data-r="pad" style={s('max-width: 1240px; margin: 0 auto; padding: clamp(48px, 8vw, 72px) 32px 40px')}>
          <h2 style={s('font-size: clamp(34px, 5vw, 64px); line-height: 1; letter-spacing: -0.035em; font-weight: 900; margin: 0 0 32px; max-width: 18ch')}>
            Open to Lead Developer &amp; Solution Architect roles.
          </h2>
          <div style={s('display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 56px')}>
            <a className="btn btn-primary" href="mailto:rajkumar.thanudhasan@gmail.com">
              rajkumar.thanudhasan@gmail.com
            </a>
            <a className="btn btn-secondary" href="tel:+14074090749" style={s('background: transparent; color: var(--color-neutral-100); border-color: var(--color-neutral-600)')}>
              (407) 409-0749
            </a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/rajkumarthanudhasan/" target="_blank" rel="noopener noreferrer" style={s('color: var(--color-neutral-100)')}>
              LinkedIn
            </a>
            <a className="btn btn-ghost" href="/Rajkumar_Thanudhasan_Resume.pdf" target="_blank" rel="noopener noreferrer" style={s('color: var(--color-neutral-100)')}>
              Resume PDF
            </a>
          </div>
          <div style={s("display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 2px solid var(--color-neutral-800); padding-top: 20px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-neutral-500)")}>
            <span>Rajkumar Thanudhasan</span>
            <span>Lead Developer &amp; Solution Architect</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
