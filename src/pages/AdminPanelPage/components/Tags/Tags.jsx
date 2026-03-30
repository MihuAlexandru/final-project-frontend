import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: "auto" }}>
      <Autocomplete
        multiple
        id="tags-produs"
        options={colorList}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Color"
            placeholder="Pick your product's color"
          />
        )}
      />
    </Stack>
  );
}

const colorList = [
  { title: "White" },
  { title: "Blue" },
  { title: "Silver" },
  { title: "Gold" },
  { title: "Copper" },
  { title: "Yellow" },
  { title: "Grey" },
  { title: "Brown" },
  { title: "Purple" },
  { title: "Multicolor" },
  { title: "Black" },
  { title: "Orange" },
  { title: "Red" },
  { title: "Pink" },
  { title: "Transparent" },
  { title: "Green" },
];
