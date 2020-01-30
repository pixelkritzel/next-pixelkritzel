import * as React from 'react';
import { gql } from 'apollo-boost';
import Head from 'next/head';

import { withRouter } from 'next/router';

import { withError } from 'src/components/WithError';

import { client } from 'src/utils/apollo-client';
import { processBlogPost, ProcessedPost, PostFromAPI } from 'src/utils/process-blog-post';

import CSS from './index.module.scss';
import { Article } from 'src/components/Article';
import { Pagination } from 'src/components/Pagination';
import { BlogLayout } from 'src/components/BlogLayout';

const POSTS_PER_SITE = 3;

export class Blog extends React.Component<{ allPostsLength: number; page: number; posts: ProcessedPost[] }> {
  static async getInitialProps({ query: { page = 1 } }) {
    const allPosts = await client.query<{ posts: PostFromAPI[] }>({
      query: gql`
        {
          posts(sort: "publish_date:desc", where: { published: true }) {
            id
          }
        }
      `
    });
    const allPostsLength = allPosts.data.posts.length;
    const { data } = await client.query<{ posts: PostFromAPI[] }>({
      query: gql`
        {
          posts(
            start:${POSTS_PER_SITE * (page - 1)},
            limit: ${POSTS_PER_SITE},
            sort: "publish_date:desc",
            where: { published: true }) {
              title
              body
              slug
              publish_date
            }
          }
      `
    });
    const posts = data.posts.map(processBlogPost);
    return { allPostsLength, page: Number(page), posts };
  }

  get isFirstPage() {
    return this.props.page === 1;
  }

  get isLastPage() {
    return this.props.page * POSTS_PER_SITE > this.props.allPostsLength;
  }

  render() {
    const { page, posts } = this.props;
    return (
      <BlogLayout>
        <Head>
          <title>pixelkritzel.de</title>
        </Head>
        <ul className={CSS.list}>
          {posts.map(post => (
            <li key={post.slug}>
              <Article isInPostList {...post} />
            </li>
          ))}
        </ul>
        <Pagination
          isFirstPage={this.isFirstPage}
          isLastPage={this.isLastPage}
          linkTemplate={page => `/blog?page=${page}`}
          page={page}
        />
      </BlogLayout>
    );
  }
}

export default withRouter(withError(Blog));
