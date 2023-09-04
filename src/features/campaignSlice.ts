import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Campaign, campaignsData } from "../data/campaigns";

interface CampaignState {
  campaigns: Campaign[];
  isLoading: boolean;
}

const initialState: CampaignState = {
  campaigns: [],
  isLoading: false,
};

// Define the thunk
export const fetchCampaigns = createAsyncThunk(
  "campaign/fetchCampaigns",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading()); // Set loading to true before fetching
      const data = campaignsData;
      dispatch(addCampaigns(data)); // Dispatch data to add to the state
    } catch (error) {
      // Handle error
      alert("Error fetching data...");
    } finally {
      dispatch(clearLoading()); // Clear loading state, whether successful or not
    }
  }
);

// Create a slice with reducers
const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.campaigns.push(...action.payload);
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addCampaigns, setLoading, clearLoading } = campaignSlice.actions;

export const selectCampaigns = (state: RootState) => state.campaign.campaigns;

export const isLoading = (state: RootState) => state.campaign.isLoading;

export default campaignSlice.reducer;
