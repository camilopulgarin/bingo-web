import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const mockSubmit = vi.fn(() => Promise.resolve());

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('renderiza formulario con inputs y botón', () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  test('valida campos vacíos y muestra errores', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    userEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(await screen.findByText(/El correo electrónico es requerido/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es requerida/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('envía datos válidos al onSubmit', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText(/Correo Electrónico/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/Contraseña/i), '123456');

    await userEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    // Esperar que mockSubmit se haya llamado con los datos
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456',
    });
  });

  test('muestra error si onSubmit rechaza', async () => {
    const mockSubmitReject = vi.fn(() => Promise.reject());
    render(<LoginForm onSubmit={mockSubmitReject} />);

    userEvent.type(screen.getByLabelText(/Correo Electrónico/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/Contraseña/i), '123456');

    userEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(await screen.findByText(/Credenciales incorrectas/i)).toBeInTheDocument();
  });
});
