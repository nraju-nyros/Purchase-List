import {render, screen,getByPlaceholderText,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AddOperator} from './AddOperator';
import { BrowserRouter as Router } from "react-router-dom";



import axios from 'axios';

describe("Label", () => {
  test('Operators List',() => {
    render(<Router>
      <AddOperator />
    </Router>);
    const helloWorld = screen.getByText('Operators List', {exact:true});
    expect(helloWorld).toBeInTheDocument();
  });

   test('No Operators',() => {
  render(<Router>
      <AddOperator />
    </Router>);
    const helloWorld = screen.getByText('No Operators Added', {exact:true});
    expect(helloWorld).toBeInTheDocument();
  });

  test("testing for buttons", async () => {
    render(
      <Router>
        <AddOperator />
      </Router>
    );
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(3);
  });

  test("testing for Next button", async () => {
    render(
      <Router>
        <AddOperator />
      </Router>
    );
    const button = screen.getByRole("button", { name: "Create" });
    expect(button).toBeInTheDocument();
  });

  test("testing for Previous button", async () => {
    render(
      <Router>
        <AddOperator />
      </Router>
    );
    const button = screen.getByRole("button", { name: "Previous" });
    expect(button).toBeInTheDocument();

  });

});