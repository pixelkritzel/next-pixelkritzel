import * as React from 'react';
import marked from 'marked';

import { HTML } from 'src/components/HTML';

export class Markdown extends React.Component<{ children: string }> {
  render() {
    return <HTML>{marked(this.props.children)}</HTML>;
  }
}
