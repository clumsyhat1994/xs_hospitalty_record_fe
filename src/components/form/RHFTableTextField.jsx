import { Controller, useFormContext } from "react-hook-form";
import { TableCell, TextField } from "@mui/material";

export default function RHFTableTextField({
  name,
  //control,
  label,
  type = "text",
  rules = {},
  readOnly = false,
  ...rest
}) {
  const { clearErrors, control } = useFormContext();
  return (
    <TableCell sx={{ pt: 2, pb: 1 }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={(e) => {
              field.onChange(e);
              clearErrors(name);
            }}
            fullWidth
            size="small"
            variant="outlined"
            label={label}
            type={type}
            error={!!error}
            helperText={error?.message}
            slotProps={{
              input: { readOnly },
              inputLabel: {
                shrink: type === "date" ? { shrink: true } : {},
              },
            }}
            {...rest}
          />
        )}
      />
    </TableCell>
  );
}
