import './modernist.css';
import './site.css';

export const metadata = {
  title: 'Rajkumar Thanudhasan — RPA Lead & Automation Architect',
  description:
    'Fourteen years designing and running RPA and intelligent-automation programs for Station Casinos, Dish Network and Nielsen.',
  alternates: { canonical: 'https://rajkumarthanudhasan.com' }
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
