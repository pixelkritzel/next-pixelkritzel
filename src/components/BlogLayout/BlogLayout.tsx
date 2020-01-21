import * as React from 'react';
import Link from 'next/link';

import 'src/styles/style.scss';

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <header>
        <h1 className="title">
          <Link href="/blog">
            <a>pixelkritzel.de</a>
          </Link>
          <div className="subtitle">The blog of developer Timo Zöller</div>
        </h1>
        <nav>
          <button
            type="button"
            title="Show navigation"
            className="button button-clear show-navigation js-show-navigation"
          >
            Menu
          </button>
          <ul className="navigation-list js-navigation-list">
            <li>
              <Link href="/blog">
                <a>Home</a>
              </Link>
            </li>

            <li>
              <Link href="/cv_english">
                <a>CV</a>
              </Link>
            </li>

            <li>
              <Link href="/cv">
                <a>CV (deutsch)</a>
              </Link>
            </li>

            <li>
              <Link href="/necessary-shit">
                <a>Privacy & Imprint</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
