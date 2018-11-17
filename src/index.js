/* eslint-disable import/no-extraneous-dependencies */

import MITMProxy from 'mitmproxy';
import * as R from 'ramda';

import cleanup from 'src/utils/functions/cleanup';

// prettier-ignore
const interceptors = R.pipeP(
  require('src/google-analytics').default,
  require('src/inject-scripts').default,
  require('src/inject-scripts/modifyJs').default,
);

cleanup();

MITMProxy.Create(
  interceptors,
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
