import { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { TbShoppingCartCheck } from "react-icons/tb";
import { MdAddShoppingCart } from "react-icons/md";

const Products = () => {
  const selectedCategory = sessionStorage.getItem("selectedCategory");
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState('');

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/branches");
        const data = await response.json();
        setBranches(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchBranch();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[category_name][$eq]=${selectedCategory}`
        );
        const data = await response.json();
        setProducts(data.data || []); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedBranchId || product.branch_name === selectedBranchId)
  );
  
  

  const handleAddToCart = async (product) => {
    const cartData = {
      data: {
        product_name: product.product_name,
        quantity: 1,
        price: product.product_price,
        user_name: userDetails.name, 
        branch_name : product.branch_name,
        image : product.image,
      }
    };
    const jsonString = JSON.stringify(cartData);
    try {
      const response = await fetch("http://localhost:1337/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product added to cart!");
        console.log(data);
        window.location.reload();
      } else {
        const errorData = await response.text(); 
        alert("Failed to add to cart!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to cart!");
    }
  };

  const handleCheckoutClick = async (product) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const cartData = {
      data: {
        product_name: product.product_name,
        quantity: 1,
        total: product.price * quantity,
        customer_name: userDetails.name,
        date: formattedDate,
        branch_name: product.branch_name,
      }
    };
    const jsonString = JSON.stringify(cartData);
    try {
      const response = await fetch("http://localhost:1337/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product bought successfully");
        console.log(data);
        window.location.reload();
      } else {
        const errorData = await response.text(); 
        alert("Failed to add to cart!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to cart!");
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleConfirmOrder = () => {
    const updatedCart = cart.map((item) =>
      item.id === selectedProduct.id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    setIsModalVisible(false);
    setIsConfirmationModalVisible(true);
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalVisible(false);
  };

  return (
    <>
      <Navbar />
      <section className="bg-base-200 py-6">
        <div className="container mx-auto px-8">
          <div className="mb-5 text-center flex justify-between">
            <h2 className="text-2xl font-bold text-center text-green-700">
              {selectedCategory}
            </h2>
            <div className="flex gap-2">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <select
              className="select select-bordered w-full max-w-xs mb-4"
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
            >
              <option value="">Branches</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.branch_name}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border bg-white"
              >
                <img
                  src={product.image}
                  alt={product.product_name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  {product.product_name}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Available: {product.branch_name} Branch
                </p>
                <div className="flex justify-between">
                  <p className="text-lg font-bold text-green-700 mb-4">
                  ₱{product.product_price}
                  </p>
                  <span
                    className="text-green-700 cursor-pointer flex gap-1"
                    onClick={() => handleAddToCart(product)}
                  >
                    <MdAddShoppingCart className="mt-1" />
                    Cart
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleCheckoutClick(product)}
                    className="btn btn-success text-white"
                  >
                    <TbShoppingCartCheck />
                    Check Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-base-300 py-6 mt-5">
        <div className="container mx-auto text-center font-bold">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ShopEase Mart. All rights
            reserved.
          </p>
          <div className="mt-2">
            <a href="#" className="hover:underline mx-2">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:underline mx-2">
              Terms of Service
            </a>
            <span>|</span>
            <a href="#" className="hover:underline mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      {isModalVisible && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-48 object-contain rounded-md mb-4" // Updated to object-contain
              />
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                {selectedProduct.name}
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                {selectedProduct.description}
              </p>
              <p className="text-green-600 text-lg font-semibold mb-4">
                Price: {selectedProduct.price}
              </p>
              <div className="flex items-center justify-between mb-4">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                  className="w-16 border border-gray-300 rounded-md text-center p-1"
                />
              </div>
              <div className="text-sm text-gray-700 mb-4">
                <p>
                  <strong>Total Price:</strong>{" "}
                  {parseFloat(selectedProduct.price.slice(1)) * quantity} USD
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative text-center">
            <button
              onClick={handleCloseConfirmationModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7 12l2-2m-6 8a9 9 0 1118 0A9 9 0 011 12z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Order Confirmed!
              </h2>
              <p className="text-gray-700 text-sm mb-4">
                Thank you for your purchase! Your order has been successfully
                placed.
              </p>
              <div className="bg-gray-100 rounded-md p-4 w-full mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {selectedProduct.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  Quantity: <strong>{quantity}</strong>
                </p>
                <p className="text-gray-600 text-sm">
                  Total Price:{" "}
                  <strong>
                    {parseFloat(selectedProduct.price.slice(1)) * quantity} USD
                  </strong>
                </p>
              </div>
              <button
                onClick={handleCloseConfirmationModal}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
