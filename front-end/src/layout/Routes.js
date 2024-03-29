import React from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import ParticipantsDashboard from "../dashboard/ParticipantsDashboard";

import EnrollNew from "../reservations/EnrollNew";
import EnrollHome from "../reservations/EnrollHome";
import EnrollEdit from "../reservations/ParticipantMenuComponents/EnrollEdit";
import StatusEdit from "../reservations/ParticipantMenuComponents/StatusEdit";
import RecEdit from "../reservations/ParticipantMenuComponents/RecEdit";
import View_Edit_Status from "../reservations/ParticipantMenuComponents/View_Edit_Status";
import View_Edit_Participant from "../reservations/ParticipantMenuComponents/View_Edit_Participant";
import DischargeEdit from "../reservations/ParticipantMenuComponents/DischargeEdit";
import NewParticipant from "../reservations/NewParticipant";
import ParticipantMenu from "../reservations/ParticipantMenu";
import NewInstance from "../reservations/NewInstance";
import Search from "../reservations/Search";
import SearchParticipants from "../reservations/EnrollHome";
import ParticipantNew from "../reservations/ParticipantNew";
import Reporting from "../reservations/Reporting";
import ViewParticipant from "../reservations/ViewParticipant";
import ViewInstance from "../reservations/ViewInstance";
import ViewAllStatuses from "../reservations/ParticipantMenuComponents/ViewAllStatuses";
import DischargeParticipant from "../reservations/DischargeParticipant";
import RecCheck from "../reservations/RecCheck";
import RecDashboard from "../dashboard/RecDashboard";
import RecPrevInstances from "../dashboard/RecPrevInstances";
import AddStatus from "../reservations/AddStatus";
import Importer from "../reservations/data-importer/Importer";
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
      <Route exact={true} path="/participants/:participantId/view">
        <ViewParticipant />
      </Route>
      <Route exact={true} path="/instances/:instanceId/view">
        <ViewInstance />
      </Route>
      <Route exact={true} path="/participants/:participantId/all_statuses">
        <ViewAllStatuses />
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

      <Route path="/participants/:participantId/enrollNew">
        <EnrollNew />
      </Route>
      <Route path="/participants/reporting">
        <Reporting />
      </Route>
      <Route path="/data-importer">
        <Importer />
      </Route>
      <Route path="/instances/:instanceId/enrollEdit">
        <EnrollEdit />
      </Route>
      <Route path="/instances/:instanceId/statusEdit">
        <StatusEdit />
      </Route>
      <Route path="/instances/:instanceId/dischargeEdit">
        <DischargeEdit />
      </Route>
      <Route path="/instances/:instanceId/recEdit">
        <RecEdit />
      </Route>
      <Route path="/statuses/:statusId/edit">
        <View_Edit_Status />
      </Route>
      <Route path="/participants/:participantId/viewEditParticipant">
        <View_Edit_Participant />
      </Route>
      <Route path="/">
        <ParticipantsDashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
