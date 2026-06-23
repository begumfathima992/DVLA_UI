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
import { DeleteIcon } from "lucide-react";
import { FcDeleteDatabase } from "react-icons/fc";
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
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              bgcolor: "#FEE2E2",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              mb: 10,
              margin: "0 auto",
            }}
          >
            <FcDeleteDatabase
              sx={{
                fontSize: 40,
                // color: "#DC2626",
              }}
            />
          </Box>

          <Typography
            variant="h5"
            className="text-center !mt-5 !my-2"
            fontWeight={700}
          >
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography align="center" color="text.secondary" sx={{ mb: 2 }}>
          {message}
        </Typography>

        {itemName && (
          <Box
            sx={{
              bgcolor: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 2,
              px: 2,
              py: 1.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Selected Item
            </Typography>

            <Typography fontWeight={600} sx={{ mt: 0.5 }}>
              {itemName}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          px: 3,
          pb: 3,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          disabled={loading}
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            py: 1.2,
          }}
        >
          {cancelText}
        </Button>

        <Button
          variant="contained"
          color="error"
          fullWidth
          disabled={loading}
          onClick={onConfirm}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            py: 1.2,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
              Deleting...
            </>
          ) : (
            confirmText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
