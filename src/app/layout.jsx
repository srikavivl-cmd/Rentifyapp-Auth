import './globals.css';

export const metadata = {
  title: 'Rentify - Property Rental Platform',
  description: 'Find your perfect rental home',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {children}
      </body>
    </html>
  );
}
