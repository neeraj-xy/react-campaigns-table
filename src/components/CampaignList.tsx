import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampaigns,
  clearLoading,
  isLoading,
  selectCampaigns,
  setLoading,
} from "../features/campaignSlice";
import DateRangeFilter from "./DateRangeFilter";
import { Campaign } from "../data/campaigns";
import DataTable from "./Table";
import Navbar from "./Navbar";
import { CircularProgress } from "@mui/material";

function CampaignList() {
  const originalCampaigns = useSelector(selectCampaigns);
  const campaigns = useSelector(selectCampaigns);

  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setFilteredCampaigns(campaigns);
  }, [campaigns]);

  const isDataLoading = useSelector(isLoading);

  const dispatch = useDispatch();

  // Callback function to update filteredCampaigns when date range changes
  const handleDateFilter = (startDate: string, endDate: string) => {
    dispatch(setLoading()); // Set loading state to true
    const filtered = campaigns.filter((campaign: Campaign) => {
      const campaignStartDate = new Date(campaign.startDate);
      const campaignEndDate = new Date(campaign.endDate);

      const filterStartDate = new Date(startDate);
      const filterEndDate = new Date(endDate);

      // Check if campaign's end date is before its start date
      if (campaignEndDate < campaignStartDate) {
        return false; // Skip campaigns with end dates before start dates
      }

      /// Check if the campaign's date falls between the start and end date or
      // if the filter end date is greater than the campaign start date
      let isDateInRange = false;

      if (startDate && endDate) {
        isDateInRange =
          campaignStartDate >= filterStartDate &&
          campaignEndDate <= filterEndDate;
      } else if (startDate) {
        isDateInRange = campaignStartDate >= filterStartDate;
      } else {
        isDateInRange = false;
      }

      return isDateInRange;
    });
    setFilteredCampaigns(filtered);
    dispatch(clearLoading());
  };

  // Callback function to clear the date range filter
  const clearDateRangeFilter = () => {
    dispatch(setLoading());
    // Reset filteredCampaigns to the original data
    setFilteredCampaigns(originalCampaigns);
    dispatch(clearLoading());
  };

  // function to add more campaigns
  (window as any).addCampaigns = function (params: Campaign[]) {
    dispatch(setLoading());
    dispatch(addCampaigns(params));
    dispatch(clearLoading());
  };

  return (
    <div>
      <Navbar />

      {!filteredCampaigns && (
        <CircularProgress size={50} style={{ color: "#142850" }} />
      )}

      {filteredCampaigns && (
        <>
          <DateRangeFilter
            onFilter={(startDate, endDate) =>
              handleDateFilter(startDate, endDate)
            }
            onClear={clearDateRangeFilter}
          />
          <DataTable rows={filteredCampaigns} loading={isDataLoading} />
        </>
      )}
    </div>
  );
}

export default CampaignList;
