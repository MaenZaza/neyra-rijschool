import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Check } from '@/components/ui/icons';
import { lessonTypes } from '@/data/content';

/** Schakel / Automaat / Proefles overview. Reused on home and lessons page. */
export function LessonTypes() {
  return (
    <Section id="lessen">
      <SectionHeading
        kicker="Schakel of automaat"
        title="Kies de lesvorm die bij je past"
        intro="Weet je nog niet welke bij je past? Tijdens de proefles helpen we je kiezen."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-ink/15 bg-ink/10 lg:grid-cols-3">
        {lessonTypes.map((lesson, i) => (
          <Reveal key={lesson.slug} delay={i * 70} className="bg-paper-soft">
            <div className="flex h-full flex-col p-7 sm:p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-semibold">{lesson.name}</h3>
                <span aria-hidden className="font-mono text-sm text-signal">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-asphalt">
                {lesson.short}
              </p>
              <p className="mt-4 flex-1 leading-relaxed text-asphalt">{lesson.description}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {lesson.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check width={18} height={18} className="mt-0.5 shrink-0 text-signal" />
                    <span className="text-ink/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
