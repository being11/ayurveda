'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAssessmentStore } from '../stores/assessmentStore';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { isComplete, answers } = useAssessmentStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hidden on /assessment
  if (pathname === '/assessment') {
    return null;
  }

  // Check if assessment is in progress
  const inProgress = mounted && Object.keys(answers).length > 0 && !isComplete;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-md border-b border-border/50">
        {inProgress && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-600/50">
            <div className="h-full bg-amber-500 w-1/3 animate-pulse" />
          </div>
        )}
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="font-serif text-lg font-medium tracking-wide">
            SwaDharma Prakṛti
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
            <Link href="/report" className="hover:text-foreground transition-colors">
              Report
            </Link>
            <Link href="/recommendations" className="hover:text-foreground transition-colors">
              Guidance
            </Link>
            <Link href="/diet" className="hover:text-foreground transition-colors">
              Diet Plan
            </Link>
            <Link href="/knowledge-graph" className="hover:text-foreground transition-colors">
              Sources
            </Link>
          </nav>
          {/* Mobile menu could be added here, for now keeping it simple */}
          <nav className="flex md:hidden items-center space-x-4 text-xs font-medium text-muted-foreground">
            <Link href="/report" className="hover:text-foreground transition-colors">
              Report
            </Link>
            <Link href="/diet" className="hover:text-foreground transition-colors">
              Diet Plan
            </Link>
          </nav>
        </div>
      </header>
      {/* Spacer to prevent content from going under the fixed header */}
      <div className="h-14" />
    </>
  );
}
