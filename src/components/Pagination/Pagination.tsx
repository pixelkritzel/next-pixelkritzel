import * as React from 'react';
import Link from 'next/link';

import CSS from './Pagination.module.scss';

export class Pagination extends React.Component<{
  isFirstPage: boolean;
  isLastPage: boolean;
  linkTemplate: (page: number) => string;
  page: number;
}> {
  render() {
    const { isFirstPage, isLastPage, linkTemplate, page } = this.props;

    return (
      <nav className={CSS.pagination}>
        {/* Empty Spans to keep the flexbox alignment indepently of rendered links */}
        <span>
          {!isFirstPage && (
            <Link href={linkTemplate(page - 1)}>
              <a>Previous Posts</a>
            </Link>
          )}
        </span>
        <span>
          {!isLastPage && (
            <Link href={linkTemplate(page + 1)}>
              <a>Next Posts</a>
            </Link>
          )}
        </span>
      </nav>
    );
  }
}
