import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { useRouter } from 'next/navigation'

interface QuizCompleteProps {
  onReview: () => void
}

export function QuizComplete({ onReview }: QuizCompleteProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[oklch(0.97_0.02_80)] text-[oklch(0.15_0.01_60)] p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md space-y-8"
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
          <CheckCircle2 className="w-20 h-20 mx-auto text-primary" strokeWidth={1.5} />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-serif">Assessment Complete</h2>
          <p className="text-lg opacity-80">
            Your answers have been thoughtfully woven together. Let&apos;s explore your unique constitution.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push('/report')}>
            Generate My Report <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onReview}>
            Review Answers
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
