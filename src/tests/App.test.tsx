import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renders the app", () => {
  render(<App />);
  expect(screen.getByText("Howdy:)")).toBeInTheDocument();
});
