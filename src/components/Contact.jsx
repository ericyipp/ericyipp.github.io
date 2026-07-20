import ScrollReveal from './ScrollReveal'
import './Contact.css'

export default function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <ScrollReveal>
          <h2 className="contact-heading">
            <span className="section-idx">04. contact</span>
            Let's get in touch
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="contact-text">
            I'm always open to new opportunities, collaborations, or just a
            friendly conversation about data, ML, or anything creative. Feel
            free to reach out!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="contact-links">
            {/* LinkedIn */}
            <a
              className="contact-icon"
              href="https://www.linkedin.com/in/ericyipp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              className="contact-icon"
              href="https://github.com/ericyipp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* Email */}
            <a
              className="contact-icon"
              href="mailto:ericyyip@gmail.com"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a className="contact-email" href="mailto:ericyyip@gmail.com">
            ericyyip@gmail.com →
          </a>
        </ScrollReveal>
      </section>

      <footer className="footer">
        <p className="footer-text">
          designed & built by <a href="https://github.com/ericyipp" target="_blank" rel="noopener noreferrer">eric yip</a> · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
