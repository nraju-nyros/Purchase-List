import { render, screen , fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom';
import { WorkOrderList } from "./WorkOrderList";


describe("describe inside dispatch.js ",  () => {
   
    test("testing for title ", ()=>{
        render(
            <Router>
             <WorkOrderList />
         </Router> 
        );   
    const findText = screen.getByRole("heading", { name: 'Work Orders' });
    // const findText = screen.getByText(/Work Orders/i);
    expect(findText).toBeInTheDocument();
    })
    test("testing for sub-title ", ()=>{
        render(
            <Router>
             <WorkOrderList />
         </Router> 
        );   
    const findText = screen.getByRole("heading", { name: 'Manage Work Orders here' });
    // const findText = screen.getByText(/Manage Work Orders here/i);
    expect(findText).toBeInTheDocument();
    })
    test("testing for search box ", ()=>{
        render(
          <Router>
             <WorkOrderList />
          </Router> 
        );   
    const findText = screen.getByPlaceholderText('Search document no')
    expect(findText).toBeInTheDocument();
    })
    test("testing for search box functionality ", ()=>{
        render(
            <Router>
             <WorkOrderList />
         </Router> 
        );   
        document.getElementById('searching').value = 'Norris'
        const lastNameInput = screen.getByDisplayValue('Norris')
    expect(lastNameInput).toBeTruthy();
    })
    
    test("testing for count of buttons ", async ()=>{
        render(
                <Router>
                 <WorkOrderList />
                </Router> 
            );   
            const button = await screen.findAllByRole("button")
            // console.log("printing button : ",button)
            expect(button).toHaveLength(11)
    })
    test("testing for fireEvent on work order index page create work order Button ", async ()=>{
        render(
            <Router>
              <WorkOrderList />
            </Router> 
        );   
        const button = await screen.findAllByRole('button', {name: '+ Create Work Order'})  
        
        fireEvent.click(button[0])
        // expect(button).toHaveLength(2)
    })
    test("testing on count of create work order Button ", async ()=>{
        render(
            <Router>
              <WorkOrderList />
            </Router> 
        );   
        const button = await screen.findAllByRole('button', {name: '+ Create Work Order'})  
        expect(button).toHaveLength(2)
    })
    
})