import { Hero3D } from '@/components/sections/Hero3D';
import { TrustBar } from '@/components/sections/TrustBar';
import { LessonTypes } from '@/components/sections/LessonTypes';
import { WhyUs } from '@/components/sections/WhyUs';
import { PackagesPreview } from '@/components/sections/PackagesPreview';
import { AreasOverview } from '@/components/sections/AreasOverview';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaBand } from '@/components/sections/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <TrustBar />
      <LessonTypes />
      <WhyUs />
      <PackagesPreview />
      <AreasOverview />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection limit={3} showLink />
      <FaqSection limit={6} showLink tone="paper-soft" />
      <CtaBand />
    </>
  );
}
