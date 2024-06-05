export const validateOnlyLetters = (param, key) => {
  if (!/^[a-zA-Z,.\s]+$/.test(param))
    throw Error(
      `Only letters are allowed in ${key}, no numbers or special characters`
    );
};
export const validateOnlyNumbers = (param, key) => {
  if (!/^\d+$/.test(param))
    throw Error(`Only numbers allowed, no other characters in ${key}`);
};

export const validateMissingInformation = (params) => {
  for (const key in params) {
    if (!params[key]) throw Error(`Missing field: '${key}'`);
  }
};

export const validateMinMax = (param, key) => {
  if (param < 1 || param > 5) throw Error(`${key} must be between 1 and 5`);
};
