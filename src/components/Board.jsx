import React from 'react';
import { Paper, Typography } from '@mui/material';
import '../assets/Board.css';

const Board = ({ board }) => {
    let currentX = 0;

    return (
        <Paper elevation={3} className="board-container">
            <Typography variant="h6">
                {board.length} x {board.width}
            </Typography>

            <div className="board" style={{ width: board.length * 10, height: board.width * 10 }}>
                {board.cuts.map((cut, index) => {
                    const cutStyle = {
                        left: currentX,
                        width: cut.length * 10, 
                        height: cut.width * 10,
                        // background: 'linear-gradient(to right, white, lightcoral)'
                    };
                    currentX += cut.length * 10;
                    return (
                        <div key={index} className="cut" style={cutStyle}>
                            <div className="cut-label">{cut.length}</div>
                            <div className="cut-width-label">{cut.width}</div>
                        </div>
                    );
                })}
            </div>
            
            <Typography variant="caption">
                Leftover: {board.leftover} units
            </Typography>
        </Paper>
    );
};

export default Board;
