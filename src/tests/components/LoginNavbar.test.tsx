import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LoginNavbar from "../../components/LoginNavbar";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material";

const mockSetTheme = jest.fn();

const WrappedLoginNavbar = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<LoginNavbar setTheme={mockSetTheme} />} />
    </Routes>
  </BrowserRouter>
);

describe("Login Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Logo links properly to login", async () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/" element={<div>Back at login</div>} />
          <Route
            path="/signup"
            element={<LoginNavbar setTheme={mockSetTheme} />}
          />
        </Routes>
      </MemoryRouter>
    );
    await userEvent.click(screen.getByText("LAV"));
    await waitFor(() => {
      screen.getByText("Back at login");
    });
  });

  it("Theme will toggle when button is clicked: light mode", async () => {
    render(
      <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>
        <WrappedLoginNavbar />
      </ThemeProvider>
    );
    const darkModeToggle = screen.getByRole("button", {
      name: "toggle-dark-mode",
    });
    expect(darkModeToggle);
    await userEvent.click(darkModeToggle);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme.mock.calls[0][0].palette.mode).toBe("dark");
  });

  it("Theme will toggle when button is clicked: dark mode", async () => {
    render(
      <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
        <WrappedLoginNavbar />
      </ThemeProvider>
    );
    const lightModeToggle = screen.getByRole("button", {
      name: "toggle-light-mode",
    });
    expect(lightModeToggle);
    await userEvent.click(lightModeToggle);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme.mock.calls[0][0].palette.mode).toBe("light");
  });
});
