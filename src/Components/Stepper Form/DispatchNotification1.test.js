import { render, screen, fireEvent, act } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { DispatchNotification1 } from "./DispatchNotification1";

describe("describe inside dispatch.js ", () => {

  // test("testing for title ", () => {
  //   render(
  //     <Router>
  //       <DispatchNotification1 />
  //     </Router>
  //   );
  //   const findText = screen.getByText("Create Dispatch Notification", {
  //     exact: true,
  //   });
  //   expect(findText).toBeInTheDocument();
  // });

  test("Form Submits and validation", () => {
    render(
      <Router>
        <DispatchNotification1 />
      </Router>
    );
    const button = screen.getByText("Next");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const errorMessage = screen.getByText("Description");
    expect(errorMessage).toBeInTheDocument();
  });

  test("testing for buttons", async () => {
    render(
      <Router>
        <DispatchNotification1 />
      </Router>
    );
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(2);
  });

  test("testing for Next button", async () => {
    render(
      <Router>
        <DispatchNotification1 />
      </Router>
    );
    const button = screen.getByRole("button", { name: "Next" });
    expect(button).toBeInTheDocument();
  });

  test("testing for Previous button", async () => {
    render(
      <Router>
        <DispatchNotification1 />
      </Router>
    );
    const button = screen.getByRole("button", { name: "Previous" });
    expect(button).toBeInTheDocument();
  });





  describe("Form Interaction", () => {
    //Arrange--------------
    // Set up variables accessible in tests
    let wrapper: RenderResult;
    let descriptionNode: HTMLInputElement;
    let startDateNode: HTMLInputElement;
    let startTimeNode: HTMLInputElement;
    let endDateNode: HTMLInputElement;
    let endTimeNode: HTMLInputElement;
    let submitButtonNode: HTMLInputElement;
    let handleSubmit: () => void;

    beforeEach(() => {
      handleSubmit = jest.fn();
      const logSpy = jest.spyOn(console, "log");
      wrapper = render(
        <Router>
          <DispatchNotification1 />
        </Router>
      );

      descriptionNode = wrapper.getByPlaceholderText(/Description/);
      startDateNode = wrapper.getByPlaceholderText(/Select Start Date/);
      startTimeNode = wrapper.getByPlaceholderText(/Select Start Time/);
      endDateNode = wrapper.getByPlaceholderText(/Select End Date/);
      endTimeNode = wrapper.getByPlaceholderText(/Select End Time/);
      submitButtonNode = wrapper.getByText("Next");

      //Act--------------
      // Change the input values
      act(() => {
        fireEvent.change(descriptionNode, {target: { value: "Changed Description" },});
        fireEvent.change(startDateNode, { target: { value: "12/11/2021" } });
        fireEvent.change(startTimeNode, { target: { value: "12:00" } });
        fireEvent.change(endDateNode, { target: { value: "12/11/2021" } });
        fireEvent.change(endTimeNode, { target: { value: "12:00" } });
        // fireEvent.click(screen.getByText(/Next/i));
        const button = screen.getByRole("button", { name: "Next" });
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

  // test('button click',() => {
  //     render(<DispatchEquipment/>);
  //        const button = screen.getByRole('button', {name:'Next'});

  //     // fireEvent.change(deviceNameInput, { target: { value: "AG100" } });
  //        fireEvent.click(button)
  // });

 
});
















































// import React from "react";
// import {
//   render,
//   screen,
//   fireEvent,
//   act,
//   RenderResult,
//   wait,
//   getByLabelText,
//   getByText,
// } from "@testing-library/react";

// import DispatchNotification1 from "./DispatchNotification1";
// import { BrowserRouter as Router } from "react-router-dom";

// it("Test form submit and validation", () => {
//   // const { getByPlaceholderText, getByText } = render(<Router><DispatchNotification1 /></Router>);
//   // const deviceNameInput = getByPlaceholderText(/device name/i);

//   // fireEvent.change(deviceNameInput, { target: { value: "AP VII C2230" } });
//   // fireEvent.click(getByText(/Save Device/i));

//   //  const linkElement = screen.getByText(/Testing Data/i);
//   // expect(linkElement).toBeInTheDocument();
//   render(
//     <Router>
//       <DispatchNotification1 />
//     </Router>
//   );
//   const helloWorld = screen.getByText("Create Dispatch Notification", {
//     exact: true,
//   });
//   expect(helloWorld).toBeInTheDocument();
//   // // Find the button to retrieve the books
//   // const button = getByText('Next');
//   // expect(button).toBeInTheDocument();
//   // fireEvent.click(button);

//   // const errorMessage = screen.getByText('Description is required');
//   // expect(errorMessage).toBeInTheDocument();
// });

// it("Test form submit and validation", () => {
//   const { getByPlaceholderText, getByText } = render(
//     <Router>
//       <DispatchNotification1 />
//     </Router>
//   );
//   //     render(<Router><DispatchNotification1 /></Router>);

//   //    // const deviceNameInput = getByPlaceholderText(/device name/i);

//   //   // fireEvent.change(deviceNameInput, { target: { value: "AP VII C2230" } });
//   //   fireEvent.click(screen.getByText(/Next/i));

//   //   const errorMessage = screen.getByText('Description');
//   //     expect(errorMessage).toBeInTheDocument();

//   //  //  const linkElement = screen.getByText(/Testing Data/i);
//   //   // expect(linkElement).toBeInTheDocument();

//   // Find the button to retrieve the books
//   //     let wrapper: RenderResult;

//   const button = getByText("Next");
//   expect(button).toBeInTheDocument();
//   fireEvent.click(button);

//   const errorMessage = screen.getByText("Description");
//   expect(errorMessage).toBeInTheDocument();
// });

// it("show the sended message", () => {
//   const onSubmit = jest.fn();
//   const { getByLabelText, getByText } = render(<Router><DispatchNotification1 onSubmit={onSubmit} /></Router>);
//   const inputValue = "12";

//   fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: inputValue } });
//   fireEvent.click(getByText(/Next/i));

//   expect(onSubmit).toHaveBeenCalled();
// });

// describe("PersonalInfoForm", () => {
//   describe("Form Interaction", () => {
//     //Arrange--------------
//     // Set up variables accessible in tests
//     let wrapper: RenderResult;
//     let descriptionNode: HTMLInputElement;
//     let startDateNode: HTMLInputElement;
//     let startTimeNode: HTMLInputElement;
//     let endDateNode: HTMLInputElement;
//     let submitButtonNode: HTMLInputElement;
//     let handleSubmit: () => void;

//     beforeEach(() => {
//       handleSubmit = jest.fn();

//       const initialValues = {
//         city: "",
//         monthlyAmount: "",
//         moveInDate: "", // MM-DD-YYYY
//         state: "",
//         street1: "",
//         street2: "",
//         residenceType: "RENT",
//         zipCode: "",
//       };

//       const props = {
//         // submitLogin,
//         initialValues: initialValues,
//         onSubmit: handleSubmit,
//       };

//       wrapper = render(
//         <Router>
//           <DispatchNotification1 {...props} />
//         </Router>
//       );

//       descriptionNode = wrapper.getByPlaceholderText(/Description/);
//       startDateNode = wrapper.getByPlaceholderText(/Select Start Date/);
//       startTimeNode = wrapper.getByPlaceholderText(/Select Start Time/);
//       endDateNode = wrapper.getByPlaceholderText(/Select End Date/);
//       submitButtonNode = wrapper.getByText("Next");

//       //Act--------------
//       // Change the input values
//       act(() => {
//         fireEvent.change(descriptionNode, {
//           target: { value: "1231 Warner Ave" },
//         });
//         fireEvent.change(startDateNode, { target: { value: "Tustin" } });
//         fireEvent.change(startTimeNode, { target: { value: "CA" } });
//         fireEvent.change(endDateNode, { target: { value: "92780" } });
//         fireEvent.click(screen.getByText(/Next/i));
//       });
//     });

//     test("Submits", () => {
//       //Assert--------------
//       // expect(handleSubmit).toBeCalledTimes(1);
//       expect(handleSubmit).toHaveBeenCalledTimes(1);
//       // expect(handleSubmit).toHaveBeenCalledWith({"id": 1}, "jwt");
//     });
//   });
// });
