
/*
 * SCANALYZE BACKEND (Express / Node.js)
 * Note: This code is for illustrative purposes as part of the full-stack architecture.
 */

import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'user' }
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.status(201).json({ user, token });
  } catch (e) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// SCAN UPLOAD & PROCESSING
app.post('/api/scan/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No file uploaded');

  // Logic to send file to Python OCR service
  // axios.post('http://ocr-service:5000/process', ...)
  
  res.json({ message: 'Upload successful, processing started' });
});

// ANALYSIS HISTORY
app.get('/api/history', async (req, res) => {
  const scans = await prisma.document.findMany({
    where: { userId: (req as any).user.id },
    include: { analysis: true }
  });
  res.json(scans);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
