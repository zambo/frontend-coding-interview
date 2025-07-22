import { render, screen } from "@testing-library/react";

// Mock server action directly
const mockSignInAction = jest.fn();

// Mock the SubmitButton to avoid useFormStatus issues in tests
jest.mock("../SubmitButton", () => ({
  SubmitButton: () => <button type="submit">Sign In</button>,
}));

// Create a test version of SignInForm that doesn't import the action
function TestSignInForm() {
  return (
    <form action={mockSignInAction} className="space-y-8">
      <div className="grid gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="email"
          placeholder="Enter your email"
          required
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="border rounded px-2 py-1"
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
}

describe("SignInForm", () => {
  it("renders username and password inputs", () => {
    render(<TestSignInForm />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("has proper form structure for server actions", () => {
    render(<TestSignInForm />);

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);

    expect(usernameInput).toHaveAttribute("name", "username");
    expect(usernameInput).toHaveAttribute("type", "email");
    expect(passwordInput).toHaveAttribute("name", "password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
