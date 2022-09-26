import React from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import ParticipantsDashboard from "../dashboard/ParticipantsDashboard";
import EditParticipant from "../reservations/EditParticipant";
import EnrollOld from "../reservations/EnrollOld";
import EnrollNew from "../reservations/EnrollNew";
import EnrollHome from "../reservations/EnrollHome";
import NewParticipant from "../reservations/NewParticipant";
import ParticipantMenu from "../reservations/ParticipantMenu";
import NewInstance from "../reservations/NewInstance";
import Search from "../reservations/Search";
import SearchParticipants from "../reservations/EnrollHome";
import ParticipantNew from "../reservations/ParticipantNew";
import ViewParticipant from "../reservations/ViewParticipant";
import DischargeParticipant from "../reservations/DischargeParticipant";
import RecCheck from "../reservations/RecCheck";
import RecDashboard from "../dashboard/RecDashboard";
import RecPrevInstances from "../dashboard/RecPrevInstances";
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
      <Route exact={true} path="/participants/searchParticipants">
        <SearchParticipants />
      </Route>
      <Route exact={true} path="/participants/createParticipant">
        <ParticipantNew />
      </Route>
      <Route exact={true} path="/participant_menu">
        <ParticipantMenu />
      </Route>
      <Route exact={true} path="/participants/rec_dashboard">
        <RecDashboard />
      </Route>
      <Route exact={true} path="/participants/:participant_id/rec_prev">
        <RecPrevInstances />
      </Route>
      <Route exact={true} path="/participants/:instanceId/rec_check">
        <RecCheck />
      </Route>
      <Route exact={true} path="/participants/:instanceId/view">
        <ViewParticipant />
      </Route>
      <Route exact={true} path="/participants/:instanceId/create">
        <NewInstance />
      </Route>

      <Route
        exact={true}
        path="/participants/:instanceId/discharge_participant"
      >
        <DischargeParticipant />
      </Route>

      <Route path="/participants/:instanceId/statuses">
        <AddStatus />
      </Route>
      <Route path="/participants/dashboard">
        <ParticipantsDashboard />
      </Route>
      <Route path="/participants/enroll">
        <EnrollHome />
      </Route>
      <Route path="/participants/enrollOld">
        <EnrollOld />
      </Route>
      <Route path="/participants/:participantId/enrollNew">
        <EnrollNew />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
