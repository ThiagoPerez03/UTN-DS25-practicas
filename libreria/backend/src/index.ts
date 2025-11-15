require('dotenv').config();
const express = require('express');
const cors = require('cors');
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');

const app = express();

// Configurar CORS
const allowedOrigins = process.env.CORS_ORIGIN 
  ? [process.env.CORS_ORIGIN] 
  : ['*'];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins[0] === '*' || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/books', booksRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
});
