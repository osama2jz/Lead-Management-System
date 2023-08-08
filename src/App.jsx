import { Route, Routes } from "react-router-dom";
import "./App.css";
import GeneralLayout from "./layout/GeneralLayout";
import { routeNames } from "./routes/routeNames";
import ViewLeads from "./pages/leads/viewLeads";
import { Login } from "./pages/login";
function App() {
  return (
    <Routes>
      <Route path={routeNames.general.login} element={<Login />} />
      <Route path={routeNames.general.dashboard} element={<GeneralLayout />}>
        <Route path={routeNames.general.viewLoads} element={<ViewLeads />} />
      </Route>
    </Routes>
  );
}

export default App;
