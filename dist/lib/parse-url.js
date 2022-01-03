"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseUrl;
exports.absoluteUrl = void 0;

function parseUrl(url) {
  const defaultHost = 'http://localhost:3000';
  const defaultPath = '/api/auth';

  if (!url) {
    url = `${defaultHost}${defaultPath}`;
  }

  const protocol = url.startsWith('http:') ? 'http' : 'https';
  url = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const [_host, ..._path] = url.split('/');
  const baseUrl = _host ? `${protocol}://${_host}` : defaultHost;
  const basePath = _path.length > 0 ? `/${_path.join('/')}` : defaultPath;
  return {
    baseUrl,
    basePath
  };
}

const absoluteUrl = req => {
  var protocol = "https:";
  var host = req ? req.headers["x-forwarded-host"] || req.headers["host"] : window.location.host;

  if (host.indexOf("localhost") > -1 || host.indexOf(".local") > -1) {
    protocol = "http:";
  }

  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host
  };
};

exports.absoluteUrl = absoluteUrl;