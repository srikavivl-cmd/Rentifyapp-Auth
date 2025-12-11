import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppointmentBookingForm from '@/components/forms/AppointmentBookingForm';

describe('AppointmentBookingForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with all required elements', () => {
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    expect(screen.getByText('Book Appointment')).toBeInTheDocument();
    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('renders date input field', () => {
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const dateInput = screen.getByRole('textbox', { type: 'date' }) || 
                      document.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();
  });

  it('renders message textarea with placeholder', () => {
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const textarea = screen.getByPlaceholderText('Optional message for the owner');
    expect(textarea).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with form data when form is submitted', async () => {
    const user = userEvent.setup();
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const dateInput = document.querySelector('input[type="date"]');
    const textarea = screen.getByPlaceholderText('Optional message for the owner');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    fireEvent.change(dateInput, { target: { value: '2025-12-15' } });
    await user.type(textarea, 'I would like to schedule a viewing');
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      scheduledDate: '2025-12-15',
      message: 'I would like to schedule a viewing',
    });
  });

  it('has minimum date set to today', () => {
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const dateInput = document.querySelector('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    expect(dateInput).toHaveAttribute('min', today);
  });

  it('date input is required', () => {
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const dateInput = document.querySelector('input[type="date"]');
    expect(dateInput).toHaveAttribute('required');
  });

  it('allows submitting with empty message', async () => {
    const user = userEvent.setup();
    render(
      <AppointmentBookingForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const dateInput = document.querySelector('input[type="date"]');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    fireEvent.change(dateInput, { target: { value: '2025-12-20' } });
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      scheduledDate: '2025-12-20',
      message: '',
    });
  });
});
