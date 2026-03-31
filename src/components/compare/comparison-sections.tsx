export function ComparisonSections({
  sections,
}: {
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="mb-8 space-y-8">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  );
}
