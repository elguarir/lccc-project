export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'SOMACEP',
  description:
    'Your partner ',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Services',
      href: '/services',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Approvals',
      href: '/approvals',
    },
    {
      title: 'Our Agencies',
      href: '/agencies',
    },
  ],
  links: {
    twitter: 'https://twitter.com/zbeyens',
    github: 'https://github.com/udecode/plate',
    docs: 'https://platejs.org',
  },
};
