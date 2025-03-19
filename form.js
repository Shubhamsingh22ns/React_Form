import { FormControl, MenuItem, Select, Box, Button, Typography, Grid } from "@mui/material";
import React, { useState } from "react";

function Form1() {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const countryStateData = {
    IND: ["Delhi", "Mumbai", "Bangalore"],
    USA: ["New York", "California", "Texas"],
    UK: ["London", "Manchester", "Birmingham"],
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "country") {
      setFormData({ ...formData, country: value, state: "" }); // Reset state when country changes
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("Form Data", formData);
    } else {
      console.log("Form Not Submitted due to Errors");
    }
  };

  const validate = () => {
    let temp = {};
    let flag = true;

    if (!formData.country) {
      temp.country = "Please select a country";
      flag = false;
    }

    if (!formData.state) {
      temp.state = "Please select a state";
      flag = false;
    }

    if (!formData.status) {
      temp.status = "Please select a status";
      flag = false;
    }

    setErrors(temp);
    return flag;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9" }}>
      <form onSubmit={submitHandler}>

        {/* Country Dropdown */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">Country</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth margin="normal" error={!!errors.country}>
              <Select
                name="country"
                value={formData.country}
                displayEmpty
                variant="filled"
                onChange={handleChange}
              >
                <MenuItem value="" disabled>Select Country</MenuItem>
                {Object.keys(countryStateData).map((country) => (
                  <MenuItem key={country} value={country}>{country}</MenuItem>
                ))}
              </Select>
              {errors.country && <Box color="error.main">{errors.country}</Box>}
            </FormControl>
          </Grid>
        </Grid>

        {/* State Dropdown (Dependent on Country) */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">State</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth margin="normal" error={!!errors.state} disabled={!formData.country}>
              <Select
                name="state"
                value={formData.state}
                displayEmpty
                variant="filled"
                onChange={handleChange}
              >
                <MenuItem value="" disabled>Select State</MenuItem>
                {formData.country &&
                  countryStateData[formData.country].map((state) => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
              </Select>
              {errors.state && <Box color="error.main">{errors.state}</Box>}
            </FormControl>
          </Grid>
        </Grid>

        {/* Status Dropdown */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">Status</Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth margin="normal" error={!!errors.status}>
              <Select
                name="status"
                displayEmpty
                value={formData.status}
                onChange={handleChange}
                variant="filled"
              >
                <MenuItem value="" disabled>Select Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Disabled">Disabled</MenuItem>
              </Select>
              {errors.status && <Box color="error.main">{errors.status}</Box>}
            </FormControl>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px", width: "100%" }}>
          Submit
        </Button>

      </form>
    </div>
  );
}

export default Form1;
