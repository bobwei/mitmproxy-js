import * as R from 'ramda';
import querystring from 'query-string';

import shouldHandleRequest from './shouldHandleRequest';

const fn = async (interceptedMsg) => {
  if (shouldHandleRequest(interceptedMsg)) {
    const { request } = interceptedMsg;
    const targetFields = [
      'ec',
      'ea',
      'el',
      'dp',
      'dt',
      't',
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
  return interceptedMsg;
};

export default fn;
