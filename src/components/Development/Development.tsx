import * as React from 'react';

import { CVProps } from 'src/components/CV/CVProps';
import { Markdown } from 'src/components/Markdown';

export class Development extends React.Component<CVProps['development']> {
  render() {
    const { list, title } = this.props;

    return (
      <section>
        <h2>{title}</h2>
        <dl>
          {list.map(({ description, end, start }, index) => (
            <React.Fragment key={index}>
              <dt>
                {start} - {end}
              </dt>
              <dd>
                <Markdown>{description}</Markdown>{' '}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </section>
    );
  }
}
