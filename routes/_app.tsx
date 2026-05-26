import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Russel Dinoy | Full Stack Developer</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          [data-animate] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 600ms ease-out, transform 600ms ease-out;
          }
          [data-animate].animate-visible {
            opacity: 1;
            transform: translateY(0);
          }
          [data-animate-skills] .skill-bar-fill {
            width: 0% !important;
            transition: width 1000ms ease-out;
          }
          [data-animate-skills].animate-visible .skill-bar-fill {
            width: var(--skill-percent) !important;
          }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            [data-animate] {
              opacity: 1;
              transform: none;
              transition: none;
            }
            [data-animate-skills] .skill-bar-fill {
              width: var(--skill-percent) !important;
              transition: none;
            }
          }
        `}</style>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var theme = localStorage.getItem('theme');
            if (theme === 'light') {
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.add('light');
            }
          })();
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var observer = new IntersectionObserver(function(entries) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add('animate-visible');
                }
              });
            }, { threshold: 0.1 });
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('[data-animate], [data-animate-skills]').forEach(function(el) {
                observer.observe(el);
              });
            });
          })();
        `}} />
      </head>
      <body class="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-body">
        <Component />
      </body>
    </html>
  );
}
