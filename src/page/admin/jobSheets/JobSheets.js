import { useEffect, useState } from "react";

import {
  Card,
  PageHeader,
  BtnBlue,
  BtnGhost,
  Select,
  Textarea,
  Table,
  RegPlate,
  SectionTitle,
  LineItemsTable,
  TotalsBox,
} from "../../../components/ui/UI";
import { calcSubtotal, calcVat, calcTotal } from "../../../utils/data";
import { RiEyeLine, RiEditLine } from "react-icons/ri";
import {
  approvedEstimates,
  createEstimates,
  updateEstimate,
} from "../../../services/apiServices/estimateService";
import moment from "moment";
import { Modal } from "../../../components/ui/Modal";
import { fetchCustomers } from "../../../services/apiServices/customers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { fetchByIdCustomerBasedVehicle } from "../../../services/apiServices/vehicleService";
import { CustomInput } from "../../../components/ui/CustomInput";
import toast from "react-hot-toast";
import useDebounce from "../../../components/useDebounce";
import JobSheetsDetailModal from "./JobSheetsDetailModal";
import {
  fetchJobSheets,
  updateJobSheets,
} from "../../../services/apiServices/jobSheetService";
import PriorityStatusUpdate from "./component/PriorityStatusUpdate";
import StatusUpdate from "./component/StatusUpdate";

const estimateSchema = Yup.object().shape({
  customerId: Yup.number().required("Customer is required"),
  vehicleId: Yup.number().required("Vehicle is required"),
  technicianName: Yup.string().required("Technician Name is required"),
  documentType: Yup.string()
    .oneOf(["Estimate", "Quotation"], "Invalid document type")
    .required("Document type is required"),
  labourRate: Yup.number().nullable().min(0, "Labour rate cannot be negative"),
  vehicleMileage: Yup.number().nullable().min(0),
  serviceAdvisor: Yup.string().nullable().max(100),
  startDate: Yup.date().required("Start Date is required"),

  notes: Yup.string().nullable().max(5000),

  subtotal: Yup.number().required("Subtotal is required").min(0),

  vatPercentage: Yup.number().required("VAT % is required").min(0).max(100),

  vatAmount: Yup.number().required("VAT amount is required").min(0),

  discount: Yup.number().nullable().min(0),

  total: Yup.number().required("Total is required").min(0),

  status: Yup.string()
    .oneOf(["Open", "In Progress", "Completed", "Cancelled"], "Invalid status")
    .default("Open"),
  priority: Yup.string()
    .oneOf(["Low", "Medium", "High", "Urgent"], "Invalid priority status")
    .default("Low"),

  items: Yup.array()
    .of(
      Yup.object().shape({
        itemType: Yup.string()
          .oneOf(["Part", "Labour", "Service"], "Invalid item type")
          .required("Item type is required"),

        description: Yup.string().required("Description is required"),

        quantity: Yup.number().required("Quantity is required").min(1),

        unitPrice: Yup.number().required("Unit price is required").min(0),

        totalPrice: Yup.number().required("Total price is required").min(0),
      }),
    )
    .min(1, "At least one estimate item is required"),
});

export default function JobSheets() {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState("");
  const [jobSheetsData, setJobSheetsData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [formEdit, setFormEdit] = useState(null);
  const [editing, setEditing] = useState(false);
  const searchQuery = useDebounce(search);
  const jobSheetsList = async () => {
    try {
      const response = await fetchJobSheets();
      if (response.success) {
        setJobSheetsData(response?.data || []);
      } else {
        setJobSheetsData([]);
      }
    } catch {
      setJobSheetsData([]);
    }
  };
  useEffect(() => {
    jobSheetsList();
  }, []);
  const initialValuess = {
    technicianName: "",
    customerId: "",
    vehicleId: "",
    estimateDate: new Date(),
    estimateNumber: "",
    documentType: "Estimate",
    labourRate: 0,
    creditTerms: 30,
    defaultDiscount: 0,
    vehicleMileage: "",
    serviceAdvisor: "",
    startDate: "",
    notes: "",
    subtotal: 0,
    vatPercentage: 20,
    vatAmount: 0,
    discount: 0,
    total: 0,
    status: "Open",
    priority: "Low",
    items: [
      {
        description: "",
        itemType: "Part",
        quantity: 1,
        unitPrice: 0,
        vat: 20,
        totalPrice: 0,
      },
    ],
  };
  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: estimateSchema,
    enableReinitialize: false,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const subtotal = values.items.reduce(
        (sum, item) =>
          sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
        0,
      );

      const vatAmount = values.items.reduce(
        (sum, item) =>
          sum +
          Number(item.quantity || 0) *
            Number(item.unitPrice || 0) *
            (Number(item.vat || 0) / 100),
        0,
      );

      const total = subtotal + vatAmount;

      const payload = {
        vatPercentage: values.vatPercentage,
        subtotal,
        vatAmount,
        total,
        technicianName: values.technicianName,
        vehicleMileage: values.vehicleMileage,
        serviceAdvisor: values.serviceAdvisor,
        priority: values.priority,
        status: values.status,
        startDate: values.startDate,
        labourRate: values.labourRate,
        notes: values.notes,
        items: values.items.map((item) => ({
          ...item,
          totalPrice: Number(item.quantity || 0) * Number(item.unitPrice || 0),
        })),
      };
      try {
        setSubmitting(true);
        let response = await updateJobSheets(values, formEdit?.id);

        if (response.success) {
          resetForm();
          toast.success("Estimate updated successfully");
          setShowNew(false);
          setEditing(false);
          jobSheetsList();
        }
      } catch (error) {
        toast.error(error.message || "Failed to save vehicle");
      } finally {
        setSubmitting(false);
      }
    },
  });

  console.log(formik.errors, "payload");
  const customerList = async () => {
    try {
      const response = await fetchCustomers();
      if (response.success) {
        setCustomerData(response?.data || []);
      } else {
        setCustomerData([]);
      }
    } catch {
      setCustomerData([]);
    }
  };
  useEffect(() => {
    customerList();
  }, []);

  const vehicleList = async () => {
    try {
      const response = await fetchByIdCustomerBasedVehicle(
        formik.values.customerId,
      );
      if (response.success) {
        setVehicleData(response?.data || []);
      } else {
        setVehicleData([]);
      }
    } catch {
      setVehicleData([]);
    }
  };
  useEffect(() => {
    vehicleList();
  }, [formik.values.customerId]);

  const updateStatusEstimatesFun = async (id, status) => {
    try {
      const response = await approvedEstimates(id, { status: status });
      if (response.success) {
        toast.success(response.message);
        jobSheetsList();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditFun = (row) => {
    const estimate = row;
    console.log(estimate, "estimate");

    setFormEdit(row || null);
    formik.setValues({
      customerId: estimate.customerId,
      vehicleId: estimate.vehicleId,
      estimateDate: estimate.estimateDate
        ? estimate.estimateDate.split("T")[0]
        : "",
      estimateNumber: estimate.estimateNumber || "",
      documentType: estimate.documentType || "Estimate",
      labourRate: Number(estimate.labourRate) || 0,
      creditTerms: estimate.customer?.creditTerms || 30,
      vehicleMileage: estimate.vehicleMileage || "",
      serviceAdvisor: estimate.serviceAdvisor || "",
      validUntil: estimate.validUntil || "",
      notes: estimate.notes || "",
      subtotal: Number(estimate.subtotal) || 0,
      vatPercentage: Number(estimate.vatPercentage) || 0,
      vatAmount: Number(estimate.vatAmount) || 0,
      discount: Number(estimate.discount) || 0,
      total: Number(estimate.total) || 0,
      status: estimate.status || "Draft",
      priority: estimate.priority || "Draft",
      technicianName: estimate.technicianName || "",

      items:
        estimate.items?.map((item) => ({
          id: item.id,
          itemType: item.itemType,
          description: item.description,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          totalPrice: Number(item.totalPrice),
        })) || [],
    });
    setEditing(true);
    setShowNew(true);
  };
  const handleCloseModal = () => {
    setEditing(false);
    setFormEdit(null);
    formik.resetForm();
    setShowNew(false);
  };

  console.log(formEdit, "formEdit");

  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Job Sheets"
        sub="Create and send quotations to customers"
      />

      <Card>
        <div className="p-4 border-b border-slate-100">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search estimates..."
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm w-72 outline-none focus:border-blue-400"
          />
        </div>
        <Table
          headers={[
            "Job Sheet #",
            "Customer",
            "Vehicle",
            "Date",
            "Valid Until",
            "Total",
            "Priority",
            "Status",
            "Actions",
          ]}
          empty={!jobSheetsData.length ? "No estimates found" : null}
        >
          {jobSheetsData?.map((est, index) => {
            return (
              <tr
                key={est.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                // onClick={() => setViewing(est)}
              >
                <td className="px-4 py-3 font-mono text-blue-600 font-semibold text-sm">
                  {est?.jobNumber}
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">
                  {est?.customer?.name || "—"}
                </td>
                <td className="px-4 py-3">
                  <RegPlate reg={est.vehicle?.model} />
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {moment(est.estimateDate).format("lll")}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {/* {est.validUntil || "—"} */}
                  {est.validUntil != "0000-00-00"
                    ? moment(est.validUntil).format("lll")
                    : "--"}
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-slate-800">
                  £{est?.total}
                </td>
                <td className="px-4 py-3">
                  <PriorityStatusUpdate
                    title={est.priority}
                    id={est?.id}
                    jobSheetsList={jobSheetsList}
                  />
                </td>
                <td className="px-4 py-3">
                  {/* <Badge status={est.status} /> */}
                  <StatusUpdate
                    title={est.status}
                    id={est?.id}
                    jobSheetsList={jobSheetsList}
                  />
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setViewing(est)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-500"
                    >
                      <RiEyeLine />
                    </button>
                    <button
                      onClick={() => handleEditFun(est)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-500 transition-colors"
                    >
                      <RiEditLine />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </Card>

      <Modal
        title={`Edit Job Sheets - ${formEdit?.jobNumber}`}
        sub="Create a quotation for the customer"
        // size="max-w-4xl"
        onClose={() => handleCloseModal()}
        open={showNew}
        footer={
          <>
            <BtnGhost onClick={() => handleCloseModal()}>Cancel</BtnGhost>

            <BtnBlue onClick={formik.handleSubmit}>
              📋 Update Job Sheets
            </BtnBlue>
          </>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5">
            <div>
              <SectionTitle>👤 Customer & Vehicle</SectionTitle>
              <div className="grid grid-cols-3 gap-4">
                <Select
                  label="Customer *"
                  value={formik.values?.customerId || ""}
                  onChange={(e) =>
                    formik.setFieldValue("customerId", e.target.value)
                  }
                  touched={formik.touched}
                  errors={formik.errors.customerId}
                  disabled
                >
                  <option value="">Select customer...</option>
                  {customerData.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} gg
                    </option>
                  ))}
                </Select>
                <Select
                  label="Vehicle"
                  value={formik.values?.vehicleId || ""}
                  onChange={(e) =>
                    formik.setFieldValue("vehicleId", e.target.value)
                  }
                  touched={formik.touched}
                  errors={formik.errors.vehicleId}
                  disabled
                >
                  <option value="">Select vehicle...</option>
                  {vehicleData.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.registrationNumber} — {v.make} {v.model}
                    </option>
                  ))}
                </Select>

                <CustomInput
                  formik={formik}
                  label="VAT Percentage (%)"
                  name="vatPercentage"
                  type="number"
                  placeholder="EG. 10%"
                />

                <CustomInput
                  formik={formik}
                  label="Discount"
                  name="discount"
                  type="number"
                  placeholder="EG. 23"
                />
                <CustomInput
                  formik={formik}
                  label="Start Date"
                  name="startDate"
                  type="date"
                />
                <CustomInput
                  formik={formik}
                  label="Labour Rate"
                  name="labourRate"
                  type="number"
                  placeholder="Eg. 1200"
                />
                <div className="col-span-3 font-medium text-blue-600">
                  Other Details
                </div>
                <CustomInput
                  formik={formik}
                  label="Service Advisor"
                  name="serviceAdvisor"
                  type="text"
                  placeholder="Eg. john"
                />
                <CustomInput
                  formik={formik}
                  label="Technician Name"
                  name="technicianName"
                  type="text"
                  placeholder="Eg. john"
                />
                <CustomInput
                  formik={formik}
                  label="Vehicle Mileage"
                  name="vehicleMileage"
                  type="number"
                  placeholder="Eg. 230"
                />

                <Select
                  label="Status"
                  value={formik.values?.status || ""}
                  onChange={(e) =>
                    formik.setFieldValue("status", e.target.value)
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </Select>
                <Select
                  label="Priority Status"
                  value={formik.values?.priority || ""}
                  onChange={(e) =>
                    formik.setFieldValue("status", e.target.value)
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </Select>
              </div>
            </div>
            <div>
              <SectionTitle>🔧 Repair Items</SectionTitle>
              <LineItemsTable
                items={formik.values.items}
                setFieldValue={formik.setFieldValue}
                fieldName="items"
                formik={formik}
              />
              <div className="flex justify-end">
                <TotalsBox
                  subtotal={calcSubtotal(formik.values.items)}
                  vat={calcVat(formik.values.items)}
                  discount={formik.values.discount || 0}
                  total={calcTotal(formik.values.items, formik.values.discount)}
                />
              </div>
            </div>
            <div>
              <SectionTitle>📝 Notes</SectionTitle>
              <Textarea
                value={formik.values.notes}
                onChange={(e) => formik.setFieldValue("notes", e.target.value)}
                placeholder="Notes for the customer..."
              />
            </div>
          </div>
        </form>
      </Modal>

      {viewing && (
        <JobSheetsDetailModal setViewing={setViewing} viewing={viewing} />
      )}
    </div>
  );
}
