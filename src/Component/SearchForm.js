import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

const SearchForm = ({ onSearch }) => {
  const initialFilters = {
    campaignId: [],
    phoneNumber: "",
    volunteerNumber: "",
    callDateFrom: null,
    callDateTo: null,
    agentId: "",
    responseCode: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event) => {
    setFilters({ ...filters, campaignId: event.target.value });
  };

  const handleDateChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };
  console.log(isFilterApplied);
  const handleSearch = () => {
    const validFilters = {};

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && value !== "" && value !== "null" && value !== null) {
        validFilters[key] = value;
      }
    });

    setIsFilterApplied(Object.keys(validFilters).length > 0);
    onSearch(validFilters);
  };

  const handleCancelOrClear = () => {
    setFilters(initialFilters);

    onSearch({});

    setIsFilterApplied(false);
  };

  useEffect(() => {
    const isAnyFilterApplied = Object.keys(filters).some((key) => {
      const value = filters[key];
      return value && value !== "" && value !== null;
    });

    setIsFilterApplied(isAnyFilterApplied);
  }, [filters]);
  console.log(isFilterApplied);
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: "20px" }}>
        Manage Call Recording
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Campaign ID</InputLabel>
            <Select
              multiple
              value={filters.campaignId}
              onChange={handleSelectChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Campaign 1">Campaign 1</MenuItem>
              <MenuItem value="Campaign 2">Campaign 2</MenuItem>
              <MenuItem value="Campaign 3">Campaign 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={filters.phoneNumber}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Volunteer Number"
            name="volunteerNumber"
            value={filters.volunteerNumber}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="date"
            label="Call Date From"
            value={filters.callDateFrom}
            onChange={(e) => handleDateChange("callDateFrom", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            type="date"
            label="Call Date To"
            value={filters.callDateTo}
            onChange={(e) => handleDateChange("callDateTo", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Agent ID"
            name="agentId"
            value={filters.agentId}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Response Code"
            name="responseCode"
            value={filters.responseCode}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ marginRight: "10px" }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelOrClear}
          >
            {isFilterApplied ? "Clear" : "Cancel"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchForm;
