const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createCanvas, loadImage } = require('canvas');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// In-memory canvas storage (intentional for assignment scope)
const canvases = {};

/*
   HEALTH CHECK
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/* 
   INIT CANVAS
*/
app.post('/api/canvas/init', (req, res) => {
  try {
    const { width, height } = req.body;

    if (
      typeof width !== 'number' ||
      typeof height !== 'number' ||
      width <= 0 ||
      height <= 0 ||
      width > 5000 ||
      height > 5000
    ) {
      return res.status(400).json({ error: 'Invalid canvas dimensions' });
    }

    const id = uuidv4();
    const canvas = createCanvas(width, height);

    canvases[id] = {
      canvas,
      width,
      height
    };

    res.status(200).json({
      id,
      message: 'Canvas initialized'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to initialize canvas' });
  }
});

/* 
   ADD RECTANGLE
 */
app.post('/api/canvas/:id/add/rectangle', (req, res) => {
  const { id } = req.params;
  const { x, y, width, height, color, isFilled } = req.body;

  if (!canvases[id]) {
    return res.status(404).json({ error: 'Canvas not found' });
  }

  if (
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    typeof width !== 'number' ||
    typeof height !== 'number' ||
    width <= 0 ||
    height <= 0
  ) {
    return res.status(400).json({ error: 'Invalid rectangle data' });
  }

  const ctx = canvases[id].canvas.getContext('2d');
  ctx.fillStyle = color || '#000000';
  ctx.strokeStyle = color || '#000000';

  if (isFilled === false) {
    ctx.strokeRect(x, y, width, height);
  } else {
    ctx.fillRect(x, y, width, height);
  }

  res.status(200).json({ message: 'Rectangle added' });
});

/* 
   ADD CIRCLE
*/
app.post('/api/canvas/:id/add/circle', (req, res) => {
  const { id } = req.params;
  const { x, y, radius, color, isFilled } = req.body;

  if (!canvases[id]) {
    return res.status(404).json({ error: 'Canvas not found' });
  }

  if (
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    typeof radius !== 'number' ||
    radius <= 0
  ) {
    return res.status(400).json({ error: 'Invalid circle data' });
  }

  const ctx = canvases[id].canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color || '#000000';
  ctx.strokeStyle = color || '#000000';

  if (isFilled === false) {
    ctx.stroke();
  } else {
    ctx.fill();
  }

  res.status(200).json({ message: 'Circle added' });
});

/* 
   ADD TEXT
 */
app.post('/api/canvas/:id/add/text', (req, res) => {
  const { id } = req.params;
  const { text, x, y, fontSize, fontFamily, color, align } = req.body;

  if (!canvases[id]) {
    return res.status(404).json({ error: 'Canvas not found' });
  }

  if (
    typeof text !== 'string' ||
    typeof x !== 'number' ||
    typeof y !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid text data' });
  }

  const ctx = canvases[id].canvas.getContext('2d');
  ctx.font = `${fontSize || 16}px ${fontFamily || 'Arial'}`;
  ctx.fillStyle = color || '#000000';
  ctx.textAlign = align || 'left';
  ctx.fillText(text, x, y);

  res.status(200).json({ message: 'Text added' });
});

/* 
   ADD IMAGE (URL)
 */
app.post('/api/canvas/:id/add/image', async (req, res) => {
  const { id } = req.params;
  const { url, x, y, width, height } = req.body;

  if (!canvases[id]) {
    return res.status(404).json({ error: 'Canvas not found' });
  }

  if (typeof url !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
    return res.status(400).json({ error: 'Invalid image data' });
  }

  try {
    const img = await loadImage(url);
    const ctx = canvases[id].canvas.getContext('2d');

    ctx.drawImage(
      img,
      x,
      y,
      width || img.width,
      height || img.height
    );

    res.status(200).json({ message: 'Image added' });
  } catch (err) {
    res.status(500).json({ error: 'Image loading failed' });
  }
});

/* =============================
   EXPORT PDF
============================= */
app.get('/api/canvas/:id/export/pdf', (req, res) => {
  const { id } = req.params;

  if (!canvases[id]) {
    return res.status(404).json({ error: 'Canvas not found' });
  }

  const { canvas, width, height } = canvases[id];
  const buffer = canvas.toBuffer('image/png');

  const doc = new PDFDocument({
    size: [width, height],
    compress: true
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=canvas.pdf');

  doc.pipe(res);
  doc.image(buffer, 0, 0, { width, height });
  doc.end();

  delete canvases[id];
});

/* 
   START SERVER
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
