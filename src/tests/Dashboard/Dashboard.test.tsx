import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';

const MockDashboardComponent = () => {
  return (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

it('should render a button with the word Logout', () => {
  render(<MockDashboardComponent />);

  const buttonEl = screen.getByRole('button', { name: 'Logout' });
  expect(buttonEl).toHaveTextContent('Logout');
});
