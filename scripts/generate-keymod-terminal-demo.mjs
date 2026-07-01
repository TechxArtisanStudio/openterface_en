#!/usr/bin/env node
/**
 * Sync Terminal Preview demo chunks from KeyCmd Android assets.
 * Usage: node scripts/generate-keymod-terminal-demo.mjs [path/to/demo_ble.ansi]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultAnsi = path.resolve(
  __dirname,
  '../../../openterface/Openterface_KeyCmd_Android/app/src/main/assets/terminal/demo_ble.ansi',
);
const outFile = path.resolve(__dirname, '../src/data/keymodTerminalDemo.ts');

const COLOR_CLASS = {
  '1;32': 'km-terminal-ansi--green',
  '90': 'km-terminal-ansi--gray',
  '33': 'km-terminal-ansi--yellow',
  '1;37': 'km-terminal-ansi--white',
  '1;34': 'km-terminal-ansi--blue',
  '36': 'km-terminal-ansi--cyan',
};

class AnsiHtmlParser {
  constructor() {
    this.html = '';
    /** @type {string | null} */
    this.openClass = null;
    /** @type {number} */
    this.textStart = 0;
    /** @type {number} */
    this.i = 0;
    /** @type {Buffer | null} */
    this.bytes = null;
  }

  /** @param {Buffer} bytes */
  reset(bytes) {
    this.bytes = bytes;
    this.html = '';
    this.openClass = null;
    this.textStart = 0;
    this.i = 0;
  }

  /** @param {number} end @param {boolean} final */
  parseUntil(end, final) {
    if (!this.bytes) return '';
    const prevHtml = this.html;
    const limit = final ? end : this.findSafeEnd(end);
    this.consume(limit);
    return this.html.slice(prevHtml.length);
  }

  /** @param {number} end */
  findSafeEnd(end) {
    if (!this.bytes) return end;
    let safe = end;
    while (safe > this.i && !this.isSafeCut(safe)) safe--;
    return Math.max(safe, this.i);
  }

  /** @param {number} pos */
  isSafeCut(pos) {
    if (!this.bytes || pos <= 0 || pos >= this.bytes.length) return true;
    const bytes = this.bytes;
    if (bytes[pos] >= 0x80 && bytes[pos] < 0xc0) return false;
    let j = pos - 1;
    while (j >= 0 && bytes[j] >= 0x30 && bytes[j] <= 0x3f) j--;
    if (j >= 0 && bytes[j] === 0x5b && j > 0 && bytes[j - 1] === 0x1b) return false;
    return true;
  }

  /** @param {number} limit */
  consume(limit) {
    if (!this.bytes) return;
    const bytes = this.bytes;
    while (this.i < limit) {
      if (bytes[this.i] === 0x1b && bytes[this.i + 1] === 0x5b) {
        this.flushText(this.i);
        let j = this.i + 2;
        while (j < limit && !(bytes[j] >= 0x40 && bytes[j] <= 0x7e)) j++;
        if (j >= limit) break;
        const code = bytes.subarray(this.i + 2, j).toString('ascii') + String.fromCharCode(bytes[j]);
        this.applyCode(code);
        this.i = j + 1;
        this.textStart = this.i;
        continue;
      }
      this.i++;
    }
    this.flushText(this.i);
  }

  /** @param {number} end */
  flushText(end) {
    if (!this.bytes || end <= this.textStart) return;
    const text = this.bytes.subarray(this.textStart, end).toString('utf8');
    for (const ch of text) {
      if (ch === '\n') this.html += '\n';
      else if (ch === '<') this.html += '&lt;';
      else if (ch === '>') this.html += '&gt;';
      else if (ch === '&') this.html += '&amp;';
      else this.html += ch;
    }
    this.textStart = end;
  }

  /** @param {string} code */
  applyCode(code) {
    if (code === '0m') {
      this.closeSpan();
      return;
    }
    if (code === '2J' || code === 'H' || code === '?25h') return;
    if (!code.endsWith('m')) return;
    const cls = COLOR_CLASS[code.slice(0, -1)];
    if (cls) this.openSpan(cls);
  }

  closeSpan() {
    if (this.openClass) {
      this.html += '</span>';
      this.openClass = null;
    }
  }

  /** @param {string} cls */
  openSpan(cls) {
    this.closeSpan();
    this.html += `<span class="${cls}">`;
    this.openClass = cls;
  }

  finish() {
    if (!this.bytes) return;
    this.consume(this.bytes.length);
    this.closeSpan();
  }
}

/** @param {Buffer} script */
function parseFullHtml(script) {
  const parser = new AnsiHtmlParser();
  parser.reset(script);
  parser.finish();
  return parser.html;
}

/** @param {Buffer} script @param {number} targetChunkSize */
function chunkBoundaries(script, targetChunkSize) {
  /** @type {number[]} */
  const ends = [];
  let offset = 0;
  while (offset < script.length) {
    let end = Math.min(offset + targetChunkSize, script.length);
    while (end < script.length) {
      const bytes = script;
      if (bytes[end] >= 0x80 && bytes[end] < 0xc0) {
        end++;
        continue;
      }
      let j = end - 1;
      while (j >= offset && bytes[j] >= 0x30 && bytes[j] <= 0x3f) j--;
      if (j >= offset && bytes[j] === 0x5b && j > 0 && bytes[j - 1] === 0x1b) {
        end++;
        continue;
      }
      break;
    }
    offset = end;
    ends.push(offset);
  }
  return ends;
}

/** @param {Buffer} script @param {number} chunkSize */
function chunkDeltas(script, chunkSize) {
  const parser = new AnsiHtmlParser();
  parser.reset(script);
  /** @type {string[]} */
  const deltas = [];
  for (const end of chunkBoundaries(script, chunkSize)) {
    const delta = parser.parseUntil(end, end === script.length);
    if (delta.length > 0) deltas.push(delta);
  }
  parser.finish();
  return deltas;
}

const ansiPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultAnsi;
if (!fs.existsSync(ansiPath)) {
  console.error(`ANSI file not found: ${ansiPath}`);
  process.exit(1);
}

const script = fs.readFileSync(ansiPath);
const fullHtml = parseFullHtml(script);
const usbChunks = chunkDeltas(script, 256);
const bleChunks = chunkDeltas(script, 4);

const output = `/** Auto-generated by scripts/generate-keymod-terminal-demo.mjs — do not edit by hand. */
export const TERMINAL_DEMO_HOST = '192.168.12.1';

export type TerminalDemoTransport = 'usb' | 'ble';

export const TERMINAL_DEMO_TRANSPORT = {
  usb: { startDelayMs: 120, chunkSize: 256, chunkDelayMs: 6 },
  ble: { startDelayMs: 450, chunkSize: 4, chunkDelayMs: 85 },
} as const;

export const TERMINAL_DEMO_FULL_HTML = ${JSON.stringify(fullHtml)};

export const TERMINAL_DEMO_CHUNKS: Record<TerminalDemoTransport, string[]> = {
  usb: ${JSON.stringify(usbChunks)},
  ble: ${JSON.stringify(bleChunks)},
};
`;

fs.writeFileSync(outFile, output);
console.log(`Wrote ${outFile} (${script.length} bytes → ${usbChunks.length} USB / ${bleChunks.length} BLE chunks)`);
