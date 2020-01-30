import * as React from 'react';
import toml from 'toml';
import * as fs from 'fs';
import * as path from 'path';

import { CV } from 'src/components/CV';
import { CVType } from 'src/components/CV/CVProps';

export default class Home extends React.Component<{ cv: CVType }> {
  static async getInitialProps() {
    const fileContent = await fs.promises.readFile(
      path.resolve(process.cwd() + '/content/cv_en.toml'),
      {
        encoding: 'utf-8'
      }
    );
    return { cv: toml.parse(fileContent) };
  }

  render() {
    const { cv } = this.props;
    return <CV language='en' {...cv} />;
  }
}
