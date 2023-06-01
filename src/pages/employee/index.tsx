import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { Employee } from "~/types/employee";
import users from "../api/users";
import sortTable from "~/shared/sortTable";
import { boolean } from "zod";
import Link from "next/link";

type Props = {};

const Index = (props: Props) => {
  const [departments, setDepartments] = useState([]);

  const [update, setUpdate] = useState({
    employee_id: -1,
    firstName: "",
    lastName: "",
    ssn: "",
    salary: 0,
    role: "ADMINISTRATOR",
    department_id: -1,
    isUpdating: false,
  });
  const [employees, setEmployees] = useState([]);
  const deleteItem = async (id: number) => {
    await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });
    setEmployees(
      employees.filter((employee: Employee) => employee.employee_id != id)
    );
  };

  const updateEmployee = async () => {
    await fetch(`/api/employees`, {
      method: "PUT",
      body: JSON.stringify({
        employee_id: update.employee_id,
        firstName: update.firstName,
        lastName: update.lastName,
        ssn: update.ssn,
        salary: update.salary,
        role: update.role,
        department_id: update.department_id,
      }),
    });
    setEmployees(
      employees.map((employee: Employee) => {
        if (employee.employee_id == update.employee_id) {
          return {
            ...employee,
            firstName: update.firstName,
            lastName: update.lastName,
            ssn: update.ssn,
            salary: update.salary,
            role: update.role,
            department_id: update.department_id,
          };
        }
        return employee;
      })
    );

    setUpdate({
      employee_id: -1,
      firstName: "",
      lastName: "",
      ssn: "",
      salary: 0,
      role: "ADMINISTRATOR",
      department_id: -1,
      isUpdating: false,
    });
  };

  const toggleUpdate = async (employee: Employee) => {
    setDepartments(await fetcher(`/api/departments`));
    setUpdate({
      isUpdating: true,
      employee_id: employee.employee_id,
      salary: employee.salary,
      role: employee.role,
      department_id: employee.department_id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      ssn: employee.ssn,
    });
  };

  const calculateAvgSalary = async () => {
    const result = await fetcher("/api/employees/avgSalary");
    alert(`Average Salary: $${(+result[0].avgSalary).toFixed(2)}`);
  };

  const calculateMaxSalary = async () => {
    const result = await fetcher("/api/employees/maxSalary");
    alert(
      `Max Salary: $${(+result[0].salary).toFixed(2)} - ${
        result[0].firstName
      } ${result[0].lastName}`
    );
  };

  const fetchDriverRanking = async () => {
    const result = await fetcher("/api/employees?type=driver_ranking");
    alert(
      `Driver Ranking: \n${result
        .map(
          (employee: Employee, index: number) =>
            `${index + 1}. ${employee.firstName} ${employee.lastName} - ${
              employee.total_trips
            } trips completed.`
        )
        .join("\n")}`
    );
  };

  useEffect(() => {
    (async () => {
      setEmployees(await fetcher("/api/employees"));
    })();
  }, []);

  return (
    <Layout width="full">
      <div className="flex flex-col justify-center">
        <h1 className="my-2 text-center text-xl font-semibold">
          {employees.length} Employees
        </h1>
        <div className="mb-4 flex items-center justify-center gap-x-4">
          <button
            className=" w-fit bg-orange-400 p-2 text-white"
            onClick={calculateAvgSalary}
          >
            Calculate Average Salary
          </button>
          <button
            className=" w-fit border-2 border-orange-400 p-2 text-orange-400"
            onClick={calculateMaxSalary}
          >
            Calculate Maximum Salary
          </button>
          <button
            onClick={fetchDriverRanking}
            className="border-2 border-blue-600 p-2 text-blue-600"
          >
            Fetch Driver Ranking
          </button>
          <Link href={"/employee/create"}>
            <button className="addButton p-2">Create</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3" scope="col">
                Id
              </th>
              <th className="px-6 py-3" scope="col">
                SSN
              </th>
              <th className="px-6 py-3" scope="col">
                Name
              </th>
              <th className="px-6 py-3" scope="col">
                Last Name
              </th>

              <th className="px-6 py-3" scope="col">
                Department
              </th>
              <th className="px-6 py-3" scope="col">
                <button
                  onClick={() => {
                    setEmployees([...sortTable(employees, "salary", "asc")]);
                  }}
                >
                  Salary
                </button>
              </th>
              <th className="px-6 py-3" scope="col">
                Role
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: Employee) => (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {employee.employee_id}
                </th>
                {update.isUpdating &&
                update.employee_id == employee.employee_id ? (
                  <>
                    {/* UPDATING */}
                    <td className="px-2 text-center">
                      <input
                        className="border"
                        type="text"
                        value={update.ssn}
                        onChange={(e) =>
                          setUpdate({ ...update, ssn: e.target.value })
                        }
                      ></input>
                    </td>
                    <td className=" text-center">
                      <input
                        className="border"
                        type="text"
                        value={update.firstName}
                        onChange={(e) =>
                          setUpdate({ ...update, firstName: e.target.value })
                        }
                      ></input>
                    </td>
                    <td className="px-2 text-center">
                      <input
                        className="border"
                        type="text"
                        value={update.lastName}
                        onChange={(e) =>
                          setUpdate({ ...update, lastName: e.target.value })
                        }
                      ></input>
                    </td>
                    <td className="px-2 text-center">
                      <select
                        className="border"
                        value={update.department_id}
                        onChange={(e) =>
                          setUpdate({
                            ...update,
                            department_id: +e.target.value,
                          })
                        }
                      >
                        {departments.map((department: any) => (
                          <option value={department.department_id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 text-center">
                      <input
                        className="border"
                        type="number"
                        value={update.salary}
                        onChange={(e) =>
                          setUpdate({ ...update, salary: +e.target.value })
                        }
                      ></input>
                    </td>
                    <td className="text-center">
                      <select
                        className="border"
                        onChange={(e) =>
                          setUpdate({ ...update, role: e.target.value })
                        }
                      >
                        <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                        <option value="WORKER">WORKER</option>
                        <option value="SUPPORT">SUPPORT</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    {/* DEFAULT */}

                    <td className="px-6 py-4 text-center">{employee.ssn}</td>
                    <td className="px-6 py-4 text-center">
                      {employee.firstName}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {employee.lastName}
                    </td>
                    <td className="px-6 py-4 text-center">{employee.name}</td>
                    <td className="px-6 py-4 text-center">
                      ${employee.salary}
                    </td>
                    <td className="px-6 py-4 text-center">{employee.role}</td>
                  </>
                )}
                <div className="flex h-full items-center justify-center gap-x-2">
                  {update.isUpdating &&
                  update.employee_id == employee.employee_id ? (
                    <>
                      <button
                        onClick={updateEmployee}
                        className="rounded-lg border-2 border-orange-400 p-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() =>
                          setUpdate({ ...update, isUpdating: false })
                        }
                        className="rounded-lg bg-orange-600 p-2 text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleUpdate(employee)}
                        className="rounded-lg bg-blue-600 p-2 text-white"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => deleteItem(employee.employee_id)}
                        className="rounded-lg bg-red-600 p-2 text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Index;
