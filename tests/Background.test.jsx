import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import BackgroundManager from "../panels/BackgroundManager";

test("it changes background styles correctly when user enters a custom image link", () => {
  // Create mock main wrapper element used by the component
  const dummyWorkspace = document.createElement("div");
  dummyWorkspace.id = "ws";
  document.body.appendChild(dummyWorkspace);

  render(<BackgroundManager />);
  
  const urlInput = screen.getByPlaceholderText(/Paste URL/i);
  const applyButton = screen.getByText(/Apply Image/i);

  // Simulate typing a valid target image source link
  fireEvent.change(urlInput, { target: { value: "https://example.com" } });
  fireEvent.click(applyButton);

  // Assert target styling applied dynamically 
  expect(dummyWorkspace.style.background).toContain("url(https://example.com)");
  
  // Clean up DOM mock
  document.body.removeChild(dummyWorkspace);
});