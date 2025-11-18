import React from "react";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, errors);
    fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div class="d-flex justify-content-center align-items-center">
      <div class="row shadow rounded overflow-hidden">
        <div class="col-md-6 p-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            class="img-fluid h-100 w-75"
            style={{ objectFit: "cover" }}
            alt="Food Image"
          />
        </div>

        <div class="col-md-6 p-4 bg-white">
          <h3 class="text-center mb-3">🍔 FoodApp Register</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="mb-3">
              <label class="form-label">Full Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              <p>{errors.name && errors.name.message}</p>
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                {...register("password")}
              />
            </div>

            <div class="mb-3">
              <label class="form-label"> Confirm Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                {...register("confirmPassword")}
              />
            </div>

            <div class="mb-3">
              <label class="form-label">age</label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter password"
                {...register("age")}
              />
            </div>

            <button class="btn btn-primary w-100">Register</button>

            <p class="text-center mt-3">
              Already have an account? <a href="#">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
