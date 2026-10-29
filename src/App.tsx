import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { IntroReveal } from './components/intro/IntroReveal';
import { Navbar } from './components/nav/Navbar';
import { CinematicHero } from './components/hero/CinematicHero';
import { ScrollExpand } from './components/hero/ScrollExpand';
import { ClubManifesto } from './components/manifesto/ClubManifesto';
import { InteractiveFocusAreas } from './components/focus/InteractiveFocusAreas';
import { MagneticSandbox } from './components/sandbox/MagneticSandbox';
import { InteractiveTimeline } from './components/timeline/InteractiveTimeline';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { EventsSection } from './components/events/EventsSection';
import { TeamSection } from './components/team/TeamSection';
import { ResourceLibrary } from './components/resources/ResourceLibrary';
import { DigitalPassport } from './components/passport/DigitalPassport';
import { JoinSection } from './components/join/JoinSection';
import { Footer } from './components/footer/Footer';
import { InteractiveMagneticField } from './components/background/InteractiveMagneticField';
import { FigmaBlueprintModal } from './components/figma/FigmaBlueprintModal';
import { CommandPalette } from './components/command/CommandPalette';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const viewed = sessionStorage.getItem('mm_intro_shown');
      return !viewed;
    }
    return false;
  });

  const [isFigmaOpen, setIsFigmaOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('mm_intro_shown', 'true');
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const scrollToJoin = () => {
    const el = document.getElementById('join-club');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToManifesto = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      {/* Interactive HTML5 Magnetic Field Canvas Background */}
      <InteractiveMagneticField />

      {/* Brand Opening Reveal (First Visit or Replay) */}
      {showIntro && <IntroReveal onComplete={handleIntroComplete} />}

      {/* Modals & Dialogs */}
      <FigmaBlueprintModal
        isOpen={isFigmaOpen}
        onClose={() => setIsFigmaOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenFigma={() => setIsFigmaOpen(true)}
      />

      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <div className="relative z-10 min-h-screen flex flex-col bg-transparent text-[var(--color-text-primary)] transition-colors duration-300">
        {/* Navigation */}
        <Navbar
          onJoinClick={scrollToJoin}
          onOpenFigma={() => setIsFigmaOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* 1. Cinematic Hero with magnetic pointer responsiveness */}
          <CinematicHero
            onExploreClick={scrollToManifesto}
            onProjectsClick={scrollToProjects}
          />

          {/* 2. React Bits ScrollExpand Cinematic Transition */}
          <ScrollExpand />

          {/* 3. Club Manifesto */}
          <ClubManifesto />

          {/* 4. Interactive Focus Areas */}
          <InteractiveFocusAreas />

          {/* 5. Interactive Tensor Flux Simulator (Lab Sandbox) */}
          <MagneticSandbox />

          {/* 6. Interactive Club Timeline */}
          <InteractiveTimeline />

          {/* 7. Project Showcase */}
          <ProjectShowcase />

          {/* 8. Events & Opportunities */}
          <EventsSection />

          {/* 9. Team & Mentorship */}
          <TeamSection />

          {/* 10. Learning Resource Library */}
          <ResourceLibrary />

          {/* 11. Digital Passport & Verified Achievements */}
          <DigitalPassport />

          {/* 12. Join the Club */}
          <JoinSection />
        </main>

        {/* Footer */}
        <Footer onReplayIntro={handleReplayIntro} />
      </div>
    </ThemeProvider>
  );
}
