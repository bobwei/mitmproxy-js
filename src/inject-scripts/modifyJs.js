import fs from 'fs';
import path from 'path';
import * as R from 'ramda';

const fn = async (interceptedMsg) => {
  const shouldHandleRequest = R.pipe(
    R.path(['request', 'url']),
    R.allPass([
      R.propEq('host', 'today.line-scdn.net'),
      R.propEq('pathname', '/dist/portal_main.js'),
    ]),
  )(interceptedMsg);
  if (shouldHandleRequest) {
    const data = fs.readFileSync(path.resolve(__dirname, 'portal_main.js'));
    interceptedMsg.setResponseBody(data);
  }
  return interceptedMsg;
};

export default fn;
