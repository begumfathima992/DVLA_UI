import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { RiCloseFill, RiSparkling2Line } from "react-icons/ri";

export const Modal = ({ open, title, sub, onClose, children, footer, size = "md" }) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth={size}
    PaperProps={{
      className: "overflow-hidden",
      sx: {
        margin: { xs: 1.5, sm: 2 },
        maxHeight: { xs: "calc(100vh - 24px)", sm: "90vh" },
        border: "1px solid #e2e8f0",
        borderRadius: "26px",
        background: "#ffffff",
        boxShadow: "0 38px 110px rgba(7,17,31,.3)",
      },
    }}
    sx={{
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(3,9,18,.72)",
        backdropFilter: "blur(10px)",
      },
    }}
  >
    <div className="h-1.5 bg-gradient-to-r from-[#9f661a] via-[#e2b459] to-[#fecdd3]" />
    <DialogTitle className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#ffffff] to-[#fff1f2] px-5 py-5 sm:px-6">
      <Box className="flex items-start justify-between gap-4">
        <Box>
          <div className="mb-1.5 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#be123c]">
            <RiSparkling2Line className="text-sm" /> AutoForge workspace
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: "#0f172a", letterSpacing: "-.03em" }}
          >
            {title}
          </Typography>
          {sub && <Typography variant="body2" sx={{ mt: 0.6, color: "#64748b", fontSize: 12 }}>{sub}</Typography>}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            border: "1px solid #e2e8f0",
            color: "#64748b",
            borderRadius: "12px",
            "&:hover": { bgcolor: "#fff1f2", color: "#be123c", borderColor: "#e11d48" },
          }}
        >
          <RiCloseFill />
        </IconButton>
      </Box>
    </DialogTitle>
    <DialogContent sx={{ bgcolor: "#ffffff", px: { xs: 2.5, sm: 3 }, py: 3 }}>
      {children}
    </DialogContent>
    {footer && (
      <DialogActions sx={{ flexWrap: "wrap", borderTop: "1px solid #e2e8f0", bgcolor: "#f8fafc", px: { xs: 2.5, sm: 3 }, py: 2 }}>
        {footer}
      </DialogActions>
    )}
  </Dialog>
);
