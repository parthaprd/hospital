export const Loader = ({ size = 'md', text = '' }) => {
  const ring = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${ring[size] || ring.md} border-border border-t-accent rounded-full animate-spin`} />
      {text && <p className="text-body-sm text-text-secondary">{text}</p>}
    </div>
  );
};

export const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[400px]">
    <Loader size="lg" text="Loading data…" />
  </div>
);
