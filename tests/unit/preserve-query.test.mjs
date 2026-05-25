import assert from 'node:assert/strict';
import test from 'node:test';
import { preserveQueryForLocaleSwitch } from '../../src/lib/preserve-query.ts';

test('preserveQueryForLocaleSwitch keeps UTMs and product filter', () => {
  assert.equal(
    preserveQueryForLocaleSwitch('?utm_source=test&product=kvm-go&sort=date'),
    '?utm_source=test&product=kvm-go&sort=date',
  );
});

test('preserveQueryForLocaleSwitch strips GA linker params', () => {
  assert.equal(
    preserveQueryForLocaleSwitch('?_gl=1*abc*_ga*xyz&product=kvm-go'),
    '?product=kvm-go',
  );
});

test('preserveQueryForLocaleSwitch strips unknown params', () => {
  assert.equal(
    preserveQueryForLocaleSwitch('?foo=bar&utm_campaign=launch'),
    '?utm_campaign=launch',
  );
});

test('preserveQueryForLocaleSwitch returns empty when only _gl remains', () => {
  assert.equal(
    preserveQueryForLocaleSwitch('?_gl=1*abc&_ga=noise'),
    '',
  );
});

test('preserveQueryForLocaleSwitch handles leading question mark', () => {
  assert.equal(preserveQueryForLocaleSwitch('utm_medium=social'), '?utm_medium=social');
});
