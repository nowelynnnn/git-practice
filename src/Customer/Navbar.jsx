import { HiUserCircle } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import { TbShoppingCartCheck } from "react-icons/tb";
import PurchaseHistory from "./PurchaseHistory";
import { useState, useEffect } from "react";

const Navbar = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isPurchaseSuccessModalOpen, setIsPurchaseSuccessModalOpen] =
    useState(false);

    useEffect(() => {
      fetchCartItems();
    }, []);
  
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/carts?filters[user_name][$eq]=${userDetails.name}&_limit=1000`
        );
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.data);
        } else {
          console.error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const toggleHistoryModal = () => {
    setIsHistoryModalOpen(!isHistoryModalOpen);
  };

  const togglePurchaseSuccessModal = () => {
    setIsPurchaseSuccessModalOpen(!isPurchaseSuccessModalOpen);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };


  const toggleSelection = (productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
  
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
  
    for (const item of selectedCartItems) {
      const cartData = {
        data: {
          product_name: item.product_name,
          quantity: item.quantity,
          total: item.price * item.quantity,
          customer_name: item?.user_name || "Guest",
          date: formattedDate,
          branch_name: item.branch_name,
        },
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
          console.log("Item processed:", data);
        } else {
          const errorData = await response.text();
          console.error("Failed to add item:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    handleDelete(selectedCartItems);
  };
  
  const handleDelete = async (items) => {
    for (const item of items) {
      try {
        const response = await fetch(
          `http://localhost:1337/api/carts/${item.documentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
          setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((id) => id !== item.id)
          );
          console.log(`Item with id ${item.id} deleted:`, data);
        } else {
          const errorData = await response.text();
          console.error(`Failed to delete item with id ${item.id}:`, errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    alert("Checkout successful");
    window.location.reload();
  };
  

  return (
    <>
      <div className="navbar bg-green-500 px-5">
        <div className="flex-1">
          <img className="h-14 w-14" src="login.png" alt="logo" />
          <p className="text-xl text-white font-bold">ShopEase Mart</p>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end text-white">
            <div
              tabIndex={0}
              role="button"
              className="flex text-white underline gap-1"
              onClick={toggleCartModal}
            >
              <FaShoppingCart size={24} />
              <p className="text-md font-bold">Cart</p>
            </div>
          </div>
          <div className="dropdown dropdown-end font-bold">
            <div
              tabIndex={0}
              role="button"
              className="flex text-white underline gap-1"
            >
              <HiUserCircle size={26} />
              <p className="text-md">Marion Jotohot</p>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="mb-2">
                <a
                  className="justify-between text-gray-600"
                  onClick={toggleHistoryModal}
                >
                  History
                  <span className="badge">New</span>
                </a>
              </li>
              <hr />
              <li className="mt-2">
                <a href="/" className="text-gray-600">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
            <button
              onClick={toggleCartModal}
              className="absolute top-4 right-4 text-gray-500 font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-green-700 mb-4 flex gap-2">
              <FaShoppingCart size={20} className="mt-1" />
              Your Cart
            </h2>
            <hr />
            <div className="overflow-y-auto max-h-[60vh] mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between mb-4 border-b pb-4"
                >
                  <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                />
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-md"
                    />
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">
                        {item.product_name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Price: ₱{item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-green-600">
                    ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-4 font-bold">
              <button
                onClick={toggleCartModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex gap-1"
              >
                <TbShoppingCartCheck className="mt-1" />
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Success Modal */}
      {isPurchaseSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 text-center relative">
            <button
              onClick={togglePurchaseSuccessModal}
              className="absolute top-4 right-4 text-gray-500 font-bold"
            >
              ✕
            </button>
            <TbShoppingCartCheck className="text-green-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-700 mb-2">
              Purchase Successful
            </h2>
            <p className="text-gray-600 mb-4">Thank you for your order!</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={togglePurchaseSuccessModal}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-3 relative mx-4">
            <button
              onClick={toggleHistoryModal}
              className="absolute top-4 right-4 text-gray-500 font-bold hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center mb-4">
              Purchase History
            </h3>
            <div className="overflow-y-auto max-h-[80vh]">
              <PurchaseHistory />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
