import { useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link'
import './home-hero-section.less'

export const HomeHeroSection = () => {
  const contentRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (content) {
      content.style.opacity = '1'
    }

    // Add intersection observer for stats animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
  }, [])

  return (
    <section className='hero-section' ref={contentRef}>
      <div className='logo-container'>
        <img src="/images/logos/ekai-logo.svg" alt="ekai" className='ekai-logo' />
      </div>
      <div className='nav-buttons'>
        <a href="https://dev.ekai.ai" className='nav-button try-beta-button' target="_blank" rel="noopener noreferrer">Try Beta</a>
      </div>
      <div className='code-background'></div>
      <div className='hero-container'>
        <div className='tech-accent'></div>
        <h1 className='title'>
          From Raw Data to <br/>
          <span className='highlight'>AI-Ready Knowledge</span> <br/>
          in Minutes
        </h1>
        
        <p className='description'>
          AI can't read your mind. Use ekai to extract the knowledge that makes your data work.
        </p>

        <div className='transformation-visual'>
          <div className='visual-item start'>
            <div className='icon'>📊</div>
            <span>Raw Data</span>
          </div>
          <div className='arrow'>→</div>
          <div className='visual-item process'>
            <div className='icon'>⚡</div>
            <span>EKAI</span>
          </div>
          <div className='arrow'>→</div>
          <div className='visual-item end'>
            <div className='icon'>🧠</div>
            <span>Semantic Layer</span>
          </div>
        </div>

        <div className='feature-points'>
          <div className='feature side-feature'>
            <span className='feature-icon'>🔄</span>
            <span className='feature-title'>Auto-generated ERDs</span>
            <span className='feature-description'>
              Instantly visualize database relationships across your entire data stack.
              No more manual diagramming or outdated documentation.
            </span>
            <div className='feature-bottom'>
              <span className='feature-benefit'>
                Save 2-3 months of engineering time
              </span>
              <span className='tech-spec'>Supports 10+ SQL dialects</span>
            </div>
          </div>
          <div className='feature central-feature'>
            <span className='feature-icon'>🤖</span>
            <span className='feature-title'>AI-ready Semantic Layer</span>
            <span className='feature-description'>
              Turn your data stack into a knowledge graph for AI applications.
              Instant context for LLMs and analytics.
            </span>
            <div className='feature-bottom'>
              <span className='feature-benefit'>
                Deploy AI apps 5x faster
              </span>
              <span className='tech-spec'>Built on open standards</span>
            </div>
          </div>
          <div className='feature side-feature'>
            <span className='feature-icon'>📝</span>
            <span className='feature-title'>SQL Documentation</span>
            <span className='feature-description'>
              Automatically document and catalog your SQL code across all platforms.
              Keep documentation in sync with your codebase.
            </span>
            <div className='feature-bottom'>
              <span className='feature-benefit'>
                Eliminate weeks of documentation work
              </span>
              <span className='tech-spec'>Auto-updates with your code</span>
            </div>
          </div>
        </div>

        <div className='stats-section' ref={statsRef}>
          <div className='impact-text'>
            <span className='impact-number'>100K+</span> SQL Queries Analyzed<br />
            <span className='impact-number'>50+</span> Databases Mapped<br />
            <span className='impact-number'>1000+</span> Engineering Hours Saved
          </div>
        </div>

        {/* Integrations, Beta Tag, and Beta Features vertically centered */}
        <div className='beta-section-wrapper'>
          <div className='integrations'>
            <p className='integration-text'>Works with your data stack</p>
            <div className='integration-logos'>
              <img 
                src="/images/logos/snowflake.png" 
                alt="Snowflake" 
                className='logo'
                onError={(e) => {
                  console.error('Failed to load Snowflake logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/bigquery.png" 
                alt="BigQuery" 
                className='logo'
                onError={(e) => {
                  console.error('Failed to load BigQuery logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/databricks.png" 
                alt="Databricks" 
                className='logo'
                style={{ transform: 'scale(1.5)' }}
                onError={(e) => {
                  console.error('Failed to load Databricks logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/redshift.png" 
                alt="Amazon Redshift" 
                className='logo'
                onError={(e) => {
                  console.error('Failed to load Redshift logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/postgres.png" 
                alt="PostgreSQL" 
                className='logo'
                onError={(e) => {
                  console.error('Failed to load PostgreSQL logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
            </div>
          </div>

          <div className='beta-tag'>
            <span className='beta-icon'>🚀</span>
            <span>Beta Launch Now Live</span>
          </div>

          <div className='beta-features'>
            <h3 className='beta-features-title'>Available in Beta:</h3>
            <ul className='features-list'>
              <li>
                <span className='feature-icon'>📊</span>
                Auto-generate ERDs on up to 20 tables
              </li>
              <li>
                <span className='feature-icon'>🔗</span>
                Link 50 tables to ekai ERD engine
              </li>
              <li>
                <span className='feature-icon'>⬇️</span>
                Export ERD as DBML or PNG
              </li>
              <li>
                <span className='feature-icon'>📈</span>
                Generate data profiles and quality signals
              </li>
            </ul>
          </div>
        </div>

        <div className='cta-section'>
          <div className='cta-group'>
            <a href="https://dev.ekai.ai" target="_blank" rel="noopener noreferrer">
              <button className='primary-button'>
                <span className='button-text'>Try Beta</span>
              </button>
            </a>
            <div className='sub-link'>
              <a href="/docs" className='docs-link'>
                Read the Docs →
              </a>
            </div>
          </div>

          <div className='cta-group'>
            <HashLink to='/contact#waitlist'>
              <button className='secondary-button'>
                <span className='button-text'>Request Full Access</span>
              </button>
            </HashLink>
            <div className='sub-link'>
              <a href="https://forms.gle/q3q1Fc3jjiwR9YPK7" className='waitlist-link' target="_blank" rel="noopener noreferrer">
                Join the Waitlist →
              </a>
            </div>
          </div>
        </div>

        <div className='footer-info'>
          <div className='footer-line'>
            <span className='engineer-text'>
              <span className='code-icon'>⌨️</span>
              Built by data engineers, for data engineers
            </span>
            <span className='separator'>|</span>
            <span className='location-text'>
              <span className='location-icon'>📍</span>
              Based in Kendall Square, Cambridge, MA
            </span>
          </div>
        </div>
      </div>
    </section>
  )
} 
