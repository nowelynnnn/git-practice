import React, { useState } from "react";
import { HiUserCircle } from "react-icons/hi2";

const transactionsData = [
  { date: "2024-12-01", branch: "Branch A", product: "Product 1", amount: 100 },
  { date: "2024-12-02", branch: "Branch B", product: "Product 2", amount: 200 },
  { date: "2024-12-03", branch: "Branch A", product: "Product 3", amount: 150 },
  { date: "2024-12-04", branch: "Branch C", product: "Product 4", amount: 250 },
  { date: "2024-12-05", branch: "Branch B", product: "Product 5", amount: 300 },
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  // Filter transactions based on search term and branch
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch = transaction.product
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBranch =
      selectedBranch === "All" || transaction.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  // Compute top sales by branch
  const topBranches = transactionsData.reduce((acc, transaction) => {
    acc[transaction.branch] = acc[transaction.branch]
      ? acc[transaction.branch] + transaction.amount
      : transaction.amount;
    return acc;
  }, {});

  const sortedBranches = Object.entries(topBranches).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <>
      <div className="navbar bg-green-500 px-5">
        <div className="flex-1">
          <img className="h-14 w-14" src="login.png" alt="logo" />
          <p className="text-xl text-white font-bold">ShopEase Mart</p>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end font-bold">
            <div
              tabIndex={0}
              role="button"
              className="flex text-white underline gap-1"
            >
              <HiUserCircle size={26} />
              <p className="text-md">Admin</p>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="mt-2">
                <a href="/" className="text-gray-600">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 bg-base-200 min-h-screen space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-3xl font-bold text-green-800">Sales Dashboard</h1>
          <div className="mt-4 md:mt-0 flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-success w-full md:w-60"
            />
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="select select-bordered select-success w-full md:w-auto"
            >
              <option value="All">All Branches</option>
              {Array.from(new Set(transactionsData.map((t) => t.branch))).map(
                (branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white shadow-xl rounded-lg p-5">
              <div className="p-4 border-b bg-base-100">
                <h2 className="text-lg font-semibold text-success">
                  Transaction History
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Branch</th>
                      <th>Product</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.date}</td>
                          <td>{transaction.branch}</td>
                          <td>{transaction.product}</td>
                          <td>${transaction.amount.toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-gray-500">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-lg">
            <div className="p-4 border-b bg-base-100">
              <h2 className="text-lg font-semibold text-success">
                Top Sales by Branch
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {sortedBranches.slice(0, 3).map(([branch, total], index) => (
                <div
                  key={branch}
                  className="card bg-base-100 border border-gray-200 shadow-sm"
                >
                  <div className="card-body">
                    <h3 className="card-title text-secondary">
                      {index + 1}. {branch}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Total Sales: ${total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-base-300 py-6 mt-3">
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
    </>
  );
};

export default Admin;
