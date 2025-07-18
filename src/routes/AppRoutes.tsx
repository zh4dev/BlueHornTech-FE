import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRouteConstant } from "../data/commons/constants/AppRouteConstant";

import { InitPage } from "../pages/InitPage";
import ScheduleDetailsPage from "../pages/schedule/detail/ScheduleDetailsPage";
import { MainPage } from "../pages/MainPage";
import ScheduleListPage from "../pages/schedule/ScheduleListPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={AppRouteConstant.initPage} element={<InitPage />} />
        <Route path={AppRouteConstant.mainPage} element={<MainPage />} />
        <Route
          path={AppRouteConstant.scheduleDetailsPage()}
          element={<ScheduleDetailsPage />}
        />
        <Route
          path={AppRouteConstant.schedules}
          element={<ScheduleListPage />}
        />
      </Routes>
    </Router>
  );
}
