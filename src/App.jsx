import { Route, Routes } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./layout/GeneralLayout";
import { routeNames } from "./routes/routeNames";
import ViewLeads from "./pages/leads/viewLeads";
import { Login } from "./pages/login";
import { Settings } from "./pages/settings";
import { Dashboard } from "./pages/dashboard";
function App() {
  return (
    <Routes>
      <Route path={routeNames.general.login} element={<Login />} />
      <Route path={routeNames.general.dashboard} element={<GeneralLayout />}>
        <Route path={routeNames.general.viewLoads} element={<ViewLeads />} />
        <Route path={routeNames.general.settings} element={<Settings />} />
        <Route path={routeNames.general.dashboard} element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
