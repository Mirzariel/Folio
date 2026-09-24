/** Primary nav and footer links. One list, used by both. */
import { site } from '@/config/site';

export interface Link {
  readonly href: string;
  readonly label: string;
}

export const primaryNav: readonly Link[] = [
  { href: '/#try', label: 'Try it' },
  { href: '/#organize', label: 'Organize' },
  { href: '/#duplicates', label: 'Duplicates' },
  { href: '/#rename', label: 'Rename' },
  { href: '/#promise', label: 'Safety' },
  { href: '/#pricing', label: 'Pricing' },
] as const;

/** Section ids the nav marks as you scroll past them. */
export const navSectionIds = ['try', 'organize', 'duplicates', 'rename', 'promise', 'pricing'] as const;

/**
 * A footer entry that is an email address rather than a page: rendered as a
 * mailto: link with a Copy button beside it. See CopyEmail.astro.
 */
export interface CopyItem {
  readonly label: string;
  readonly copy: string;
}

export const footerColumns: readonly { title: string; links: readonly (Link | CopyItem)[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/#try', label: 'Try it' },
      { href: '/#organize', label: 'Organize by date' },
      { href: '/#duplicates', label: 'Find duplicates' },
      { href: '/#rename', label: 'Rename in bulk' },
      { href: '/#promise', label: 'Safety' },
      { href: '/#next', label: 'Roadmap' },
      { href: '/#pricing', label: 'Pricing' },
      { href: '/download', label: 'Download' },
      { href: '/changelog', label: 'Changelog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/#faq', label: 'FAQ' },
      { href: '/#feedback', label: 'Feedback' },
      { href: '/docs', label: 'Documentation' },
      { label: 'Contact', copy: site.support.email },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/license', label: 'License' },
    ],
  },
] as const;
