export const validateOnlyLetters = (params) => {
  for (const key in params) {
    if (!/^[a-zA-Z\s]+$/.test(params[key]))
      throw Error(
        `Only letters are allowed in ${key}, no numbers or special characters`
      );
  }
};


export const validateOnlyNumbers = (param) => {
  if (!/^\d+$/.test(param))
    throw Error(`Only numbers allowed, no other characters in phone`);
};

export const validateDirection = (param) => {
  if (!/^[a-zA-Z0-9,.\-#\s]+$/.test(param))
    throw Error(`Direction input allows only these special characters: ,.-#`);
};

export const validateLengthFromTo = (param, num1, num2, key) => {
  if (param.length < num1 || param.length > num2)
    throw Error(
      `The length of the ${key} must be between ${num1} and ${num2} characters`
    );
};

export const validateExactLength = (param, num, key) => {
  if (param.toString().length !== num)
    throw Error(`Digits of ${key} must be ${num}`);
};
