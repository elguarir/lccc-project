export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Este Center',
  description:
    'A place for students of essaouira high school of technology to share their ideas and learn along the way..',
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
