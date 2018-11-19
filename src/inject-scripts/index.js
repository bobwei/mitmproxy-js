import * as R from 'ramda';
import cheerio from 'cheerio';

const fn = async (interceptedMsg) => {
  const shouldHandleRequest = R.pipe(
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
  )(interceptedMsg);
  if (shouldHandleRequest) {
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