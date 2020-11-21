import { render, screen } from '@testing-library/react';
import Login from './controllers/login/Login';

test('renders learn react link', () => {
  render(<Login/>);

  const linkElementEmail = screen.getByPlaceholderText(/Correo electrónico/i);
  expect(linkElementEmail).toBeInTheDocument();
  const linkElementPass = screen.getByPlaceholderText(/Contraseña/i);
  expect(linkElementPass).toBeInTheDocument();
});
