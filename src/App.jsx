import React, { useState, useRef } from 'react';
import './App.css';
import Canvas from './Canvas';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [color, setColor] = useState('black');
  const [tool, setTool] = useState('pen');
  const [description, setDescription] = useState('');
  const canvasRef = useRef(null);

  const genAI = new GoogleGenerativeAI('AIzaSyC5vcSOFPDEf2cKemWzWAn83x56Nx0IjjA'); // Replace with your actual API key

  const handleDescribeImage1 = async () => {
    try {
      // Get the image data URL from the canvas
      const imageDataUrl = canvasRef.current.getImageDataUrl();
      console.log("Image Data URL:", imageDataUrl); // Debugging

      // Extract base64 data from the data URL
      const base64Data = imageDataUrl.split(',')[1];
      if (!base64Data) {
        throw new Error("Failed to extract base64 data from the image.");
      }

      // Prepare the image for the Gemini API
      const image = {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      };

      // Initialize the Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Ensure correct model name
      const prompt1 = "Describe this rough drawing in a single line. dont mention what kind of drawing it is, Just say what it is..";
      
      // Send the request to the Gemini API
      const result = await model.generateContent([prompt1, image]);
      const response = await result.response;
      const text = response.text(); // Use .text() to get the description
      setDescription(text);
    } catch (error) {
      console.error("Error describing image:", error);
      setDescription("Failed to describe the image. Check the console for details.");
    }
  };

  const handleDescribeImage2 = async () => {
    try {
      // Get the image data URL from the canvas
      const imageDataUrl = canvasRef.current.getImageDataUrl();
      console.log("Image Data URL:", imageDataUrl); // Debugging

      // Extract base64 data from the data URL
      const base64Data = imageDataUrl.split(',')[1];
      if (!base64Data) {
        throw new Error("Failed to extract base64 data from the image.");
      }

      // Prepare the image for the Gemini API
      const image = {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      };

      // Initialize the Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Ensure correct model name
      const prompt2 = "Understad the problem and solve it. dont respond in markdown. Write the equation in plain text with actual numbers instead of formatting..";
      
      // Send the request to the Gemini API
      const result = await model.generateContent([prompt2, image]);
      const response = await result.response;
      const text = response.text(); // Use .text() to get the description
      setDescription(text);
    } catch (error) {
      console.error("Error describing image:", error);
      setDescription("Failed to describe the image. Check the console for details.");
    }
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas(); // Call the clearCanvas method
    }
  };

  return (
    <div className="App">
      <h1>Drawing Guesser Application</h1>
      <h3>Put your imagination in the form of a Drawing, and Leave it for me to Guess.</h3>
      <div>
        <button
          onClick={() => setColor('black')}
          className={color === 'black' ? 'selected-button' : ''}
        >
          Black
        </button>
        <button
          onClick={() => setColor('red')}
          className={color === 'red' ? 'selected-button' : ''}
        >
          Red
        </button>
        <button
          onClick={() => setColor('blue')}
          className={color === 'blue' ? 'selected-button' : ''}
        >
          Blue
        </button>
        <button
          onClick={() => setColor('yellow')}
          className={color === 'yellow' ? 'selected-button' : ''}
        >
          Yellow
        </button>
        <button
          onClick={() => setColor('orange')}
          className={color === 'orange' ? 'selected-button' : ''}
        >
          Orange
        </button>
        <button
          onClick={() => setColor('purple')}
          className={color === 'purple' ? 'selected-button' : ''}
        >
          Purple
        </button>

        <button
          onClick={() => setColor('green')}
          className={color === 'green' ? 'selected-button' : ''}
        >
          
          Green
        </button>
      </div>
      <div>
        <button
          onClick={() => setTool('pen')}
          className={tool === 'pen' ? 'selected-button' : ''}
        >
          Pen
        </button>
        <button
          onClick={() => setTool('eraser')}
          className={tool === 'eraser' ? 'selected-button' : ''}
        >
          Eraser
        </button>
        <button
          onClick={handleClearCanvas}
          className="clear-button"
        >
          Clear Canvas
        </button>
      </div>
      <Canvas ref={canvasRef} color={color} tool={tool} />
      <div style={{ color:'yellow', marginTop: '20px' }}>
        <button onClick={handleDescribeImage1}>Describe Image</button>
      </div>
      <div style={{ color:'yellow', marginTop: '20px'}}>
        <button onClick={handleDescribeImage2}>Solve</button>
      </div>
      {description && <p className="Desc">{description}</p>}
    </div>
  );
}

export default App;