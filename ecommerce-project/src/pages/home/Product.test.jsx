import { it, expect, describe, vi } from "vitest";
import { Product } from "./Product";
import { render, screen } from "@testing-library/react"; // screen - check the fake web page.
import userEvent from "@testing-library/user-event"; // userEvent - simulate user interactions.
import axios from "axios";

vi.mock("axios"); // Mock the axios module to prevent real HTTP requests during tests.

describe("Product Component", () => {
  it("should render product details correctly", () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    const loadCart = vi.fn(); // Mock function for loadCart (fake function that does nothing)

    render(<Product product={product} loadCart={loadCart} />);

    // Check if the product name exist in the screen or fake web page.
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument(); // Check if the price exist in the screen or fake web page.

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    ); // Check if the image src is correct.

    expect(screen.getByTestId("product-rating")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png"
    ); // Check if the rating image src is correct.

    expect(screen.getByText("87")).toBeInTheDocument(); // Check if the rating count exist in the screen or fake web page.
  });

  it("add a product to cart on button click", async () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    const loadCart = vi.fn(); // Mock function for loadCart
    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup(); // Setup user event simulation
    const addToCartButton = screen.getByTestId("add-to-cart-button"); // Get the add to cart button
    await user.click(addToCartButton); // Simulate user clicking the add to cart button
    // This above user.click takes time to complete so it is asynchronous, so we need to wait for it to complete. (it returns a Promise)

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
    }); // Check if axios.post was called with correct parameters

    expect(loadCart).toHaveBeenCalled(); // Check if loadCart was called
    // No value to be given to expect because we are just checking if the function was called by using "have been called".
  });
});
