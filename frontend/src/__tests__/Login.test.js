import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import * as fetchUsers from '../api/fetchUsers';

describe('Login Component', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });



  it('renders login form initially', () => {
    // Arrange: mock Login page
    act(() => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Act: None needed

    // Assert: Page renders correctly
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });



  it('toggles to register form', () => {
    // Arrange: mock Login page
    act(() => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Act: Toggle to the register form
    fireEvent.click(screen.getByText(/Register/i));

    // Assert: Register form is displayed correctly
    expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();

    const passwordsScreen = screen.queryAllByLabelText(/Password/i); // Gets all password labels (password & confirm password)

    expect(passwordsScreen[0]).toBeInTheDocument(); // password
    expect(passwordsScreen[1]).toBeInTheDocument(); // confirm password
  });



  it('handles form input changes', () => {
    // Arrange: mock Login page
    act(() => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Act: Type in a email
    const emailInput = screen.getByLabelText(/Email/i);
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    });
    // Assert: The input correctly holds typed in value
    expect(emailInput.value).toBe('test@test.com');


    // Act: Type in a password
    const passwordInput = screen.getByLabelText(/Password/i);
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });
    // Assert: The input correctly holds typed in value
    expect(passwordInput.value).toBe('password');
  });



  it('submits login form and saves token on success', async () => {
    // Arrange: Mock the API token response for successful login
    const loginSpy = jest.spyOn(fetchUsers, 'login').mockResolvedValue({ success: true, token: 'mock-token' });

    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Act: Fill in fields and press login button
    act(() => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

      fireEvent.click(screen.getByRole('button', { name: /Login/i })); // Press login button
    });

    // Assert: Verify that the login API was called and returned the mocked token
    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith('test@test.com', 'password');
      expect(localStorage.getItem('token')).toBe('mock-token');
    });

    loginSpy.mockRestore();
  });



  it('shows message when login fails', async () => {
    // Arrange: Mock the API token response for failed login
    const loginSpy = jest.spyOn(fetchUsers, 'login').mockResolvedValue({ success: false });

    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Act: Fill in inputs and press login button
    act(() => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@email.com' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });

      fireEvent.click(screen.getByRole('button', { name: /Login/i })); // Press login button
    });

    // Assert: Verify that the login has failed
    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith('wrong@email.com', 'wrongpassword');
      expect(screen.getByText('Incorrect username or password. Please try again.')).toBeInTheDocument();
    });

    loginSpy.mockRestore();
  });



  it('submits register form successfully', async () => {
    // Arrange: Mock the API response for successful register
    const registerSpy = jest.spyOn(fetchUsers, 'register').mockResolvedValue({ success: true });

    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Act: Fill in inputs and press register button
    act(() => {
      fireEvent.click(screen.getByText(/Register/i));
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
      fireEvent.change(screen.getByLabelText(/Password/i, { selector: 'input[name="password"]' }), { target: { value: 'password' } });
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password' } });
      
      fireEvent.click(screen.getByRole('button', { name: /Register/i })); // Press register button
    });

    // Assert: Verify that the registration has succeeded
    await waitFor(() => {
      expect(registerSpy).toHaveBeenCalledWith('testuser', 'test@example.com', 'password');
      expect(screen.getByText(/Login/i)).toBeInTheDocument(); // Should switch back to login form
    });

    registerSpy.mockRestore();
  });



  it('shows message when registration fails', async () => {
    // Arrange: Mock the API response for successful register
    const registerSpy = jest.spyOn(fetchUsers, 'register').mockResolvedValue({ success: false, message: 'Registration error' });

    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });

    // Act: Fill in inputs and press register button
    act(() => {
      fireEvent.click(screen.getByText(/Register/i));
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
      fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
      fireEvent.change(screen.getByLabelText(/Password/i, { selector: 'input[name="password"]' }), { target: { value: 'password' } });
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password' } });
      
      fireEvent.click(screen.getByRole('button', { name: /Register/i })); // Press register button
    });

    // Assert: Verify that the registration has failed
    await waitFor(() => {
      expect(registerSpy).toHaveBeenCalledWith('testuser', 'test@test.com', 'password');
      expect(screen.getByText('Registration error')).toBeInTheDocument();
    });

    registerSpy.mockRestore();
  });

});
