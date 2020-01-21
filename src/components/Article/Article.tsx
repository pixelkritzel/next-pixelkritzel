import * as React from 'react';
import cx from 'classnames';
import Prism from 'prismjs';

import Link from 'next/link';

import { ProcessedPost } from 'src/utils/process-blog-post';

import CSS from './Article.module.scss';

interface ArticleProps extends ProcessedPost {
  isInPostList?: boolean;
}

export class Article extends React.Component<ArticleProps> {
  articleElement: HTMLElement | null = null;

  componentDidMount() {
    Prism.highlightAllUnder(this.articleElement!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }

  render() {
    const { body, isInPostList, publishDate, slug, title } = this.props;

    return (
      <article
        ref={ref => (this.articleElement = ref)}
        className={cx(CSS.article, { [CSS.postListItem]: isInPostList })}
      >
        <div className="time-container">
          <time>
            {publishDate.day}.{publishDate.month}.{publishDate.year}
          </time>
        </div>
        <h2>
          <Link href="/blog/[slug]" as={`/blog/${slug}`}>
            <a>{title}</a>
          </Link>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </article>
    );
  }
}
