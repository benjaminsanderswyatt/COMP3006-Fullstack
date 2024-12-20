import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../pages/Layout', () => () => <div>Mock Layout Component</div>);
jest.mock('../pages/Login', () => () => <div>Mock Login Component</div>);
jest.mock('../pages/Store', () => () => <div>Mock Store Component</div>);
jest.mock('../pages/MyProducts', () => () => <div>Mock MyProducts Component</div>);
jest.mock('../pages/Account', () => () => <div>Mock Account Component</div>);
jest.mock('../pages/Cart', () => () => <div>Mock Cart Component</div>);
jest.mock('../pages/NoPage', () => () => <div>Mock NoPage Component</div>);

describe('App Component', () => {
  test('renders login page at the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Login Component')).toBeInTheDocument();
  });

  test('renders 404 page for an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock NoPage Component')).toBeInTheDocument();
  });

  test('redirects to login if no token exists when accessing protected routes', () => {
    render(
      <MemoryRouter initialEntries={['/store']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Login Component')).toBeInTheDocument();
  });

  test('renders store page if token exists', () => {
    localStorage.setItem('token', 'mock-token'); // Set a mock token
    render(
      <MemoryRouter initialEntries={['/store']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Store Component')).toBeInTheDocument();
    localStorage.removeItem('token'); // Clean up
  });

  test('renders account page if token exists', () => {
    localStorage.setItem('token', 'mock-token'); // Set a mock token
    render(
      <MemoryRouter initialEntries={['/account']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Mock Account Component')).toBeInTheDocument();
    localStorage.removeItem('token'); // Clean up
  });
});