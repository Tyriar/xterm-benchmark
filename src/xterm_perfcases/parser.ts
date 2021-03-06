import { perfContext, before, beforeEach, ThroughputRuntimeCase } from '..';

import * as xterm from 'xterm';
import { EscapeSequenceParser } from 'xterm/src/EscapeSequenceParser';
const Parser = require('xterm/lib/EscapeSequenceParser').EscapeSequenceParser;
const C0 = require('xterm/lib/common/data/EscapeSequences').C0;
const C1 = require('xterm/lib/common/data/EscapeSequences').C1;

perfContext('Parser performance - 50MB data', () => {
  let content: string;
  let parser: EscapeSequenceParser;

  beforeEach(() => {
    parser = new Parser();
    parser.setPrintHandler((data, start, end) => {});
    parser.setCsiHandler('@', (params, collect) => {});
    parser.setCsiHandler('A', (params, collect) => {});
    parser.setCsiHandler('B', (params, collect) => {});
    parser.setCsiHandler('C', (params, collect) => {});
    parser.setCsiHandler('D', (params, collect) => {});
    parser.setCsiHandler('E', (params, collect) => {});
    parser.setCsiHandler('F', (params, collect) => {});
    parser.setCsiHandler('G', (params, collect) => {});
    parser.setCsiHandler('H', (params, collect) => {});
    parser.setCsiHandler('I', (params, collect) => {});
    parser.setCsiHandler('J', (params, collect) => {});
    parser.setCsiHandler('K', (params, collect) => {});
    parser.setCsiHandler('L', (params, collect) => {});
    parser.setCsiHandler('M', (params, collect) => {});
    parser.setCsiHandler('P', (params, collect) => {});
    parser.setCsiHandler('S', (params, collect) => {});
    parser.setCsiHandler('T', (params, collect) => {});
    parser.setCsiHandler('X', (params, collect) => {});
    parser.setCsiHandler('Z', (params, collect) => {});
    parser.setCsiHandler('`', (params, collect) => {});
    parser.setCsiHandler('a', (params, collect) => {});
    parser.setCsiHandler('b', (params, collect) => {});
    parser.setCsiHandler('c', (params, collect) => {});
    parser.setCsiHandler('d', (params, collect) => {});
    parser.setCsiHandler('e', (params, collect) => {});
    parser.setCsiHandler('f', (params, collect) => {});
    parser.setCsiHandler('g', (params, collect) => {});
    parser.setCsiHandler('h', (params, collect) => {});
    parser.setCsiHandler('l', (params, collect) => {});
    parser.setCsiHandler('m', (params, collect) => {});
    parser.setCsiHandler('n', (params, collect) => {});
    parser.setCsiHandler('p', (params, collect) => {});
    parser.setCsiHandler('q', (params, collect) => {});
    parser.setCsiHandler('r', (params, collect) => {});
    parser.setCsiHandler('s', (params, collect) => {});
    parser.setCsiHandler('u', (params, collect) => {});
    parser.setExecuteHandler(C0.BEL, () => {});
    parser.setExecuteHandler(C0.LF, () => {});
    parser.setExecuteHandler(C0.VT, () => {});
    parser.setExecuteHandler(C0.FF, () => {});
    parser.setExecuteHandler(C0.CR, () => {});
    parser.setExecuteHandler(C0.BS, () => {});
    parser.setExecuteHandler(C0.HT, () => {});
    parser.setExecuteHandler(C0.SO, () => {});
    parser.setExecuteHandler(C0.SI, () => {});
    parser.setExecuteHandler(C1.IND, () => {});
    parser.setExecuteHandler(C1.NEL, () => {});
    parser.setExecuteHandler(C1.HTS, () => {});
    parser.setOscHandler(0, (data) => {});
    parser.setOscHandler(2, (data) => {});
    parser.setEscHandler('7', () => {});
    parser.setEscHandler('8', () => {});
    parser.setEscHandler('D', () => {});
    parser.setEscHandler('E', () => {});
    parser.setEscHandler('H', () => {});
    parser.setEscHandler('M', () => {});
    parser.setEscHandler('=', () => {});
    parser.setEscHandler('>', () => {});
    parser.setEscHandler('c', () => {});
    parser.setEscHandler('n', () => {});
    parser.setEscHandler('o', () => {});
    parser.setEscHandler('|', () => {});
    parser.setEscHandler('}', () => {});
    parser.setEscHandler('~', () => {});
    parser.setEscHandler('%@', () => {});
    parser.setEscHandler('%G', () => {});
  });

  perfContext('print - a', () => {
    before(() => {
      let data = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', async () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: false, forkArgs: ['--prof']}).showThroughput();
  });

  perfContext('execute - \\n', () => {
    before(() => {
      let data = '\n\n\n\n\n\n\n';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: true}).showThroughput();
  });

  perfContext('escape - ESC E', () => {
    before(() => {
      let data = '\x1bE';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: true}).showThroughput();
  });

  perfContext('escape with collect - ESC % G', () => {
    before(() => {
      let data = '\x1b%G';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: true}).showThroughput();
  });

  perfContext('simple csi - CSI A', () => {
    before(() => {
      let data = '\x1b[A';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: true}).showThroughput();
  });

  perfContext('csi with collect - CSI ? p', () => {
    before(() => {
      let data = '\x1b[?p';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: true}).showThroughput();
  });

  perfContext('csi with params - CSI 1;2 m', () => {
    before(() => {
      let data = '\x1b{1;2m';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: true}).showThroughput();
  });

  perfContext('osc - OSC 0;hi ST', () => {
    before(() => {
      let data = '\x1b]0;hi\x1b\'';
      content = '';
      while (content.length < 50000000)  // test with +50MB
        content += data;
    });
    new ThroughputRuntimeCase('throughput', () => {
      parser.parse(content);
      return {payloadSize: content.length};
    }, {fork: true}).showThroughput();
  });
});
