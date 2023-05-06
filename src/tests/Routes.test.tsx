import { render } from "@testing-library/react";
import React from "react";
import AppRoutes from "../routes";

describe("Routes", () => {
  it("Should render routes without crashing", async () => {
    render(<AppRoutes />);
  });
});
