import { HeroSection } from '@/components/landing/hero-section'
import { CalendarModule } from '@/components/landing/calendar-module'
import { ClockModule } from '@/components/landing/clock-module'
import { MarqueeSection } from '@/components/landing/marquee-section'
import { ShowTellSection } from '@/components/landing/show-tell-section'
import { SocialProofSection } from '@/components/landing/social-proof-section'
import { FooterSection } from '@/components/landing/footer-section'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Calendar Module */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <CalendarModule />
        </div>
      </section>
      
      {/* Clock Module */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <ClockModule />
        </div>
      </section>
      
      {/* Marquee Section */}
      <MarqueeSection />
      
      {/* Show & Tell */}
      <section className="py-32 px-4">
        <div className="container mx-auto">
          <ShowTellSection />
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <SocialProofSection />
        </div>
      </section>
      
      {/* Footer */}
      <FooterSection />
    </main>
  )
}


