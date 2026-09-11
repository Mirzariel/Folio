/**
 * The three kinds of message the feedback form accepts. The label is what the
 * visitor picks; the subject is what lands in the inbox, so a feature request
 * can be told from a problem report without opening either.
 */
export interface FeedbackTopic {
  readonly label: string;
  readonly subject: string;
}

export const feedbackTopics: readonly FeedbackTopic[] = [
  { label: 'Request a feature', subject: 'Folio: Feature request' },
  { label: 'Share feedback', subject: 'Folio: Feedback' },
  { label: 'Report a problem', subject: 'Folio: Problem report' },
] as const;
