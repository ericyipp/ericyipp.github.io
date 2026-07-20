import ScrollReveal from './ScrollReveal'
import './About.css'

const ML_LIBS    = ['Scikit-learn', 'PyTorch', 'TensorFlow']
const DS_LIBS    = ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn']
const LANGUAGES  = ['Python', 'SQL', 'R', 'Java', 'C/C++', 'TypeScript']
const WEB        = ['HTML/CSS', 'React.js', 'Flask']
const TOOLS      = ['Git', 'Snowflake', 'Sigma', 'Google Analytics', 'VS Code']

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        {/* Left column — bio */}
        <div>
          <ScrollReveal>
            <h2 className="about-heading">
              <span className="section-idx">02. about</span>
              A bit about me
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="about-status">
              <span className="about-status-dot" />
              let's connect!
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="about-text">
              Hello! I'm Eric Yip — a Data Science student at UC Berkeley
              graduating in May 2026. I've interned as a Data Scientist at
              DoorDash, where I built and deployed ML models end-to-end, and
              worked as a Data Analyst at U4U through the Berkeley SkyDeck
              accelerator program.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="about-text">
              I love turning messy datasets into actionable insights, shipping
              production models, and building tools that people actually use.
              Whether it's writing SQL at scale, designing A/B tests, or
              crafting interactive dashboards — I thrive at the intersection
              of data and impact.
            </p>
          </ScrollReveal>
        </div>

        {/* Right column — skills */}
        <div>
          <ScrollReveal delay={0.1}>
            <div className="skills-group">
              <div className="skills-label">machine learning</div>
              <div className="skills-list">
                {ML_LIBS.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="skills-group">
              <div className="skills-label">data science</div>
              <div className="skills-list">
                {DS_LIBS.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="skills-group">
              <div className="skills-label">programming languages</div>
              <div className="skills-list">
                {LANGUAGES.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="skills-group">
              <div className="skills-label">web technologies</div>
              <div className="skills-list">
                {WEB.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="skills-group">
              <div className="skills-label">tools</div>
              <div className="skills-list">
                {TOOLS.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
