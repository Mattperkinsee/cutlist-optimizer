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


export default function CutsInventoryForm({
  cut,
  setCut,
  cuts,
  setCuts,
  handleAdd,
  handleInputChange,
  handleEdit,
  handleDelete,
  item,
  setItem,
  inventory,
  setInventory,
}) {
  return (
    <>
      <h4>Cuts Needed</h4>
      <form noValidate autoComplete="off">
        {/* Cuts Form */}
        <TextField
          name="length"
          label="Cut Length"
          value={cut.length}
          onChange={(e) => handleInputChange(setCut, e)}
        />
        <TextField
          name="width"
          label="Cut Width"
          value={cut.width}
          onChange={(e) => handleInputChange(setCut, e)}
        />
        <TextField
          name="quantity"
          label="Cut Quantity"
          value={cut.quantity}
          onChange={(e) => handleInputChange(setCut, e)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAdd(setCut, cut, cuts, setCuts)}
        >
          Add Cut
        </Button>
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
              {cuts.map((cut, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={cut.length}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "length",
                          e.target.value,
                          cuts,
                          setCuts
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={cut.width}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "width",
                          e.target.value,
                          cuts,
                          setCuts
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={cut.quantity}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "quantity",
                          e.target.value,
                          cuts,
                          setCuts
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(index, cuts, setCuts)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Inventory Form */}

        <Divider sx={{ margin: "30px" }} />
        <h4>Inventory</h4>
        <TextField
          name="length"
          label="Inventory Length"
          value={item.length}
          onChange={(e) => handleInputChange(setItem, e)}
        />
        <TextField
          name="width"
          label="Inventory Width"
          value={item.width}
          onChange={(e) => handleInputChange(setItem, e)}
        />
        <TextField
          name="quantity"
          label="Inventory Quantity"
          value={item.quantity}
          onChange={(e) => handleInputChange(setItem, e)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleAdd(setItem, item, inventory, setInventory)}
        >
          Add Inventory
        </Button>

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
              {inventory.map((cut, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={cut.length}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "length",
                          e.target.value,
                          inventory,
                          setInventory
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={cut.width}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "width",
                          e.target.value,
                          inventory,
                          setInventory
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={cut.quantity}
                      onChange={(e) =>
                        handleEdit(
                          index,
                          "quantity",
                          e.target.value,
                          inventory,
                          setInventory
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        handleDelete(index, inventory, setInventory)
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </>
  );
}
