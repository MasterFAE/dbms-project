import { useRouter } from "next/router";
import React from "react";
import Layout from "~/components/Layout";
import { Vehicle } from "~/types/vehicle";

type Props = {};

const AddVehicle = (props: Props) => {
  const router = useRouter();
  const [data, setData] = React.useState<Vehicle>({
    vehicle_id: 0,
    mileage: 0,
    plate: "",
    type: "SERVICE",
    manufacturer: "",
    model: "",
    year: 0,
    color: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    setData({ ...data, [input]: e.target.value });
  };

  const createVehicle = async () => {
    if (
      !data.mileage ||
      !data.plate ||
      !data.manufacturer ||
      !data.model ||
      !data.year ||
      !data.color
    ) {
      alert("Please fill all the fields");
      return;
    }
    const res = await fetch("/api/vehicles", {
      method: "POST",
      body: JSON.stringify(data),
    });
    router.push("/vehicle");
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-medium">Add Vehicle</h1>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="manufacture">Manufacturer</label>
          <input
            onChange={(e) => handleChange(e, "manufacturer")}
            id="manufacture"
            className="input"
            type="text"
            placeholder="Manufacturer"
          />
        </div>

        <div className="my-2 flex flex-col gap-y-1">
          <label htmlFor="model">Model</label>
          <input
            onChange={(e) => handleChange(e, "model")}
            id="model"
            className="input"
            type="text"
            placeholder="Vehicle Model"
          />
        </div>

        <div className="my-2 flex flex-col gap-y-1">
          <label htmlFor="plate">Plate</label>
          <input
            onChange={(e) => handleChange(e, "plate")}
            id="plate"
            className="input"
            type="text"
            placeholder="Vehicle Plate"
          />
        </div>

        <div className="my-2 flex flex-col gap-y-1">
          <label htmlFor="color">Color</label>
          <input
            onChange={(e) => handleChange(e, "color")}
            id="color"
            className="input"
            type="text"
            placeholder="Vehicle Color"
          />
        </div>
        <div className="my-2 flex flex-col gap-y-1">
          <label htmlFor="year">Vehicle Year</label>
          <input
            onChange={(e) => handleChange(e, "year")}
            id="year"
            className="input"
            type="text"
            placeholder="Vehicle Year"
          />
        </div>
        <div className="my-2 flex flex-col gap-y-1">
          <label htmlFor="mileage">Vehicle Mileage</label>
          <input
            onChange={(e) => handleChange(e, "mileage")}
            id="mileage"
            className="input"
            type="text"
            placeholder="Vehicle Mileage"
          />
        </div>
        <div className="my-2 flex flex-col gap-y-1">
          <label htmlFor="type">Vehicle Mileage</label>
          <select
            id="type"
            className="input"
            onChange={(e) => handleChange(e, "type")}
          >
            <option value="SERVICE">SERVICE</option>
            <option value="TRANSPORT">TRANSPORT</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
        </div>
        <button
          onClick={createVehicle}
          className="addButton mt-4 w-full p-2 text-xl"
        >
          Create
        </button>
      </div>
    </Layout>
  );
};

export default AddVehicle;
