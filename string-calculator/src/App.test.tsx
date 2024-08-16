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

  test('handles new lines between numbers and calculates sum correctly', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1\n4,6' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(await screen.findByText(/sum is 11/i)).toBeInTheDocument();
  });

  test('handles different delimiters', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '//;\n1;2' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    expect(await screen.findByText(/sum is 3/i)).toBeInTheDocument();
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
