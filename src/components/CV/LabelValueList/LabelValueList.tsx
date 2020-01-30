import * as React from 'react';

import { Markdown } from 'src/components/Markdown';

interface LabelValueListProps {
  title: string;
  fields: { label: string; value: string | string[] }[];
}

export class LabelValueList extends React.Component<LabelValueListProps> {
  render() {
    const { fields, title } = this.props;

    return (
      <section>
        <h2>{title}</h2>
        <dl>
          {fields.map(({ label, value }, index) => (
            <React.Fragment key={index}>
              <dt>{label}</dt>
              <dd>
                {Array.isArray(value) ? (
                  value.map((text, index) => (
                    <React.Fragment key={index}>
                      <Markdown inline element='span'>
                        {text}
                      </Markdown>
                      {index < value.length - 1 && ', '}
                    </React.Fragment>
                  ))
                ) : (
                  <Markdown inline>{value}</Markdown>
                )}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </section>
    );
  }
}
