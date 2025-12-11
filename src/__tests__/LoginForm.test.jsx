import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginForm from '@/components/forms/LoginForm';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: (state = { loading: false, error: null, ...initialState }, action) => {
        switch (action.type) {
          case 'auth/loginUser/pending':
            return { ...state, loading: true, error: null };
          case 'auth/loginUser/fulfilled':
            return { ...state, loading: false, error: null };
          case 'auth/loginUser/rejected':
            return { ...state, loading: false, error: action.payload };
          default:
            return state;
        }
      },
    },
  });
};

const renderWithProvider = (component, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('LoginForm', () => {
  it('renders login form with all elements', () => {
    renderWithProvider(<LoginForm />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders email input field', () => {
    renderWithProvider(<LoginForm />);
    
    const emailInput = screen.getByPlaceholderText('email@example.com');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
  });

  it('renders password input field', () => {
    renderWithProvider(<LoginForm />);
    
    const passwordInput = screen.getByPlaceholderText('********');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
  });

  it('renders link to registration page', () => {
    renderWithProvider(<LoginForm />);
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    const registerLink = screen.getByRole('link', { name: 'Register' });
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('renders demo accounts section', () => {
    renderWithProvider(<LoginForm />);
    
    expect(screen.getByText('Demo accounts:')).toBeInTheDocument();
    expect(screen.getByText('Tenant: tenant8@rentify.com')).toBeInTheDocument();
    expect(screen.getByText('Owner: owner4@rentify.com')).toBeInTheDocument();
    expect(screen.getByText('Admin: admin1@rentify.com')).toBeInTheDocument();
  });

  it('allows user to type in email field', async () => {
    const user = userEvent.setup();
    renderWithProvider(<LoginForm />);
    
    const emailInput = screen.getByPlaceholderText('email@example.com');
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('allows user to type in password field', async () => {
    const user = userEvent.setup();
    renderWithProvider(<LoginForm />);
    
    const passwordInput = screen.getByPlaceholderText('********');
    await user.type(passwordInput, 'password123');
    
    expect(passwordInput).toHaveValue('password123');
  });

  it('displays error message when there is an error', () => {
    const store = createMockStore({ error: 'Invalid credentials' });
    renderWithProvider(<LoginForm />, store);
    
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('does not display error message when there is no error', () => {
    renderWithProvider(<LoginForm />);
    
    const errorDiv = document.querySelector('.bg-red-100');
    expect(errorDiv).not.toBeInTheDocument();
  });

  it('shows loading state on button when loading', () => {
    const store = createMockStore({ loading: true });
    renderWithProvider(<LoginForm />, store);
    
    expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();
  });

  it('disables submit button when loading', () => {
    const store = createMockStore({ loading: true });
    renderWithProvider(<LoginForm />, store);
    
    const submitButton = screen.getByRole('button', { name: 'Loading...' });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when not loading', () => {
    renderWithProvider(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    expect(submitButton).not.toBeDisabled();
  });

  it('submits form when submit button is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    
    renderWithProvider(<LoginForm />, store);
    
    const emailInput = screen.getByPlaceholderText('email@example.com');
    const passwordInput = screen.getByPlaceholderText('********');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
