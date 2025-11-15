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

app.use('/books', booksRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
  console.log(`CORS enabled for: ${process.env.CORS_ORIGIN || '*'}`);
});

