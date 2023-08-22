import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Button,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CutVisualization from "../components/CutVisualization";
import CutsInventoryForm from "../components/CutsInventoryForm";

const Specs = () => {
  const [cuts, setCuts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [cut, setCut] = useState({ length: "", width: "", quantity: "" });
  const [item, setItem] = useState({ length: "", width: "", quantity: "" });
  const [optimized, setOptimized] = useState({});

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
    console.log("set cuts and inventory");
    if (savedCuts) return;
    localStorage.setItem("cuts", JSON.stringify(cuts));
    if (savedInventory) return;
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [cuts, inventory]);

  const handleInputChange = (setField, e) => {
    const { name, value } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (setField, item, list, setList) => {
    setList([...list, item]);
    setField({ length: "", width: "", quantity: "" });
  };

  const handleSubmit = async () => {
    // Prepare the data in the desired format
    const data = {
      cuts: cuts,
      inventory: inventory,
    };

    // Here you can handle the data as you need, whether it's sending it to a server or other logic
    console.log("Submitted Data:", JSON.stringify(data));
    console.log("data", data);
    const result = await calculateBoardsNeeded(data.cuts, data.inventory);

    console.log("result", result);
    // drawCuts(result);
    setOptimized(result);
    console.log("optimized", result);
  };

  const handleDelete = (index, list, setList) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleEdit = (index, name, value, list, setList) => {
    const newList = [...list];
    newList[index][name] = value;
    setList(newList);
  };

  const calculateBoardsNeeded = (cuts, inventory) => {
    const result = {
      totalCutsMade: 0,
      totalBoardsUsed: 0,
      cutsDetails: [],
    };

    // Clone the inventory so we can modify it without affecting the original
    const remainingInventory = [...inventory];

    // Iterate through the cuts
    for (const cut of cuts) {
      let remainingCuts = cut.quantity;

      // Iterate through the remaining inventory
      for (let i = 0; i < remainingInventory.length && remainingCuts > 0; i++) {
        const board = remainingInventory[i];

        // Check if the cut can be made from this board
        if (
          board.length >= cut.length &&
          board.width === cut.width &&
          board.quantity > 0
        ) {
          // Number of cuts that can be made from this board
          const cutsFromBoard = Math.min(
            Math.floor(board.length / cut.length),
            remainingCuts
          );

          // Length of the leftover
          const leftoverLength = board.length - cutsFromBoard * cut.length;

          // Record the cuts
          for (let j = 0; j < cutsFromBoard; j++) {
            result.cutsDetails.push({
              cutLength: cut.length,
              cutWidth: cut.width,
              boardLength: board.length,
              boardWidth: board.width,
              leftover: leftoverLength,
              cutPosition: j * cut.length,
            });
          }

          // Update the total cuts made and total boards used
          result.totalCutsMade += cutsFromBoard;
          result.totalBoardsUsed += cutsFromBoard > 0 ? 1 : 0;

          // Update the remaining cuts
          remainingCuts -= cutsFromBoard;

          // Update the remaining board quantity
          board.quantity -= 1;
        }
      }

      if (remainingCuts > 0) {
        console.warn(
          `Not enough boards to make all cuts of length ${cut.length} and width ${cut.width}`
        );
      }
    }

    return result;
  };

  return (
    <>
      <Container>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minHeight: "90vh",
            textAlign: "center",
          }}
        >
          <Box sx={{ marginTop: "20px" }}>
            <ArrowCircleRightIcon
              sx={{ opacity: 0 }}
              color="primary"
              fontSize="large"
            />
            {/* <h1>Inventory/Specs</h1> */}
            <CutsInventoryForm
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleInputChange={handleInputChange}
              inventory={inventory}
              setInventory={setInventory}
              item={item}
              setItem={setItem}
              cut={cut}
              setCut={setCut}
              cuts={cuts}
              setCuts={setCuts}
              
            />

            <Divider sx={{ margin: "30px" }} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Optimize
            </Button>
          </Box>
        </Box>
        {Object.keys(optimized).length && (
          <>
            {/* <Grid item xs={8}></Grid> */}
            <Divider sx={{ margin: "30px" }} />
            {/* <strong>Details</strong> {JSON.stringify(optimized.details)} */}
            <Divider sx={{ margin: "30px" }} />
            <strong>Cuts</strong> {optimized.totalCutsMade}
            <Divider sx={{ margin: "30px" }} />
            <strong>Boards Used</strong>{" "}
            {optimized.details ? optimized.details[0].boardsUsed : ""}
            <CutVisualization optimized={optimized} />
          </>
        )}
      </Container>
    </>
  );
};

export default Specs;
