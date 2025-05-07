import localFont from 'next/font/local';

export const ibmPlexSans = localFont({
  src: [
    {
      path: '../../public/fonts/ibm-plex-sans-v7-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-plex-sans-v7-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-plex-sans-v7-latin-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ibm-plex-sans-v7-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ibm-plex-sans-v7-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--ibm-plex-sans',
});