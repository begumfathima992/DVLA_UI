import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
// import CloseIcon from "@mui/icons-material/Close";

export const Modal = ({
  open,
  title,
  sub,
  onClose,
  children,
  footer,
  size = "md",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={size}
      PaperProps={{
        className: "rounded-2xl shadow-2xl overflow-hidden",
        sx: {
          margin: 2,
          maxHeight: "90vh",
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <DialogTitle className="border-b border-slate-100 px-6 py-4">
        <Box className="flex items-start justify-between">
          <Box>
            <Typography
              variant="h6"
              component="div"
              className="font-bold text-slate-800 text-base"
            >
              {title}
            </Typography>
            {sub && (
              <Typography
                variant="body2"
                className="text-xs text-slate-400 mt-0.5"
              >
                {sub}
              </Typography>
            )}
          </Box>

          <IconButton
            onClick={onClose}
            className="text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors -mr-1 -mt-1"
            size="small"
          >
            <RiCloseFill />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Body */}
      <DialogContent
        className="overflow-y-auto px-6 py-5"
        sx={{
          "&.MuiDialogContent-root": {
            paddingBottom: footer ? "16px" : "24px",
          },
        }}
      >
        {children}
      </DialogContent>

      {/* Footer */}
      {footer && (
        <DialogActions className="border-t border-slate-100 bg-slate-50 px-6 py-4 rounded-b-2xl">
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
};
