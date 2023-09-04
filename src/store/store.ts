import { configureStore } from "@reduxjs/toolkit";
import campaignReducer, { fetchCampaigns } from "../features/campaignSlice";

export const store = configureStore({
  reducer: {
    campaign: campaignReducer,
  },
});

store.dispatch(fetchCampaigns());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
