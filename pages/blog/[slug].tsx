import * as React from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { gql } from 'apollo-boost';

import WithError from 'src/components/WithError';

import { client } from 'src/utils/apollo-client';
import { processBlogPost, ProcessedPost, PostFromAPI } from 'src/utils/process-blog-post';
import { Article } from 'src/components/Article';
import { BlogLayout } from 'src/components/BlogLayout';

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
    const post = this.props;

    return (
      <BlogLayout>
        <Head>
          <title>{post.title} - pixelkritzel.de</title>
          <meta name="description" content={post.summary}></meta>
        </Head>
        <Article {...post} />
      </BlogLayout>
    );
  }
}

export default withRouter(WithError(Post));
