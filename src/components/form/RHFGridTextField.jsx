import { Controller, useFormContext } from "react-hook-form";
import { Grid, TextField } from "@mui/material";

export default function RHFTextField({
  name,
  // control,
  label,
  type = "text",
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
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={(e) => {
              field.onChange(e);
              clearErrors(name); // remove server error when user edits
            }}
            fullWidth
            size="small"
            label={label}
            type={type}
            error={!!error}
            helperText={error?.message}
            slotProps={{
              inputLabel: {
                shrink: type === "date" ? { shrink: true } : {},
              },
            }}
            {...rest}
          />
        )}
      />
    </Grid>
  );
}
