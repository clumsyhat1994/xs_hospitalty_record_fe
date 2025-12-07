// src/components/form/RHFSelect.jsx
import { Controller, useFormContext } from "react-hook-form";
import { Grid, TextField, MenuItem } from "@mui/material";
import { useFormMode } from "../../context/FormModeContext";

export default function RHFSelect({
  name,
  label,
  options,
  getOptionLabel = (opt) => opt.name ?? String(opt),
  getOptionValue = (opt) => opt.id ?? opt,
  xs = 12,
  sm = 6,
  rules = {},
  ...rest
}) {
  const { clearErrors, control } = useFormContext();
  const { isEditMode } = useFormMode();
  return (
    <Grid size={{ xs: xs, sm: sm }}>
      <Controller
        name={name}
        control={control}
        rules={!isEditMode ? { required: "不能为空", ...rules } : rules}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e);
                if (error?.type === "server") clearErrors(name);
              }}
              select
              fullWidth
              size="small"
              label={label}
              error={!!error}
              helperText={error?.message}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                select: {
                  sx: { width: "100%" },
                },
              }}
              {...rest}
            >
              {options.map((opt) => {
                const value = getOptionValue(opt);
                const text = getOptionLabel(opt);
                return (
                  <MenuItem key={value} value={value}>
                    {text}
                  </MenuItem>
                );
              })}
            </TextField>
          );
        }}
      />
    </Grid>
  );
}
