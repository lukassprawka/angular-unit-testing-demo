import { TextSummaryPipe } from './text-summary.pipe';

describe('text-summary pipe', () => {
  let pipe: TextSummaryPipe;

  beforeEach(() => {
    pipe = new TextSummaryPipe();
  });

  it('should return empty string if value is false', () => {
    expect(pipe.transform(false)).toEqual('');
  });

  it('should return empty string if value is null', () => {
    expect(pipe.transform(null)).toEqual('');
  });

  it('should return empty string if value is undefined', () => {
    expect(pipe.transform(undefined)).toEqual('');
  });

  it('should return empty string if value is empty string', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should limit given string to ten charakters plus "..." if it contains more than ten characters and there is no second argument', () => {
    expect(pipe.transform('012345678910111213')).toEqual('0123456789...');
  });

  it('should limit given string to number specity in second argument plus "..." if it contains more characters than that number', () => {
    expect(pipe.transform('01234567', 7)).toEqual('0123456...');
  });

  it('should return given string if it contains less characters than ten and there is no second argument', () => {
    expect(pipe.transform('01234567')).toEqual('01234567');
  });

  it('should return given string if it contains less characters than number specify in second argument', () => {
    expect(pipe.transform('01234567891011121314151617', 77)).toEqual('01234567891011121314151617');
  });
})