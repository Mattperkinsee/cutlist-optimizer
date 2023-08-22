import React, { useRef, useEffect } from 'react';

const CutVisualization = ({ cutsDetails }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Constants for better readability
    const yOffsetBase = 60;
    const scale = 10;
    const rectHeight = 30;
    const textOffsetY = -15;

    cutsDetails.forEach((cut) => {
      const yOffset = cut.boardIndex * yOffsetBase;

      // Draw the board
      ctx.fillStyle = '#EEEEEE'; // Light Grey
      ctx.fillRect(0, yOffset, cut.boardLength * scale, rectHeight);

      // Draw the cut
      ctx.fillStyle = '#64B5F6'; // Material Design Blue 500
      const cutX = cut.boardIndex === 0 ? cut.cutPosition * scale : (cut.cutPosition - cut.boardLength) * scale;
      ctx.fillRect(
        cutX,
        yOffset + (rectHeight - cut.cutWidth * scale) / 2,
        cut.cutLength * scale,
        cut.cutWidth * scale
      );

      // Add text labels for cuts and leftovers
      ctx.fillStyle = '#424242'; // Material Design Grey 800
      ctx.font = '14px Roboto, sans-serif';
      ctx.fillText(
        `Cut: ${cut.cutLength}`,
        cutX,
        yOffset + textOffsetY + rectHeight
      );
      ctx.fillText(
        `Leftover: ${cut.leftover}`,
        (cutX + cut.cutLength * scale),
        yOffset + textOffsetY + rectHeight
      );
    });
  }, [cutsDetails]);

  return (
    <canvas
      ref={canvasRef}
      width={960}
      style={{
        border: '1px solid #E0E0E0', // Material Design Grey 300
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Material Design shadow
      }}
    />
  );
};

export default CutVisualization;
