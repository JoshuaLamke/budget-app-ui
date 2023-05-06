import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../../containers/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockSetTheme = jest.fn();
const mockLogin = jest.fn();
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const WrappedLogin = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={<Login setTheme={mockSetTheme} loginUser={mockLogin} />}
      />
    </Routes>
  </BrowserRouter>
);

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Login Page Renders", async () => {
    render(<WrappedLogin />);
    expect(screen.getByText("Login To LAV")).toBeInTheDocument();
  });

  it("Errors will show when submitting without inputting information", async () => {
    render(<WrappedLogin />);
    const submitButton = screen.getByText("Log In");
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(screen.getByText(/must input password/i)).toBeInTheDocument();
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  it("Errors will show when inputting incorrect info into email field", async () => {
    render(<WrappedLogin />);
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "email@email");
    const submitButton = screen.getByText("Log In");
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  it("No errors will show when information is inputted correctly", async () => {
    render(<WrappedLogin />);
    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "email@email.com");
    const passwordInput = screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "PswdTest!");
    const submitButton = screen.getByText("Log In");
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it("Visibility toggles work", async () => {
    render(<WrappedLogin />);
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );
    const visibilityIcon = screen.getByLabelText("toggle password visibility");
    await userEvent.click(visibilityIcon);
    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
    });
    await userEvent.click(visibilityIcon);
    await waitFor(() => {
      expect(screen.getByLabelText("Password")).toHaveAttribute(
        "type",
        "password"
      );
    });
  });

  it("Should navigate to signup on create account button click", async () => {
    render(<WrappedLogin />);
    await userEvent.click(screen.getByText(/create account/i));
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/signup");
    });
  });
});
