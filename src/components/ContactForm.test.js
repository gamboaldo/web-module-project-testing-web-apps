import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);

  const header = screen.getByText(/Contact Form/i);

  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);

  const nameIn = screen.getByLabelText("First Name*");

  userEvent.type(nameIn, "bob");

  const errors = await screen.findAllByText(/error/i);

  expect(errors.length).toEqual(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const btn = screen.getByRole("button");

  userEvent.click(btn);

  const errors = await screen.findAllByText(/error/i);

  expect(errors.length).toEqual(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);

  const first = screen.getByLabelText("First Name*");
  const last = screen.getByLabelText("Last Name*");
  const email = screen.getByLabelText("Email*");

  userEvent.type(first, "bobby");
  userEvent.type(last, "gamboa");
  userEvent.type(email, "bobillb@");

  const errors = await screen.findAllByText(/error/i);

  expect(errors.length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const email = screen.getByLabelText("Email*");

  userEvent.type(email, "bobillb@");

  const error = await screen.findAllByText(
    /email must be a valid email address/i
  );

  expect(error);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const first = screen.getByLabelText("First Name*");
  const last = screen.getByLabelText("Last Name*");
  const email = screen.getByLabelText("Email*");

  userEvent.type(first, "bobby");
  userEvent.type(last, "");
  userEvent.type(email, "bobillb@");

  const btn = screen.getByRole("button");

  userEvent.click(btn);

  const error = await screen.findAllByText(/lastName is a required field/i);

  expect(error);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);

  const first = screen.getByLabelText("First Name*");
  const last = screen.getByLabelText("Last Name*");
  const email = screen.getByLabelText("Email*");

  userEvent.type(first, "bobby");
  userEvent.type(last, "billy");
  userEvent.type(email, "hello@gmail.com");

  const btn = screen.getByRole("button");

  userEvent.click(btn);

  const submittedFirst = await screen.findByText(/bobby/i);
  const submittedLast = await screen.findByText(/billy/i);
  const submittedEmail = await screen.findByText(/hello@gmail/i);

  expect(submittedFirst).toBeInTheDocument();
  expect(submittedLast).toBeInTheDocument();
  expect(submittedEmail).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);

  const first = screen.getByLabelText("First Name*");
  const last = screen.getByLabelText("Last Name*");
  const email = screen.getByLabelText("Email*");
  const message = screen.getByLabelText("Message");
  const btn = screen.getByRole("button");

  userEvent.type(first, "aldoa");
  userEvent.type(last, "gamboa");
  userEvent.type(email, "aldo@gmail.com");
  userEvent.type(message, "hellobitch");

  userEvent.click(btn);

  const submittedFirst = await screen.findByText(/aldoa/i);
  const submittedLast = await screen.findByText(/gamboa/i);
  const submittedEmail = await screen.findByText(/aldo@gmail.com/i);
  const submittedMessage = await screen.findByDisplayValue(/hellobitch/i);

  expect(submittedFirst).toBeInTheDocument();
  expect(submittedLast).toBeInTheDocument();
  expect(submittedEmail).toBeInTheDocument();
  expect(submittedMessage).toBeInTheDocument();
});
