import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";

const genres = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "Biography",
  "History",
  "Fantasy",
  "Classic",
  "Thriller",
  "Self-Help",
  "Mystery",
  "Romance",
];
const statuses = ["All", "Available", "Issued"];

const Header = ({ onSearch, onGenreChange, onStatusChange, genre, status }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-3 flex-wrap">
      <h1 className="text-3xl font-bold">Book Management</h1>
      <div className="flex gap-2 items-center w-full sm:w-auto flex-wrap">
        <TextField
          size="small"
          label="Search by Title"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            label="Genre"
            onChange={(e) => onGenreChange(e.target.value)}
          >
            {genres.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => onStatusChange(e.target.value)}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained">Add Book</Button>
      </div>
    </div>
  );
};

export default Header;
