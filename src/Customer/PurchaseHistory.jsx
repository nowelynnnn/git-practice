import { useState } from "react";

const PurchaseHistory = () => {
  const [purchases] = useState([
    {
      id: 1,
      products: [
        { name: "Product 1", quantity: 2, price: 29.99 },
        { name: "Product 2", quantity: 1, price: 19.99 },
      ],
      totalPrice: 79.97,
      date: "2024-12-01",
    },
    {
      id: 2,
      products: [
        { name: "Product 3", quantity: 3, price: 15.99 },
        { name: "Product 4", quantity: 1, price: 45.5 },
      ],
      totalPrice: 99.46,
      date: "2024-11-20",
    },
    {
      id: 3,
      products: [{ name: "Product 5", quantity: 1, price: 100.0 }],
      totalPrice: 100.0,
      date: "2024-10-10",
    },
  ]);

  return (
    <>
      {purchases.length > 0 ? (
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-gray-50 p-4 rounded-md shadow-sm border"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Purchase Date: {purchase.date}
              </h3>

              <div className="mb-2">
                <h4 className="text-md font-semibold text-gray-600">
                  Products:
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {purchase.products.map((product, index) => (
                    <li key={index}>
                      {product.name} - {product.quantity} x $
                      {product.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-md font-semibold text-gray-800">
                  Total:
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${purchase.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no purchase history yet.</p>
      )}
    </>
  );
};

export default PurchaseHistory;
