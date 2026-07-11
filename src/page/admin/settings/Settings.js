import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  fetchSetting,
  updateSetting,
} from "../../../services/apiServices/settingService";
import { PageHeader } from "../../../components/ui/UI";

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeField, setActiveField] = useState(null);
  const [pendingValues, setPendingValues] = useState({
    defaultDiscount: "",
    labourCharge: "",
    otherCharge: "",
    vatPercentage: "",
  });
  const [savedValues, setSavedValues] = useState({
    defaultDiscount: "",
    labourCharge: "",
    otherCharge: "",
    vatPercentage: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const fields = [
    {
      key: "defaultDiscount",
      label: "Default Discount",
      prefix: "₹",
      tag: "Flat",
      placeholder: "e.g. 30",
      max: 100,
      type: "number",
    },
    {
      key: "labourCharge",
      label: "Labour Charge",
      prefix: "₹",
      tag: "per hour",
      placeholder: "e.g. 250",
      max: 5000,
      type: "number",
    },
    {
      key: "vatPercentage",
      label: "VAT Percentage",
      unit: "%",
      placeholder: "e.g. 18",
      max: 100,
      type: "number",
      tag: "Percentage",
    },
    {
      key: "otherCharge",
      label: "Other Charge",
      prefix: "₹",
      tag: "flat fee",
      placeholder: "e.g. 100",
      max: 3000,
      type: "number",
    },
  ];

  const getSettings = async () => {
    try {
      const res = await fetchSetting();
      if (res?.success) {
        const data = res.data || {};
        setSettings(data);

        const vals = {
          defaultDiscount: data?.defaultDiscount?.toString() || "",
          labourCharge: data?.labourCharge?.toString() || "",
          otherCharge: data?.otherCharge?.toString() || "",
          vatPercentage: data?.vatPercentage?.toString() || "",
        };

        setSavedValues(vals);
        setPendingValues(vals);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  // Check for unsaved changes
  useEffect(() => {
    const dirty = fields.some(
      (f) => pendingValues[f.key] !== savedValues[f.key],
    );
    setIsDirty(dirty);
  }, [pendingValues, savedValues]);

  const openField = (key) => {
    if (activeField === key) return;
    setActiveField(key);
  };

  const confirmField = (key) => {
    setActiveField(null);
  };

  const cancelField = (key) => {
    setPendingValues((prev) => ({ ...prev, [key]: savedValues[key] }));
    setActiveField(null);
  };

  const handleKeyDown = (e, key) => {
    if (e.key === "Enter") {
      e.preventDefault();
      confirmField(key);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelField(key);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        defaultDiscount: Number(pendingValues.defaultDiscount) || 0,
        labourCharge: Number(pendingValues.labourCharge) || 0,
        otherCharge: Number(pendingValues.otherCharge) || 0,
        vatPercentage: Number(pendingValues.vatPercentage) || 0,
      };

      const res = await updateSetting(payload);
      if (res?.success) {
        setSavedValues({ ...pendingValues });
        setIsDirty(false);
        setJustSaved(true);
        toast.success(res.message || "Settings saved successfully");
        setTimeout(() => setJustSaved(false), 2500);
        getSettings(); // refresh
      } else {
        toast.error(res?.message || "Failed to save settings");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setPendingValues({ ...savedValues });
    setActiveField(null);
  };

  const getBarWidth = (key, val) => {
    const field = fields.find((f) => f.key === key);
    if (!field || !val) return 0;
    const num = parseFloat(val);
    return Math.min(100, (num / field.max) * 100);
  };

  const statusStyle = justSaved
    ? {
        background: "#d1fae5",
        dotColor: "#10b981",
        textColor: "#065f46",
        label: "All changes saved",
      }
    : isDirty
      ? {
          background: "#fef3c7",
          dotColor: "#f59e0b",
          textColor: "#92400e",
          label: "Unsaved changes",
        }
      : {
          background: "#f3f4f6",
          dotColor: "#d1d5db",
          textColor: "#6b7280",
          label: "No changes",
        };

  return (
    <>
      <style>{`
        .stn-content { padding: 0; }
        .stn-card {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 18px 50px rgba(7,17,31,.075);
        }
        .stn-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 24px;
          border-bottom: 1px solid #e2e8f0;
          background: linear-gradient(90deg, #ffffff, #fff1f2);
        }
        .stn-card-icon {
          display: flex;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          border: 1px solid #fb7185;
          border-radius: 14px;
          color: #0f172a;
          background: linear-gradient(135deg, #fb7185, #be123c);
          box-shadow: 0 10px 24px rgba(244,63,94,.18);
        }
        .stn-card-label {
          color: #0f172a;
          font-family: Sora, sans-serif;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -.03em;
        }
        .stn-card-sublabel { margin-top: 3px; color: #64748b; font-size: 12px; }
        .stn-last-saved { color: #9299a3; font-size: 11px; font-weight: 700; }
        .stn-fields-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }
        .stn-field {
          position: relative;
          min-height: 148px;
          padding: 24px;
          border-right: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          cursor: pointer;
          transition: background .22s ease, box-shadow .22s ease, transform .22s ease;
        }
        .stn-field:hover { z-index: 1; background: #fff1f2; box-shadow: inset 0 2px 0 rgba(244,63,94,.45); }
        .stn-field.active { z-index: 2; cursor: default; background: #fff1f2; box-shadow: inset 0 2px 0 #e11d48; }
        .stn-field-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 17px; }
        .stn-field-label { color: #747d89; font-size: 9px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        .stn-edit-chip { opacity: 0; color: #be123c; font-size: 10px; font-weight: 800; transition: opacity .18s; }
        .stn-field:hover .stn-edit-chip { opacity: 1; }
        .stn-value-row { display: flex; min-height: 46px; align-items: baseline; gap: 5px; margin-bottom: 9px; }
        .stn-prefix { color: #9da4ae; font-size: 16px; font-weight: 700; }
        .stn-value { color: #0f172a; font-family: Sora, sans-serif; font-size: 34px; font-weight: 800; line-height: 1; letter-spacing: -.05em; }
        .stn-value.empty { color: #c8cbd0; font-size: 26px; }
        .stn-field.active .stn-value { color: #be123c; }
        .stn-tag { display: inline-flex; border: 1px solid #e2e8f0; border-radius: 999px; background: #f8fafc; padding: 3px 9px; color: #64748b; font-size: 9px; font-weight: 800; }
        .stn-field.active .stn-tag { border-color: #fb7185; background: #fff1f2; color: #be123c; }
        .stn-input-wrap { display: none; margin-top: 4px; }
        .stn-field.active .stn-input-wrap { display: block; }
        .stn-field.active .stn-value-row, .stn-field.active .stn-tag { display: none; }
        .stn-input {
          width: 100%;
          border: 1px solid #e11d48;
          border-radius: 12px;
          padding: 12px 84px 12px 14px;
          color: #0f172a;
          background: #ffffff;
          font-family: Sora, sans-serif;
          font-size: 20px;
          font-weight: 800;
          outline: none;
          box-shadow: 0 0 0 4px rgba(244,63,94,.12);
        }
        .stn-input::-webkit-outer-spin-button, .stn-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .stn-input-btns { position: absolute; top: 69px; right: 28px; display: flex; gap: 5px; }
        .stn-btn-ok, .stn-btn-x { display: flex; width: 30px; height: 30px; align-items: center; justify-content: center; border: 0; border-radius: 9px; cursor: pointer; font-size: 12px; font-weight: 800; }
        .stn-btn-ok { color: #ffffff; background: linear-gradient(135deg, #fb7185, #be123c); }
        .stn-btn-x { color: #64748b; background: #e2e8f0; }
        .stn-kbd { margin-top: 8px; color: #9aa1aa; font-size: 9px; }
        .stn-kbd kbd { border: 1px solid #e2e8f0; border-radius: 4px; background: #f8fafc; padding: 1px 5px; color: #777f8b; font-size: 8px; }
        .stn-bars { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); border-top: 1px solid #e2e8f0; background: #f8fafc; }
        .stn-bar-cell { padding: 15px 24px; border-right: 1px solid #e2e8f0; }
        .stn-bar-label { margin-bottom: 7px; color: #8f96a0; font-size: 8px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
        .stn-bar-track { height: 5px; overflow: hidden; border-radius: 999px; background: #e2e8f0; }
        .stn-bar-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, #9f1239, #fb7185); transition: width .6s cubic-bezier(.22,1,.36,1); }
        .stn-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 24px; border-top: 1px solid #e2e8f0; background: #ffffff; }
        .stn-status-pill { display: flex; align-items: center; gap: 7px; padding: 6px 12px; border-radius: 999px; }
        .stn-status-dot { width: 7px; height: 7px; border-radius: 50%; }
        .stn-status-text { font-size: 11px; font-weight: 800; }
        .stn-footer-actions { display: flex; gap: 10px; }
        .stn-btn-reset, .stn-btn-save { border-radius: 11px; padding: 10px 17px; font-size: 12px; font-weight: 800; transition: all .2s; }
        .stn-btn-reset { border: 1px solid #e2e8f0; color: #64748b; background: #ffffff; }
        .stn-btn-reset:hover { border-color: #e11d48; background: #fff1f2; }
        .stn-btn-save { display: flex; align-items: center; gap: 7px; border: 1px solid #fb7185; color: #ffffff; background: linear-gradient(135deg, #fb7185, #be123c); box-shadow: 0 10px 24px rgba(244,63,94,.2); }
        .stn-btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 14px 30px rgba(244,63,94,.28); }
        .stn-btn-save:disabled { opacity: .48; cursor: not-allowed; }
        .stn-spinner { width: 16px; height: 16px; border: 2px solid rgba(7,17,31,.2); border-top-color: #ffffff; border-radius: 50%; animation: stn-spin .6s linear infinite; }
        .stn-loading { display: flex; height: 300px; align-items: center; justify-content: center; gap: 12px; color: #64748b; font-size: 13px; }
        @keyframes stn-spin { to { transform: rotate(360deg); } }
        @keyframes stn-blink { 0%,100%{opacity:1} 50%{opacity:.38} }
        .stn-dot-blink { animation: stn-blink 1.2s ease-in-out infinite; }
        @media (max-width: 640px) {
          .stn-card-header, .stn-footer { align-items: flex-start; flex-direction: column; }
          .stn-footer-actions { width: 100%; }
          .stn-btn-reset, .stn-btn-save { flex: 1; justify-content: center; }
          .stn-field { border-right: 0; }
        }
      `}</style>

      <PageHeader
        title="Workshop Settings"
        sub="Configure labour, VAT, default discounts and service charges."
        action={<div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] px-3 py-2 text-xs font-bold text-[#64748b]">Finance configuration</div>}
      />
      <div className="stn-content">
        {loading ? (
          <div className="stn-loading">
            <div
              className="stn-spinner"
              style={{ borderTopColor: "#e11d48" }}
            />
            Loading settings...
          </div>
        ) : (
          <div className="stn-card">
            <div className="stn-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="stn-card-icon">⚙️</div>
                <div>
                  <div className="stn-card-label">Charge Configuration</div>
                  <div className="stn-card-sublabel">
                    Click any field to edit inline • Press Enter to save
                  </div>
                </div>
              </div>
              <div className="stn-last-saved">Last saved: Today</div>
            </div>

            {/* Fields */}
            <div className="stn-fields-grid">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className={`stn-field${activeField === f.key ? " active" : ""}`}
                  onClick={() => activeField !== f.key && openField(f.key)}
                >
                  <div className="stn-field-top">
                    <span className="stn-field-label">{f.label}</span>
                    <span className="stn-edit-chip">✏️ Edit</span>
                  </div>

                  <div className="stn-value-row">
                    {f.prefix && <span className="stn-prefix">{f.prefix}</span>}
                    <span
                      className={`stn-value${!pendingValues[f.key] ? " empty" : ""}`}
                    >
                      {pendingValues[f.key] || "—"}
                    </span>
                    {f.unit && (
                      <span
                        className="stn-prefix"
                        style={{ marginLeft: "4px" }}
                      >
                        {f.unit}
                      </span>
                    )}
                  </div>

                  {f.tag && <span className="stn-tag">{f.tag}</span>}

                  {/* Input Mode */}
                  <div className="stn-input-wrap">
                    <input
                      className="stn-input"
                      type={f.type}
                      placeholder={f.placeholder}
                      value={pendingValues[f.key]}
                      onChange={(e) =>
                        setPendingValues((prev) => ({
                          ...prev,
                          [f.key]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => handleKeyDown(e, f.key)}
                      autoFocus={activeField === f.key}
                      onClick={(e) => e.stopPropagation()}
                      min="0"
                      max={f.max}
                    />
                    <div className="stn-input-btns">
                      <button
                        className="stn-btn-ok"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmField(f.key);
                        }}
                      >
                        ✓
                      </button>
                      <button
                        className="stn-btn-x"
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelField(f.key);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="stn-kbd">
                      <kbd>Enter</kbd> save &nbsp;&nbsp;<kbd>Esc</kbd> cancel
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bars */}
            <div className="stn-bars">
              {fields.map((f) => (
                <div key={f.key} className="stn-bar-cell">
                  <div className="stn-bar-label">{f.label}</div>
                  <div className="stn-bar-track">
                    <div
                      className="stn-bar-fill"
                      style={{
                        width: `${getBarWidth(f.key, pendingValues[f.key])}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="stn-footer">
              <div
                className="stn-status-pill"
                style={{ background: statusStyle.background }}
              >
                <div
                  className={`stn-status-dot${isDirty && !justSaved ? " stn-dot-blink" : ""}`}
                  style={{ background: statusStyle.dotColor }}
                />
                <span
                  className="stn-status-text"
                  style={{ color: statusStyle.textColor }}
                >
                  {statusStyle.label}
                </span>
              </div>

              <div className="stn-footer-actions">
                <button className="stn-btn-reset" onClick={handleReset}>
                  Reset
                </button>
                <button
                  className="stn-btn-save"
                  onClick={handleSave}
                  disabled={!isDirty || isSaving}
                >
                  {isSaving ? (
                    <div className="stn-spinner" />
                  ) : (
                    <>💾 Save All Changes</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
