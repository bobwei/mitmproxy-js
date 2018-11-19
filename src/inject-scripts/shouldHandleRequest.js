import * as R from 'ramda';

const fn = R.pipe(
  R.path(['request', 'url']),
  R.allPass([
    R.pipe(
      R.prop('host'),
      R.match(/today\.line.*\.me/),
    ),
    R.pipe(
      R.prop('pathname'),
      R.anyPass([R.equals('/tw'), R.equals('/tw/main')]),
    ),
  ]),
);

export default fn;
