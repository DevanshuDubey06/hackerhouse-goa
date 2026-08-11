import { Hero } from '@/components/hero/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { IdPreviewSection } from '@/components/sections/IdPreviewSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <IdPreviewSection />
      <FinalCtaSection />
    </>
  );
}
