import Link from "next/link";
import React from "react";

type Props = {};

const EmployeeLogin = (props: Props) => {
  const [ssn, setSsn] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    if (input === "ssn") {
      setSsn(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const signIn = () => {
    if (!ssn.length || !password.length) {
      alert("Please fill all the fields");
      return;
    }

    fetch("/api/employees/signin", {
      method: "POST",
      body: JSON.stringify({ ssn, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          localStorage.setItem("employeeId", data[0].user_id);
          window.location.href = "/";
        }
      });
  };
  return (
    <div className="flex h-full min-h-[100vh] w-full flex-col items-center justify-center bg-zinc-100">
      <div className="min-h-[40vh] w-1/3 rounded-md border bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-semibold">Employee Sign In</h1>
        <div className="flex flex-col gap-y-1">
          <label>SSN</label>
          <input
            className="input"
            onChange={(e) => handleChange(e, "ssn")}
            type="text"
            placeholder="enter your ssn"
          ></input>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Password</label>
          <input
            className="input"
            type="password"
            onChange={(e) => handleChange(e, "password")}
            placeholder="enter your password"
          ></input>
        </div>

        <button onClick={signIn} className="addButton mt-4 w-full p-2">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default EmployeeLogin;
