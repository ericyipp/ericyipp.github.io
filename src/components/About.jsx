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
            <div className="avatar-wrap">
              <div className="avatar-card">
                <div className="avatar-card-inner">
                  <img src="/pictures/photo2-avatar.png" className="avatar-photo" alt="Eric Yip" />
                </div>
              </div>
              <img src="/hi%20gif.gif" className="avatar-hi-gif" alt="hi!" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="about-heading">
              about <span className="thin">me</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="about-text">
              Hello! I recently graduated from UC Berkeley with a Bachelor of Arts in Data Science.
              I had the opportunity to work as a Data Analyst Intern at U4U, focusing on growth analytics,
              and at DoorDash as a Data Science Intern working on automating ops workflows with ML.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="about-text">
              This fall, I'll be joining Shopify in New York City as a Data Engineer Intern, continuing to build and leverage analytics.
            </p>
          </ScrollReveal>
        </div>

        {/* Right column — skills */}
        <div className="skills-groups">
          <ScrollReveal delay={0.1}>
            <div className="skills-group skills-group--ml">
              <div className="skills-label">machine learning</div>
              <div className="skills-list">
                {ML_LIBS.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="skills-group skills-group--ds">
              <div className="skills-label">data science</div>
              <div className="skills-list">
                {DS_LIBS.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="skills-group skills-group--lang">
              <div className="skills-label">programming languages</div>
              <div className="skills-list">
                {LANGUAGES.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="skills-group skills-group--web">
              <div className="skills-label">web technologies</div>
              <div className="skills-list">
                {WEB.map((s) => (
                  <span className="skill-pill" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="skills-group skills-group--tools">
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
