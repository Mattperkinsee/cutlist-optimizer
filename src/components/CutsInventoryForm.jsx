/* eslint-disable react/prop-types */
import {
  Divider,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function InputField({ name, label, value, handleChange }) {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      sx={{ maxWidth: "120px" }}
      onChange={handleChange}
    />
  );
}

function InventoryTable({ data, handleEdit, handleDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Length</TableCell>
            <TableCell>Width</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {["length", "width", "quantity"].map((field) => (
                <TableCell key={field}>
                  <TextField
                    value={item[field]}
                    onChange={(e) =>
                      handleEdit(index, field, e.target.value, data)
                    }
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<RemoveIcon />}
                  onClick={() => handleDelete(index)}
                ></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function CutsInventoryForm({
  cut,
  setCut,
  cuts,
  setCuts,
  item,
  setItem,
  inventory,
  setInventory,
  setOptimized,
  setBoardSummary,
  processCuts,
  getBoardSummary
}) {
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
    console.log("Input data", data);
    const results = await processCuts(data);
    console.log("the results", results);
    let cutBoards = results.filter(function (result) {
      return result.cuts.length > 0;
    });
    // console.log("cut boards", cutBoards);
    setOptimized(cutBoards);
    let _summary = await getBoardSummary(cutBoards);
    setBoardSummary(_summary);
    console.log("summary", _summary);
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

  return (
    <>
      <h4>Cuts Needed</h4>
      <form noValidate autoComplete="off">
        <InputField
          name="length"
          label="Cut Length"
          value={cut.length}
          handleChange={(e) => handleInputChange(setCut, e)}
        />
        <InputField
          name="width"
          label="Cut Width"
          value={cut.width}
          handleChange={(e) => handleInputChange(setCut, e)}
        />
        <InputField
          name="quantity"
          label="Cut Quantity"
          value={cut.quantity}
          handleChange={(e) => handleInputChange(setCut, e)}
        />

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => handleAdd(setCut, cut, cuts, setCuts)}
        ></Button>

        <InventoryTable
          data={cuts}
          handleEdit={handleEdit}
          handleDelete={(index) => handleDelete(index, cuts, setCuts)}
        />

        <h4>Inventory</h4>
        <InputField
          name="length"
          label="Inventory Length"
          value={item.length}
          handleChange={(e) => handleInputChange(setItem, e)}
        />
        <InputField
          name="width"
          label="Inventory Width"
          value={item.width}
          handleChange={(e) => handleInputChange(setItem, e)}
        />
        <InputField
          name="quantity"
          label="Inventory Quantity"
          value={item.quantity}
          handleChange={(e) => handleInputChange(setItem, e)}
        />

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => handleAdd(setItem, item, inventory, setInventory)}
        ></Button>

        <InventoryTable
          data={inventory}
          handleEdit={handleEdit}
          handleDelete={(index) => handleDelete(index, inventory, setInventory)}
        />
      </form>
      <Divider sx={{ margin: "30px" }} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Optimize
      </Button>
    </>
  );
}
