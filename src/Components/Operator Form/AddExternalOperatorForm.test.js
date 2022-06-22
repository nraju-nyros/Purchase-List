import {render, screen,getByPlaceholderText,fireEvent,act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AddExternalOperatorForm} from './AddExternalOperatorForm';
import { BrowserRouter as Router } from "react-router-dom";

import axios from 'axios';

describe("Label", () => {
  test('Operators List',() => {
    render(<Router><AddExternalOperatorForm /></Router>);
    const form_label = screen.getByText('Enter External Operator Details');

   expect(form_label).toBeInTheDocument();
  });


  test("testing for Add to List button", async () => {
    render(
      <Router>
        <AddExternalOperatorForm />
      </Router>
    );
    const button = screen.getByRole("button", { name: "Add to List" });
    expect(button).toBeInTheDocument();
  });
});

describe("Form Interaction", () => {
    //Arrange--------------
    // Set up variables accessible in tests
    let wrapper: RenderResult;
    let firstName: HTMLInputElement;
    let lastName: HTMLInputElement;
    let submitButtonNode: HTMLInputElement;
    let handleSubmit: () => void;

    beforeEach(() => {
      handleSubmit = jest.fn();
      const logSpy = jest.spyOn(console, "log");
      wrapper = render(
        <Router>
          <AddExternalOperatorForm />
        </Router>
      );

      firstName = wrapper.getByPlaceholderText(/First name/);



      lastName = wrapper.getByPlaceholderText(/Last name/);
     
      submitButtonNode = wrapper.getByText("Add to List");

      //Act--------------
      // Change the input values
      act(() => {
        fireEvent.change(firstName, {target: { value: "firstName" },});
        fireEvent.change(lastName, { target: { value: "lastName" } });
        // fireEvent.click(screen.getByText(/Next/i));
        const button = screen.getByRole("button", { name: "Add to List" });
        fireEvent.click(button);
        // expect(handleSubmit).toHaveBeenCalledTimes(1);
        // const button = screen.getByRole('button', {name:'Next'});
        // fireEvent.click(button)
        // expect(handleSubmit).toHaveBeenCalledTimes(1);
      });
    });

    test("Submits", () => {
      //Assert--------------
      // expect(handleSubmit).toBeCalledTimes(1);
      // expect(handleSubmit).toHaveBeenCalledTimes(1);
      // const button = screen.getByRole('button', {name:'Next'});
      // fireEvent.click(button)
      // expect(handleSubmit).toHaveBeenCalledWith({"id": 1}, "jwt");
    });
  });