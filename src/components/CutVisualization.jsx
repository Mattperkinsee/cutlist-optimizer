/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';

const CutVisualization = ({ optimized }) => {
  const canvasRef = useRef(null);
    let data = optimized
    useEffect(() => {
      console.log('data ', data)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Determine the number of boards used
    const uniqueBoards = [...new Set(data.cutsDetails.map((cut) => cut.boardLength))];

    // Set the canvas height based on the number of boards
    canvas.height = uniqueBoards.length * 20; // 20 pixels per board

    // Define a scale factor to fit the canvas size
    const scale = 10;

    // Loop through each unique board
    uniqueBoards.forEach((boardLength, boardIndex) => {
      // Filter the cuts made from this board
      const cutsFromBoard = data.cutsDetails.filter((cut) => cut.boardLength === boardLength);

      // Loop through the cuts and draw them
      cutsFromBoard.forEach((cut, cutIndex) => {
        ctx.fillStyle = cutIndex % 2 === 0 ? 'blue' : 'green'; // Alternate colors
        ctx.fillRect(cut.cutPosition * scale, boardIndex * 20, cut.cutLength * scale, 20);
      });

      // Draw the leftover
      ctx.fillStyle = 'red';
      const lastCut = cutsFromBoard[cutsFromBoard.length - 1];
      const leftoverStart = lastCut.cutPosition + parseInt(lastCut.cutLength);
      ctx.fillRect(leftoverStart * scale, boardIndex * 20, lastCut.leftover * scale, 20);
    });
  }, [data]);

  return (
    <canvas ref={canvasRef} width="960" />
  );
};

export default CutVisualization;
