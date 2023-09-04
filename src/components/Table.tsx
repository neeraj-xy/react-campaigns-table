import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Campaign } from "../data/campaigns";
import { useEffect, useState } from "react";
import { clearLoading, isLoading, setLoading } from "../features/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchBar, { SearchBarProps } from "./SearchBar";
import { Stack } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "name",
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => <b>{"Name"}</b>,
  },
  {
    field: "status",
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => <b>{"Status"}</b>,
    valueGetter: (params: GridValueGetterParams) => {
      return new Date() >= new Date(params.row.startDate) &&
        new Date() <= new Date(params.row.endDate)
        ? "Active"
        : "Inactive";
    },
    renderCell: (params: GridRenderCellParams) => {
      return params.value === "Active" ? (
        <>
          <CheckCircleIcon style={{ color: "green" }} />
          &nbsp;&nbsp;&nbsp;<p>{"Active"}</p>
        </>
      ) : (
        <>
          <CancelIcon style={{ color: "red" }} />
          &nbsp;<p>{"Inactive"}</p>
        </>
      );
    },
  },
  {
    field: "startDate",
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => <b>{"Start Date"}</b>,
  },
  {
    field: "endDate",
    minWidth: 150,
    flex: 1,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => <b>{"End Date"}</b>,
  },
  {
    field: "budget",
    type: "number",
    minWidth: 150,
    flex: 1,
    filterable: false,
    sortable: true,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    renderHeader: (params: GridColumnHeaderParams) => <b>{"Budget"}</b>,
    renderCell: (params: GridRenderCellParams) => {
      return "$" + params.value;
    },
  },
];

interface DataTableProps {
  rows: Campaign[];
  loading: boolean;
}

const CustomToolbar = (props: SearchBarProps) => (
  <>
    <SearchBar {...props} />
  </>
);

export default function DataTable({ rows, loading }: DataTableProps) {
  const [searchText, setSearchText] = useState("");

  const [tableData, setTableData] = useState<Campaign[]>([]);

  const [origData, setOrigData] = useState<Campaign[]>([]);

  const isDataLoading = useSelector(isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading()); // Set loading state to true
    const filtered = rows.filter((campaign) => {
      const campaignStartDate = new Date(campaign.startDate);
      const campaignEndDate = new Date(campaign.endDate);
      // Check if campaign's end date is before its start date
      if (campaignEndDate < campaignStartDate) {
        return false; // Skip campaigns with end dates before start dates
      }
      return true;
    });
    setTableData(filtered);
    setOrigData(filtered);
    dispatch(clearLoading());
  }, [rows, dispatch]);

  const requestSearch = (
    searchValue: string | React.FormEvent<HTMLDivElement>
  ) => {
    dispatch(setLoading());
    const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");
    const filteredRows = origData.filter((o: any) => {
      return Object.keys(o).some((k: any) => {
        return searchRegex.test(o[k].toString());
      });
    });
    setTableData(filteredRows);
    dispatch(clearLoading());
  };

  const cancelSearch = () => {
    dispatch(setLoading());
    setSearchText("");
    requestSearch(searchText);
    dispatch(clearLoading());
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        loading={loading || isDataLoading}
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        sx={{
          borderColor: "#e0e0e0",
          "& .MuiDataGrid-cell:hover": {
            color: "#142850",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#e0e0e0",
            color: "#142850",
            fontSize: 16,
          },
        }}
        autoHeight={true}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No rows
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Filter returns no result
            </Stack>
          ),
        }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.FormEvent<HTMLDivElement>) =>
              requestSearch(event),
            onCancelSearch: () => cancelSearch(),
          },
        }}
      />
    </div>
  );
}
