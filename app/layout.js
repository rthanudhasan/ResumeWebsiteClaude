import './modernist.css';
import './site.css';

const SITE = 'https://rajkumarthanudhasan.com';
const TITLE = 'Rajkumar Thanudhasan — Lead Developer & Solution Architect, Intelligent Automation';
const DESCRIPTION =
  'Lead Developer and Solution Architect in RPA and intelligent automation. Fourteen years in automation, eight of them in RPA with UiPath, Blue Prism, Power Automate and AI agents at Station Casinos, Dish Network and Nielsen — 241 production processes, 94% success rate, $500K annual savings.';

export const metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Rajkumar Thanudhasan',
    'RPA architect',
    'RPA lead developer',
    'solution architect automation',
    'UiPath developer',
    'Blue Prism',
    'Power Automate',
    'intelligent automation',
    'Las Vegas RPA'
  ],
  authors: [{ name: 'Rajkumar Thanudhasan', url: SITE }],
  creator: 'Rajkumar Thanudhasan',
  alternates: { canonical: SITE },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type: 'profile',
    siteName: 'Rajkumar Thanudhasan',
    url: SITE,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/portrait.jpg', width: 1200, height: 1200, alt: 'Rajkumar Thanudhasan' }]
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/portrait.jpg'] }
};

const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rajkumar Thanudhasan',
  url: SITE,
  image: SITE + '/portrait.jpg',
  jobTitle: 'Lead Developer & Solution Architect — Intelligent Automation',
  email: 'mailto:rajkumar.thanudhasan@gmail.com',
  telephone: '+1-407-409-0749',
  description: DESCRIPTION,
  sameAs: ['https://www.linkedin.com/in/rajkumarthanudhasan/'],
  worksFor: { '@type': 'Organization', name: 'Station Casinos' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Christian Brothers University' },
    { '@type': 'CollegeOrUniversity', name: 'Amrita Vishwa Vidyapeetham' }
  ],
  knowsAbout: [
    'Robotic Process Automation',
    'UiPath REFramework',
    'UiPath Orchestrator',
    'Blue Prism',
    'Power Automate',
    'Document Understanding',
    'Process Mining',
    'Python',
    'C#/.NET',
    'Solution architecture'
  ],
  seeks: {
    '@type': 'Demand',
    name: 'Lead Developer & Solution Architect roles in RPA and intelligent automation'
  }
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        {children}
        {GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}');`
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
