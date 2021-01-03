export const unpackForRequest = (formValues) => {
  const data = {};
  for (const key of Object.keys(formValues)) {
    for (const itemKey of Object.keys(formValues[key])) {
      data[itemKey] = formValues[key][itemKey];
    }
  }
  return data;
};

export default { unpackForRequest };
