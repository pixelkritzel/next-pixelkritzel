import * as React from 'react';

import Head from 'next/head';

import { Markdown } from 'src/components/Markdown';

import { CVType } from './CVProps';
import { LabelValueList } from './LabelValueList';
import { Development } from './Development';
import { SelectedProjects } from './SelectedProjects';
import { InlineList } from './InlineList';

import './styles/style.scss';
import { LanguageSelection } from './LanguageSelection';

interface CVProps extends CVType {
  language: 'de' | 'en';
}

export class CV extends React.Component<CVProps> {
  render() {
    const {
      development,
      title,
      imagePath,
      introduction,
      person,
      selected_projects,
      clients,
      coding,
      soft_skills,
      links,
      language
    } = this.props;

    return (
      <div className='container'>
        {language === 'de' ? (
          <LanguageSelection href='/en' label='English version' />
        ) : (
          <LanguageSelection href='/' label='German version' />
        )}
        <main>
          <Head>
            <title>{title}</title>
          </Head>
          <section className='introduction'>
            <h1>{title}</h1>
            <img src={imagePath} />
            <Markdown>{introduction}</Markdown>
          </section>
          <LabelValueList {...person} />
          <Development {...development} />
          <SelectedProjects {...selected_projects} />
          <InlineList {...clients} />
          <LabelValueList {...coding} />
          <InlineList {...soft_skills} />
          <InlineList {...links} />
        </main>
      </div>
    );
  }
}
