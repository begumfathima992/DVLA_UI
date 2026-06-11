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
import { updatePriorityStatusJobSheets } from "../../../../services/apiServices/jobSheetService";
import toast from "react-hot-toast";

const priorities = [
  {
    value: "Low",
    color: "#4CAF50",
    bg: "#E8F5E9",
  },
  {
    value: "Medium",
    color: "#FF9800",
    bg: "#FFF3E0",
  },
  {
    value: "High",
    color: "#F44336",
    bg: "#FFEBEE",
  },
  {
    value: "Urgent",
    color: "#9C27B0",
    bg: "#F3E5F5",
  },
];

export default function PriorityStatusUpdate({ title, jobSheetsList, id }) {
  const [open, setOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(title);

  const handleUpdate = async () => {
    try {
      console.log(selectedPriority, id, "selectedPriority");

      const response = await updatePriorityStatusJobSheets(id, {
        priority: selectedPriority,
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
    setSelectedPriority("");
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
              Change Priority
            </Typography>

            <Typography
              variant="body2"
              className="!text-gray-400 !font-serif !text-xs"
            >
              Select the priority level for this task
            </Typography>
          </Box>

          <IconButton onClick={() => setOpen(false)}>
            <RiCloseCircleFill />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={5}>
            {priorities.map((item) => (
              <Box
                key={item.value}
                onClick={() => setSelectedPriority(item.value)}
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "0.3s",
                  border:
                    selectedPriority === item.value
                      ? `2px solid ${item.color}`
                      : "1px solid #E0E0E0",
                  background:
                    selectedPriority === item.value ? item.bg : "#fff",

                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={600}>{item.value}</Typography>

                  <Chip
                    label={item.value}
                    size="small"
                    sx={{
                      backgroundColor: item.bg,
                      color: item.color,
                      fontWeight: 700,
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
              Update Priority
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
