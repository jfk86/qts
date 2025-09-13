import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  const { container } = render(<App />);
  // Simple test to check if app renders without crashing
  expect(container).toBeTruthy();
});
