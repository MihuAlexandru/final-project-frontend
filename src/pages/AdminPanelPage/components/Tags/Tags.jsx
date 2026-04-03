import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Tags({ items = [], setItems }) {
  const handleUpdate = (categoryName, selectedOptions) => {
    const otherAttributes = items.filter((attr) => attr.name !== categoryName);

    const newCategoryAttributes = selectedOptions.map((option) => ({
      name: categoryName,
      value: option.title,
    }));

    setItems([...otherAttributes, ...newCategoryAttributes]);
  };

  const getSelectedFor = (categoryName) => {
    return items
      .filter((attr) => attr.name === categoryName)
      .map((attr) => ({ title: attr.value }));
  };

  return (
    <Stack spacing={3} sx={{ width: "auto" }}>
      <Autocomplete
        multiple
        id="color-tag"
        options={colorList}
        getOptionLabel={(option) => option.title}
        value={getSelectedFor("Color")}
        onChange={(event, newValue) => handleUpdate("Color", newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Color"
            placeholder="Pick your product's color"
          />
        )}
      />

      <Autocomplete
        multiple
        options={sizeList}
        getOptionLabel={(option) => option.title}
        value={getSelectedFor("Size")}
        onChange={(event, newValue) => handleUpdate("Size", newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Sizes"
            placeholder="Select sizes"
          />
        )}
      />

      <Autocomplete
        multiple
        options={materialList}
        getOptionLabel={(option) => option.title}
        value={getSelectedFor("Material")}
        onChange={(event, newValue) => handleUpdate("Material", newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Materials"
            placeholder="Select materials"
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

const sizeList = [
  { title: "XS" },
  { title: "S" },
  { title: "M" },
  { title: "L" },
  { title: "XL" },
  { title: "XXL" },
];

const materialList = [
  { title: "Cotton" },
  { title: "Polyester" },
  { title: "Leather" },
  { title: "Silk" },
  { title: "Metal" },
  { title: "Plastic" },
];
