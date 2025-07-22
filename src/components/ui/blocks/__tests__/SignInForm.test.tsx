import { render, screen, fireEvent } from "@testing-library/react";
import SignInForm from "../SignInForm";

describe("SignInForm", () => {
  it("renders email and password inputs", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("submits form with email and password values", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith("Form submitted");

    consoleSpy.mockRestore();
  });
});
