import { getCurrencies } from './getCurrencies'

describe('getCurrencies', () => {
  it('should include the name in the message', () => {
    const result = getCurrencies();
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
  });
})