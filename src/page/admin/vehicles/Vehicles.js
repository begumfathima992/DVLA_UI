import { useState } from "react";
import {
  Card,
  PageHeader,
  BtnBlue,
  BtnGhost,
  Modal,
  Input,
  Select,
  Table,
  RegPlate,
} from "../../../components/ui/UI";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { vehicles } from "../../../utils/data";

const blank = () => ({
  id: "",
  reg: "",
  make: "",
  model: "",
  year: "",
  vin: "",
  mileage: "",
  customerId: "",
});

export default function Vehicles() {
  //   const { vehicles, setVehicles, customers } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const open = (v = null) => {
    setForm(v ? { ...v } : blank());
    setEditing(!!v);
    setShowModal(true);
  };
  const save = () => {
    if (!form.reg || !form.make) return;

    setShowModal(false);
  };

  const list = vehicles.filter(
    (v) =>
      v.reg.toLowerCase().includes(search.toLowerCase()) ||
      v.make.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()),
  );
  //   const ownerName = (cId) => customers.find((c) => c.id === cId)?.name || "—";

  return (
    <div className="fade-up space-y-5">
      <PageHeader
        title="Vehicles"
        sub={`${vehicles.length} registered vehicles`}
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
            "Reg",
            "Make",
            "Model",
            "Year",
            "VIN",
            "Mileage",
            "Owner",
            "Actions",
          ]}
          empty={!list.length ? "No vehicles found" : null}
        >
          {list.map((v) => (
            <tr
              key={v.id}
              className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3">
                <RegPlate reg={v.reg} />
              </td>
              <td className="px-4 py-3 font-semibold text-slate-800">
                {v.make}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{v.model}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{v.year}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-400">
                {v.vin}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{v.mileage}</td>
              <td className="px-4 py-3 text-sm font-medium text-blue-600">
                {/* {ownerName(v.customerId)} */} namess
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
                    // onClick={() => del(v.id)}
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
          title={editing ? "Edit Vehicle" : "Add Vehicle"}
          onClose={() => setShowModal(false)}
          footer={
            <>
              <BtnGhost onClick={() => setShowModal(false)}>Cancel</BtnGhost>
              <BtnBlue onClick={save}>
                {editing ? "Save" : "Add Vehicle"}
              </BtnBlue>
            </>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Registration *"
              value={form.reg}
              onChange={(e) => set("reg", e.target.value.toUpperCase())}
              placeholder="AB12 CDE"
              className="uppercase"
            />
            <Input
              label="Make *"
              value={form.make}
              onChange={(e) => set("make", e.target.value)}
              placeholder="BMW"
            />
            <Input
              label="Model *"
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
              placeholder="320d M Sport"
            />
            <Input
              label="Year"
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
              placeholder="2018"
              type="number"
            />
            <Input
              label="VIN Number"
              value={form.vin}
              onChange={(e) => set("vin", e.target.value)}
              placeholder="WBA8E120X0K123456"
            />
            <Input
              label="Mileage"
              value={form.mileage}
              onChange={(e) => set("mileage", e.target.value)}
              placeholder="58,750 Miles"
            />
            <div className="col-span-2">
              <Select
                label="Owner (Customer)"
                value={form.customerId}
                onChange={(e) => set("customerId", e.target.value)}
              >
                <option value="">Select customer...</option>
                {/* {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))} */}
              </Select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
