import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDown() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={10}>Electronic & Gadgets</MenuItem>
          <MenuItem value={20}>TV, Audio & Photo</MenuItem>
          <MenuItem value={30}>Home, Garden & DIY</MenuItem>
          <MenuItem value={40}>Appliances</MenuItem>
          <MenuItem value={50}>Fashion & Accessories</MenuItem>
          <MenuItem value={60}>Beauty & Personal Care</MenuItem>
          <MenuItem value={70}>Toys, Kids & Baby</MenuItem>
          <MenuItem value={80}>Sport & Outdoors</MenuItem>
          <MenuItem value={90}>Auto & Moto</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
