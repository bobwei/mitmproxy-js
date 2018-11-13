/* eslint-disable import/no-extraneous-dependencies */

import MITMProxy from 'mitmproxy';
import * as R from 'ramda';
import querystring from 'query-string';

import isGARequest from 'src/google-analytics/functions/isGARequest';
import cleanup from 'src/utils/functions/cleanup';

const interceptor = (interceptedMsg) => {
  if (isGARequest(interceptedMsg)) {
    const { request } = interceptedMsg;
    const targetFields = [
      'ec',
      'ea',
      'el',
      ...R.range(1, 51).map((i) => `cd${i}`),
    ];
    const result = R.pipe(
      R.path(['url', 'search']),
      querystring.parse,
      R.pick(targetFields),
    )(request);
    console.log(result);
    console.log(new Date().toISOString());
    console.log('----');
  }
};

cleanup();

MITMProxy.Create(
  interceptor,
  [] /* list of paths to directly intercept -- don't send to server */,
  true /* Be quiet; turn off for debug messages */,
  false /* Only intercept text or potentially-text requests (all mime types with *application* and *text* in them, plus responses with no mime type) */,
);

process.once('SIGINT', cleanup);
process.once('SIGUSR2', cleanup);
