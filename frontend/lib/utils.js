// Get rid of this when and if the uifaces.com API key ever shows up

const JOB_TITLES = {
  one: [
    'Lead',
    'Senior',
    'Direct',
    'Corporate',
    'Dynamic',
    'Future',
    'Product',
    'National',
    'Regional',
    'District',
    'Central',
    'Global',
    'Relational',
    'Customer',
    'Investor',
    'Dynamic',
    'International',
    'Legacy',
    'Forward',
    'Interactive',
    'Internal',
    'Human',
    'Chief',
    'Principal',
  ],
  two: [
    'Solutions',
    'Program',
    'Brand',
    'Security',
    'Research',
    'Marketing',
    'Directives',
    'Implementation',
    'Integration',
    'Functionality',
    'Response',
    'Paradigm',
    'Tactics',
    'Identity',
    'Markets',
    'Group',
    'Resonance',
    'Applications',
    'Optimization',
    'Operations',
    'Infrastructure',
    'Intranet',
    'Communications',
    'Web',
    'Branding',
    'Quality',
    'Assurance',
    'Impact',
    'Mobility',
    'Ideation',
    'Data',
    'Creative',
    'Configuration',
    'Accountability',
    'Interactions',
    'Factors',
    'Usability',
    'Metrics',
    'Team',
  ],
  three: [
    'Supervisor',
    'Associate',
    'Executive',
    'Liason',
    'Officer',
    'Manager',
    'Engineer',
    'Specialist',
    'Director',
    'Coordinator',
    'Administrator',
    'Architect',
    'Analyst',
    'Designer',
    'Planner',
    'Synergist',
    'Orchestrator',
    'Technician',
    'Developer',
    'Producer',
    'Consultant',
    'Assistant',
    'Facilitator',
    'Agent',
    'Representative',
    'Strategist',
  ],
};

export const arrayPick = array => (
  array[Math.floor(Math.random() * array.length)]
);

export const jobTitleGenerator = () => {
  const keys = Object.keys(JOB_TITLES);
  const results = keys.reduce((acc, key) => {
    acc.push(
      arrayPick(JOB_TITLES[key]),
    );
    return acc;
  }, []);
  return results.join(' ');
};

export const urlFormatter = path => {
  const lowerCasePath = path.toLowerCase();
  if (lowerCasePath.includes('location')) {
    return 'Location';
  } if (lowerCasePath.includes('department')) {
    return 'Department';
  }
  return 'Employee';
};

export const titleize = string => (
  string[0].toUpperCase() + string.slice(1)
);
