import { render, screen } from '@testing-library/react';
import { act } from 'react';
import NoPage from '../pages/NoPage';

describe('NoPage Component', () => {
    it('renders 404 text', () => {
        // Arrange: No setup required

        // Act: Render the NoPage
        act(() => {
            render(<NoPage />);
        });

        // Assert: Enusre correct text is being displayed
        const headingElement = screen.getByText(/404/i);
        expect(headingElement).toBeInTheDocument();
    });
  });