// src/App.test.tsx
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders form and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/enter numbers/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  test('displays an error message when negative numbers are entered', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1,-4,3' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(await screen.findByText(/error: negative numbers not allowed/i)).toBeInTheDocument();
  });

  test('displays an error message for multiple negative numbers', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1,-2,-3' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(await screen.findByText(/error: negative numbers not allowed: -2,-3/i)).toBeInTheDocument();
  });

});
