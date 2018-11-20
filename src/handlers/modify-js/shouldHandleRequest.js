import * as R from 'ramda';

const fn = R.pipe(
  R.path(['request', 'url']),
  R.allPass([
    R.propEq('host', 'today.line-scdn.net'),
    R.propEq('pathname', '/dist/portal_main.js'),
  ]),
);

export default fn;
