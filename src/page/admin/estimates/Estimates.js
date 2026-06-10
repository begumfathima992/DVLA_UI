import { useEffect, useState } from "react";

import {
  Card,
  PageHeader,
  Badge,
  BtnBlue,
  BtnGhost,
  BtnGreen,
  BtnRed,
  BtnAmber,
  Select,
  Textarea,
  Table,
  RegPlate,
  SectionTitle,
  LineItemsTable,
  TotalsBox,
  Input,
} from "../../../components/ui/UI";
import {
  calcSubtotal,
  calcVat,
  calcTotal,
  today,
  pad,
} from "../../../utils/data";
import {
  RiAddLine,
  RiDownloadLine,
  RiSendPlane2Line,
  RiArrowRightLine,
  RiEyeLine,
  RiEditLine,
} from "react-icons/ri";
import { customers, vehicles } from "../../../utils/data";
import { sampleEstimates } from "../../../utils/SampleData";
import {
  approvedEstimates,
  createEstimates,
  fetchEstimates,
  updateEstimate,
} from "../../../services/apiServices/estimateService";
import moment from "moment";
import { Modal } from "../../../components/ui/Modal";
import ViewItemDetailsModal from "./ViewItemDetailsModal";
import { fetchCustomers } from "../../../services/apiServices/customers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { fetchByIdCustomerBasedVehicle } from "../../../services/apiServices/vehicleService";
import { CustomInput } from "../../../components/ui/CustomInput";
import toast from "react-hot-toast";
import useDebounce from "../../../components/useDebounce";

const estimateSchema = Yup.object().shape({
  customerId: Yup.number().required("Customer is required"),

  vehicleId: Yup.number().required("Vehicle is required"),

  estimateDate: Yup.date().required("Estimate date is required"),

  estimateNumber: Yup.string().required("Estimate number is required"),

  documentType: Yup.string()
    .oneOf(["Estimate", "Quotation"], "Invalid document type")
    .required("Document type is required"),

  labourRate: Yup.number().nullable().min(0, "Labour rate cannot be negative"),

  creditTerms: Yup.number()
    .nullable()
    .min(0, "Credit terms cannot be negative"),

  defaultDiscount: Yup.number()
    .nullable()
    .min(0)
    .max(100, "Discount cannot exceed 100%"),

  customerOrderNumber: Yup.string().nullable().max(100),

  vehicleMileage: Yup.number().nullable().min(0),

  serviceAdvisor: Yup.string().nullable().max(100),

  validUntil: Yup.date().nullable(),

  notes: Yup.string().nullable().max(5000),

  subtotal: Yup.number().required("Subtotal is required").min(0),

  vatPercentage: Yup.number().required("VAT % is required").min(0).max(100),

  vatAmount: Yup.number().required("VAT amount is required").min(0),

  discount: Yup.number().nullable().min(0),

  total: Yup.number().required("Total is required").min(0),

  status: Yup.string()
    .oneOf(
      ["Draft", "Sent", "Approved", "Rejected", "Converted"],
      "Invalid status",
    )
    .default("Draft"),

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

export default function Estimates() {
  const [showNew, setShowNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState("");
  const [estimateData, setEstimateData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [formEdit, setFormEdit] = useState(null);
  const [editing, setEditing] = useState(false);
  const searchQuery = useDebounce(search);
  const estimateList = async () => {
    try {
      const response = await fetchEstimates();
      if (response.success) {
        setEstimateData(response?.data || []);
      } else {
        setEstimateData([]);
      }
    } catch {
      setEstimateData([]);
    }
  };
  useEffect(() => {
    estimateList();
  }, []);
  const initialValuess = {
    customerId: "",
    vehicleId: "",
    estimateDate: new Date(),
    estimateNumber: "",
    documentType: "Estimate",
    labourRate: 0,
    creditTerms: 30,
    defaultDiscount: 0,
    customerOrderNumber: "",
    vehicleMileage: "",
    serviceAdvisor: "",
    validUntil: "",
    notes: "",
    subtotal: 0,
    vatPercentage: 20,
    vatAmount: 0,
    discount: 0,
    total: 0,
    status: "Draft",
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
    // enableReinitialize: true,
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
        ...values,
        subtotal,
        vatAmount,
        total,
        items: values.items.map((item) => ({
          ...item,
          totalPrice: Number(item.quantity || 0) * Number(item.unitPrice || 0),
        })),
      };

      try {
        setSubmitting(true);
        let response;

        console.log(editing, formEdit, "sdlkjflkj");

        // return;
        if (editing && formEdit) {
          response = await updateEstimate(values, formEdit);
          toast.success("Estimate updated successfully");
        } else {
          response = await createEstimates(values);
          toast.success("Estimate created successfully");
        }

        if (response.success) {
          resetForm();
          setShowNew(false);
          setEditing(false);
          estimateList();
        }
      } catch (error) {
        toast.error(error.message || "Failed to save vehicle");
      } finally {
        setSubmitting(false);
      }
    },
  });

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
        estimateList();
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

    setFormEdit(row?.id || null);
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
      defaultDiscount: Number(estimate.defaultDiscount) || 0,
      customerOrderNumber: estimate.customerOrderNumber || "",
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

  const generateEstimateNumber = () => {
    // return `EST-${Date.now()}`;
    const newEstNum = `EST-${Date.now()}`;
    formik.setFieldValue("estimateNumber", newEstNum);
  };
  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Estimates"
        sub="Create and send quotations to customers"
        action={
          <BtnBlue
            onClick={() => {
              setShowNew(true);
            }}
          >
            <RiAddLine /> New Estimate
          </BtnBlue>
        }
      />

      {/* <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: sampleEstimates.length,
            color: "text-slate-800",
          },
          {
            label: "Draft",
            value: sampleEstimates.filter((e) => e.status === "Draft").length,
            color: "text-slate-600",
          },
          {
            label: "Approved",
            value: sampleEstimates.filter((e) => e.status === "Approved")
              .length,
            color: "text-green-600",
          },
          {
            label: "Pipeline",
            value: `£${sampleEstimates.reduce((s, e) => s + tot(e), 0)?.toFixed(0)}`,
            color: "text-blue-600",
          },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              {s.label}
            </div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          </Card>
        ))}
      </div> */}
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
            "Estimate #",
            "Job No. #",
            "Customer",
            "Vehicle",
            "Date",
            "Valid Until",
            "Total",
            "Status",
            "Actions",
          ]}
          empty={!estimateData.length ? "No estimates found" : null}
        >
          {estimateData?.map((est, index) => {
            return (
              <tr
                key={est.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setViewing(est)}
              >
                <td className="px-4 py-3 font-mono text-blue-600 font-semibold text-sm">
                  {est?.estimateNumber}
                </td>
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
                  <Badge status={est.status} />
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

                    {est.status != "Rejected" && est.status != "Approved" && (
                      <Select
                        value={est.status || ""}
                        onChange={(e) =>
                          updateStatusEstimatesFun(est?.id, e.target.value)
                        }
                      >
                        {est.status != "Sent" && <option>Draft</option>}
                        <option>Sent</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </Select>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </Card>

      <Modal
        title={editing ? "Edit Estimate" : "New Estimate"}
        sub="Create a quotation for the customer"
        // size="max-w-4xl"
        onClose={() => handleCloseModal()}
        open={showNew}
        footer={
          <>
            <BtnGhost onClick={() => handleCloseModal()}>Cancel</BtnGhost>

            <BtnBlue onClick={formik.handleSubmit}>📋 Create Estimate</BtnBlue>
          </>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5">
            <div>
              <SectionTitle>👤 Customer & Vehicle</SectionTitle>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <CustomInput
                    formik={formik}
                    label="Estimate Number"
                    name="estimateNumber"
                    type="text"
                    placeholder="EG. EST-293847265"
                    readOnly={editing}
                  />
                  {!editing && (
                    <div
                      className="text-xs cursor-pointer text-blue-500 text-end "
                      onClick={() => generateEstimateNumber()}
                    >
                      Generate Now
                    </div>
                  )}
                </div>
                <Select
                  label="Customer *"
                  value={formik.values?.customerId || ""}
                  onChange={(e) =>
                    formik.setFieldValue("customerId", e.target.value)
                  }
                  touched={formik.touched}
                  errors={formik.errors.customerId}
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
                  label="VAT Percentage"
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
                  label="Valid Until"
                  name="validUntil"
                  type="date"
                />
                <div className="col-span-3 font-medium text-blue-600">
                  Other Details
                </div>

                <CustomInput
                  formik={formik}
                  label="Estimate Date"
                  name="estimateDate"
                  type="date"
                  placeholder="Enter"
                />
                <CustomInput
                  formik={formik}
                  label="Document Type"
                  name="documentType"
                  type="text"
                  readOnly
                />
                <CustomInput
                  formik={formik}
                  label="Labour Rate"
                  name="labourRate"
                  type="number"
                  placeholder="Eg. 1200"
                />

                <CustomInput
                  formik={formik}
                  label="Customer Order Number"
                  name="customerOrderNumber"
                  type="text"
                  placeholder="Eg. CO-1002"
                />
                <CustomInput
                  formik={formik}
                  label="Service Advisor"
                  name="serviceAdvisor"
                  type="text"
                  placeholder="Eg. john"
                />
                <CustomInput
                  formik={formik}
                  label="Default Discount"
                  name="defaultDiscount"
                  type="number"
                  placeholder="Eg. 20"
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
                  <option>Draft</option>
                  <option>Sent</option>
                  <option>Approved</option>
                  <option>Rejected</option>
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
        <ViewItemDetailsModal setViewing={setViewing} viewing={viewing} />
      )}
    </div>
  );
}
