import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Grid, TextField } from "@mui/material";

export default function RHFCalculatedField({
  name,
  label,
  xs = 12,
  sm = 6,
  computeValue,
}) {
  const { control, setValue } = useFormContext();
  const allValues = useWatch({ control });

  const value = computeValue(allValues);

  useEffect(() => {
    if (!name) return;
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [name, value, setValue]);

  return (
    <Grid item size={{ xs: xs, sm: sm }}>
      <TextField
        label={label}
        size="small"
        value={value ?? ""}
        fullWidth
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
    </Grid>
  );
}
