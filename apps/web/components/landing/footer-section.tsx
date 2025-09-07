"use client"

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'API', href: '/docs/api' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Security', href: '/security' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Compliance', href: '/compliance' },
  ],
}

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/rust-app' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/rust_app' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/rust-app' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@rust.app' },
]

export function FooterSection() {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-display font-bold">Rust</span>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Turn vibes into revenue. The marketing intelligence platform built for creators and SMBs who want to scale smart.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background border border-border hover:border-brand-violet/50 flex items-center justify-center transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-brand-violet transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links sections */}
          {Object.entries(FOOTER_LINKS).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>© 2024 Rust. All rights reserved.</span>
            <span>Made with ❤️ for creators</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>v1.0.0</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>All systems operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}


