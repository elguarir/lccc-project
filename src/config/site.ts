export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'SOMACEP',
  description:
    'Your partner',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Articles',
      href: '/articles',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  links: {
    twitter: 'https://twitter.com/zbeyens',
    github: 'https://github.com/udecode/plate',
    docs: 'https://platejs.org',
  },
};
