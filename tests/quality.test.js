const quality = require('../quality');

test('quality unavailable for aqi -', () => {
  expect(quality('-')).toBe('unavailable');
});

test('quality good for aqi 1', () => {
  expect(quality(1)).toBe('good');
});

test('quality good for aqi 50', () => {
  expect(quality(50)).toBe('good');
});

test('quality moderate for aqi 51', () => {
  expect(quality(51)).toBe('moderate');
});

test('quality moderate for aqi 99', () => {
  expect(quality(99)).toBe('moderate');
});

test('quality unheathy1 for aqi 101', () => {
  expect(quality(101)).toBe('unheathy1');
});

test('quality unheathy2 for aqi 199', () => {
  expect(quality(199)).toBe('unheathy2');
});

test('quality unheathy2 for aqi 200', () => {
  expect(quality(200)).toBe('unheathy2');
});

test('quality veryunheatlhy for aqi 299', () => {
  expect(quality(299)).toBe('veryunheatlhy');
});

test('quality veryunheatlhy for aqi 300', () => {
  expect(quality(300)).toBe('veryunheatlhy');
});

test('quality veryunheatlhy for aqi 301', () => {
  expect(quality(301)).toBe('hazardous');
});