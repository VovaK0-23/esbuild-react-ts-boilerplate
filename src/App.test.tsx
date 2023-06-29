import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { App } from './App';

describe('App component', () => {
  test('renders the component with initial count and message', () => {
    const message = 'Hello, world!';
    render(<App message={message} />);

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();

    const countElement = screen.getByText(/Count:/i);
    expect(countElement).toHaveTextContent('Count: 0');
  });

  test('increments the count when the button is clicked', async () => {
    render(<App message='Test Message' />);

    const countElement = screen.getByText(/Count:/i);
    const incrementButton = screen.getByRole('button', { name: /Increment/i });

    expect(countElement).toHaveTextContent('Count: 0');

    await userEvent.click(incrementButton);
    expect(countElement).toHaveTextContent('Count: 1');
  });
});
