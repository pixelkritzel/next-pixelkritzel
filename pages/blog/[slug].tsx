import * as React from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { gql } from 'apollo-boost';

import WithError from 'src/components/WithError';

import { client } from 'src/utils/apollo-client';
import { processBlogPost, ProcessedPost, PostFromAPI } from 'src/utils/process-blog-post';

class Post extends React.Component<WithRouterProps & ProcessedPost & { statusCode?: number }> {
  static async getInitialProps(context: NextPageContext) {
    const { slug } = context.query;
    const { data } = await client.query<{ posts: PostFromAPI[] }>({
      query: gql`
        {
          posts(where: { slug: "${slug}" }) {
            title
            body
            slug
            summary
            publish_date
          }
        }
      `
    });
    if (data.posts.length === 1) {
      return processBlogPost(data.posts[0]);
    } else {
      return { statusCode: 404 };
    }
  }

  render() {
    const { title, publishDate, body, slug, summary } = this.props as ProcessedPost;

    return (
      <>
        <Head>
          <title>{title} - pixelkritzel.de</title>
          <meta name="description" content={summary}></meta>
        </Head>

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
      </>
    );
  }
}

export default withRouter(WithError(Post));
