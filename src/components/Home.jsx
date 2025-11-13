import React from "react";

function Home() {
  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #fff)",
      }}
    >
      <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between">
        {/* Left Text Section */}
        <div className="text-center text-lg-start mb-4 mb-lg-0">
          <h1 className="fw-bold text-success mb-3 display-5">
            Welcome to <span className="text-dark">FoodApp</span> 🍽️
          </h1>
          <p className="lead text-secondary mb-4" style={{ maxWidth: "500px" }}>
            Discover mouth-watering dishes, explore new recipes, and order your
            favorite food — anytime, anywhere!
          </p>
          <div>
            <a href="#" className="btn btn-success me-3 px-4 py-2 shadow-sm">
              🍕 View Menu
            </a>
            <a href="#" className="btn btn-outline-success px-4 py-2 shadow-sm">
              🛒 Order Now
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Food table"
            className="img-fluid rounded-4 shadow-lg"
            style={{
              maxWidth: "460px",
              borderRadius: "20px",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
