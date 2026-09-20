import './modernist.css';
import './site.css';

const SITE = 'https://rajkumarthanudhasan.com';
const TITLE = 'Rajkumar Thanudhasan — Lead Developer & Solution Architect, Intelligent Automation';
const DESCRIPTION =
  'Rajkumar Thanudhasan is a Lead Developer and Solution Architect in RPA and intelligent automation, based in Las Vegas. Fourteen years in automation, eight in RPA with UiPath, Blue Prism, Power Automate and AI agents at Station Casinos, Dish Network and Nielsen: 241 production processes at 94% success, $500K in annual savings, and an ML-driven bill automation returning $80K a month.';

export const metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Rajkumar Thanudhasan',
    'RPA architect',
    'RPA lead developer',
    'RPA solution architect',
    'intelligent automation architect',
    'UiPath developer',
    'UiPath REFramework',
    'UiPath Orchestrator',
    'Blue Prism developer',
    'Power Automate',
    'Document Understanding',
    'process mining',
    'AI agents automation',
    'automation center of excellence',
    'Las Vegas RPA developer'
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
    images: [{ url: '/og-card.png', width: 1200, height: 630, alt: 'Rajkumar Thanudhasan, Lead Developer and Solution Architect in RPA and intelligent automation' }]
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og-card.png'] },
  category: 'technology'
};

const PERSON = {
  '@type': 'Person',
  '@id': SITE + '#person',
  name: 'Rajkumar Thanudhasan',
  url: SITE,
  image: SITE + '/portrait.jpg',
  jobTitle: 'Lead Developer & Solution Architect — Intelligent Automation',
  email: 'mailto:rajkumar.thanudhasan@gmail.com',
  telephone: '+1-407-409-0749',
  description: DESCRIPTION,
  sameAs: ['https://www.linkedin.com/in/rajkumarthanudhasan/'],
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', addressCountry: 'US' },
  worksFor: { '@type': 'Organization', name: 'Station Casinos' },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Lead Developer & Solution Architect — Intelligent Automation',
    occupationalCategory: '15-1252.00 Software Developers',
    skills:
      'UiPath, Blue Prism, Power Automate, REFramework, Orchestrator, Document Understanding, Process Mining, AI agents, Python, C#/.NET, SQL, solution architecture'
  },
  hasCredential: [
    ['RPA Developer Certificate', 'UiPath'],
    ['RPA Orchestrator 2018.2 Diploma', 'UiPath'],
    ['RPA Security Training Diploma', 'UiPath'],
    ['Robotic Process Automation Professional', 'Blue Prism']
  ].map(([name, issuer]) => ({
    '@type': 'EducationalOccupationalCredential',
    name,
    credentialCategory: 'certification',
    recognizedBy: { '@type': 'Organization', name: issuer }
  })),
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

const GRAPH_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    PERSON,
    {
      '@type': 'WebSite',
      '@id': SITE + '#website',
      url: SITE,
      name: 'Rajkumar Thanudhasan',
      description: DESCRIPTION,
      inLanguage: 'en-US',
      publisher: { '@id': SITE + '#person' }
    },
    {
      '@type': 'ProfilePage',
      '@id': SITE + '#profile',
      url: SITE,
      name: TITLE,
      about: { '@id': SITE + '#person' },
      mainEntity: { '@id': SITE + '#person' },
      isPartOf: { '@id': SITE + '#website' },
      inLanguage: 'en-US'
    }
  ]
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GRAPH_LD) }}
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
