export interface CVProps {
  title: string;
  introduction: string;
  imagePath: string;
  person: {
    title: string;
    fields: { label: string; value: string }[];
  };
  development: {
    title: string;
    list: {
      start: number;
      end: number | string;
      description: string;
    }[];
  };
  selected_projects: {
    title: string;
    list: {
      start: number;
      end: number;
      name: string;
      link: string;
      language: string;
      description: string;
      used_technologies: string[];
    }[];
  };
  customers: {
    title: string;
    list: string[];
  };
  coding: {
    title: string;
    fields: {
      label: string;
      value: string | string[];
    }[];
  };

  soft_skills: {
    title: string;
    list: string[];
  };

  links: {
    title: string;
    list: string[];
  };
}
