import * as React from 'react';

export class HTML extends React.Component<{ children: string }> {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.props.children }}></div>;
  }
}
