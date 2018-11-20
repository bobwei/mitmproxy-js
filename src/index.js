/* eslint-disable import/no-extraneous-dependencies */

import MITMProxy from 'mitmproxy';
import * as R from 'ramda';

import cleanup from 'src/utils/functions/cleanup';

const handlers = R.pipeP(
  require('src/handlers/google-analytics').default,
  require('src/handlers/inject-scripts').default,
  require('src/handlers/modify-js').default,
);

cleanup();

MITMProxy.Create(
  handlers,
  [] /* list of paths to directly intercept -- don't send to server */,
  true /* Be quiet; turn off for debug messages */,
  false /* Only intercept text or potentially-text requests (all mime types with *application* and *text* in them, plus responses with no mime type) */,
)
  .then(() => {
    console.log('start listening...');
  })
  .catch(console.log);

process.once('SIGINT', cleanup);
process.once('SIGUSR2', cleanup);
