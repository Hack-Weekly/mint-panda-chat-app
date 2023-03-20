import { render, screen } from '@testing-library/react';
import App from '../../App';

it('should render a heading called Chat App', async () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: 'Chat App' });
  expect(headingElement).toBeInTheDocument();
});
