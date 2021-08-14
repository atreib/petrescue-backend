import { IHttpResponse } from "../protocols"

const ok = (body: any) => {
  return {
    statusCode: 200,
    body,
  } as IHttpResponse;
}

export {
  ok,
}
