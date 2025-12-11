import { render, screen } from '@testing-library/react';
import PropertyCard from '@/components/PropertyCard';

const mockProperty = {
  id: 1,
  title: 'Luxury Apartment in Downtown',
  city: 'New York',
  price: 2500,
  type: 'Apartment',
  availability: 'Available',
  verified: false,
  highlight: false,
  images: ['https://example.com/image.jpg'],
};

describe('PropertyCard', () => {
  it('renders property title and city', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('Luxury Apartment in Downtown')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('renders property price with per month label', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText(/\$2500/)).toBeInTheDocument();
    expect(screen.getByText(/\/month/)).toBeInTheDocument();
  });

  it('renders property type', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });

  it('shows Available status when property is available', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('shows Not Available status when property is not available', () => {
    const unavailableProperty = { ...mockProperty, availability: 'Not Available' };
    render(<PropertyCard property={unavailableProperty} />);
    
    expect(screen.getByText('Not Available')).toBeInTheDocument();
  });

  it('shows Verified badge when property is verified', () => {
    const verifiedProperty = { ...mockProperty, verified: true };
    render(<PropertyCard property={verifiedProperty} />);
    
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('does not show Verified badge when property is not verified', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
  });

  it('shows Featured badge when property is highlighted', () => {
    const featuredProperty = { ...mockProperty, highlight: true };
    render(<PropertyCard property={featuredProperty} />);
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('does not show Featured badge when property is not highlighted', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('renders View Details link with correct href', () => {
    render(<PropertyCard property={mockProperty} />);
    
    const link = screen.getByRole('link', { name: 'View Details' });
    expect(link).toHaveAttribute('href', '/properties/1');
  });

  it('renders property image with correct alt text', () => {
    render(<PropertyCard property={mockProperty} />);
    
    const image = screen.getByAltText('Luxury Apartment in Downtown');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('uses fallback image when no images provided', () => {
    const propertyWithoutImages = { ...mockProperty, images: [] };
    render(<PropertyCard property={propertyWithoutImages} />);
    
    const image = screen.getByAltText('Luxury Apartment in Downtown');
    expect(image).toHaveAttribute('src', 'https://picsum.photos/800/600');
  });
});
