// Button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@components/ui/Button';

describe('Button Component', () => {
  it('renders Button with text', () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('renders Button with an icon', () => {
    const MockIcon = () => <span data-testid="mock-icon">🔍</span>;
    render(<Button icon={{ icon: MockIcon }}>Search</Button>);

    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Search');

    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies the correct classes based on variant and size', () => {
    render(
      <Button variant="outlined" size="big">
        Outlined Button
      </Button>
    );

    const buttonElement = screen.getByRole('button', {
      name: /outlined button/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'border border-Blue-700 text-Blue-600 bg-white hover:text-Blue-700'
    );
    expect(buttonElement).toHaveClass('font-bold text-xl');
  });

  it('renders Button with custom class names', () => {
    render(<Button className="custom-class">Styled Button</Button>);

    const buttonElement = screen.getByRole('button', {
      name: /styled button/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('custom-class');
  });
});
