import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconComponent from '.';

const MockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} data-testid="mock-icon" />
);

describe('IconComponent', () => {
  it('renders the icon correctly', () => {
    render(<IconComponent icon={MockIcon} />);

    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies the correct size class', () => {
    render(
      <IconComponent icon={MockIcon} size="small" data-testid="mock-icon" />
    );

    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toHaveClass('w-3 h-3');
  });

  it('applies the correct colos class', () => {
    render(
      <IconComponent icon={MockIcon} color="primary" data-testid="mock-icon" />
    );

    const iconElement = screen.getByTestId('mock-icon');
    console.log(iconElement.className);

    expect(iconElement).toHaveClass('text-Neutral-500');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();

    render(<IconComponent icon={MockIcon} onClick={handleClick} />);

    const iconElement = screen.getByTestId('mock-icon');
    fireEvent.click(iconElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('combines class names correctly', () => {
    render(
      <IconComponent
        icon={MockIcon}
        className="custom-class"
        data-testid="mock-icon"
      />
    );

    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toHaveClass('custom-class');
  });
});
