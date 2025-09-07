"use client"

import { motion } from 'framer-motion'

const SOCIAL_PROOF_ITEMS = [
  "Trusted by 10k+ creators",
  "SOC 2 Type II Compliant", 
  "99.9% Uptime SLA",
  "GDPR & CCPA Ready",
  "Enterprise Security",
  "24/7 Support"
]

const PLACEHOLDER_LOGOS = [
  { name: "CreatorCorp", width: 120 },
  { name: "SMB Solutions", width: 140 },
  { name: "Content Labs", width: 110 },
  { name: "Marketing Pro", width: 130 },
  { name: "Scale Co", width: 100 },
  { name: "Growth Inc", width: 125 },
]

export function SocialProofSection() {
  return (
    <div className="space-y-12">
      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-lg font-medium text-muted-foreground mb-8">
          Trusted by creators and SMBs worldwide
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
          {SOCIAL_PROOF_ITEMS.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logo cloud */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-40 hover:opacity-60 transition-opacity duration-300">
          {PLACEHOLDER_LOGOS.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
              style={{ width: logo.width }}
            >
              {/* Placeholder logo */}
              <div className="h-12 bg-muted border rounded-lg flex items-center justify-center">
                <span className="font-semibold text-xs text-muted-foreground">
                  {logo.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </motion.div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <blockquote className="text-xl md:text-2xl font-medium text-muted-foreground italic leading-relaxed">
          "Rust turned our content chaos into revenue clarity. We identified our best-performing hooks, optimized our posting schedule, and improved ROAS by 40% in just 2 months."
        </blockquote>
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan flex items-center justify-center text-white font-bold">
            JS
          </div>
          <div className="text-left">
            <div className="font-medium">Jamie Smith</div>
            <div className="text-sm text-muted-foreground">Creator, @techtalks</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


