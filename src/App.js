import './App.css';
import { Test } from './Components/Test';
// import {CreatePurchase} from './Components/Create Purchase/CreatePurchase' 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { CreatePurchase1 } from './Components/Create Purchase/CreatePurchase1';
import { Dispatch } from './Components/Dispatch/Dispatch';
import { DispatchCreate } from './Components/Dispatch/DispatchCreate';
import CompleteDispatchNotification from './Components/Complete Dispatch/CompleteDispatchNotification';
import { WorkOrderList } from './Components/workorder/WorkOrderList';
import { NotificationsList } from './Components/Notification Module/NotificationList';
import { WorkInProcessList } from './Components/WorkInProcess/WorkInProcessList';
import { DiscopsMaintenanceDashboard } from './Components/Discop Dashboard/DiscopsMaintenanceDashboard.js';
import { FunctionalLocation } from './Components/Functional location/FunctionalLocation';
import { NotificationCreateFlow } from './Components/Notification Module/NotificationCreateFlow';
import WorkOrderCreateFlow from './Components/workorder/WorkOrderCreateFlow';
import { CreatePurchase } from './Components/Create Purchase/CreatePurchase';

const history = createBrowserHistory();
function App() {
 
  return (
    <>
       <Router>
       <Routes>
       <Route exact path="/home" element={<DiscopsMaintenanceDashboard/>} />
       <Route exact path="/home/workorderinprocess" element={<WorkInProcessList/>} />
       <Route exact path="/home/dispatch" element={<Dispatch/>} />
       <Route exact path="/home/notifications" element={<NotificationsList/>} />
       <Route exact path="/home/workorder" element={<WorkOrderList/>} />
       <Route exact path="/home/functionallocation" element={<FunctionalLocation/>} />

       {/* <Route exact path="/home/createpurchase" element={<CreatePurchase/>} /> */}
       <Route exact path="/workorder" element={<WorkOrderCreateFlow/>} />
       <Route exact path="/notification" element={<NotificationCreateFlow/>} />
       <Route exact path="/completedispatch" element={<CompleteDispatchNotification/>} />
       <Route exact path="/dispatchcreate" element={<DispatchCreate/>} />
       <Route exact path="/home/createpurchase1" element={<CreatePurchase1/>} />
       <Route exact path="/test" element={<Test/>} />
       
       </Routes>
       </Router>
    </>
  );
}

export default App;
