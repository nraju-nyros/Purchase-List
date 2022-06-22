import {render, screen,getByPlaceholderText,fireEvent,act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AddOperatorForm} from './AddOperatorForm';
import { BrowserRouter as Router } from "react-router-dom";

import axios from 'axios';

describe("Label", () => {
   test("testing for Add to List button", async () => {
    render(
      <Router>
        <AddOperatorForm />
      </Router>
    );
    const button = screen.getByRole("button", { name: "Add to List" });
    expect(button).toBeInTheDocument();
  });
});
// describe("Form Interaction", () => {
//     //Arrange--------------
//     // Set up variables accessible in tests
//     let wrapper: RenderResult;
//     let operatorName: HTMLInputElement;
//     let operatorType: HTMLInputElement;
//     let submitButtonNode: HTMLInputElement;
//     let handleSubmit: () => void;

//     beforeEach(() => {
//       handleSubmit = jest.fn();
//       const logSpy = jest.spyOn(console, "log");
//       wrapper = render(
//         <Router>
//           <AddOperatorForm />
//         </Router>
//       );

//       // operatorName = wrapper.getByPlaceholderText(/Select an Operator/);
//       // const button = screen.getByRole("button", { name: "Add to List" });
//       // operatorName = screen.getByRole('combobox');
//       // const elt = getByTestId('rc_select_TEST_OR_SSR').firstElementChild;
       
//       operatorType = wrapper.getByText(/Select an operatorType/);
//       submitButtonNode = wrapper.getByText("Add to List");

//       //Act--------------
//       // Change the input values
//       act(() => {
//         // fireEvent.change(operatorName, {target: { value: "operatorName" },});
//         fireEvent.change(operatorType, { target: { value: "operatorType" } });
//         // fireEvent.click(screen.getByText(/Next/i));
//         const button = screen.getByRole("button", { name: "Add to List" });
//         fireEvent.click(button);
//         // expect(handleSubmit).toHaveBeenCalledTimes(1);
//         // const button = screen.getByRole('button', {name:'Next'});
//         // fireEvent.click(button)
//         // expect(handleSubmit).toHaveBeenCalledTimes(1);
//       });
//     });

//     test("Submits", () => {
//       //Assert--------------
//       // expect(handleSubmit).toBeCalledTimes(1);
//       // expect(handleSubmit).toHaveBeenCalledTimes(1);
//       // const button = screen.getByRole('button', {name:'Next'});
//       // fireEvent.click(button)
//       // expect(handleSubmit).toHaveBeenCalledWith({"id": 1}, "jwt");
//     });
//   });

