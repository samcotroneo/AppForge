export type AppFeedbackTone = 'info' | 'warning' | 'error'

export type AppFeedbackItem = {
  id: string
  title: string
  message: string
  tone: AppFeedbackTone
}

export type AppFeedbackSummary = {
  items: AppFeedbackItem[]
  infoCount: number
  warningCount: number
  errorCount: number
}

export function summarizeFeedback(items: AppFeedbackItem[]): AppFeedbackSummary {
  return {
    items,
    infoCount: items.filter((item) => item.tone === 'info').length,
    warningCount: items.filter((item) => item.tone === 'warning').length,
    errorCount: items.filter((item) => item.tone === 'error').length,
  }
}
