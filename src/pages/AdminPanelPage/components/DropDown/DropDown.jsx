import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDown({ value, onChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={value}
          label="Category"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value={1}>Electronic & Gadgets</MenuItem>
          <MenuItem value={2}>TV, Audio & Photo</MenuItem>
          <MenuItem value={3}>Home, Garden & DIY</MenuItem>
          <MenuItem value={4}>Appliances</MenuItem>
          <MenuItem value={5}>Fashion & Accessories</MenuItem>
          <MenuItem value={6}>Beauty & Personal Care</MenuItem>
          <MenuItem value={7}>Toys, Kids & Baby</MenuItem>
          <MenuItem value={8}>Sport & Outdoors</MenuItem>
          <MenuItem value={9}>Auto & Moto</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
