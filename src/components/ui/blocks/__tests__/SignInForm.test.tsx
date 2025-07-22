import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "../SignInForm";
import { authUtils } from "../../../../lib/auth";

// Mock the auth utilities
jest.mock("../../../../lib/auth", () => ({
  authUtils: {
    login: jest.fn(),
  },
}));

describe("SignInForm", () => {
  it("renders email and password inputs", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for invalid inputs", async () => {
    render(<SignInForm />);

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/password must be at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const mockLogin = authUtils.login as jest.MockedFunction<
      typeof authUtils.login
    >;
    mockLogin.mockResolvedValue({
      id: "1",
      email: "test@example.com",
      name: "Mock User",
    });

    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
