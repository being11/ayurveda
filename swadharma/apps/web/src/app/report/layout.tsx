import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Ayurvedic Profile | SwaDharma Prakrti',
  description: 'Your comprehensive, classically-grounded Ayurvedic constitution and tendency report.'
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
