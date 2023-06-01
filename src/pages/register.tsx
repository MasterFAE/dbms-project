import Link from "next/link";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  const [data, setData] = React.useState({
    ssn: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    setData({ ...data, [input]: e.target.value });
  };

  const signIn = () => {
    if (
      !data.ssn.length ||
      !data.password.length ||
      !data.firstName.length ||
      !data.lastName.length
    ) {
      alert("Please fill all the fields");
      return;
    }

    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...data }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          localStorage.setItem("userId", data[0].user_id);
          window.location.href = "/client";
        }
      });
  };

  return (
    <div className="flex h-full min-h-[100vh] w-full flex-col items-center justify-center bg-zinc-100">
      <div className="min-h-[40vh] w-1/3 rounded-md border bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-semibold">Register</h1>
        <div className="flex flex-col gap-y-1">
          <label>SSN</label>
          <input
            autoComplete="off"
            className="input"
            onChange={(e) => handleChange(e, "ssn")}
            type="text"
            placeholder="enter your ssn"
          ></input>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Password</label>
          <input
            autoComplete="off"
            className="input"
            type="password"
            onChange={(e) => handleChange(e, "password")}
            placeholder="enter your password"
          ></input>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>First Name</label>
          <input
            autoComplete="off"
            className="input"
            type="text"
            onChange={(e) => handleChange(e, "firstName")}
            placeholder="enter your password"
          ></input>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Last Name</label>
          <input
            autoComplete="off"
            className="input"
            type="text"
            onChange={(e) => handleChange(e, "lastName")}
            placeholder="enter your password"
          ></input>
        </div>
        <Link href={"/login"}>
          <p className="mt-2 text-sm font-light text-neutral-500 hover:underline">
            If you have an account, sign in
          </p>
        </Link>
        <button onClick={signIn} className="addButton mt-4 w-full p-2">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Register;
