import fs from 'fs';
import path from 'path';

import shouldHandleRequest from './shouldHandleRequest';

const fn = async (interceptedMsg) => {
  if (shouldHandleRequest(interceptedMsg)) {
    const data = fs.readFileSync(path.resolve(__dirname, 'portal_main.js'));
    interceptedMsg.setResponseBody(data);
  }
  return interceptedMsg;
};

export default fn;
