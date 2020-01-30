import * as React from 'react';
import marked from 'marked';

const omitParagraphs = new marked.Renderer();

omitParagraphs.paragraph = function(src) {
  return src;
};

interface MarkdownProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: string;
  element?: keyof JSX.IntrinsicElements;
  inline?: boolean;
}

export class Markdown extends React.Component<MarkdownProps> {
  static defaultProps = {
    element: 'div'
  };

  render() {
    const { children, element, inline, ...otherProps } = this.props;

    return React.createElement(element!, {
      dangerouslySetInnerHTML: {
        __html: marked(children, inline ? { renderer: omitParagraphs } : undefined)
      },
      ...otherProps
    });
  }
}
