import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

// Mock the server action
jest.mock("@/lib/actions", () => ({
  signInAction: jest.fn(),
}));

// Mock the SubmitButton to avoid useFormStatus issues in tests
jest.mock("../SubmitButton", () => ({
  SubmitButton: () => <button type="submit">Sign In</button>,
}));

// Import the actual component after mocking
import { SignInForm } from "../SignInForm";
import * as actions from "@/lib/actions";

const mockSignInAction = actions.signInAction as jest.MockedFunction<
  typeof actions.signInAction
>;

describe("SignInForm", () => {
  beforeEach(() => {
    mockSignInAction.mockClear();
  });

  it("renders username and password inputs", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("has proper form structure with react-hook-form", () => {
    render(<SignInForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(usernameInput).toHaveAttribute("type", "email");
    expect(usernameInput).toHaveAttribute("placeholder", "Enter your email");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("placeholder", "Enter your password");
  });

  it("calls signInAction with valid form data", async () => {
    mockSignInAction.mockResolvedValue(undefined);

    render(<SignInForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignInAction).toHaveBeenCalledWith(expect.any(FormData));
    });
  });
});
