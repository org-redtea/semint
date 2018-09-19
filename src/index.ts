export function isValid(semver: string | number, decimals = 4): boolean {
  if (decimals < 1) {
    return false;
  }

  if (typeof semver === 'string') {
    const rx = new RegExp(`^${new Array(3).fill(`\\d{1,${decimals}}`).join('\\.')}$`);

    return rx.test(semver);
  } else if (typeof semver === 'number') {
    return semver >= 0 && semver < 10 ** (decimals * 3) && semver % 1 === 0;
  }

  return false;
}

export function encode(semver: string, decimals = 4): number {
  if (!isValid(semver, decimals)) {
    throw new Error('not valid arguments');
  }

  const one = 10 ** decimals;
  const parts = semver.split('.').map(Number);

  let result = 0, mul = 1;

  while (parts.length) {
    const part = parts.pop() as number;

    result += part * mul;
    mul *= one;
  }

  return result;
}

export function decode(semver: number, decimals = 4): string {
  if (!isValid(semver, decimals)) {
    throw new Error('not valid arguments');
  }

  const one = 10 ** decimals;

  let result = [0, 0, 0], idx = 2, div = 1;

  while(semver !== 0) {
    result[idx] = semver % one;
    semver = (semver - result[idx]) / one;
    idx--;
  }

  return result.join('.');
}
