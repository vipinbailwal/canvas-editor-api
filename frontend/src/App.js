import React, { useRef, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

function App() {
  const canvasRef = useRef(null);
  const [canvasId, setCanvasId] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 600
  });

  const initCanvas = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/canvas/init`,
        dimensions
      );

      setCanvasId(res.data.id);

      const canvas = canvasRef.current;
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    } catch (err) {
      alert('Invalid canvas dimensions');
    }
  };

  const addRectangle = async () => {
    if (!canvasId) return alert('Init canvas first');

    await axios.post(
      `${API_BASE}/api/canvas/${canvasId}/add/rectangle`,
      {
        x: 50,
        y: 50,
        width: 200,
        height: 100,
        color: '#4CAF50',
        isFilled: true
      }
    );

    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(50, 50, 200, 100);
  };

  const addCircle = async () => {
    if (!canvasId) return alert('Init canvas first');

    await axios.post(
      `${API_BASE}/api/canvas/${canvasId}/add/circle`,
      {
        x: 350,
        y: 150,
        radius: 50,
        color: '#2196F3',
        isFilled: true
      }
    );

    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(350, 150, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#2196F3';
    ctx.fill();
  };

  const addText = async () => {
    if (!canvasId) return alert('Init canvas first');

    await axios.post(
      `${API_BASE}/api/canvas/${canvasId}/add/text`,
      {
        text: 'Rocketium Assignment',
        x: 60,
        y: 230,
        fontSize: 18,
        color: '#000000'
      }
    );

    const ctx = canvasRef.current.getContext('2d');
    ctx.font = '18px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText('Rocketium Assignment', 60, 230);
  };

  const exportPdf = () => {
    if (!canvasId) return alert('Init canvas first');

    window.open(
      `${API_BASE}/api/canvas/${canvasId}/export/pdf`,
      '_blank'
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Canvas Builder</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          type="number"
          placeholder="Width"
          value={dimensions.width}
          onChange={e =>
            setDimensions({
              ...dimensions,
              width: Number(e.target.value)
            })
          }
        />
        <input
          type="number"
          placeholder="Height"
          value={dimensions.height}
          onChange={e =>
            setDimensions({
              ...dimensions,
              height: Number(e.target.value)
            })
          }
          style={{ marginLeft: 10 }}
        />
        <button onClick={initCanvas} style={{ marginLeft: 10 }}>
          Init Canvas
        </button>
      </div>

      <button onClick={addRectangle}>Add Rectangle</button>
      <button onClick={addCircle} style={{ marginLeft: 10 }}>
        Add Circle
      </button>
      <button onClick={addText} style={{ marginLeft: 10 }}>
        Add Text
      </button>
      <button onClick={exportPdf} style={{ marginLeft: 10 }}>
        Export PDF
      </button>

      <div style={{ marginTop: 20 }}>
        <canvas
          ref={canvasRef}
          style={{ border: '1px solid #333' }}
        />
      </div>
    </div>
  );
}

export default App;
