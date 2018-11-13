/* eslint-disable import/no-extraneous-dependencies */

import MITMProxy from 'mitmproxy';
import * as R from 'ramda';
import querystring from 'query-string';

import isGARequest from 'src/google-analytics/functions/isGARequest';
import cleanup from 'src/utils/functions/cleanup';

const interceptor = (interceptedMsg) => {
  if (isGARequest(interceptedMsg)) {
    const { request } = interceptedMsg;
    const result = R.pipe(
      R.path(['url', 'search']),
      querystring.parse,
    )(request);
    console.log(result);
  }
};

cleanup();

MITMProxy.Create(
  interceptor,
  [] /* list of paths to directly intercept -- don't send to server */,
  true /* Be quiet; turn off for debug messages */,
  true /* Only intercept text or potentially-text requests (all mime types with *application* and *text* in them, plus responses with no mime type) */,
);

process.once('SIGINT', cleanup);
process.once('SIGUSR2', cleanup);
