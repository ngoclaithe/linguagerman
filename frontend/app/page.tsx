import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { AIGrading } from "@/components/landing/AIGrading";
import { About } from "@/components/landing/About";
import { TargetAudience } from "@/components/landing/TargetAudience";
import { LearningRoadmap } from "@/components/landing/LearningRoadmap";
import { Courses } from "@/components/landing/Courses";
import { TeachingMethod } from "@/components/landing/TeachingMethod";
import { Teachers } from "@/components/landing/Teachers";
import { Testimonials } from "@/components/landing/Testimonials";
import { MediaSection } from "@/components/landing/MediaSection";
import { RegistrationForm } from "@/components/landing/RegistrationForm";
import { CTABanner } from "@/components/landing/CTABanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <SocialProof />
      <AIGrading />
      <About />
      <TargetAudience />
      <LearningRoadmap />
      <Courses />
      <TeachingMethod />
      <Teachers />
      <Testimonials />
      <MediaSection />
      <RegistrationForm />
      <CTABanner />
    </div>
  );
}
