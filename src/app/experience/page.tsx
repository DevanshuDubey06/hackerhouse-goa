import type { Metadata } from 'next';
import Link from 'next/link';
import { EVENT, EXPERIENCE_DAYS } from '@/lib/config';

export const metadata: Metadata = {
  title: `The Experience — ${EVENT.name} ${EVENT.year}`,
  description: `The ${EVENT.daysCount}-day experience at Hacker House Goa. Arrive, build, break, ship, connect, repeat.`,
};

const dayDetails = [
  {
    ...EXPERIENCE_DAYS[0],
    fullTitle: 'Genesis Day — Where It All Begins',
    detail: 'Check in to the house. Meet your squad. Get oriented. The ocean welcomes you, and so do 500 builders from around the world. Evening mixer by the beach.',
    color: 'bg-cream',
  },
  {
    ...EXPERIENCE_DAYS[1],
    fullTitle: 'Day of the Triangle — Problem. Solution. Market.',
    detail: 'Define your problem. Validate your idea. Form teams if you haven\'t already. Workshops on rapid prototyping and problem-solution fit.',
    color: 'bg-sun-yellow',
  },
  {
    ...EXPERIENCE_DAYS[2],
    fullTitle: 'Build Day — Heads Down. Ship or Ship.',
    detail: 'The main event. Dedicated building time from sunrise to sunset. Mentors available. Ocean breaks encouraged. Evening demos of work-in-progress.',
    color: 'bg-cream',
  },
  {
    ...EXPERIENCE_DAYS[3],
    fullTitle: 'Ship Day — The World Watches',
    detail: 'Final push. Polish your project. Present to judges and fellow builders. Awards ceremony. Closing celebration by the Goa sunset.',
    color: 'bg-hot-pink text-white',
  },
  {
    ...EXPERIENCE_DAYS[4],
    fullTitle: 'Connect — Real People, Real Builders',
    detail: 'Networking is not a dirty word when it\'s genuine. Meet the people behind the projects. Exchange ideas. Plan future collaborations.',
    color: 'bg-cream',
  },
  {
    ...EXPERIENCE_DAYS[5],
    fullTitle: 'Repeat — Sleep. Eat. Do It Again.',
    detail: 'The cycle continues. Every day at the house is a new opportunity. Rest, recharge, and dive back in.',
    color: 'bg-sun-yellow',
  },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-goa-green-deep grain-overlay pt-28 pb-16">
        <div className="section-padding max-container">
          <span className="text-label text-sun-yellow tracking-widest">
            THE EXPERIENCE
          </span>
          <h1 className="font-display text-cream text-4xl md:text-6xl lg:text-7xl font-black mt-4 leading-[0.9]">
            {EVENT.daysCount} Days of
            <br />
            Building
          </h1>
          <p className="font-mono text-cream/60 text-sm mt-6">
            {EVENT.dates} · {EVENT.location}
          </p>
        </div>
      </section>

      {/* Day cards */}
      <section className="bg-cream paper-texture py-12 md:py-20">
        <div className="section-padding max-container">
          <div className="space-y-8">
            {dayDetails.map((day, i) => (
              <div
                key={day.number}
                className={`${day.color} p-6 md:p-10 relative`}
                style={{
                  border: '3px solid #17251C',
                  boxShadow: '4px 4px 0px rgba(23, 37, 28, 0.15)',
                  transform: `rotate(${(i % 2 === 0 ? -0.3 : 0.3)}deg)`,
                }}
              >
                <div className="flex items-start gap-6">
                  <div className={`font-display text-5xl md:text-7xl font-black opacity-20 ${day.color.includes('pink') ? 'text-white' : 'text-dark-ink'}`}>
                    {day.number}
                  </div>
                  <div>
                    <h2 className={`font-display text-2xl md:text-3xl font-bold mb-2 ${day.color.includes('pink') ? 'text-white' : 'text-dark-ink'}`}>
                      {day.fullTitle}
                    </h2>
                    <p className={`font-mono text-sm max-w-xl ${day.color.includes('pink') ? 'text-white/70' : 'text-dark-ink/60'}`}>
                      {day.detail}
                    </p>
                  </div>
                </div>
                {/* Corner decoration */}
                <div className={`absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 ${day.color.includes('pink') ? 'border-white/20' : 'border-dark-ink/10'}`} />
                <div className={`absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 ${day.color.includes('pink') ? 'border-white/20' : 'border-dark-ink/10'}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-goa-green-deep grain-overlay py-16 text-center">
        <div className="section-padding max-container">
          <h2 className="font-display text-cream text-3xl md:text-4xl font-bold mb-6">
            Be Part of It.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="btn-primary">Apply Now →</Link>
            <Link href="/create" className="btn-outline">Create Your ID</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
