export const validateOnlyLetters = (params) => {
  for (const key in params) {
    if (!/^[a-zA-Z\s]+$/.test(params[key]))
      throw Error(
        `Only letters are allowed in ${key}, no numbers or special characters`
      );
  }
};

export const validateZipCode = (param) => {
  if (!/^[A-Z]?\d{4}[A-Z]{0,3}$/i.test(param))
    throw Error(
      "Zip code is incorrect,  must be in this format: 'A1234BCD', no special characters allowed"
    );
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
