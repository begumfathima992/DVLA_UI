import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";

const ConfirmDialog = ({
  open,
  title = "Delete Customer",
  message = "Are you sure you want to delete this record? This action cannot be undone.",
  itemName = "",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onClose,
}) => (
  <Dialog
    open={open}
    onClose={loading ? undefined : onClose}
    maxWidth="xs"
    fullWidth
    PaperProps={{
      sx: {
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        borderRadius: "26px",
        background: "#ffffff",
        boxShadow: "0 40px 120px rgba(3,9,18,.42)",
      },
    }}
    sx={{
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(3,9,18,.72)",
        backdropFilter: "blur(10px)",
      },
    }}
  >
    <div className="h-1.5 bg-gradient-to-r from-rose-700 via-rose-500 to-orange-400" />
    <DialogTitle sx={{ pt: 4, pb: 1 }}>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
        <Box
          sx={{
            width: 72,
            height: 72,
            bgcolor: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 14px 30px rgba(225,29,72,.12)",
          }}
        >
          <RiDeleteBin6Line size={32} color="#e11d48" />
        </Box>
        <Typography
          variant="h5"
          sx={{ mt: 2.5, fontFamily: "Sora, sans-serif", fontWeight: 800, color: "#0f172a", letterSpacing: "-.035em" }}
        >
          {title}
        </Typography>
      </Box>
    </DialogTitle>

    <DialogContent sx={{ px: 3.5, pb: 1 }}>
      <Typography align="center" sx={{ mb: 2, lineHeight: 1.75, color: "#727b88", fontSize: 14 }}>
        {message}
      </Typography>
      {itemName && (
        <Box sx={{ bgcolor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 3, px: 2, py: 1.5 }}>
          <Typography variant="caption" sx={{ color: "#8a919c", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", fontSize: 9 }}>
            Selected item
          </Typography>
          <Typography fontWeight={800} sx={{ mt: 0.5, color: "#1e293b" }}>{itemName}</Typography>
        </Box>
      )}
    </DialogContent>

    <DialogActions sx={{ justifyContent: "center", gap: 1.5, px: 3.5, pb: 3.5, pt: 2 }}>
      <Button
        variant="outlined"
        fullWidth
        disabled={loading}
        onClick={onClose}
        sx={{
          textTransform: "none",
          borderRadius: 3,
          py: 1.25,
          fontWeight: 800,
          color: "#334155",
          borderColor: "#e2e8f0",
          "&:hover": { borderColor: "#e11d48", bgcolor: "#fff1f2" },
        }}
      >
        {cancelText}
      </Button>
      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        onClick={onConfirm}
        sx={{
          textTransform: "none",
          borderRadius: 3,
          py: 1.25,
          fontWeight: 800,
          bgcolor: "#e11d48",
          boxShadow: "0 12px 26px rgba(225,29,72,.22)",
          "&:hover": { bgcolor: "#be123c" },
        }}
      >
        {loading ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />Deleting...</> : confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
