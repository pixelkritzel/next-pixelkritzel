import * as React from 'react';
import { CVType } from '../CVProps';
import { Markdown } from 'src/components/Markdown';

import CSS from './SelectedProjects.module.scss';

export class SelectedProjects extends React.Component<CVType['selected_projects']> {
  render() {
    const { list, title, used_technologies_title, language_title } = this.props;

    return (
      <section>
        <h2>{title}</h2>
        <dl>
          {list.map(
            ({ start, end, name, link, language, description, used_technologies }, index) => (
              <React.Fragment key={index}>
                <dt>
                  {start} &ndash; {end}
                </dt>
                <dd className={CSS.project}>
                  <a href={link}>
                    <strong>{name}</strong>
                  </a>
                  <Markdown className={CSS.description}>{description}</Markdown>
                  <div>
                    <strong>{language_title}:</strong> {language}
                  </div>
                  <strong>{used_technologies_title}: </strong>
                  {used_technologies.map((technology, index) => (
                    <React.Fragment key={index}>
                      {technology}
                      {index < used_technologies.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </dd>
              </React.Fragment>
            )
          )}
        </dl>
      </section>
    );
  }
}
