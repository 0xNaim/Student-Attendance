const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(
  path.resolve('logs', 'access.log'),
  {
    flags: 'a',
  }
);

const userMorgan = (app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(morgan(prodFormate, { stream: accessLogStream }));
  } else {
    app.use(
      morgan('dev', {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
        stream: process.stderr,
      })
    );

    app.use(
      morgan('dev', {
        skip: (req, res) => {
          return res.statusCode >= 400;
        },
        stream: process.stdout,
      })
    );
  }
};

const prodFormate = (tokens, req, res) => {
  return JSON.stringify({
    method: tokens['method'](req, res),
    url: tokens['url'](req, res),
    'status-code': tokens['status'](req, res),
    'content-length': tokens['res'](req, res, 'content-length'),
    'user-agent': tokens['user-agent'](req, res),
    'response-time': tokens['response-time'](req, res),
  });
};

module.exports = userMorgan;
