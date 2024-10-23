import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '@components/ui/Input';
import { IconUser, IconBuildingSkyscraper } from '@tabler/icons-react';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders start and end icons correctly', () => {
    render(
      <Input
        start_icon={IconUser}
        end_icon={IconBuildingSkyscraper}
        placeholder="Input with icons"
      />
    );

    const inputElement = screen.getByPlaceholderText('Input with icons');
    expect(inputElement).toBeInTheDocument();

    const startIcon = screen.getByTestId('start-icon');
    expect(startIcon).toBeInTheDocument();

    const endIcon = screen.getByTestId('end-icon');
    expect(endIcon).toBeInTheDocument();
  });

  it('applies correct size variant based on props', () => {
    const { rerender } = render(
      <Input placeholder="Small size" sizes="small" />
    );

    const inputElement = screen.getByPlaceholderText('Small size');
    expect(inputElement.parentElement).toHaveClass('text-base py-[6px]');

    rerender(<Input placeholder="Large size" sizes="large" />);
    const inputLarge = screen.getByPlaceholderText('Large size');
    expect(inputLarge.parentElement).toHaveClass('text-xl py-[8px]');
  });

  it('applies correct theme variant based on props', () => {
    const { rerender } = render(
      <Input placeholder="Normal theme" theme="normal" />
    );

    const inputElement = screen.getByPlaceholderText('Normal theme');
    expect(inputElement.parentElement).toHaveClass(
      'focus-within:ring-blue-200 text-Neutral-500'
    );

    rerender(<Input placeholder="Danger theme" theme="danger" />);
    const inputDanger = screen.getByPlaceholderText('Danger theme');
    expect(inputDanger.parentElement).toHaveClass(
      'focus-within:ring-Red-200 text-Red-500'
    );
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Input change" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText('Input change');

    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders input as disabled when disabled prop is passed', () => {
    render(<Input placeholder="Disabled input" disabled />);

    const inputElement = screen.getByPlaceholderText('Disabled input');
    expect(inputElement).toBeDisabled();
  });
});
