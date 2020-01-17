import * as React from 'react';
import { gql } from 'apollo-boost';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';

import WithError from 'src/components/WithError';

import { client } from 'src/utils/apollo-client';
import { processBlogPost, ProcessedPost, PostFromAPI } from 'src/utils/process-blog-post';

import CSS from './index.module.scss';

export class Blog extends React.Component<{ posts: ProcessedPost[] }> {
  static async getInitialProps() {
    const { data } = await client.query<{ posts: PostFromAPI[] }>({
      query: gql`
        {
          posts(limit: 2, sort: "publish_date:desc", where: { published: true }) {
            title
            body
            slug
            publish_date
          }
        }
      `
    });
    const posts = data.posts.map(processBlogPost);
    return { posts };
  }

  render() {
    const { posts } = this.props;
    return (
      <>
        <Head>
          <title>pixelkritzel.de</title>
        </Head>
        <ul className={CSS.list}>
          {posts.map(({ body, publishDate, slug, title }) => (
            <li key={slug}>
              <article className="article post-list-item">
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
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withRouter(WithError(Blog));
