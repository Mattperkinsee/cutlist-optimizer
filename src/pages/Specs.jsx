import { useState, useEffect } from "react";
import { Box, Container, Divider, Button } from "@mui/material";
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
    console.log("useeff");
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

  const handleInputChange = (setField, e) => {
    const { name, value } = e.target;
    setField((prev) => ({
      ...prev,
      [name]:
        name === "length" || name === "width" || name === "quantity"
          ? Number(value)
          : value,
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
    const result = await generateCutList(data.cuts, data.inventory);

    console.log(" CUT LIST result", result);
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

  const generateCutList = (cuts, inventory) => {
    const result = {
      totalBoardsUsed: 0,
      cuts: 0,
      cutsDetails: [],
    };

    let remainingPieces = cuts[0].quantity;
    let currentBoardIndex = 0;


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
            <strong>Actual Cuts</strong> {optimized.actualCuts}
            <Divider sx={{ margin: "30px" }} />
            <strong>Boards Used</strong>{" "}
            {optimized.totalBoardsUsed ? optimized.totalBoardsUsed : ""}
            <CutVisualization cutsDetails={optimized.cutsDetails} />
          </>
        )}
      </Container>
    </>
  );
};

export default Specs;
