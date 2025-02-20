import React, { useRef, useEffect, useImperativeHandle } from 'react';

const Canvas = React.forwardRef(({ color, tool }, ref) => {
    const canvasRef = useRef(null);
    let isDrawing = false;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set drawing properties
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;

        // Clear and set white background
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        function startDrawing(event) {
            isDrawing = true;
            draw(event);
        }

        function stopDrawing() {
            isDrawing = false;
            context.beginPath();
        }

        function draw(event) {
            if (!isDrawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            context.strokeStyle = tool === 'eraser' ? 'white' : color;
            context.lineWidth = tool === 'eraser' ? 20 : 5;

            context.lineTo(x, y);
            context.stroke();
            context.beginPath();
            context.moveTo(x, y);
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mousemove', draw);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mousemove', draw);
        };
    }, [color, tool]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      };

    // Function to extract only the drawing part (ignoring borders)
    useImperativeHandle(ref, () => ({
        getImageDataUrl: () => {
            const canvas = canvasRef.current;
            return canvas.toDataURL('image/png'); // Extracts only the drawing
        },
        clearCanvas,
    }));

    return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black', background: 'white' }} />;
});

export default Canvas;
