import * as React from 'react';

export function LanguageSelection({ href, label }: { href: string; label: string }) {
  return (
    <aside className='language-selection'>
      <a href={href}>{label}</a>
    </aside>
  );
}
