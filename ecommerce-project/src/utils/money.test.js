import {it, expect, describe} from 'vitest';
import {formatMoney} from './money.js';

// This is a basic test suite for the formatMoney function
describe('formatMoney', () => {
    it('formats 1999 cents as $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99');
    });

    it('displays 2 decimals', () => {
        expect(formatMoney(2000)).toBe('$20.00');
        expect(formatMoney(2505)).toBe('$25.05');
        expect(formatMoney(250)).toBe('$2.50');
    });
});