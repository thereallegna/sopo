import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox } from '@components/ui/Checkbox';

it('renders Checkbox component', () => {
  // Memastikan elemen checkbox muncul di dokumen
  render(<Checkbox />);

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
});

it('renders with label', () => {
  // Memastikan elemen checkbox dan label muncul
  render(<Checkbox id="checkbox" label="Accept Terms" />);

  const checkbox = screen.getByRole('checkbox');
  const label = screen.getByLabelText('Accept Terms');
  expect(checkbox).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

it('changes state when clicked', () => {
  // Memastikan checkbox di-check setelah diclick
  render(<Checkbox />);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

it('renders as disabled and cannot be clicked', () => {
  // Memastikan checkbox tidak berubah saat diclick
  render(<Checkbox disabled />);

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeDisabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

it('applies custom className', () => {
  // Memastikan CSS tambahan diterapkan dengan benar
  render(<Checkbox className="custom-class" />);

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toHaveClass('custom-class');
});

// it('matches snapshot', () => {
//     const { asFragment } = render(<Checkbox label="Snapshot Label" />);
//     expect(asFragment()).toMatchSnapshot();
// });
