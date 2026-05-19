/**
 * SectionTitle — Reusable section heading block.
 *
 * Props:
 *  - title    : string   (main heading — rendered with brand gradient)
 *  - subtitle : string   (optional descriptive sub-text)
 *  - center   : boolean  (default: true)
 */
const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-10 ${center ? 'text-center' : 'text-left'}`}>
      <h2
        className="text-3xl md:text-4xl font-bold mb-3 text-gradient"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''}`}
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative underline bar */}
      <div
        className={`mt-4 brand-divider ${center ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

export default SectionTitle;
