'use client';

interface IdentityFormProps {
  name: string;
  stack: string;
  location: string;
  onNameChange: (name: string) => void;
  onStackChange: (stack: string) => void;
  onLocationChange: (location: string) => void;
}

const STACK_SUGGESTIONS = [
  'AI / Fullstack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Product Designer',
  'ML / AI Engineer',
  'Web3 Developer',
  'Mobile Developer',
  'DevOps / Infra',
  'Data Scientist',
  'Product Manager',
  'Founder',
];

export function IdentityForm({
  name,
  stack,
  location,
  onNameChange,
  onStackChange,
  onLocationChange,
}: IdentityFormProps) {
  return (
    <div className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="builder-name"
          className="text-label text-xs text-dark-ink/60 mb-2 block"
        >
          Name
        </label>
        <input
          id="builder-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Devanshu Dubey"
          maxLength={50}
          className="w-full"
          autoComplete="name"
        />
      </div>

      {/* Stack / Role */}
      <div>
        <label
          htmlFor="builder-stack"
          className="text-label text-xs text-dark-ink/60 mb-2 block"
        >
          Stack / Role
        </label>
        <div className="relative">
          <input
            id="builder-stack"
            type="text"
            value={stack}
            onChange={(e) => onStackChange(e.target.value)}
            placeholder="AI / Fullstack Developer"
            maxLength={60}
            list="stack-suggestions"
            className="w-full"
          />
          <datalist id="stack-suggestions">
            {STACK_SUGGESTIONS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="builder-location"
          className="text-label text-xs text-dark-ink/60 mb-2 block"
        >
          Location <span className="text-dark-ink/30">(Optional)</span>
        </label>
        <input
          id="builder-location"
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Bhopal, India"
          maxLength={60}
          className="w-full"
        />
      </div>
    </div>
  );
}
