import React from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import ParticipantsDashboard from "../dashboard/ParticipantsDashboard";
import EditParticipant from "../reservations/EditParticipant";
import NewParticipant from "../reservations/NewParticipant";
import ViewParticipant from "../reservations/ViewParticipant";
import DischargeInfo from "../reservations/DischargeInfo";
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
      <Route exact={true} path="/participants/:participantId/edit">
        <EditParticipant />
      </Route>
      <Route exact={true} path="/participants/new">
        <NewParticipant />
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
      <Route exact={true} path="/participants/:instanceId/discharge">
        <DischargeInfo />
      </Route>
      <Route exact={true} path="/participants/:instanceId/treatment">
        <TreatmentInfo />
      </Route>
      <Route path="/participants/:participantId/statuses/:incidentId">
        <AddStatus />
      </Route>
      <Route path="/participants/dashboard">
        <ParticipantsDashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
