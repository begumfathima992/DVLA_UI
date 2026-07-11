const CustomModal = ({ title, sub, onClose, children, footer }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#030912]/72 p-4 backdrop-blur-xl"
    onClick={onClose}
  >
    <div
      className="fade-up max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[26px] border border-[#e2e8f0] bg-[#ffffff] shadow-[0_36px_110px_rgba(3,9,18,.42)]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e2e8f0] bg-gradient-to-r from-[#ffffff] to-[#fff1f2] px-7 py-5">
        <div>
          <div className="font-[Sora] text-lg font-extrabold tracking-[-0.03em] text-[#0f172a]">{title}</div>
          {sub && <div className="mt-1 text-xs text-[#64748b]">{sub}</div>}
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748b] transition hover:bg-[#fff1f2] hover:text-[#be123c]"
        >
          ✕
        </button>
      </div>
      <div className="px-7 py-6">{children}</div>
      {footer && (
        <div className="flex justify-end gap-2.5 border-t border-[#e2e8f0] bg-[#f8fafc] px-7 py-4">{footer}</div>
      )}
    </div>
  </div>
);

export default CustomModal;
