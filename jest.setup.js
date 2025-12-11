import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock next-intl to prevent importing its ESM distribution in Jest
jest.mock('next-intl', () => ({
  useTranslations: () => {
    const translations = {
      'property.verified': 'Verified',
      'property.featured': 'Featured',
      'property.perMonth': '/month',
      'property.available': 'Available',
      'property.notAvailable': 'Not Available',
      'property.viewDetails': 'View Details',
      'auth.login': 'Login',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.loginButton': 'Sign In',
      'auth.noAccount': "Don't have an account?",
      'auth.register': 'Register',
      'common.loading': 'Loading...',
      'appointment.bookAppointment': 'Book Appointment',
      'appointment.selectDate': 'Select Date',
      'appointment.message': 'Message',
      'appointment.messagePlaceholder': 'Optional message for the owner',
      'appointment.submit': 'Submit',
      'appointment.cancel': 'Cancel',
    };
    return (key) => translations[key] || key;
  },
  useLocale: () => 'en',
  NextIntlClientProvider: ({ children }) => children,
}));

// Mock next-intl routing helper used by src/i18n/routing.js
jest.mock('next-intl/routing', () => ({
  defineRouting: (cfg) => cfg,
}));

// Mock next-intl/navigation to provide createNavigation helpers used in i18n/navigation.js
jest.mock('next-intl/navigation', () => ({
  createNavigation: (routing) => ({
    Link: ({ children, href, ...props }) => (
      // simple anchor used in tests
      <a href={href} {...props}>{children}</a>
    ),
    redirect: (p) => p,
    usePathname: () => '/',
    useRouter: () => ({ push: jest.fn() }),
    getPathname: ({ pathname = '/', locale = 'en' } = {}) => {
      // ensure locale-aware path
      if (!pathname.startsWith('/')) pathname = `/${pathname}`;
      return `/${locale}${pathname}`;
    },
  }),
}));



