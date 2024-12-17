import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerItems = [
    {
      id: 1,
      image: "banner1.jpg",
      title: "Slide 1 Title",
      description: "Description for Slide 1",
    },
    {
      id: 2,
      image: "banner2.jpg",
      title: "Slide 2 Title",
      description: "Description for Slide 2",
    },
    {
      id: 3,
      image: "banner3.jpg",
      title: "Slide 3 Title",
      description: "Description for Slide 3",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? bannerItems.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 1500);
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <main className="mt-5">
        <div role="tablist" className="tabs font-bold">
          <Link
            to="/products"
            role="tab"
            className="tab text-lg text-green-700 hover:underline"
          >
            Beverages
          </Link>
          <Link
            to="/products"
            role="tab"
            className="tab text-lg text-green-700 hover:underline"
          >
            Frozen
          </Link>
          <Link
            to="/products"
            role="tab"
            className="tab text-lg text-green-700 hover:underline"
          >
            Snacks & Candies
          </Link>
          <Link
            to="/products"
            role="tab"
            className="tab text-lg text-green-700 hover:underline"
          >
            Meat & Seafood
          </Link>
          <Link
            to="/products"
            role="tab"
            className="tab text-lg text-green-700 hover:underline"
          >
            Chips & Biscuits
          </Link>
        </div>
        <div className="container mx-auto px-4 py-7">
          <div className="carousel w-full">
            {bannerItems.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item relative w-full ${
                  index === currentSlide ? "block" : "hidden"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[200px] w-full object-cover rounded-lg md:h-[330px]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white bg-black bg-opacity-50">
                  <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-4 gap-3">
            <button
              className="btn btn-circle bg-green-300 hover:bg-green-500 hover:text-white"
              onClick={prevSlide}
            >
              ❮
            </button>
            <button
              className="btn btn-circle bg-green-300 hover:bg-green-500 hover:text-white"
              onClick={nextSlide}
            >
              ❯
            </button>
          </div>
          <hr />
          <section className="bg-green-500 mb-5 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-between gap-8 md:flex-row p-5">
                <div className="text-center md:text-left">
                  <h2 className="mb-6 text-2xl font-bold text-white md:text-5xl lg:text-6xl">
                    Your One-Stop Shop <br />
                    for Fresh & Quality Essentials
                  </h2>
                  <button className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-green-500 transition-transform hover:scale-105">
                    Start Shopping
                  </button>
                </div>
                <div className="w-full max-w-md md:w-1/2">
                  <img
                    src="dash.png"
                    alt="Delivery Person on Scooter"
                    className="w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-base-300 py-6">
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

export default Dashboard;
