import * as React from 'react';

import marked from 'marked';

import ApolloClient, { gql } from 'apollo-boost';

import fetch from 'node-fetch';

type Post = {
  title: string;
  publish_date: { year: string; month: string; day: string };
  body: string;
};

const client = new ApolloClient({
  fetch: fetch as any,
  uri: 'http://0.0.0.0:1337/graphql'
});

export default class Home extends React.Component<{ posts: Post[] }> {
  static async getInitialProps() {
    const { data } = await client.query<{ posts: (Post & { publish_date: string })[] }>({
      query: gql`
        {
          posts(limit: 2, sort: "publish_date:desc", where: { published: true }) {
            title
            body
            summary
            publish_date
          }
        }
      `
    });
    const posts = data.posts.map(post => {
      const [year, month, day] = post.publish_date.split('-');
      console.log(year);
      return {
        ...post,
        body: marked(post.body, { baseUrl: 'http://0.0.0.0:1337' }),
        publish_date: {
          year,
          month,
          day
        }
      };
    });
    return { posts };
  }

  render() {
    const { posts } = this.props;
    console.log(posts);
    return (
      <>
        <h1>Hello to the blog</h1>
        <ul>
          {posts.map(({ body, publish_date, title }) => (
            <li>
              <h2>{title}</h2>
              <em>
                {publish_date.day}.{publish_date.month}.{publish_date.year}
              </em>
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
