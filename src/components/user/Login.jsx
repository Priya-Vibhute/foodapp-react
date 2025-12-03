import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { authContext } from "./AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser } = useContext(authContext);

  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        loginUser(responseData.token,responseData.userDto)
      });
  };

  return (
    <div>
      <form
        className="container border border-primary m-3 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("email", { required: "email id is required" })}
          />
          <div id="emailHelp" class="form-text text-danger">
            {errors.email && errors.email.message}
          </div>
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            {...register("password", { required: "password is required" })}
          />

          <div id="emailHelp" class="form-text text-danger">
            {errors.password && errors.password.message}
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
