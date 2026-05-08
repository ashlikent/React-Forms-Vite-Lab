import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemForm from "../components/ItemForm";
import ShoppingList from "../components/ShoppingList";

const testData = [
  { id: 1, name: "Yogurt", category: "Dairy" },
  { id: 2, name: "Pomegranate", category: "Produce" },
];

test("calls the onItemFormSubmit callback prop when the form is submitted", () => {
  const onItemFormSubmit = vi.fn();

  render(<ItemForm onItemFormSubmit={onItemFormSubmit} />);

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.getByLabelText(/category/i), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.getByText(/Add to List/));

  expect(onItemFormSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(String),
      name: "Ice Cream",
      category: "Dessert",
    })
  );
});

test("adds a new item to the list when the form is submitted", () => {
  render(<ShoppingList items={testData} />);

  const dessertCount = screen.queryAllByText(/Dessert/).length;

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Ice Cream" },
  });

  fireEvent.change(screen.getByLabelText(/category/i), {
    target: { value: "Dessert" },
  });

  fireEvent.submit(screen.getByText(/Add to List/));

  expect(screen.queryByText(/Ice Cream/)).toBeInTheDocument();

  expect(screen.queryAllByText(/Dessert/).length).toBe(dessertCount + 1);
});
