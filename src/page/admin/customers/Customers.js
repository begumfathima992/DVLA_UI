import { useEffect, useState } from "react";
import {
  Card,
  PageHeader,
  BtnBlue,
  BtnGhost,
  Input,
  Table,
  EmptyState,
  Select,
} from "../../../components/ui/UI";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiPhoneLine,
  RiMailLine,
} from "react-icons/ri";
import { customers } from "../../../utils/data";
import { Modal } from "../../../components/ui/Modal";
import {
  createCustomers,
  deleteCustomers,
  fetchCustomers,
  updateCustomers,
} from "../../../services/apiServices/customers";
import moment from "moment/moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { CustomInput } from "../../../components/ui/CustomInput";
import { Formik, Form } from "formik";
import ConfirmDialog from "../../../components/ConfirmDialog";
import useDebounce from "../../../components/useDebounce";

const customerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .required("Full name is required"),

  phone: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Phone number is too short")
    .required("Phone is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  address: Yup.string()
    .max(200, "Address is too long")
    .required("Address is required"),
  alternativeAddress: Yup.string().max(200, "Alternative Address is too long"),

  telephone: Yup.string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Please enter a valid telephone number")
    .min(10, "telephone number is too short"),
  creditTerms: Yup.string().max(200, "creditTerms is too long"),
  gdprConsent: Yup.boolean(),
  customerCode: Yup.string().max(200, "GDPR Consent is too long"),
});
export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [formEdit, setFormEdit] = useState({});
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const searchQuery = useDebounce(search);
  const openEditFun = (c = null) => {
    if (c != null) {
      setFormEdit(c);
      setEditing(true);
    }

    setShowModal(true);
  };

  const customerList = async () => {
    try {
      const response = await fetchCustomers(searchQuery);
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
  }, [searchQuery]);

  const formik = useFormik({
    initialValues: {
      name: formEdit?.name || "",
      phone: formEdit?.phone || "",
      email: formEdit?.email || "",
      address: formEdit?.address || "",
      telephone: formEdit?.telephone || "",
      alternativeAddress: formEdit?.alternativeAddress || "",
      creditTerms: formEdit?.creditTerms || "",
      gdprConsent: formEdit?.gdprConsent || false,
      customerCode: formEdit?.customerCode || "",
    },
    validationSchema: customerSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        let response = {};
        if (editing) {
          response = await updateCustomers(values, formEdit?.id);
        } else {
          response = await createCustomers(values);
        }

        if (response.success) {
          toast.success(response.message || "Successfully customer create ");
          resetForm();
          setShowModal(false);
          customerList();
        } else {
          toast.error(response?.message);
          console.log(response, "response");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },

    // enableReinitialize: true,
  });

  const modalClose = () => {
    setFormEdit({});
    setShowModal(false);
    setEditing(false);
  };

  const deleteCustomer = async () => {
    try {
      const response = await deleteCustomers(customerId);
      if (response.success) {
        toast.success(response.message);
        customerList();
        setOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(formik.errors, formik.values, "sdfl;ksjdfl;");

  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Customers"
        sub={`${customerData.length} total customers`}
        action={
          <BtnBlue onClick={() => openEditFun()}>
            <RiAddLine /> Add Customer
          </BtnBlue>
        }
      />
      <Card>
        <div className="p-4 border-b border-slate-100">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm w-72 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <Table
          headers={[
            "ID",
            "Name",
            "Phone",
            "Email",
            "Address",
            "Join Date",
            "Actions",
          ]}
          empty={!customerData.length ? "No customers found" : null}
        >
          {customerData.map((c) => (
            <tr
              key={c.id}
              className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-xs text-slate-400">
                {c.id}
              </td>
              <td className="px-4 py-3 font-semibold text-slate-800">
                {c.name}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <RiPhoneLine className="text-slate-300" />
                  {c.phone}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <RiMailLine className="text-slate-300" />
                  {c.email}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-slate-500 max-w-[200px] truncate">
                {c.address}
              </td>
              <td className="px-4 py-3 text-sm text-slate-500 max-w-[200px] truncate">
                {moment(c.createdAt).format("YYYY-MM-DD")}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditFun(c)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <RiEditLine />
                  </button>
                  <button
                    // onClick={() => deleteCustomer(c.id)}
                    onClick={() => {
                      setOpen(true);
                      setCustomerId(c.id);
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
      <ConfirmDialog
        open={open}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={deleteCustomer}
        onClose={() => {
          setOpen(false);
          setCustomerId(null);
        }}
      />

      <Modal
        title={editing ? "Edit Customer" : "Add New Customer"}
        onClose={() => modalClose()}
        // footer={
        //   <>
        //     <BtnGhost onClick={() => modalClose()}>Cancel</BtnGhost>
        //     <BtnBlue type="button" onClick={formik.handleSubmit}>
        //       {editing ? "Save Changes" : "Add Customer"}
        //     </BtnBlue>
        //   </>
        // }
        open={showModal}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className=" gap-3 grid grid-cols-2">
            <CustomInput
              formik={formik}
              label="Full Name *"
              name="name"
              placeholder="Eg. John Smith"
            />
            <CustomInput
              formik={formik}
              label="Phone *"
              name="phone"
              placeholder="Eg. 07700 900123"
            />
            <CustomInput
              formik={formik}
              label="Email"
              name="email"
              type="email"
              placeholder="Eg. john@email.com"
            />
            <CustomInput
              formik={formik}
              label="telephone"
              name="telephone"
              placeholder="Eg. 07700 900123"
            />
            <CustomInput
              formik={formik}
              label="Address"
              name="address"
              placeholder="Eg. 123 High Street, London"
            />
            <CustomInput
              formik={formik}
              label="Alternative Address"
              name="alternativeAddress"
              placeholder="Eg. 123 High Street, London"
            />

            <Select
              label="GDPR Consent"
              value={formik.values?.gdprConsent || false}
              onChange={(e) =>
                formik.setFieldValue("gdprConsent", e.target.value)
              }
              touched={formik.touched}
              errors={formik.errors.gdprConsent}
            >
              <option value="">Select customer...</option>
              {[false, true].map((c, index) => (
                <option key={index} value={c}>
                  {c ? "True" : "False"}
                </option>
              ))}
            </Select>
            <CustomInput
              formik={formik}
              label="customer Ref"
              name="customerCode"
              placeholder="Eg. 123 High Street, London"
            />
            <CustomInput
              formik={formik}
              label="Credit Terms"
              name="creditTerms"
              placeholder="Eg. 123 High Street, London"
            />
          </div>
          {formik.isSubmitting && (
            <p className="text-sm text-slate-500">Saving...</p>
          )}

          <div className="flex items-center justify-end gap-2 ">
            <BtnGhost onClick={() => modalClose()}>Cancel</BtnGhost>
            <BtnBlue type="submit">
              {editing ? "Save Changes" : "Add Customer"}
            </BtnBlue>
          </div>
        </form>
      </Modal>
    </div>
  );
}
