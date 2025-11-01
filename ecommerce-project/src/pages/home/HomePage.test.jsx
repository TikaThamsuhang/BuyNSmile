import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react"; // screen - check the fake web page.
import axios from "axios";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router"; // MemmoryRouter - simulate routing in tests (only for testing).

vi.mock("axios"); // Mock the axios module to prevent real HTTP requests during tests.

describe("HomePage Component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn(); // Mock function for loadCart (fake function that does nothing)

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
  });

  it("displays the products correct", async () => {
    // We need to wrap homepage with router since homepage uses Link component from react-router-dom.
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    // We use findAllByTestId instead of getAllByTestId since getAllByTestId is not async function.
    const productContainers = await screen.findAllByTestId("product-container");
    expect(productContainers.length).toBe(2); // Check if two products are rendered.

    expect(
      // within - to query within a specific element.
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      ) // Check if first product name exist.
    ).toBeInTheDocument();

    expect(
      // within - to query within a specific element.
      within(productContainers[1]).getByText(
        "Intermediate Size Basketball"
      ) // Check if second product name exist.
    ).toBeInTheDocument();
  });
});
