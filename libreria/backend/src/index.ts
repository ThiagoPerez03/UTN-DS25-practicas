require('dotenv').config();
const express = require('express');
const cors = require('cors');
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');

const app = express();

// Configurar CORS - simplificado
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

app.use('/books', booksRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red (necesario para Railway)

app.listen(PORT, HOST, () => {
  console.log(`Backend API listening on http://${HOST}:${PORT}`);
  console.log(`CORS enabled for: ${process.env.CORS_ORIGIN || '*'}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

