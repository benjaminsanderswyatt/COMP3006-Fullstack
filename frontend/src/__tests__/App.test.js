import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from '../App';

describe('App Component', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the login page by default', () => {
    act(() => {
      render(<App />);
    });

    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
  });
});
