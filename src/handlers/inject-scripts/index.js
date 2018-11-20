import cheerio from 'cheerio';

import shouldHandleRequest from './shouldHandleRequest';

const fn = async (interceptedMsg) => {
  if (shouldHandleRequest(interceptedMsg)) {
    const $ = cheerio.load(interceptedMsg.responseBody.toString());
    $('script').eq(5).before(`
      <script>
        console.log("I'm injected from <script />");
      </script>
    `);
    interceptedMsg.setResponseBody(Buffer.from($.html()));
  }
  return interceptedMsg;
};

export default fn;
