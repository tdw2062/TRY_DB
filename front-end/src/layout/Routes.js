import React from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import ParticipantsDashboard from "../dashboard/ParticipantsDashboard";
import EditParticipant from "../reservations/EditParticipant";
import EnrollParticipant from "../reservations/EnrollParticipant";
import NewParticipant from "../reservations/NewParticipant";
import ParticipantMenu from "../reservations/ParticipantMenu";
import EditInstance from "../reservations/EditInstance";
import Search from "../reservations/Search";
import Documents from "../reservations/Documents";
import ViewParticipant from "../reservations/ViewParticipant";
import AdmFunding from "../reservations/AdmFunding";
import DischargeInfo from "../reservations/DischargeInfo";
import EmploymentInfo from "../reservations/EmploymentInfo";
import TreatmentInfo from "../reservations/TreatmentInfo";
import RecCheck from "../reservations/RecCheck";
import RecDashboard from "../dashboard/RecDashboard";
import AddStatus from "../reservations/AddStatus";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/participants/new">
        <NewParticipant />
      </Route>
      <Route exact={true} path="/participants/search">
        <Search />
      </Route>
      <Route exact={true} path="/participant_menu">
        <ParticipantMenu />
      </Route>
      <Route exact={true} path="/participants/rec_dashboard">
        <RecDashboard />
      </Route>
      <Route exact={true} path="/participants/:instanceId/rec_check">
        <RecCheck />
      </Route>
      <Route exact={true} path="/participants/:instanceId/view">
        <ViewParticipant />
      </Route>
      <Route exact={true} path="/participants/:instanceId/edit">
        <EditInstance />
      </Route>
      <Route exact={true} path="/participants/:instanceId/discharge">
        <DischargeInfo />
      </Route>
      <Route exact={true} path="/participants/:instanceId/treatment">
        <TreatmentInfo />
      </Route>
      <Route exact={true} path="/participants/:instanceId/adm">
        <AdmFunding />
      </Route>
      <Route exact={true} path="/participants/:instanceId/documents">
        <Documents />
      </Route>
      <Route exact={true} path="/participants/:instanceId/employment">
        <EmploymentInfo />
      </Route>
      <Route path="/participants/:instanceId/statuses">
        <AddStatus />
      </Route>
      <Route path="/participants/dashboard">
        <ParticipantsDashboard />
      </Route>
      <Route path="/participants/enroll">
        <EnrollParticipant />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
