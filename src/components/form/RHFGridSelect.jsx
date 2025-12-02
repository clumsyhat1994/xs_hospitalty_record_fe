// src/components/form/RHFSelect.jsx
import { Controller, useFormContext } from "react-hook-form";
import { Grid, TextField, MenuItem } from "@mui/material";

export default function RHFSelect({
  name,
  // control,
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
  return (
    <Grid item size={{ xs: xs, sm: sm }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e);
                clearErrors(name); // remove server error when user edits
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
