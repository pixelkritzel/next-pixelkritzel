import cheerio from 'cheerio';
import marked from 'marked';

export interface PostFromAPI {
  title: string;
  publish_date: string;
  body: string;
  slug: string;
  summary?: string;
}

export interface ProcessedPost extends Omit<PostFromAPI, 'publish_date'> {
  publishDate: { year: string; month: string; day: string };
  summary: string;
}

export function processBlogPost(post: PostFromAPI): ProcessedPost {
  {
    const [year, month, day] = post.publish_date.split('-');
    return {
      ...post,
      body: marked(post.body, { baseUrl: process.env.CONTENT_SERVER }),
      publishDate: {
        year,
        month,
        day
      },
      summary:
        post.summary ??
        cheerio
          .load(post.body)('p')
          .first()
          .text()
    };
  }
}
