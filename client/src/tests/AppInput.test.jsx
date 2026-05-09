import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppInput from "../components/ui/AppInput";

test("renders input with label", () => {
  render(
    <AppInput
      label="Description"
      value=""
      onChange={() => {}}
      name="description"
    />
  );

  const label = screen.getByText("Description");
  expect(label).toBeInTheDocument();
});

test("renders input field", () => {
  render(
    <AppInput
      label="Description"
      value=""
      onChange={() => {}}
      name="description"
    />
  );

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

test("input is required when prop is passed", () => {
  render(
    <AppInput
      label="Description"
      value=""
      onChange={() => {}}
      required
    />
  );

  const input = screen.getByRole("textbox");
  expect(input).toBeRequired();
});