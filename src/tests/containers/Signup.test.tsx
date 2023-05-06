import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Signup from "../../containers/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockSetTheme = jest.fn();
const mockSignup = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const WrappedSignup = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={<Signup setTheme={mockSetTheme} signupUser={mockSignup} />}
      />
    </Routes>
  </BrowserRouter>
);

describe("Signup Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Signup Page Renders", async () => {
    render(<WrappedSignup />);
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });

  it("Errors will show when submitting without inputting information", async () => {
    render(<WrappedSignup />);
    const submitButton = screen.getByText("Sign Up");
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Username must be at least 3 characters/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Must confirm password/i)).toBeInTheDocument();
      expect(mockSignup).not.toHaveBeenCalled();
    });
  });

  it("Password validation should work correctly", async () => {
    render(<WrappedSignup />);
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "aaaaaaaa");
    const submitButton = screen.getByText("Sign Up");
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText(
          /Password must have at least one uppercase letter and one lowercase letter/i
        )
      ).toBeInTheDocument();
      expect(mockSignup).not.toHaveBeenCalled();
    });
    await userEvent.type(passwordInput, "A");
    await waitFor(() => {
      expect(
        screen.getByText(
          "Password must contain at least one special character (!@#$%^&*?)"
        )
      ).toBeInTheDocument();
      expect(mockSignup).not.toHaveBeenCalled();
    });
  });

  it("Errors will show when inputting incorrect info into email field", async () => {
    render(<WrappedSignup />);
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "email@email");
    const submitButton = screen.getByText("Sign Up");
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(mockSignup).not.toHaveBeenCalled();
    });
  });

  it("No errors will show when information is inputted correctly", async () => {
    render(<WrappedSignup />);
    const usernameInput = screen.getByLabelText("Username");
    await userEvent.type(usernameInput, "JohnDoe123");
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "email@email.com");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "PswdTest!");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    await userEvent.type(confirmPasswordInput, "PswdTest!");
    const submitButton = screen.getByText("Sign Up");
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalled();
    });
  });

  it("Visibility toggles work", async () => {
    render(<WrappedSignup />);
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );
    expect(screen.getByLabelText("Confirm Password")).toHaveAttribute(
      "type",
      "password"
    );
    const visibilityIcon = screen.getAllByLabelText(
      "toggle password visibility"
    );
    await userEvent.click(visibilityIcon[0]);
    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
      expect(screen.getByLabelText("Confirm Password")).toHaveAttribute(
        "type",
        "text"
      );
    });
    await userEvent.click(visibilityIcon[1]);
    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toHaveAttribute(
        "type",
        "password"
      );
      expect(screen.getByLabelText("Confirm Password")).toHaveAttribute(
        "type",
        "password"
      );
    });
  });

  it("Shouldn't be able to paste into confirm password field", async () => {
    render(<WrappedSignup />);
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    await userEvent.click(confirmPasswordInput);
    await userEvent.paste("PswdTest!");
    await waitFor(() => {
      expect(confirmPasswordInput).toHaveDisplayValue("");
    });
    await userEvent.type(confirmPasswordInput, "PswdTest!");
    await waitFor(() => {
      expect(confirmPasswordInput).toHaveDisplayValue("PswdTest!");
    });
  });

  it("Should navigate to login on button click", async () => {
    render(<WrappedSignup />);
    await userEvent.click(screen.getByText(/Log In/i));
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });
  });
});
