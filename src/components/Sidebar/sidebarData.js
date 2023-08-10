import { Database, Graph, Settings } from "tabler-icons-react";
import { routeNames } from "../../routes/routeNames";
export const sidebarData = [
  {
    label: "Dashboard",
    icon: Graph,
    link: routeNames.general.dashboard,
  },
  {
    label: "Leads",
    icon: Database,
    link: routeNames.general.viewLoads,
  },
  {
    label: "Settings",
    icon: Settings,
    link: routeNames.general.settings,
  },
];
