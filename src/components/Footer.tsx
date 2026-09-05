import { companyInfo, navLinks } from '@/data/content';
import { Mail, MapPin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-white border-t border-ink-100 pt-20 pb-10">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="text-white font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display text-lg font-semibold text-ink-700">Autokryx</span>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed max-w-xs">
              {companyInfo.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-500 hover:text-gold-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-300 mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://getinside.in" target="_blank" rel="noopener noreferrer" className="text-sm text-ink-500 hover:text-gold-600 transition-colors">
                  INSIDE
                </a>
              </li>
              <li><span className="text-sm text-ink-500">KRYX</span></li>
              <li><span className="text-sm text-ink-500">NEXUS</span></li>
              <li><span className="text-sm text-ink-500">VAULT</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-300 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${companyInfo.email}`} className="flex items-start gap-2 text-sm text-ink-500 hover:text-gold-600 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-ink-500">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {companyInfo.location}
              </li>
              <li>
                <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-ink-500 hover:text-gold-600 transition-colors">
                  <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {companyInfo.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate info bar */}
        <div className="border-t border-ink-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs text-ink-300">
            <span>{companyInfo.legalName}</span>
            <span className="hidden md:inline">·</span>
            <span>CIN: {companyInfo.cin}</span>
            <span className="hidden md:inline">·</span>
            <span>{companyInfo.regulator}</span>
          </div>
          <p className="text-xs text-ink-300">
            © {new Date().getFullYear()} {companyInfo.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
