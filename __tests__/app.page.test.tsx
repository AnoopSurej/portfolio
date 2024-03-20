import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home component", () => {
  it("renders the Home Page heading", () => {
    render(<Home />);
    const headingElement = screen.getByText("Home Page");
    expect(headingElement).toBeTruthy();
  });
});
