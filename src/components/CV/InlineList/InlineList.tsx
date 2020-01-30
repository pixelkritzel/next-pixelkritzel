import * as React from 'react';
import { CVType } from '../CVProps';
import { Markdown } from 'src/components/Markdown';

export class InlineList extends React.Component<CVType['clients']> {
  render() {
    const { list, title } = this.props;

    return (
      <section>
        <h2>{title}</h2>
        {list.map((name, index) => (
          <React.Fragment key={index}>
            <Markdown inline element='span'>
              {name}
            </Markdown>
            {index < list.length - 1 && ', '}
          </React.Fragment>
        ))}
      </section>
    );
  }
}
