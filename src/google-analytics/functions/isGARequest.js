import * as R from 'ramda';

const fn = R.pathEq(['request', 'url', 'pathname'], '/collect');

export default fn;
