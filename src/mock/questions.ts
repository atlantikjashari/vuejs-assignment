export interface Question {
  id: number
  question: string
  answer: string
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'Tell me about yourself and your experience in field marketing.',
    answer:
      "I've worked in field marketing for 5 years, managing local campaigns, brand activations, and events that connect directly with customers.",
  },
  {
    id: 2,
    question: 'How do you measure the success of a field marketing campaign?',
    answer:
      "Success depends on the campaign's goal. For awareness campaigns, I track engagement, attendance, and social mentions. For lead generation, I look at lead volume, quality, and conversion rate. I also compare post-event sales data and customer feedback to measure overall impact.",
  },
  {
    id: 3,
    question: 'What\u2019s your approach to planning a field marketing event?',
    answer:
      'I start by defining the objective and target audience. Then I build a plan around location, timing, partnerships, and messaging. I coordinate closely with sales to ensure our field goals align with pipeline targets. Finally, I prepare detailed timelines, vendor checklists, and a feedback plan for post-event analysis.',
  },
]
