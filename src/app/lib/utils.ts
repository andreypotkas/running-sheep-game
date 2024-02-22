export function roundToCeilWithZeroLastDigit(number: number) {
  let roundedNumber = Math.ceil(number);

  while (roundedNumber % 10 !== 0) {
    roundedNumber++;
  }

  return roundedNumber;
}
