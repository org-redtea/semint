import {expect} from 'chai';
import {
  encode,
  decode,
  isValid
} from '../esnext';

describe('isValid', () => {
  it('should be false', () => {
    expect(isValid('1.1.1', 0)).to.be.false;
    expect(isValid('1.1.', 1)).to.be.false;
    expect(isValid('1.1.12', 1)).to.be.false;
    expect(isValid('1.1.1.1', 1)).to.be.false;
    expect(isValid('1.1.1-a', 1)).to.be.false;
    expect(isValid('1.12.1-a', 1)).to.be.false;
  });

  it('should be true', () => {
    expect(isValid('1.1.1', 1)).to.be.true;
    expect(isValid('0.0.1', 1)).to.be.true;
    expect(isValid('12.1.1', 2)).to.be.true;
  });
});

describe('encode', () => {
  it('should throw error', () => {
    expect(() => encode('1', 1)).to.throw('not valid arguments');
  });

  it('should encode', () => {
    expect(encode('0.0.0', 1)).to.be.eq(0);
    expect(encode('0.0.1', 1)).to.be.eq(1);
    expect(encode('0.1.1', 1)).to.be.eq(11);
    expect(encode('1.1.1', 1)).to.be.eq(111);
    expect(encode('1.1.1', 2)).to.be.eq(10101);
  });
});

describe('decode', () => {
  it('should throw error', () => {
    expect(() => decode(1111, 1)).to.throw('not valid arguments');
  });

  it('should decode', () => {
    expect(decode(0, 1)).to.be.eq('0.0.0');
    expect(decode(1, 1)).to.be.eq('0.0.1');
    expect(decode(11, 1)).to.be.eq('0.1.1');
    expect(decode(111, 1)).to.be.eq('1.1.1');
    expect(decode(10101, 2)).to.be.eq('1.1.1');
  });
});
