const CustomModal = ({ title, sub, onClose, children, footer }) => (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <style>{`
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .modal-enter { animation: slideUp 0.25s ease; }
    `}</style>

    <div
      className="modal-enter bg-[#112240] border border-cyan-500/20 rounded-2xl
        w-full max-w-3xl max-h-[88vh] overflow-y-auto
        shadow-[0_32px_80px_rgba(0,0,0,0.5)]
        scrollbar-thin scrollbar-thumb-[#1a3157] scrollbar-track-transparent"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        className="sticky top-0 bg-[#112240] z-10 px-7 pt-6 pb-4
        border-b border-cyan-500/20 flex items-start justify-between rounded-t-2xl"
      >
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-slate-500/10 hover:bg-red-500/15
            hover:text-red-400 text-slate-400 flex items-center justify-center transition-all"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="px-7 py-6">{children}</div>

      {/* Footer */}
      {footer && (
        <div
          className="px-7 py-4 border-t border-cyan-500/20 flex justify-end gap-2.5
          bg-[#0b1628]/40 rounded-b-2xl"
        >
          {footer}
        </div>
      )}
    </div>
  </div>
);

export default CustomModal;
