
import { render, screen , fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom';
import { Dispatch } from "./Dispatch";

describe("describe inside dispatch.js ",  () => {
   
    test("testing for title ", ()=>{
        render(
            <Router>
             <Dispatch />
         </Router> 
        );   
    // const findText = screen.getByRole("heading", { name: 'Dispatch Notifications' });
    const findText = screen.getByText(/Dispatch Notifications/i);
    expect(findText).toBeInTheDocument();
    })
  
    test("testing for sub-title ", ()=>{
        render(
            <Router>
             <Dispatch />
         </Router> 
        );   
    const findText = screen.getByRole("heading", { name: 'Manage Dispatch Notification here' } );
    expect(findText).toBeInTheDocument();
    })

    test("testing for search box ", ()=>{
        render(
            <Router>
             <Dispatch />
         </Router> 
        );   
    const findText = screen.getByPlaceholderText('Search document no')
    expect(findText).toBeInTheDocument();
    })
    test("testing for search box functionality ", ()=>{
        render(
            <Router>
             <Dispatch />
         </Router> 
        );   
        document.getElementById('searching').value = 'Norris'
        const lastNameInput = screen.getByDisplayValue('Norris')
    expect(lastNameInput).toBeTruthy();
    })

    test("testing for fireEvent on Create Dispatch Notification Button ", ()=>{
        render(
            <Router>
             <Dispatch />
            </Router> 
        );   
        const button = screen.getByRole('button', {name: '+ Create Dispatch Notification'})
        fireEvent.click(button)
    })
    // test("testing for table ", ()=>{
    //     render(
    //         <Router>
    //          <Dispatch />
    //         </Router> 
    //     );   
    //     const button = screen.findAllByRole('Table')
    //     expect(button).toBeInTheDocument();
    // })

    // test("testing for mock fetch ", ()=>{
    //     window.fetch = jest.fn()
    //     window.fetch.mockResolvedValueOnce({
    //         json: async () => ({
    //         id : 'test 1',
    //         Data : 'passed',
    //         })
    //     })

    //     render(
    //         <Router>
    //          <Dispatch />
    //        </Router> 
    //     )
    //     const check =  screen.getElementById('test 1')
    //     console.log("check ",check)
    //     // expect(check).not.toHaveLength(0)
    // })

    test("testing for count of buttons ", async ()=>{
        render(
                <Router>
                 <Dispatch />
                </Router> 
            );   
            const button = await screen.findAllByRole("button")
            // console.log("printing button : ",button)
            expect(button).toHaveLength(10)
    })

    // test("testing for previous action pagination Button ", ()=>{
    //     render(
    //         <Router>
    //          <Dispatch />
    //         </Router> 
    //     );   
    //     const button = screen.getByTitle('Previous Page')
    //     fireEvent.click(button)
    // })

})