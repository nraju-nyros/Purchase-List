import './App.css';
import { Test } from './Components/Test';
import {CreatePurchase} from './Components/Create Purchase/CreatePurchase' 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { CreatePurchase1 } from './Components/Create Purchase/CreatePurchase1';
const history = createBrowserHistory();
function App() {
 
  return (
    <>
       <Router>
       <Routes>
       {/* <Route exact path="/" element={<CreatePurchase1/>} /> */}
       <Route exact path="/" element={<Test/>} />
       <Route exact path="/createPurchase" element={<CreatePurchase/>} />
       </Routes>
       </Router>
    </>
  );
}

export default App;
