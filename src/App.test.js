import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  window.scrollTo = () => {};
});

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test('homepage shows every section', () => {
  renderAt('/');
  expect(screen.getByText(/A glimpse of/i)).toBeInTheDocument();
  expect(screen.getByText(/Meet the Florist/i)).toBeInTheDocument();
  expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
  expect(screen.getByText(/Got Questions/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Send Inquiry/i })).toBeInTheDocument();
});

test('/about renders the homepage instead of a blank page', () => {
  renderAt('/about');
  expect(screen.getByText(/Meet the Florist/i)).toBeInTheDocument();
});

test('every gallery photo has a description', () => {
  renderAt('/full-portfolio');
  const photos = screen.getAllByRole('img');
  expect(photos.length).toBeGreaterThan(10);
  photos.forEach((img) => expect(img).toHaveAttribute('alt', expect.stringMatching(/\w/)));
});

test('contact form requires name, email and date', () => {
  renderAt('/');
  expect(screen.getByLabelText(/^Names \*/)).toBeRequired();
  expect(screen.getByLabelText(/^Email \*/)).toBeRequired();
  expect(screen.getByLabelText(/^Event Date \*/)).toBeRequired();
});

test('FAQ answers open and close', () => {
  renderAt('/');
  const question = screen.getByRole('button', { name: /secure my date/i });
  expect(question).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(question);
  expect(question).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(question);
  expect(question).toHaveAttribute('aria-expanded', 'false');
});
