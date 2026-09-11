interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment} mb-12`}>
      <h2 className="text-3xl sm:text-4xl font-display font-semibold text-night-900 dark:text-emerald-50">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-night-700/80 dark:text-emerald-100/70">
          {description}
        </p>
      )}
    </div>
  );
}
