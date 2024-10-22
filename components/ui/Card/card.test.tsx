import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@components/ui/Card';

describe('Card Component', () => {
  it('renders Card component with default props', () => {
    // Memastikan komponen dasar bekerja dan childrennya ditampilkan dengan benar
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies size and variant classes correctly', () => {
    // Memastikan gaya CSS sudah sesuai diterapkan dengan benar berdasarkan properti yang diberikan
    const { container } = render(<Card size="login" variant="default" />);

    expect(container.firstChild).toHaveClass('p-[32px] w-[340px] h-[500px]');
    expect(container.firstChild).toHaveClass('bg-white');
  });

  it('renders a login card correctly with form fields and button', () => {
    // Memastikan komponen Card nampilin form login yang benar (Inputan dan Tombol)
    render(
      <Card size="login" variant="default">
        <CardHeader>Login Header</CardHeader>
        <CardTitle>Login Title</CardTitle>
        <CardDescription>Login Description</CardDescription>
        <CardContent>
          <input type="text" placeholder="Company ID" />
          <input type="text" placeholder="Usercode" />
          <input type="password" placeholder="Password" />
        </CardContent>
        <CardFooter>
          <button type="button">Login</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByPlaceholderText('Company ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Usercode')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  // it('matches snapshot', () => {        // Memastikan bahwa struktur DOM dari komponen tidak berubah secara tidak sengaja seiring waktu
  //   const { asFragment } = render(
  //     <Card size="login" variant="default">
  //       <CardHeader>Snapshot Header</CardHeader>
  //       <CardTitle>Snapshot Title</CardTitle>
  //       <CardDescription>Snapshot Description</CardDescription>
  //       <CardContent>Snapshot Content</CardContent>
  //       <CardFooter>Snapshot Footer</CardFooter>
  //     </Card>
  //   );
  // });
});
