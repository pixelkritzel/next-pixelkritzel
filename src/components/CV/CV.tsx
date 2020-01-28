import * as React from 'react';

import { Markdown } from 'src/components/Markdown';

import { CVProps } from './CVProps';
import { LabelValueList } from '../LabelValueList';
import { Development } from '../Development';

export class CV extends React.Component<CVProps> {
  render() {
    const { development, title, imagePath, introduction, person } = this.props;

    return (
      <>
        <h1>{title}</h1>
        <img src={imagePath} />
        <Markdown>{introduction}</Markdown>
        <LabelValueList {...person} />
        <Development {...development} />
      </>
    );
  }
}
