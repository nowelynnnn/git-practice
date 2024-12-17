import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoadingSignIn(true);

    setTimeout(() => {
      setLoadingSignIn(false);
      alert("Sign in successful!");
    }, 2000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoadingSignUp(true);

    setTimeout(() => {
      setLoadingSignUp(false);
      document.getElementById("registration_modal").close();
      alert("Sign up successful!");
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-green-400">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl flex flex-col lg:flex-row border p-3">
          <div className="w-full lg:w-1/2 p-8 border-r-2">
            <div className="flex gap-2 mb-3 justify-center">
              <img className="h-14 w-14" src="login.png" alt="logo" />
              <h1 className="text-4xl font-bold text-green-600 mt-2">
                ShopEase Mart
              </h1>
            </div>
            <p className="mb-6 text-gray-600 flex justify-center">
              Shop to your Comfort and Convenience
            </p>
            <form onSubmit={handleSignIn}>
              <div className="form-control mb-2">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input type="text" className="grow" placeholder="Email" />
                </label>
              </div>
              <div className="form-control mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Password"
                  />
                </label>
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="mr-2"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="text-sm">
                    Show Password
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <select className="select select-bordered w-1/2">
                  <option>Customer</option>
                  <option>Admin</option>
                </select>
                <button
                  type="submit"
                  className="btn btn-success text-white w-2/3 flex items-center justify-center"
                  disabled={loadingSignIn}
                >
                  {loadingSignIn ? (
                    <span className="flex items-center gap-2">
                      <span className="loading-spinner border-t-transparent border-white animate-spin border-2 border-solid h-4 w-4 rounded-full"></span>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-6">
              <p className="text-sm">
                Don't have an account? &nbsp;
                <span
                  className="underline text-green-500 cursor-pointer"
                  onClick={() =>
                    document.getElementById("registration_modal").showModal()
                  }
                >
                  Create here
                </span>
              </p>
            </div>
          </div>
          <div
            className="w-full lg:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: "url('img.png')",
            }}
          >
            <div className="h-full"></div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <dialog id="registration_modal" className="modal">
        <div className="modal-box w-11/12 max-w-md p-8">
          <form method="dialog" onSubmit={handleSignUp}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={() =>
                document.getElementById("registration_modal").close()
              }
            >
              ✕
            </button>
            <h3 className="font-bold text-2xl mb-4 text-green-700">
              | Create an account
            </h3>
            <div className="form-control mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Name" />
              </label>
            </div>
            <div className="form-control mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" />
              </label>
            </div>
            <div className="form-control mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input type="password" className="grow" value="password" />
              </label>
            </div>
            <div className="form-control mb-5">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input type="password" className="grow" value="password" />
              </label>
            </div>
            <div className="flex gap-2">
              <select className="select select-bordered w-1/2">
                <option>Customer</option>
                <option>Admin</option>
              </select>
              <button
                type="submit"
                className="btn btn-success text-white w-2/3 flex items-center justify-center"
                disabled={loadingSignUp}
              >
                {loadingSignUp ? (
                  <span className="flex items-center gap-2">
                    <span className="loading-spinner border-t-transparent border-white animate-spin border-2 border-solid h-4 w-4 rounded-full"></span>
                    Signing Up...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Login;
