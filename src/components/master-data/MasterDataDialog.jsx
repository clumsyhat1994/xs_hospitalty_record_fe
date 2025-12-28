// src/components/master-data/CounterpartyDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import RHFTextField from "../form/RHFGridTextField";
import RHFMultiAutocomplete from "../form/RHFMultiAutocomplete";

import { FormModeProvider } from "../../context/FormModeContext";

export default function MasterDataDialog({
  open,
  initialValues,
  onClose,
  save,
  onSaveSuccess,
  textFields,
  multiAutoCompleteFields,
}) {
  const form = useForm({
    defaultValues: initialValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  const isEditMode = initialValues?.id != null;

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues, reset]);

  const onSubmit = async (data) => {
    try {
      await save(data);
      onSaveSuccess();
      onClose;
    } catch (err) {
      if (err.response?.status === 409) {
        const data = err.response.data;
        setError(data?.field, { type: "server", message: data?.detail });
      }
    }
  };

  return (
    <FormModeProvider isEditMode={isEditMode}>
      <FormProvider {...form}>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <DialogTitle>
            {isEditMode ? "编辑往来单位" : "新建往来单位"}
          </DialogTitle>
          <DialogContent sx={{ mt: 1 }}>
            <Grid container spacing={2} pt={1}>
              {textFields.map((field) => (
                <RHFTextField
                  key={field.fieldName}
                  name={field.fieldName}
                  control={control}
                  label={field.label}
                  sm={6}
                />
              ))}
              {multiAutoCompleteFields.map((field) => (
                <Grid key={field.fieldName} size={{ sm: field.sm ?? 6 }}>
                  <RHFMultiAutocomplete
                    name={field.fieldName}
                    control={control}
                    label={field.label}
                    options={field.options}
                    sm={6}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={isSubmitting}>
              取消
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              disabled={isSubmitting}
            >
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </FormProvider>
    </FormModeProvider>
  );
}
