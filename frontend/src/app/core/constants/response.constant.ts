import { environment } from './../../../environments/environment';

export const APP_URL = environment.url;
export const WS_URL = environment.urlWs;

export const CONSTANT_URL = {
  baseUrl: APP_URL,
  baseUrlAuth: APP_URL + 'login/'
};
