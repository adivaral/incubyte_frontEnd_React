import { add } from './utils';

describe('String Calculator', () => {
    test('should return 0 for an empty string', () => {
        expect(add("")).toBe(0);
    });

    test('should return input number if there is only one input',()=> {
        expect(add("1")).toBe(1);
    });

    test('should accept multiple numbers as input',()=> {
            expect(add("1,4,6")).toBe(11);
    });

    test('should check new line in beetween numbers , and handle them',()=> {
        expect(add("1\n4,6")).toBe(11);
    });

    test('should handle different delimiters', () => {
        expect(add("//;\n1;2")).toBe(3);
    });

    test('should throw an error for negative numbers', () => {
        expect(() => add("1,-4,3")).toThrow("Negative numbers not allowed");
    });

    test('should throw an error for all negative numbers', () => {
        expect(() => add("1,-2,-3")).toThrow("Negative numbers not allowed: -2,-3");
    });

});