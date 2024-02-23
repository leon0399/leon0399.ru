// test/ip.test.js

// Import necessary modules and functions
const ip = require('ip');

// Write test case for the updated version of the "ip" package
describe('ip package', () => {
  it('should return the correct IP address', () => {
    // Test case 1: Check if the IP address is valid
    const ipAddress = ip.address();
    expect(ipAddress).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);

    // Test case 2: Check if the IP address is not empty
    expect(ipAddress).not.toBe('');

    // Test case 3: Check if the IP address is not undefined
    expect(ipAddress).not.toBeUndefined();
  });
});
