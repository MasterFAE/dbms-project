import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { Employee } from "~/types/employee";

type Props = {};

const Create = (props: Props) => {
  const [departments, setDepartments] = useState([]);
  const router = useRouter();

  const [employee, setEmployee] = useState({
    employee_id: 0,
    firstName: "",
    lastName: "",
    department_id: 0,
    ssn: "",
    salary: 0,
    gender: "",
    phoneNumber: "",
    role: "ADMINISTRATOR",
  } as Employee);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
    setEmployee({ ...employee, [input]: e.target.value });
  };

  const createEmployee = async () => {
    const res = await fetcher("/api/employees", {
      method: "POST",
      body: JSON.stringify(employee),
    });
    router.push("/employee");
  };

  useEffect(() => {
    (async () => {
      setDepartments(await fetcher("/api/departments"));
    })();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Create an Employee</title>
      </Head>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-semibold">Create Employee</h1>
        <div className="flex flex-col gap-y-1">
          <label>Employee First Name</label>
          <input
            placeholder="enter employee first name"
            onChange={(e) => onChange(e, "firstName")}
            className="input"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Employee Last Name</label>
          <input
            placeholder="enter employee last name"
            onChange={(e) => onChange(e, "lastName")}
            className="input"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Employee Social Security Number</label>
          <input
            placeholder="enter employee ssn"
            onChange={(e) => onChange(e, "ssn")}
            className="input"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Employee Gender</label>
          <input
            placeholder="enter employee gender"
            onChange={(e) => onChange(e, "gender")}
            className="input"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Employee Phone Number</label>
          <input
            placeholder="enter employee phone number"
            onChange={(e) => onChange(e, "phoneNumber")}
            className="input"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Employee Salary</label>
          <input
            placeholder="enter employee salary"
            onChange={(e) => onChange(e, "salary")}
            className="input"
            type="number"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Employee Department</label>
          <select
            className="input"
            onChange={(e) => onChange(e, "department_id")}
          >
            {departments.map((department: any) => (
              <option value={department.department_id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Employee Role</label>
          <select className="input" onChange={(e) => onChange(e, "role")}>
            <option value="ADMINISTRATOR">ADMINISTRATOR</option>
            <option value="WORKER">WORKER</option>
            <option value="SUPPORT">SUPPORT</option>
          </select>
        </div>
        <button
          onClick={createEmployee}
          className="addButton mt-2 w-full p-2 text-xl"
        >
          Create
        </button>
      </div>
    </Layout>
  );
};

export default Create;
