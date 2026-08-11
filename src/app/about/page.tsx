import type { Metadata } from 'next';
import Link from 'next/link';
import { EVENT } from '@/lib/config';

export const metadata: Metadata = {
  title: `About — ${EVENT.name} ${EVENT.year}`,
  description: `About ${EVENT.name} ${EVENT.year}. A house full of builders in ${EVENT.location}.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-goa-green-deep grain-overlay pt-28 pb-16">
        <div className="section-padding max-container">
          <span className="text-label text-sun-yellow tracking-widest">ABOUT</span>
          <h1 className="font-display text-cream text-4xl md:text-6xl font-black mt-4 leading-[0.9]">
            About Hacker
            <br />
            House Goa
          </h1>
        </div>
      </section>

      <section className="bg-cream paper-texture py-16 md:py-24">
        <div className="section-padding max-container max-w-3xl">
          <div className="space-y-8 font-mono text-sm text-dark-ink/70 leading-relaxed">
            <p>
              Hacker House Goa is a 4-day residential builder experience in Goa, India.
              500 builders come together to build, break, ship, and connect — away from
              the noise of everyday life.
            </p>
            <p>
              It&apos;s not a conference. There are no panels, no keynotes, no badge-scanning
              networking events. It&apos;s a house. A house by the ocean where builders
              wake up, code until sunset, share ideas over dinner, and ship before midnight.
            </p>
            <p>
              The first edition brought together builders from across India and the world.
              Projects shipped at Hacker House Goa have gone on to raise funding, gain
              users, and make a real impact.
            </p>
            <p>
              Hacker House Goa {EVENT.year} is the next chapter. {EVENT.dates}. {EVENT.location}.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/apply" className="btn-primary">Apply Now →</Link>
            <Link href="/house" className="btn-dark">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
