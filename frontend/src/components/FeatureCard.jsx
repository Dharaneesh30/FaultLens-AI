function FeatureCard({ title, description }) {
  return (
    <article className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-card backdrop-blur">
      <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
    </article>
  );
}

export default FeatureCard;
