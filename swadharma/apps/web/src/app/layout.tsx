import { Geist, Geist_Mono, Source_Sans_3, Roboto_Slab } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";
import Navigation from "../components/Navigation";

const robotoSlabHeading = Roboto_Slab({subsets:['latin'],variable:'--font-heading'});

const sourceSans3 = Source_Sans_3({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: 'SwaDharma Prakṛti — Ayurvedic Self-Discovery',
  description: 'The world\'s most comprehensive Ayurvedic self-identification system. Not a dosha quiz — a genuine inquiry into your constitution, grounded in classical texts.',
  keywords: ['Ayurveda', 'Prakriti', 'dosha', 'constitution', 'Charaka', 'Vata Pitta Kapha'],
  openGraph: {
    title: 'SwaDharma Prakṛti',
    description: 'A classical Ayurvedic self-discovery journey. One question at a time.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={cn("antialiased", fontMono.variable, "font-sans", sourceSans3.variable, robotoSlabHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
