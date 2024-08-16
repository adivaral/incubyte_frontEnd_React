// src/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders form and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/enter numbers/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  test('displays the sum when valid numbers are entered', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1,2,3' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(await screen.findByText(/Sum is 6/i)).toBeInTheDocument();
  });

  test('displays an error message when negative numbers are entered', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1,-2,-3' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(await screen.findByText(/Error: Negative numbers not allowed: -2,-3/i)).toBeInTheDocument();
  });
});
