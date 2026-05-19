/**
 * LoadingSpinner
 * Reusable full-page / inline loading indicator.
 *
 * Props:
 *  - size  : 'sm' | 'md' | 'lg'  (default: 'md')
 *  - fullPage : boolean            (default: false)
 */
const sizeMap = {
  sm: 'w-6 h-6 border-2',
  md: 'w-12 h-12 border-4',
  lg: 'w-20 h-20 border-4',
};

const LoadingSpinner = ({ size = 'md', fullPage = false }) => {
  const spinnerClasses = `
    ${sizeMap[size]}
    rounded-full
    border-t-transparent
    border-solid
    animate-spin
  `.trim();

  const spinnerStyle = {
    borderColor: 'var(--color-brand-primary)',
    borderTopColor: 'transparent',
  };

  const spinner = (
    <div
      className={spinnerClasses}
      style={spinnerStyle}
      role="status"
      aria-label="Loading..."
    />
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full py-12">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
