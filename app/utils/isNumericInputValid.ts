function isNumericInputValid(inputText: string) {
  // Use a regular expression to check if the input contains only numeric characters
  const numericRegex = /^[0-9]+$/;

  // Check if the length of the input is exactly 6
  const isLengthValid = inputText.length === 6;

  // Return true if both conditions are met, otherwise false
  return numericRegex.test(inputText) && isLengthValid;
}

export default isNumericInputValid;
