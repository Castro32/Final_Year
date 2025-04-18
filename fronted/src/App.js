// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from './components/header';
// import CreateAccount from './components/CreateAccount';
// import MakeDoc from './components/MakeDoc';
// import LogIn from './components/logIn';
// import Home from './components/Home';
// import ViewOneHistory from './components/ViewOneHistory';
// import SchedulingAppt from './components/schedulingAppt';
// import ScheduleManagementForm from './components/ScheduleManagementForm';
// import DocHome from './components/DocHome';
// import ViewMedHist from './components/ViewMedHis';
// import PatientsViewAppointments from './components/PatientViewAppt';
// import Layout from './components/Layout';
// import Settings from './components/Settings';
// import DocViewAppt from './components/DocViewAppt';
// import DocSettings from './components/DocSettings';
// import ShowDiagnoses from './components/ShowDiagnoses';
// import Diagnose from './components/Diagnose';
// import DocLayout from './components/DocLayout';
// import AdminDashboard from './components/admindashboard';
// import AdminLogin from './components/adminLogin';
// import Analytics from './components/Analytics';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
        
//         <Routes>
//           <Route path='/admindashboard' element={<AdminDashboard/>} />
//           <Route path="/MakeDoc" element={<MakeDoc />} />
//           <Route path="/createAcc" element={<CreateAccount />} />
//           <Route index element={<LogIn />} />
//           <Route path="/login" element={<LogIn />} />
//           <Route path='/adminlogin' element={<AdminLogin/>}/>
         
//           <Route path="/create-schedule" element={<ScheduleManagementForm />} />
//           <Route path='/dashboard' element={<AdminDashboard/>}/>
//           <Route path='/analytics' element={<Analytics />} />
          
//           <Route element={<Layout />}>
//             <Route path="scheduleAppt" element={<SchedulingAppt />} />
//             <Route path="PatientsViewAppt" element={<PatientsViewAppointments />} />
//             <Route path="ViewOneHistory/:email" element={<ViewOneHistory />} />
//             <Route path="/Home" element={<Home />} />
//             <Route path="/showDiagnoses/:id" element={<ShowDiagnoses />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>

//           <Route element={<DocLayout/>}>
//           <Route path="/Diagnose/:id" element={<Diagnose />} />
//           <Route path='/DocSettings' element={<DocSettings/>}/>
//           <Route path="/DocHome" element={<DocHome />} />
//           <Route path='/MedHistView' element={<ViewMedHist />} />
//           <Route path='/ApptList' element={<DocViewAppt/>} />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
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
import DocLayout from './components/DocLayout';
import AdminDashboard from './components/admindashboard';
import AdminLogin from './components/adminLogin';
import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          
          {/* Admin routes */}
          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route index element={<AdminDashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="createAcc" element={<CreateAccount />} />
            <Route path="MakeDoc" element={<MakeDoc />} />
          </Route>
          
          {/* Regular user routes */}
          <Route element={<Layout />}>
            <Route path="scheduleAppt" element={<SchedulingAppt />} />
            <Route path="PatientsViewAppt" element={<PatientsViewAppointments />} />
            <Route path="ViewOneHistory/:email" element={<ViewOneHistory />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/showDiagnoses/:id" element={<ShowDiagnoses />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Doctor routes */}
          <Route element={<DocLayout/>}>
            <Route path="/Diagnose/:id" element={<Diagnose />} />
            <Route path='/DocSettings' element={<DocSettings/>}/>
            <Route path="/DocHome" element={<DocHome />} />
            <Route path='/MedHistView' element={<ViewMedHist />} />
            <Route path='/ApptList' element={<DocViewAppt/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;