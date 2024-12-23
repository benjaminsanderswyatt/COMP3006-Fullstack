import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from '../App';

describe('App Component', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the login page by default', () => {
    // Assert

    // Act: render app page
    act(() => {
      render(
          <App />
      );
    });

    // Assert: The login page is showing
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
  });

});
