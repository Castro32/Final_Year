import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/header';
import CreateAccount from './components/CreateAccount';
import MakeDoc from './components/MakeDoc';
import LogIn from './components/logIn';
import Home from './components/Home';
import ViewOneHistory from './components/ViewOneHistory';
import SchedulingAppt from './components/schedulingAppt';
import ScheduleManagementForm from './components/ScheduleManagementForm';
import DocHome from './components/DocHome';
import ViewMedHist from './components/ViewMedHis';
import PatientsViewAppointments from './components/PatientViewAppt';
import Layout from './components/Layout';
import Settings from './components/Settings';
import DocViewAppt from './components/DocViewAppt';
import DocSettings from './components/DocSettings';
import ShowDiagnoses from './components/ShowDiagnoses';
import Diagnose from './components/Diagnose';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/MakeDoc" element={<MakeDoc />} />
          <Route path="/createAcc" element={<CreateAccount />} />
          <Route path="/Diagnose/:id" element={<Diagnose />} />
          {/* <Route path="/showDiagnoses/:id" element={<ShowDiagnoses />} /> */}
          {/* <Route path="/Home" element={<Home />} /> */}
          {/* <Route path="/ViewOneHistory/:email" element={<ViewOneHistory />} /> */}
          {/* <Route path="/scheduleAppt" element={<SchedulingAppt />} /> */}
          <Route index element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
         
          <Route path="/create-schedule" element={<ScheduleManagementForm />} />
          <Route path='/DocSettings' element={<DocSettings/>}/>
          <Route path="/DocHome" element={<DocHome />} />
          <Route path='/MedHistView' element={<ViewMedHist />} />
          <Route path='/ApptList' element={<DocViewAppt/>} />
          {/* <Route path="/PatientsViewAppt" element={<PatientsViewAppointments />} /> */}

          {/* Use the PatientLayout for the specified routes */}
          <Route element={<Layout />}>
            <Route path="scheduleAppt" element={<SchedulingAppt />} />
            <Route path="PatientsViewAppt" element={<PatientsViewAppointments />} />
            <Route path="ViewOneHistory/:email" element={<ViewOneHistory />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/showDiagnoses/:id" element={<ShowDiagnoses />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
