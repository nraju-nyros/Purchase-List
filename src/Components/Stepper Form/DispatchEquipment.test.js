import { render , screen , fireEvent } from "@testing-library/react";
import { DispatchEquipment } from "./DispatchEquipment";
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
describe("describe inside dispatch.js ",  () => {
    test("testing for search title ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
         </Router> 
        );   
        const findText = screen.getByPlaceholderText('Search by Admin No. Serial No. or Description')
        expect(findText).toBeInTheDocument();
    })
    test("testing for search box ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
         </Router> 
        );   
    const findText = screen.getByPlaceholderText('Search by Admin No. Serial No. or Description')
    expect(findText).toBeInTheDocument();
    })
    test("testing for search box functionality ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
         </Router> 
        );   
        document.getElementById('searching').value = 'Norris'
        const lastNameInput = screen.getByDisplayValue('Norris')
        expect(lastNameInput).toBeTruthy();
    })
    
    test("testing for count of buttons ", async ()=>{
        render(
                <Router>
                 <DispatchEquipment />
                </Router> 
            );   
            const button = await screen.findAllByRole("button")
            // console.log("printing button : ",button)
            expect(button).toHaveLength(1)
    })
    
    test("testing for next Button ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );   
        const button = screen.getByRole('button', {name: 'Next'})
        expect(button).toBeInTheDocument()
        // fireEvent.click(button)
    })
    test("testing for no data found ",()=>{
        render(
                <Router>
                 <DispatchEquipment />
                </Router> 
            );   
            const el = document.querySelector('div.ant-empty-description')
            expect(el).toBeInTheDocument()
    })
    test("testing for Admin No header coloumn", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText('Admin No')
        // console.log("printing header : ",header)
        expect(header).toBeInTheDocument()
    })
    test("testing for STATUS STRCT DES header coloumn ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText(/STATUS STRCT DES/i)
        expect(header).toBeInTheDocument()
    })
    test("testing for Equipment header coloumn ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText(/Equipment/i)
        expect(header).toBeInTheDocument()
    })
    test("testing for Model No header coloumn ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText(/Model No/i)
        expect(header).toBeInTheDocument()
    })
    test("testing for Serial No header coloumn ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText(/Serial No/i)
        expect(header).toBeInTheDocument()
    })
    test("testing for OPER STATUS header coloumn ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText(/OPER STATUS/i)
        expect(header).toBeInTheDocument()
    })
    test("testing for TECH STATUS header coloumn ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText(/TECH STATUS/i)
        expect(header).toBeInTheDocument()
    })
    test("testing for Description header coloumn ", ()=>{
        render(
            <Router>
             <DispatchEquipment />
            </Router> 
        );
        const header = screen.getByText(/Description/i)
        expect(header).toBeInTheDocument()
    })
})