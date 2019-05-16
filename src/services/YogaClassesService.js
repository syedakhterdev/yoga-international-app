import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.endpoint;

// get all yoga classes
export function getYogaClasses() {
  return http.get(apiEndpoint);
}
