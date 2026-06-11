import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { RiCloseCircleFill } from "react-icons/ri";
import { Badge } from "../../../../components/ui/UI";
import { updateStatusJobSheets } from "../../../../services/apiServices/jobSheetService";
import toast from "react-hot-toast";
const statuses = [
  {
    value: "Open",
    color: "#06B6D4",
    bg: "#ECFEFF",
  },
  {
    value: "In Progress",
    color: "#4F46E5",
    bg: "#EEF2FF",
  },
  {
    value: "Completed",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    value: "Cancelled",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
];

export default function StatusUpdate({ title, jobSheetsList, id }) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(title);

  const handleUpdate = async () => {
    try {
      console.log(selectedStatus, id, "selectedStatus");

      const response = await updateStatusJobSheets(id, {
        status: selectedStatus,
      });
      if (response.success) {
        toast.success(response.message);
        jobSheetsList();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStatus("");
  };
  return (
    <>
      <Badge status={title} onClick={() => setOpen(true)} />

      <Dialog
        open={open}
        onClose={() => handleClose()}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            overflow: "hidden",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              fontSize={22}
              fontWeight={700}
              className="!text-black !font-bold !text-xl"
            >
              Change Status
            </Typography>

            <Typography
              variant="body2"
              className="!text-gray-400 !font-serif !text-xs"
            >
              Select the current job sheet status
            </Typography>
          </Box>

          <IconButton onClick={() => setOpen(false)}>
            <RiCloseCircleFill />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={5}>
            {statuses.map((item) => (
              <Box
                key={item.value}
                onClick={() => setSelectedStatus(item.value)}
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "all .3s ease",
                  border:
                    selectedStatus === item.value
                      ? `2px solid ${item.color}`
                      : "1px solid #E5E7EB",
                  background: selectedStatus === item.value ? item.bg : "#fff",

                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    fontWeight={600}
                    sx={{
                      color:
                        selectedStatus === item.value ? item.color : "#374151",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Chip
                    label={item.value}
                    size="small"
                    sx={{
                      backgroundColor: item.bg,
                      color: item.color,
                      fontWeight: 700,
                      border: `1px solid ${item.color}20`,
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-center"
            mt={10}
            className="!mt-5 !flex !justify-center !items-center"
          >
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                px: 4,
                fontWeight: 700,
              }}
            >
              Update Status
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
