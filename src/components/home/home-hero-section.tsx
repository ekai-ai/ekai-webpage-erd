import { useEffect, useRef } from 'react';
import './home-hero-section.less'

export const HomeHeroSection = () => {
  const contentRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const logoRefs = useRef<(HTMLImageElement | null)[]>([])

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

    // Scroll-based logo color effect
    const handleLogoScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      logoRefs.current.forEach(logo => {
        if (!logo) return;
        const rect = logo.getBoundingClientRect();
        const logoCenter = rect.top + rect.height / 2;
        const distance = Math.abs(logoCenter - viewportCenter);
        // Threshold: 200px from center is max grayscale (51%)
        const threshold = 200;
        let grayscale = Math.min(distance / threshold, 1) * 51;
        grayscale = Math.max(0, Math.min(grayscale, 51));
        logo.style.filter = `grayscale(${grayscale}%) brightness(${1 - (grayscale / 200)})`;
        logo.style.opacity = `${1 - (grayscale / 100) * 0.3}`;
      });
    };

    window.addEventListener('scroll', handleLogoScroll);
    window.addEventListener('resize', handleLogoScroll);
    setTimeout(handleLogoScroll, 100); // Initial call after mount

    return () => {
      window.removeEventListener('scroll', handleLogoScroll);
      window.removeEventListener('resize', handleLogoScroll);
    };
  }, [])

  return (
    <section className='hero-section' ref={contentRef}>
      <div className='logo-container'>
        <img src="/images/logos/ekai-logo.svg" alt="ekai" className='ekai-logo' />
      </div>
      <div className='nav-buttons'>
        <a href="https://forms.gle/swcmXWPerp5gzi5f6" className='nav-button try-beta-button' target="_blank" rel="noopener noreferrer">Access Beta</a>
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
            <div className='icon'>
              <img src="/images/logos/raw-data.png" alt="Raw Data" className="transformation-icon raw-data-icon" />
            </div>
            <span className="transformation-label">Raw Data</span>
          </div>
          <div className='arrow'>→</div>
          <div className='visual-item process'>
            <div className='icon'>
              <img src="/images/logos/ekai-logo.svg" alt="ekai" className="transformation-icon ekai-logo-icon" />
            </div>
            <span className="transformation-label">ekai</span>
          </div>
          <div className='arrow'>→</div>
          <div className='visual-item end'>
            <div className='icon'>
              <img src="/images/logos/semantic-layer.png" alt="Semantic Layer" className="transformation-icon semantic-layer-icon" />
            </div>
            <span className="transformation-label">Semantic Layer</span>
          </div>
        </div>

        <div className='feature-points'>
          <div className='feature side-feature'>
            <img src="/images/logos/auto2.png" alt="Data Warehouse" className='feature-icon' />
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
            <img src="/images/logos/semantic-layer2.png" alt="Semantic Layer" className='feature-icon semantic-layer-icon' />
            <span className='feature-title'>AI-ready Semantic Layer<span className='asterisk'>*</span></span>
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
            <img src="/images/logos/documentation2.png" alt="SQL Documentation" className='feature-icon' />
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

        <div className='asterisk-explanation'>
          <span className='asterisk'>*</span> At ekai, we define the semantic layer as knowledge that helps people understand the data they're working with - including the knowledge and expertise other people have about the data. Our mission is to make the collective knowledge of a data-driven organization available to everyone, so that anyone can get data-driven insights and make informed decisions.
        </div>

        <div className='stats-section' ref={statsRef}>
  <div className='impact-text'>
    <div className='impact-line'>
      <span className='impact-number'>100K+</span> SQL Queries Analyzed
    </div>
    <div className='impact-line'>
      <span className='impact-number'>50+</span> Databases Mapped
    </div>
    <div className='impact-line'>
      <span className='impact-number'>1000+</span> Engineering Hours Saved
    </div>
  </div>
</div>


        {/* Integrations, Beta Tag, and Beta Features vertically centered */}
        <div>
          <div className='integrations'>
            <p className='integration-text'>Works with your data stack</p>
            <div className='integration-logos'>
              <img 
                src="/images/logos/snowflake.png" 
                alt="Snowflake" 
                className='logo'
                ref={el => (logoRefs.current[0] = el)}
                onError={(e) => {
                  console.error('Failed to load Snowflake logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/bigquery.png" 
                alt="BigQuery" 
                className='logo'
                ref={el => (logoRefs.current[1] = el)}
                onError={(e) => {
                  console.error('Failed to load BigQuery logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/databricks-med.png" 
                alt="Databricks" 
                className='logo databricks-logo'
                ref={el => (logoRefs.current[2] = el)}
                onError={(e) => {
                  console.error('Failed to load Databricks logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/redshift.png" 
                alt="Amazon Redshift" 
                className='logo redshift-logo'
                ref={el => (logoRefs.current[3] = el)}
                onError={(e) => {
                  console.error('Failed to load Redshift logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
              <img 
                src="/images/logos/postgres.png" 
                alt="PostgreSQL" 
                className='logo postgres-logo'
                ref={el => (logoRefs.current[4] = el)}
                onError={(e) => {
                  console.error('Failed to load PostgreSQL logo');
                  console.log('Attempted path:', e.currentTarget.src);
                }} 
              />
            </div>
          </div>

          <div className='beta-tag'>
            <span className='beta-icon'>🚀</span>
            <span>Beta Launches Soon</span>
          </div>

          <div className='beta-features'>
            <h3 className='beta-features-title'>Available in Beta:</h3>
            <ul className='features-list'>
              <li>
                <img src="/images/logos/auto.png" alt="Auto Generate" className='feature-icon beta-icon' />
                Auto-generate ERDs on up to 20 tables
              </li>
              <li>
                <img src="/images/logos/chain.png" alt="Link Tables" className='feature-icon beta-icon' />
                Link 50 tables to ekai ERD engine
              </li>
              <li>
                <img src="/images/logos/export.png" alt="Export" className='feature-icon beta-icon' />
                Export ERD as DBML or PNG
              </li>
              <li>
                <img src="/images/logos/profiles.png" alt="Data Profiles" className='feature-icon beta-icon' />
                Generate data profiles and quality signals
              </li>
            </ul>
          </div>
        </div>

        <div className='cta-section'>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
            <div className='cta-group'>
              <a href="https://forms.gle/swcmXWPerp5gzi5f6" target="_blank" rel="noopener noreferrer">
                <button className='primary-button'>
                  <span className='button-text'>Access Beta</span>
                </button>
              </a>
            </div>
            <div className='cta-group'>
              <a href="https://calendly.com/ozair-ekai/30min" target="_blank" rel="noopener noreferrer">
                <button className='secondary-button'>
                  <span className='button-text'>Request Full Access</span>
                </button>
              </a>
            </div>
          </div>
          <div className='sub-link'>
            <span 
              className='docs-link disabled'
              title="Documentation coming soon"
            >
              Read the Docs →
            </span>
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
