import cheerio from 'cheerio';
import marked from 'marked';

export interface PostFromAPI {
  title: string;
  publish_date: string;
  body: string;
  slug: string;
  summary?: string;
}

export interface ProcessedPost extends PostFromAPI {
  summary: string;
}

export function processBlogPost(post: PostFromAPI): ProcessedPost {
  {
    return {
      ...post,
      body: marked(post.body, { baseUrl: process.env.CONTENT_SERVER }),
      summary:
        post.summary ??
        cheerio
          .load(post.body)('p')
          .first()
          .text()
    };
  }
}
