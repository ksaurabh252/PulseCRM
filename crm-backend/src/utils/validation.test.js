
const { isValidEmail } = require("./validation.js");

// describe() creates a "test suite" (a group of related tests)
describe("Email Validation Utility", () => {
  
  // test() (or it()) defines an individual test case
  test("should return true for a valid email", () => {
    // Use expect() and .toBe() to check the result
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@company.co.uk")).toBe(true);
  });

  // Test for invalid email formats
  test("should return false for an invalid email", () => {
    expect(isValidEmail("test.com")).toBe(false);           // Missing '@'
    expect(isValidEmail("test@example")).toBe(false);       // Missing domain extension
    expect(isValidEmail("@example.com")).toBe(false);       // Missing username
    expect(isValidEmail("test @example.com")).toBe(false);  // Space in email
  });

  // Test for empty or non-string values
  test("should return false for empty or non-string values", () => {
    expect(isValidEmail("")).toBe(false);           // Empty string
    expect(isValidEmail(null)).toBe(false);         // null value
    expect(isValidEmail(undefined)).toBe(false);    // undefined value
    expect(isValidEmail(12345)).toBe(false);        // Non-string value
  });
});