import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, Grid } from "@mui/material";
import { useFormMode } from "../../context/FormModeContext";
import { useState, useEffect } from "react";
import masterDataApi from "../../api/masterDataApi";

export default function RHFComboBox({
  name,
  label,
  getOptionLabel = (opt) => opt?.name ?? String(opt),
  getOptionValue = (opt) => opt?.id ?? opt,
  options,
  optionsSetter,
  xs = 12,
  sm = 6,
  rules = {},
  ...rest
}) {
  const { control } = useFormContext();
  const { isEditMode } = useFormMode();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const handle = setTimeout(() => {
      masterDataApi.counterpartySearch(keyword).then((res) => {
        optionsSetter(res.data);
      });
    }, 300);

    return () => clearTimeout(handle);
  }, [keyword, optionsSetter]);

  return (
    <Grid size={{ xs, sm }}>
      <Controller
        name={name}
        control={control}
        rules={!isEditMode ? { required: "不能为空", ...rules } : rules}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(opt, val) =>
              getOptionValue(opt) === getOptionValue(val)
            }
            value={
              options.find((o) => getOptionValue(o) === field.value) || null
            }
            onInputChange={(event, newInputValue) => {
              setKeyword(newInputValue);
            }}
            onChange={(_, newVal) => {
              field.onChange(newVal ? getOptionValue(newVal) : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label={label}
                error={!!error}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                helperText={error?.message}
              />
            )}
            {...rest}
          />
        )}
      />
    </Grid>
  );
}
