import { IncomingHttpHeaders } from 'node:http';

export interface GraphqlContext{
  headers: IncomingHttpHeaders;
}