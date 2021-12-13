/* eslint-disable @typescript-eslint/method-signature-style */
import { HttpRequest, HttpResponse } from './http';

export interface Contoller {
  handle(httpRequest: HttpRequest): HttpResponse;
}
