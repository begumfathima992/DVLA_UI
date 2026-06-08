// 






import { useEffect, useState } from "react";
import {
  Card,
  PageHeader,
  BtnBlue,
  BtnGhost,
  Table,
  RegPlate,
  Select,
} from "../../../components/ui/UI";
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiSearchLine } from "react-icons/ri";
import { Modal } from "../../../components/ui/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { CustomInput } from "../../../components/ui/CustomInput";
import axios from "axios"; // Added for DVLA API lookup

import {
  createVehicles,
  deleteVehicles,
  fetchVehicles,
  updateVehicles,
} from "../../../services/apiServices/vehicleService";

import { fetchCustomers } from "../../../services/apiServices/customers";

const vehicleSchema = Yup.object().shape({
  registrationNumber: Yup.string()
    .required("Registration is required")
    .min(5, "Registration number is too short"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Invalid year"),
  vinNumber: Yup.string().min(10, "VIN number is too short"),
  mileage: Yup.number().min(0, "Mileage cannot be negative"),
  engineNumber: Yup.string(),
  fuelType: Yup.string(),
  colour: Yup.string(),
  cc: Yup.number().min(0),
  grossWeight: Yup.number().min(0),
  taxDueDate: Yup.date(),
  motDueDate: Yup.date(),
  nextServiceDate: Yup.date(),
  customerId: Yup.string().required("Please select an owner"),
});

const blankVehicle = () => ({
  registrationNumber: "",
  make: "",
  model: "",
  year: "",
  vinNumber: "",
  mileage: "",
  engineNumber: "",
  fuelType: "",
  colour: "",
  cc: "",
  grossWeight: "",
  taxDueDate: "",
  motDueDate: "",
  nextServiceDate: "",
  customerId: "",
});

export default function Vehicles() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formEdit, setFormEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isSearchingDVLA, setIsSearchingDVLA] = useState(false); // Loading state for lookup

  const vehiclesList = async () => {
    try {
      const response = await fetchVehicles();
      setVehicleData(response?.success ? response.data || [] : []);
    } catch (error) {
      console.error(error);
      setVehicleData([]);
    }
  };

  const customerList = async () => {
    try {
      const response = await fetchCustomers();
      setCustomerData(response?.success ? response.data || [] : []);
    } catch {
      setCustomerData([]);
    }
  };

  useEffect(() => {
    vehiclesList();
    customerList();
  }, []);

  // ====== NEW: DVLA LOOKUP FUNCTION FUNCTION ======
  const handleDVLALookup = async () => {
    const reg = formik.values.registrationNumber;
    if (!reg || reg.trim().length < 4) {
      return toast.error("Please enter a valid registration number first");
    }

    try {
      setIsSearchingDVLA(true);
      toast.loading("Fetching DVLA vehicle data...", { id: "dvla" });

      // Call your backend endpoint running on port 5001
      const response = await axios.post("http://localhost:5001/api/dvla/search", {
        registrationNumber: reg
      });

      if (response.data) {
        const data = response.data;
        
        // Auto-fill Formik values using matching data shapes
        formik.setFieldValue("make", data.make || "");
        formik.setFieldValue("model", data.model || "Unknown Model"); // DVLA doesn't always provide specific sub-models
        formik.setFieldValue("year", data.yearOfManufacture || "");
        formik.setFieldValue("fuelType", data.fuelType || "");
        formik.setFieldValue("colour", data.colour || "");
        formik.setFieldValue("cc", data.engineCapacity || "");
        formik.setFieldValue("taxDueDate", data.taxDueDate || "");
        formik.setFieldValue("motDueDate", data.motExpiryDate || "");

        toast.success("DVLA specs imported successfully!", { id: "dvla" });
      } else {
        toast.error("No data found for this registration", { id: "dvla" });
      }
    } catch (error) {
      console.error("DVLA Search error:", error);
      toast.error(error.response?.data?.error || "Vehicle lookup failed", { id: "dvla" });
    } finally {
      setIsSearchingDVLA(false);
    }
  };

  const formik = useFormik({
    initialValues: blankVehicle(),
    validationSchema: vehicleSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        let response;

        if (editing && formEdit?.id) {
          response = await updateVehicles(values, formEdit.id);
          toast.success("Vehicle updated successfully");
        } else {
          response = await createVehicles(values);
          toast.success("Vehicle created successfully");
        }

        if (response.success) {
          resetForm();
          setShowModal(false);
          setEditing(false);
          vehiclesList();
        }
      } catch (error) {
        toast.error(error.message || "Failed to save vehicle");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const open = (vehicle = null) => {
    if (vehicle) {
      setFormEdit(vehicle);
      setEditing(true);
      formik.setValues({
        registrationNumber: vehicle.registrationNumber || "",
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year || "",
        vinNumber: vehicle.vinNumber || "",
        mileage: vehicle.mileage || "",
        engineNumber: vehicle.engineNumber || "",
        fuelType: vehicle.fuelType || "",
        colour: vehicle.colour || "",
        cc: vehicle.cc || "",
        grossWeight: vehicle.grossWeight || "",
        taxDueDate: vehicle.taxDueDate || "",
        motDueDate: vehicle.motDueDate || "",
        nextServiceDate: vehicle.nextServiceDate || "",
        customerId: vehicle.customer?.id || "",
      });
    } else {
      setFormEdit(null);
      setEditing(false);
      formik.resetForm();
    }
    setShowModal(true);
  };

  const modalClose = () => {
    setShowModal(false);
    setEditing(false);
    setFormEdit(null);
    formik.resetForm();
  };

  const filteredVehicles = vehicleData.filter((v) =>
    [v.registrationNumber, v.make, v.model]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const deleteVehicleFun = async (id) => {
    try {
      const response = await deleteVehicles(id);
      if (response.success) {
        toast.success(response.message);
        vehiclesList();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Vehicles"
        sub={`${vehicleData.length} registered vehicles`}
        action={
          <BtnBlue onClick={() => open()}>
            <RiAddLine /> Add Vehicle
          </BtnBlue>
        }
      />

      <Card>
        <div className="p-4 border-b border-slate-100">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reg, make, model..."
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm w-72 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <Table
          headers={[
            "Customer Name",
            "Reg",
            "Make",
            "Model",
            "Year",
            "VIN",
            "Mileage",
            "Owner",
            "Actions",
          ]}
          empty={!vehicleData.length ? "No vehicles found" : null}
        >
          {filteredVehicles.map((v) => (
            <tr
              key={v.id}
              className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 font-semibold text-slate-800">
                {v.customer?.name}
              </td>
              <td className="px-4 py-3">
                <RegPlate reg={v.registrationNumber} />
              </td>
              <td className="px-4 py-3 font-semibold text-slate-800">
                {v.make}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{v.model}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{v.year}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-400">
                {v.vinNumber}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{v.mileage}</td>
              <td className="px-4 py-3 text-sm font-medium text-blue-600">
                {v.customer?.name || "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => open(v)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <RiEditLine />
                  </button>
                  <button
                    onClick={() => {
                      deleteVehicleFun(v.id);
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* ==================== MODAL ==================== */}
      <Modal
        title={editing ? "Edit Vehicle" : "Add New Vehicle"}
        onClose={modalClose}
        open={showModal}
      >
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4">
          
          {/* REGISTRATION INPUT WITH LOOKUP BUTTON ATTACHED */}
          <div className="col-span-2 grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <CustomInput
                formik={formik}
                label="Registration *"
                name="registrationNumber"
                placeholder="AB12 CDE"
                className="uppercase"
              />
            </div>
            {!editing && (
              <button
                type="button"
                onClick={handleDVLALookup}
                disabled={isSearchingDVLA}
                className="h-[42px] px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 text-sm shadow-sm"
              >
                <RiSearchLine /> {isSearchingDVLA ? "Searching..." : "Lookup DVLA"}
              </button>
            )}
          </div>

          <CustomInput
            formik={formik}
            label="Make *"
            name="make"
            placeholder="BMW"
          />

          <CustomInput
            formik={formik}
            label="Model *"
            name="model"
            placeholder="320d M Sport"
          />

          <CustomInput
            formik={formik}
            label="Year"
            name="year"
            type="number"
            placeholder="2018"
          />

          <CustomInput
            formik={formik}
            label="VIN Number"
            name="vinNumber"
            placeholder="WBA8E120X0K123456"
          />

          <CustomInput
            formik={formik}
            label="Mileage"
            name="mileage"
            type="number"
            placeholder="58750"
          />

          <CustomInput
            formik={formik}
            label="Engine Number"
            name="engineNumber"
            placeholder="N47D20"
          />

          <CustomInput
            formik={formik}
            label="Fuel Type"
            name="fuelType"
            placeholder="Diesel / Petrol / Electric"
          />

          <CustomInput
            formik={formik}
            label="Colour"
            name="colour"
            placeholder="Black"
          />

          <CustomInput
            formik={formik}
            label="CC (Engine Capacity)"
            name="cc"
            type="number"
            placeholder="1995"
          />

          <CustomInput
            formik={formik}
            label="Gross Weight (kg)"
            name="grossWeight"
            type="number"
            placeholder="1950"
          />

          <CustomInput
            formik={formik}
            label="Tax Due Date"
            name="taxDueDate"
            type="date"
          />

          <CustomInput
            formik={formik}
            label="MOT Due Date"
            name="motDueDate"
            type="date"
          />

          <CustomInput
            formik={formik}
            label="Next Service Date"
            name="nextServiceDate"
            type="date"
          />

          <div className="col-span-2">
            <Select
              label="Owner (Customer)"
              value={formik.values?.customerId || ""}
              onChange={(e) =>
                formik.setFieldValue("customerId", e.target.value)
              }
            >
              <option value="">Select customer...</option>
              {customerData.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-4">
            <BtnGhost onClick={modalClose}>Cancel</BtnGhost>
            <BtnBlue type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting
                ? "Saving..."
                : editing
                  ? "Save Changes"
                  : "Add Vehicle"}
            </BtnBlue>
          </div>
        </form>
      </Modal>
    </div>
  );
}