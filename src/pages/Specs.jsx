import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import CutsInventoryForm from "../components/CutsInventoryForm";
import Board from "../components/Board";

const Specs = () => {
  const [cuts, setCuts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [cut, setCut] = useState({ length: "", width: "", quantity: "" });
  const [item, setItem] = useState({ length: "", width: "", quantity: "" });
  const [optimized, setOptimized] = useState({});
  const [boardSummary, setBoardSummary] = useState();

  let savedCuts, savedInventory;
  useEffect(() => {
    savedCuts = localStorage.getItem("cuts");
    savedInventory = localStorage.getItem("inventory");

    if (savedCuts) {
      console.log("saved cuts set", savedCuts);
      setCuts(JSON.parse(savedCuts));
    }

    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  }, []);

  useEffect(() => {
    if (savedCuts) return;
    localStorage.setItem("cuts", JSON.stringify(cuts));
    if (savedInventory) return;
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [cuts, inventory]);

  // Initialize boards from the inventory.
  function initializeBoards(inventory) {
    let boards = [];
    for (let item of inventory) {
      for (let i = 0; i < item.quantity; i++) {
        boards.push({
          length: Number(item.length),
          width: Number(item.width),
          cuts: [],
          leftoverLength: Number(item.length),
          leftoverWidth: Number(item.width),
        });
      }
    }
    return boards;
  }

  function sortCutsByHeight(cuts) {
    return cuts.slice().sort((a, b) => b.length - a.length);
  }

  function shelfAlgorithm(boards, cuts) {
    const sortedCuts = sortCutsByHeight(cuts);
    let remainingHeight = boards[0].length;
    let currentPosition = 0;

    for (let cutItem of sortedCuts) {
      for (let i = 0; i < cutItem.quantity; i++) {
        if (
          cutItem.length <= remainingHeight &&
          currentPosition + cutItem.width <= boards[0].width
        ) {
          // Place on the current shelf
          const board = boards[boards.length - 1];
          board.cuts.push({
            length: cutItem.length,
            width: cutItem.width,
            fromBoard: boards.length - 1,
          });
          currentPosition += cutItem.width;
        } else if (cutItem.length <= remainingHeight) {
          // Start a new shelf in the same board
          currentPosition = cutItem.width;
          const board = boards[boards.length - 1];
          board.cuts.push({
            length: cutItem.length,
            width: cutItem.width,
            fromBoard: boards.length - 1,
          });
        } else {
          // Start a new board and place the cut there
          const newBoard = {
            length: boards[0].length,
            width: boards[0].width,
            cuts: [
              {
                length: cutItem.length,
                width: cutItem.width,
                fromBoard: boards.length,
              },
            ],
            leftover: boards[0].length - cutItem.length,
          };
          boards.push(newBoard);
          remainingHeight = newBoard.leftover;
          currentPosition = cutItem.width;
        }
      }
    }
  }

  function processCuts(data) {
    let boards = initializeBoards(data.inventory);
    shelfAlgorithm(boards, data.cuts);
    return boards;
  }

  // function placeCutsOnBoards(boards, cuts) {
  //   for (let cutItem of cuts) {
  //     for (let i = 0; i < cutItem.quantity; i++) {
  //       // Try placing this cut on a board
  //       for (let board of boards) {
  //         if (
  //           board.width >= cutItem.width &&
  //           board.leftover >= cutItem.length
  //         ) {
  //           board.cuts.push({
  //             length: cutItem.length,
  //             width: cutItem.width,
  //             fromBoard: boards.indexOf(board),
  //           });
  //           board.leftover -= cutItem.length;
  //           break; // break as this cut piece is now placed
  //         }
  //       }
  //     }
  //   }
  // }

  // function processCuts(data) {
  //   let boards = initializeBoards(data.inventory);
  //   placeCutsOnBoards(boards, data.cuts);
  //   return boards;
  // }

  function getBoardSummary(boards) {
    const boardMap = {};

    // Step 1: Separate the data into unique board types
    boards.forEach((board, index) => {
      const key = `${board.length}x${board.width}`;
      if (!boardMap[key]) {
        boardMap[key] = {
          totalBoards: 0,
          totalArea: 0,
          usedArea: 0,
          uniqueBoardIndices: new Set(),
        };
      }

      if (!boardMap[key].uniqueBoardIndices.has(board.fromBoard)) {
        boardMap[key].uniqueBoardIndices.add(index);
        boardMap[key].totalBoards++;
        boardMap[key].totalArea += board.length * board.width;
      }

      board.cuts.forEach((cut) => {
        boardMap[key].usedArea += cut.length * cut.width;
      });
    });

    const summary = {};

    // Step 2 and 3: Calculate waste and waste percentage
    for (const key in boardMap) {
      const boardData = boardMap[key];
      let waste = 0;
      let wastePercentage = 0;

      if (boardData.totalArea > 0) {
        waste = boardData.totalArea - boardData.usedArea;
        wastePercentage = (waste / boardData.totalArea) * 100;
      }

      summary[key] = {
        count: boardData.totalBoards,
        totalArea: boardData.totalArea,
        usedArea: boardData.usedArea,
        wastePercentage: Number(wastePercentage),
      };
    }

    return summary;
  }

  return (
    <>
      <Grid container spacing={1} sx={{ marginTop: "10px" }}>
        <Grid item xs={3}>
          <Box>
            <CutsInventoryForm
              inventory={inventory}
              setInventory={setInventory}
              item={item}
              setItem={setItem}
              cut={cut}
              setCut={setCut}
              cuts={cuts}
              setCuts={setCuts}
              setOptimized={setOptimized}
              setBoardSummary={setBoardSummary}
              processCuts={processCuts}
              getBoardSummary={getBoardSummary}
            />
          </Box>
        </Grid>

        {Object.keys(optimized).length && (
          <>
            <Grid item xs={1}>
              <Paper elevation={3} style={{ padding: "15px", margin: "5px" }}>
                <strong>Cuts:</strong> {optimized.actualCuts}
              </Paper>
              <Paper elevation={3} style={{ padding: "15px", margin: "5px" }}>
                <strong>Total Boards Used:</strong>{" "}
                {optimized.length ? optimized.length : ""}
              </Paper>
            </Grid>
            {boardSummary && (
              <Grid item xs={7}>
                <Paper elevation={3} style={{ padding: "15px" }}>
                  <Typography variant="h5" gutterBottom>
                    Boards Summary:
                  </Typography>

                  {Object.entries(boardSummary).map(([key, data]) => (
                    <div
                      key={key}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography variant="body1">
                        x{data.count} - <strong>{key}</strong> board(s).
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginLeft: "10px" }}
                      >
                        Waste: {data.wastePercentage.toFixed(2)}%
                      </Typography>
                    </div>
                  ))}
                </Paper>
                {optimized.map((board, idx) => (
                  <Grid item key={idx}>
                    <Board board={board} />
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid container spacing={3}></Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Specs;
