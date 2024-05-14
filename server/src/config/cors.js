module.exports = Object.freeze({
  credentials: true,
  maxAge: 60 * 60 * 24,
  exposedHeaders: [
    'Cache-Control',
    'Content-Language',
    'Content-Type',
    'Expires',
    'Last-Modified',
    'Pragma'
  ],
  allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200
});
