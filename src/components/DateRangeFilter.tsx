import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltClearIcon from "@mui/icons-material/FilterAltOff";

interface DateRangeFilterProps {
  onFilter: (startDate: string, endDate: string) => void; // Callback function to send the date range to the parent
  onClear: () => void;
}

function DateRangeFilter({ onFilter, onClear }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isDateRangeFilterActive, setIsDateRangeFilterActive] = useState(false);

  const handleFilter = () => {
    // Send the selected date range to the parent
    onFilter(startDate, endDate);
    setIsDateRangeFilterActive(true);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setIsDateRangeFilterActive(false);
    onClear();
  };

  const updateStartDate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStartDate(e.target.value);
  };

  const updateEndDate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (startDate === "") {
      alert("Should select start date first.");
      return;
    }
    setEndDate(e.target.value);
  };

  return (
    <>
      <Grid
        container
        columnGap={1}
        direction="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
        marginY={-1}
      >
        <Card sx={{ width: 175 }} variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14, color: "#142850" }}
              color="text.secondary"
              gutterBottom
            >
              Start Date
            </Typography>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => updateStartDate(e)}
              style={{ color: "#142850" }}
            />
          </CardContent>
        </Card>
        <Card sx={{ width: 175 }} variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14, color: "#142850" }}
              color="text.secondary"
              gutterBottom
            >
              End Date
            </Typography>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => updateEndDate(e)}
              style={{ color: "#142850" }}
            />
          </CardContent>
        </Card>
        {(startDate !== "" || endDate !== "") && (
          <Card
            sx={{
              width: 100,
              height: 60,
              marginBottom: "-30px",
              display: "flex",
              justifyContent: "center",
            }}
            variant="outlined"
          >
            <CardActions>
              <Button
                onClick={() => handleFilter()}
                variant="text"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                }}
                startIcon={<FilterAltIcon />}
              >
                Filter
              </Button>
            </CardActions>
          </Card>
        )}
        {isDateRangeFilterActive && (
          <Card
            sx={{
              width: 175,
              height: 60,
              marginBottom: "-30px",
              display: "flex",
              justifyContent: "center",
            }}
            variant="outlined"
          >
            <CardActions>
              <Button
                onClick={() => handleClear()}
                variant="text"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                }}
                startIcon={<FilterAltClearIcon />}
              >
                Clear Filters
              </Button>
            </CardActions>
          </Card>
        )}
      </Grid>
    </>
  );
}

export default DateRangeFilter;
