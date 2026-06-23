import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  fetchSetting,
  updateSetting,
} from "../../../services/apiServices/settingService";

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
        .stn-app { display: flex; height: 100vh; background: #f4f6fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .stn-sidebar { width: 210px; background: #fff; border-right: 0.5px solid #e8eaf0; display: flex; flex-direction: column; flex-shrink: 0; }
        .stn-brand { padding: 16px 14px 14px; border-bottom: 0.5px solid #e8eaf0; display: flex; align-items: center; gap: 10px; }
        .stn-logo { width: 36px; height: 36px; background: #2563eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; flex-shrink: 0; }
        .stn-brand-name { font-size: 13px; font-weight: 600; color: #111; line-height: 1.2; }
        .stn-brand-sub { font-size: 10px; color: #6b7280; letter-spacing: .06em; text-transform: uppercase; font-weight: 500; }
        .stn-nav { padding: 10px 8px; flex: 1; }
        .stn-nav-item { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 7px; cursor: pointer; transition: background .12s; margin-bottom: 1px; color: #5a6272; font-size: 13px; font-weight: 400; text-decoration: none; }
        .stn-nav-item:hover { background: #f3f4f6; }
        .stn-nav-item.active { background: #2563eb; color: #fff; font-weight: 500; }
        .stn-nav-icon { font-size: 17px; flex-shrink: 0; }
        .stn-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .stn-topbar { background: #fff; border-bottom: 0.5px solid #e8eaf0; padding: 0 24px; height: 52px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .stn-topbar-title { font-size: 15px; font-weight: 600; color: #111; }
        .stn-search { display: flex; align-items: center; gap: 7px; border: 0.5px solid #d1d5db; border-radius: 7px; padding: 6px 12px; background: #f9fafb; color: #9ca3af; font-size: 12px; width: 180px; }
        .stn-content { flex: 1; padding: 24px; overflow-y: auto; }
        .stn-page-title { font-size: 18px; font-weight: 600; color: #111; margin-bottom: 2px; }
        .stn-page-sub { font-size: 12.5px; color: #6b7280; margin-bottom: 20px; }
        .stn-card { background: #fff; border-radius: 12px; border: 0.5px solid #e5e7eb; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .stn-card-header { padding: 16px 24px; border-bottom: 0.5px solid #f3f4f6; display: flex; align-items: center; justify-content: space-between; }
        .stn-card-icon { width: 40px; height: 40px; background: #eff6ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #2563eb; font-size: 20px; }
        .stn-card-label { font-size: 15px; font-weight: 600; color: #111; }
        .stn-card-sublabel { font-size: 12.5px; color: #6b7280; margin-top: 2px; }
        .stn-fields-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); border-bottom: 0.5px solid #f3f4f6; }
        .stn-field { padding: 20px 24px; border-right: 0.5px solid #f3f4f6; position: relative; cursor: pointer; transition: all .12s; min-height: 118px; }
        .stn-field:last-child { border-right: none; }
        .stn-field:hover { background: #fafbff; }
        .stn-field.active { background: #eff6ff; cursor: default; }
        .stn-field-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .stn-field-label { font-size: 11px; font-weight: 600; color: #6b7280; letter-spacing: .08em; text-transform: uppercase; }
        .stn-edit-chip { font-size: 10px; color: #9ca3af; display: flex; align-items: center; gap: 3px; opacity: 0; transition: opacity .12s; }
        .stn-field:hover .stn-edit-chip { opacity: 1; }
        .stn-value-row { display: flex; align-items: baseline; gap: 4px; margin-bottom: 8px; min-height: 42px; }
        .stn-prefix { font-size: 16px; color: #9ca3af; font-weight: 500; margin-top: 4px; }
        .stn-value { font-size: 32px; font-weight: 600; color: #111; line-height: 1; transition: color .12s; }
        .stn-value.empty { color: #d1d5db; font-size: 24px; }
        .stn-field.active .stn-value { color: #2563eb; }
        .stn-tag { display: inline-block; font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 20px; background: #f3f4f6; color: #6b7280; }
        .stn-field.active .stn-tag { background: #dbeafe; color: #1d4ed8; }
        .stn-input-wrap { display: none; margin-top: 4px; }
        .stn-field.active .stn-input-wrap { display: block; }
        .stn-field.active .stn-value-row { display: none; }
        .stn-field.active .stn-tag { display: none; }
        .stn-input { width: 100%; border: 2px solid #2563eb; border-radius: 8px; padding: 10px 48px 10px 14px; font-size: 20px; font-weight: 600; color: #111; background: #fff; outline: none; }
        .stn-input::-webkit-outer-spin-button, .stn-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .stn-input-btns { position: absolute; right: 28px; top: 60px; display: flex; gap: 4px; }
        .stn-btn-ok, .stn-btn-x { width: 28px; height: 28px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; display: flex; align-items: center; justify-content: center; }
        .stn-btn-ok { background: #2563eb; color: #fff; }
        .stn-btn-ok:hover { background: #1d4ed8; }
        .stn-btn-x { background: #f3f4f6; color: #6b7280; }
        .stn-btn-x:hover { background: #e5e7eb; }
        .stn-kbd { font-size: 10px; color: #9ca3af; margin-top: 6px; }
        .stn-kbd kbd { background: #f3f4f6; border: 0.5px solid #d1d5db; border-radius: 3px; padding: 1px 5px; font-size: 9px; color: #6b7280; }
        .stn-bars { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); background: #fafbff; border-bottom: 0.5px solid #f3f4f6; }
        .stn-bar-cell { padding: 12px 24px; border-right: 0.5px solid #f3f4f6; }
        .stn-bar-cell:last-child { border-right: none; }
        .stn-bar-label { font-size: 10px; color: #9ca3af; font-weight: 500; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; }
        .stn-bar-track { height: 4px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
        .stn-bar-fill { height: 100%; background: #2563eb; border-radius: 2px; transition: width .6s cubic-bezier(0.4, 0, 0.2, 1); }
        .stn-footer { padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; background: #fff; }
        .stn-status-pill { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 9999px; transition: background .2s; }
        .stn-status-dot { width: 6px; height: 6px; border-radius: 50%; transition: background .2s; }
        .stn-status-text { font-size: 12px; font-weight: 500; transition: color .2s; }
        .stn-footer-actions { display: flex; gap: 10px; }
        .stn-btn-reset { background: #fff; border: 1px solid #d1d5db; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 500; color: #6b7280; cursor: pointer; transition: all .12s; }
        .stn-btn-reset:hover { background: #f9fafb; border-color: #9ca3af; }
        .stn-btn-save { background: #2563eb; border: none; border-radius: 8px; padding: 8px 20px; font-size: 13px; font-weight: 600; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all .12s; }
        .stn-btn-save:hover:not(:disabled) { background: #1d4ed8; }
        .stn-btn-save:disabled { opacity: .5; cursor: not-allowed; }
        .stn-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: stn-spin .6s linear infinite; }
        @keyframes stn-spin { to { transform: rotate(360deg); } }
        @keyframes stn-blink { 0%,100%{opacity:1} 50%{opacity:.4} }
        .stn-dot-blink { animation: stn-blink 1.2s ease-in-out infinite; }
        .stn-loading { display: flex; align-items: center; justify-content: center; height: 300px; color: #9ca3af; font-size: 14px; gap: 12px; }
      `}</style>

      <div className="stn-content">
        {loading ? (
          <div className="stn-loading">
            <div
              className="stn-spinner"
              style={{ borderTopColor: "#2563eb" }}
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
