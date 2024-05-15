export const validateOnlyLettersRgex = (paramsNames) => {
  const onlyLettersRgex = /^[a-zA-Z\s]+$/;

  for (const key in paramsNames) {
    if (!onlyLettersRgex.test(paramsNames[key]))
      throw Error(
        `Only letters are allowed in ${key}, no numbers or special characters`
      );
  }
};

export const validateOnlyNumersRgex = (paramsOnlyNumbers) => {
  const onlyNumbersRgex = /^\d+$/;
  
  for (const key in paramsOnlyNumbers) {
    if (!onlyNumbersRgex.test(paramsOnlyNumbers[key]))
      throw Error(`Only numbers allowed, no other characters in ${key}`);
  }
};

export const validateDirectons = (paramsDirections) => {
  const directionRegex = /^[a-zA-Z0-9,.\-#\s]+$/;

  for (const key in paramsDirections) {
    if (!directionRegex.test(paramsDirections[key]))
      throw Error(`In ${key} Only these special characters are allowed: ,.-#`);
  }
};

export const validateURLs = (paramsURLs) => {
  const emailRgex =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[\w-]+)*(?:\?[a-zA-Z0-9-]+=[a-zA-Z0-9-%]+(?:&[a-zA-Z0-9-]+=[a-zA-Z0-9-%]+)*)?(?:#[a-zA-Z0-9-]+)?\.(?:jpg|jpeg|png|gif|bmp)$/i;

  for (const key in paramsURLs) {
    if (!emailRgex.test(paramsURLs[key])) throw Error(`${key} must be an URL`);
  }
};

export const validateLengthFromTo = (paramsLengthFromTo, num1, num2) => {
  for (const key in paramsLengthFromTo) {
    if (
      paramsLengthFromTo[key].length < num1 ||
      paramsLengthFromTo[key].length > num2
    )
      throw Error(
        `The length of the ${key} must be between ${num1} and ${num2} characters`
      );
  }
};

export const validateExactLength = (param, num, key) => {
  if (param.toString().length !== num)
    throw Error(`Digits of ${key} must be ${num}`);
};

export const splitAndFixNames = (name) => {
  const nameSplit = name.split(" ");

  for (let i = 0; i < nameSplit.length; i++) {
    nameSplit[i] =
      nameSplit[i].charAt(0).toUpperCase() +
      nameSplit[i].slice(1).toLowerCase();

    name = nameSplit.join(" ");
  }

  return name;
};
