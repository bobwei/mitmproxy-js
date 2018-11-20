import shouldHandleRequest from './shouldHandleRequest';

const fn = async (interceptedMsg) => {
  if (shouldHandleRequest(interceptedMsg)) {
    // console.log(interceptedMsg.request.url.pathname);
  }
  return interceptedMsg;
};

export default fn;
