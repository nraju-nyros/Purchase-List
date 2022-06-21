import { render, screen , fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom';
import {WorkOrderAddHeader} from "./WorkOrderAddHeader";


describe("describe inside create work order ", () => {
   
    test("testing for Description presence", ()=>{
        render(
            <Router>
             <WorkOrderAddHeader />
         </Router> 
        );   
        const findDescription = screen.getByPlaceholderText('Description')
        expect(findDescription).toBeInTheDocument();
    })

    // test("testing for Description function ", ()=>{
    //     render(
    //         <Router>
    //          <WorkOrderAddHeader />
    //      </Router> 
    //     );  
    //     document.getElementById('workOrderDescription').value = 'Norris' 
    //     const findDescription = screen.getByDisplayValue('Norris')
    //     expect(findDescription).toBeTruthy();
    // })

    // test("testing for System Condition dropdown ", ()=>{
    //     render(
    //         <Router>
    //          <WorkOrderAddHeader />
    //      </Router> 
    //     );   
    //     const findDescription = screen.getByPlaceholderText('System Condition')
    //     expect(findDescription).toBeInTheDocument();
    // })

    // test("testing for System Condition dropdown funtionality ", ()=>{
    //     render(
    //         <Router>
    //          <WorkOrderAddHeader />
    //      </Router> 
    //     );   
    //     const findDescription = screen.getAllByText(/system condition/i)
    //     expect(findDescription).toBeInTheDocument();
    // })
})