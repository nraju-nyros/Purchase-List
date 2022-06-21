import { render, screen , fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom';
import {NotificationsDeviceList} from "./NotificationsDeviceList";


describe("describe inside Notification Device List ",  () => {
   
    test("testing for title ", ()=>{
        render(
            <Router>
             <NotificationsDeviceList />
         </Router> 
        );   
        const findText = screen.getByPlaceholderText('Search by Admin No. Serial No. or Description')
        expect(findText).toBeInTheDocument();
    })
    test("testing for search box functionality ", ()=>{
        render(
            <Router>
             <NotificationsDeviceList />
         </Router> 
        );   
        document.getElementById('searching').value = 'Norris'
        const lastNameInput = screen.getByDisplayValue('Norris')
    expect(lastNameInput).toBeTruthy();
    })

    test("testing for count of buttons ", async ()=>{
        render(
                <Router>
                 <NotificationsDeviceList />
                </Router> 
            );   
            const button = await screen.findAllByRole("button")
            // console.log("printing button : ",button)
            expect(button).toHaveLength(2)
    })
    // test("testing for fireEvent on work order index page create work order Button ", async ()=>{
    //     render(
    //         <Router>
    //           <NotificationsDeviceList />
    //         </Router> 
    //     );   
    //     const button = await screen.getElementById('button-next') 
    //     fireEvent.click(button)
    //     // expect(button).toHaveLength(2)
    // })

    

})