import React from 'react'
import vrsbLogo from '/vrsb.png'

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Resources: ['Documentation', 'API Reference', 'Tutorials', 'Blog'],
  Community: ['Discord', 'GitHub', 'Twitter', 'Showcase'],
  Company: ['About', 'Careers', 'Privacy', 'Terms'],
};

const Footer = () => {
  return (
    <footer
      className="relative z-10 border-t"
      style={{ background: '#080a18', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Logo and Description */}
            <img src={vrsbLogo} alt="VR Scene Builder" className="w-25 h-25" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(242,240,255,0.4)' }}>
              The professional-grade 3D scene builder that lets you create, import, and manage
              production-ready scenes all from your browser.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(242,240,255,0.3)', letterSpacing: '0.1em' }}
              >
                {section}
              </span>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(242,240,255,0.45)' }}
                      onMouseEnter={e => (e.target.style.color = '#f2f0ff')}
                      onMouseLeave={e => (e.target.style.color = 'rgba(242,240,255,0.45)')}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(242,240,255,0.25)' }}>
            © {new Date().getFullYear()} VR Scene Builder. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-xs animate-pulse px-2 py-1 rounded-md font-mono"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              ● System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
