export const urlFormatter = path => {
  const lowerCasePath = path.toLowerCase();
  if (lowerCasePath.includes('location')) {
    return 'Location';
  } if (lowerCasePath.includes('department')) {
    return 'Department';
  }
  return 'Employee';
};
