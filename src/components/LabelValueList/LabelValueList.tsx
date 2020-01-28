import * as React from 'react';

import { Markdown } from 'src/components/Markdown';

interface LabelValueListProps {
  title: string;
  fields: { label: string; value: string }[];
}

export class LabelValueList extends React.Component<LabelValueListProps> {
  render() {
    const { fields, title } = this.props;

    return (
      <section>
        <h2>{title}</h2>
        <dl>
          {fields.map(({ label, value }) => (
            <>
              <dt>{label}</dt>
              <dd>
                <Markdown>{value}</Markdown>
              </dd>
            </>
          ))}
        </dl>
      </section>
    );
  }
}
