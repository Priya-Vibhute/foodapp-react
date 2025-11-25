import React from "react";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

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
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Minimun 2 characters are required ",
                  },
                  maxLength: {
                    value: 60,
                    message: "Maximum 60 characters are allowed",
                  },
                })}
              />
              <p className="text-danger m-1">
                {errors.name && errors.name.message}
              </p>
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  validate: async (value) => {
                    const res = await fetch(
                      `http://localhost:8080/users/${value}/check`
                    );
                    const data = await res.json();
                    return data && "Email id already exists";
                  },
                })}
              />

              <p className="text-danger m-1">
                {errors.email && errors.email.message}
              </p>
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                {...register("password", { required: "password is required" })}
              />

              <p className="text-danger m-1">
                {errors.password && errors.password.message}
              </p>
            </div>

            <div class="mb-3">
              <label class="form-label"> Confirm Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value != password &&
                    "Password and confirm password is not same",
                })}
              />

              <p className="text-danger m-1">
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>

            <div class="mb-3">
              <label class="form-label">age</label>
              <input
                type="number"
                class="form-control"
                placeholder="Enter password"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 10, message: "minimum 10 age is required" },
                  max: { value: 100, message: "Maximum 100 age is required" },
                })}
              />

              <p className="text-danger m-1">
                {errors.age && errors.age.message}
              </p>
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
