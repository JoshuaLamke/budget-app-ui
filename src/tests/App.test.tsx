import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("Renders the app", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Login To LAV")).toBeInTheDocument();
    });
  });
});
