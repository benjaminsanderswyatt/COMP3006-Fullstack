import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

describe("LoginForm Component", () => {
  // Mock data and functions
  const mockFormData = { email: "", password: "" };
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());


  beforeEach(() => {
    // Clear the mocks before next test
    jest.clearAllMocks();
  });



  it("renders the login form companant with inputs", () => {
    // Arrange: render the LoginForm componant
    render(
      <LoginForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );


    // Assert: all items are rendered correctly
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });



  it("email and password inputs call onchange when changed", () => {
    // Arrange: render the LoginForm componant
    render(
      <LoginForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    // Act: user inputs email and password
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });


    // Assert: the user input has been picked up by the inputs
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });



  it("should submit forom when login button is pressed", () => {
    // Arrange: render the LoginForm componant
    render(
      <LoginForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    // Act: user submits form
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));
    
    // Assert: the form has been submitted correctly
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });



  it("should toggle password visibility with button", () => {
    // Arrange: render the LoginForm componant
    render(
      <LoginForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole("button", { name: /show/i });

    // Assert: password is hidden (input type password)
    expect(passwordInput).toHaveAttribute("type", "password");

    // Act: click show password button (toggle button)
    fireEvent.click(toggleButton);

    // Assert: password is shown (input type text)
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(toggleButton).toHaveTextContent(/hide/i);

    // Act: click hide password button  (toggle button)
    fireEvent.click(toggleButton);

    // Assert: password is hidden again
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleButton).toHaveTextContent(/show/i);
  });



  it("email and password fields are required", () => {
    // Arrange: render the LoginForm componant
    render(
      <LoginForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Assert: email and password have the required attribute
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

});
