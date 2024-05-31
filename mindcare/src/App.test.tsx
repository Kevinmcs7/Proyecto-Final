import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';


test('renderizar el enlace "Registrar"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Registros de cita')).toBeInTheDocument();
});

///// Renderizar el codigo de get /////

// Limpiar el mock después de cada prueba
afterEach(() => {
  vi.clearAllMocks();
});

// Mock del fetch para evitar llamadas reales a la API
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { nombre: 'Juan Perez', telefono: '123456789', fecha: '2024-05-28', hora: '10:30' },
      { nombre: 'Maria Gomez', telefono: '987654321', fecha: '2024-06-01', hora: '14:00' }
    ]),
  })
) as jest.Mock;

describe('Dashboard', () => {
  it('debería renderizar citas obtenidas correctamente', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Esperar a que aparezcan las citas
    await waitFor(() => {
      expect(screen.getByText('Nombre: Juan Perez')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Nombre: Maria Gomez')).toBeInTheDocument();
    });
  });
});


