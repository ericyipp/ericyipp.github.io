import { useState } from 'react'
import { LinkedinLogo, GithubLogo, EnvelopeSimple } from '@phosphor-icons/react'
import ScrollReveal from './ScrollReveal'
import './Contact.css'

const EMAIL = 'ericyyip@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <section className="contact" id="contact">
        <ScrollReveal>
          <h2 className="contact-heading">
            let's <span className="thin">connect!</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="contact-text">
            Always open to connect! Feel free to shoot me a message on LinkedIn or by email.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="contact-links">
            <a
              className="contact-icon"
              href="https://www.linkedin.com/in/ericyipp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={22} weight="regular" />
            </a>

            <a
              className="contact-icon"
              href="https://github.com/ericyipp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubLogo size={22} weight="regular" />
            </a>

            <a
              className="contact-icon"
              href={`mailto:${EMAIL}`}
              aria-label="Email"
            >
              <EnvelopeSimple size={22} weight="regular" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="contact-email-wrapper">
            <button
              className={`contact-email${copied ? ' copied' : ''}`}
              onClick={handleCopy}
              aria-label="Copy email to clipboard"
            >
              <span className="email-text">{EMAIL} →</span>
              <span className="copied-text">Copied</span>
            </button>
            <span className="copy-tooltip">Copy to clipboard</span>
          </div>
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
