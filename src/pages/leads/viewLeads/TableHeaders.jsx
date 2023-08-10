import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import ViewLead from "./ViewLead";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
    // center: true,
    // width: "250px",
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
    sortable: true,
    // center: true,
    // width: "250px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    // center: true,
    // width: "250px",
  },
  {
    name: "Phone No.",
    selector: (row) => row.phone,
    sortable: true,
    // center: true,
    // width: "250px",
  },
  {
    name: "Status",
    selector: (row) => row.contactStatus,
    width: "200px",
    sortable: true,
    center: true,
    cell: (row) => (
      <StatusToggle
        status={row.contactStatus}
        id={row._id}
        type={"leads"}
        queryName="fetchLeads"
      />
    ),
  },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        // del={true}
        // edit={true}
        viewData={<ViewLead rowData={row} />}
        type="leads"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: "" },
  { label: "Contacted", value: "Contacted" },
  { label: "Not Contacted", value: "Not Contacted" },
  { label: "No Response", value: "Mo Response" },
];
