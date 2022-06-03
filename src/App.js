import './App.css';
import { Test } from './Components/Test';
import {CreatePurchase} from './Components/Create Purchase/CreatePurchase' 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { CreatePurchase1 } from './Components/Create Purchase/CreatePurchase1';
import { Dispatch } from './Components/Dispatch/Dispatch';
import { DispatchCreate } from './Components/Dispatch/DispatchCreate';
import CompleteDispatchNotification from './Components/Complete Dispatch/CompleteDispatchNotification';
import { WorkOrderList } from './Components/workorder/WorkOrderList';
import { NotificationsList } from './Components/Notification Module/NotificationList';
const history = createBrowserHistory();
function App() {
 
  return (
    <>
       <Router>
       <Routes>
       {/* <Route exact path="/" element={<Dispatch/>} /> */}
       {/* <Route exact path="/" element={<NotificationsList/>} /> */}
       <Route exact path="/" element={<WorkOrderList/>} />
       <Route exact path="/completedispatch" element={<CompleteDispatchNotification/>} />
       <Route exact path="/dispatchcreate" element={<DispatchCreate/>} />
       {/* <Route exact path="/" element={<CreatePurchase1/>} /> */}
       <Route exact path="/test" element={<Test/>} />
       <Route exact path="/createPurchase" element={<CreatePurchase/>} />
       </Routes>
       </Router>
    </>
  );
}

export default App;
