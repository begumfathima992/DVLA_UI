import { useState } from "react";
import {
  Card,
  PageHeader,
  BtnBlue,
  BtnGhost,
  Modal,
  Input,
  Table,
  EmptyState,
} from "../../../components/ui/UI";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiPhoneLine,
  RiMailLine,
} from "react-icons/ri";
import { customers } from "../../../utils/data";

const blank = () => ({ id: "", name: "", phone: "", email: "", address: "" });

export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const open = (c = null) => {
    setForm(c ? { ...c } : blank());
    setEditing(!!c);
    setShowModal(true);
  };
  const save = () => {
    if (!form.name) return;
    setShowModal(false);
  };
  const list = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );
  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Customers"
        sub={`${customers.length} total customers`}
        action={
          <BtnBlue onClick={() => open()}>
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
          headers={["ID", "Name", "Phone", "Email", "Address", "Actions"]}
          empty={!list.length ? "No customers found" : null}
        >
          {list.map((c) => (
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
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => open(c)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <RiEditLine />
                  </button>
                  <button
                    // onClick={() => del(c.id)}
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
      {showModal && (
        <Modal
          title={editing ? "Edit Customer" : "Add New Customer"}
          onClose={() => setShowModal(false)}
          footer={
            <>
              <BtnGhost onClick={() => setShowModal(false)}>Cancel</BtnGhost>
              <BtnBlue onClick={save}>
                {editing ? "Save Changes" : "Add Customer"}
              </BtnBlue>
            </>
          }
        >
          <div className="space-y-4">
            <Input
              label="Full Name *"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="John Smith"
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="07700 900123"
            />
            <Input
              label="Email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="john@email.com"
              type="email"
            />
            <Input
              label="Address"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="123 High Street, London"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
