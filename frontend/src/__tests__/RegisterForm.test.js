import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm";

describe("RegisterForm Component", () => {
    // Mock data and functions
  const mockFormData = { username: "", email: "", password: "", confirmPassword: "" };
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();


  beforeEach(() => {
    // Clear the mocks before next test
    jest.clearAllMocks();
  });




  it("should render form with all required inputs and buttons", () => {
    // Arrange: render the RegisterForm component
    render(
      <RegisterForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    // Assert: all feilds are rendered correctly
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    const passwordInputs = screen.queryAllByLabelText(/password/i);
    expect(passwordInputs).toHaveLength(2); // Ensures both password and confirmPassword are present
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });




  it("calls onChange handler when typing in inputs", () => {
    // Arrange: render the RegisterForm component
    render(
      <RegisterForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);


    // Act: user inputs username and email
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });


    // Assert: the user input has been picked up by the inputs
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });




  it("toggles password and confirm password visibility", () => {
    // Arrange: render the RegisterForm component
    render(
        <RegisterForm formData={mockFormData} onChange={mockOnChange} onSubmit={mockOnSubmit} />
    );
  
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);
    const [togglePasswordButton, toggleConfirmPasswordButton] = screen.getAllByRole("button", { name: /show/i });


    // Assert: password is hidden (input type password)
    expect(passwordInput).toHaveAttribute("type", "password");

    // Act: click show password button (toggle button)
    fireEvent.click(togglePasswordButton);

    // Assert: password is shown (input type text)
    expect(passwordInput).toHaveAttribute("type", "text");

    // Act: click show password button
    fireEvent.click(togglePasswordButton);

    // Assert: password is hidden again
    expect(passwordInput).toHaveAttribute("type", "password");


    // Assert: confirm password is hidden (input type password)
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
    
    fireEvent.click(toggleConfirmPasswordButton);
    expect(confirmPasswordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleConfirmPasswordButton);
    expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });




  it("displays an error message if passwords do not match", () => {
    // Arrange: render the RegisterForm component
    render(
      <RegisterForm
        formData={{ ...mockFormData, password: "password123", confirmPassword: "password321" }}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    const registerButton = screen.getByRole("button", { name: /register/i });
    
    
    // Act: submit not matching passwords
    fireEvent.click(registerButton);


    // Assert: the form has detected that the passwords dont match
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });




  it("submits the form if passwords match", () => {
    // Arrange: render the RegisterForm component
    render(
      <RegisterForm
        formData={{ ...mockFormData, password: "password123", confirmPassword: "password123" }}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    const registerButton = screen.getByRole("button", { name: /register/i });
    
    
    // Act: submit form with matching passwords
    fireEvent.click(registerButton);


    // Assert: The form has been submitted successfully
    expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });


});
