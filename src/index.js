#!/usr/bin/env node

/* eslint-disable import/no-dynamic-require */
import MITMProxy from 'mitmproxy';
import * as R from 'ramda';
import glob from 'glob';

import cleanup from 'src/utils/functions/cleanup';

/*
  Automatically load handlers defined in src/handlers/
*/
const cwd = __dirname;
const handlers = glob
  .sync(`handlers/*`, { cwd, absolute: true })
  .map((handlerPath) => require(handlerPath).default);

cleanup();

MITMProxy.Create(R.pipeP(...handlers), [], true, false)
  .then(() => {
    console.log('start listening...');
  })
  .catch(console.log);

process.once('SIGINT', cleanup);
process.once('SIGUSR2', cleanup);
