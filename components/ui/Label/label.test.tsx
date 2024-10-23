import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Label from '@components/ui/Label';

describe('Label Component', () => {
  it('renders Label component with children', () => {
    render(<Label>Label Text</Label>);

    expect(screen.getByText('Label Text')).toBeInTheDocument();
  });

  it('displays the required asterisk when required prop is true', () => {
    render(<Label required>Required Label</Label>);

    expect(screen.getByText('Required Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders the info icon when info prop is provided', () => {
    render(<Label info="Additional Info">Label with Info</Label>);

    expect(screen.getByTestId('icon-info')).toBeInTheDocument();
  });

  it('applies the correct font variant and size', () => {
    const { container } = render(
      <Label font="bold" sizes="large">
        Styled Label
      </Label>
    );

    expect(container.firstChild).toHaveClass('font-bold');
    expect(container.firstChild).toHaveClass('text-lg');
  });

  it('renders with custome className', () => {
    const { container } = render(
      <Label className="custom-class">Custom Label</Label>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
