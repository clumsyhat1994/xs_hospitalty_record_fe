import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import RHFTextField from "../form/RHFGridTextField";
import RHFSelect from "../form/RHFGridSelect";
import RHFCalculatedGridTextField from "../form/RHFCalculatedGridTextField";

import HospitalityItemsFieldArray from "./HospitalityItemsFieldArray";
import fieldLabels from "../../constants/fieldLables";
import hospitalityApi from "../../api/hospitalityApi";
import { validationMessages } from "../../constants/validationMessages";
import { BEErrorFieldToFEFormFieldMap } from "../../constants/BEErrorFieldToFEFormFieldMap";

export default function HospitalityRecordDialog({
  open,
  initialValues,
  isEditMode,
  onClose,
  onSave,
  departments,
  hospitalityTypes,
  counterparties,
  positions,
}) {
  const methods = useForm({
    defaultValues: initialValues,
  });

  const { control, handleSubmit, reset, setError, getFieldState } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, open, reset]);

  const submit = async (data) => {
    console.log("clicke submit");
    try {
      let res;
      if (isEditMode) {
        // update
        res = await hospitalityApi.update(initialValues.id, data);
        console.log(res.data);
      } else {
        // create
        console.log("creating");
        res = await hospitalityApi.create(data);
        console.log(res.data);
      }
      onSave(res.data);
    } catch (err) {
      console.error(err);
      const backendErrors = err.response?.data;
      if (Array.isArray(backendErrors)) {
        backendErrors.forEach((e) => {
          const fieldName = BEErrorFieldToFEFormFieldMap[e.field] ?? e.field;
          console.log(fieldName);
          const fieldState = getFieldState(fieldName);
          const existingErrorMessage = fieldState.error
            ? fieldState.error?.message + "\n"
            : "";
          setError(fieldName, {
            type: "server",
            message:
              existingErrorMessage + (validationMessages[e.code] ?? e.message),
          });
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{isEditMode ? "修改记录" : "新建记录"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <RHFTextField
              name="receptionDate"
              control={control}
              label={fieldLabels.receptionDate}
              type="date"
              sm={4}
              rules={{ required: "Reception date is required" }}
            />

            <RHFSelect
              name="counterpartyId"
              control={control}
              label={fieldLabels.counterparty}
              options={counterparties}
              sm={8}
              rules={{ required: "Counterparty is required" }}
            />

            <RHFSelect
              name="departmentId"
              control={control}
              label={fieldLabels.department}
              options={departments}
              rules={{ required: "Department is required" }}
            />

            <RHFTextField
              name="handlerName"
              control={control}
              label={fieldLabels.handlerName}
            />

            <RHFSelect
              name="hospitalityTypeId"
              control={control}
              label={fieldLabels.hospitalityType}
              options={hospitalityTypes}
              rules={{ required: "Hospitality type is required" }}
            />

            <RHFTextField
              name="location"
              control={control}
              label={fieldLabels.location}
            />

            <RHFTextField
              name="invoiceDate"
              control={control}
              label={fieldLabels.invoiceDate}
              type="date"
              sm={4}
            />

            <RHFTextField
              name="invoiceNumberString"
              control={control}
              label={fieldLabels.invoiceNumberString}
              sm={8}
            />

            <RHFTextField
              name="invoiceAmount"
              control={control}
              label={fieldLabels.invoiceAmount}
              type="number"
            />

            <RHFCalculatedGridTextField
              label={fieldLabels.totalAmount}
              name="totalAmount"
              computeValue={(values) => {
                const items = values?.items ?? [];
                const itemsTotal = items.reduce(
                  (sum, item) => sum + (Number(item?.lineTotal) || 0),
                  0
                );
                return itemsTotal + Number(values?.invoiceAmount || 0);
              }}
            />

            <RHFTextField
              name="theirCount"
              control={control}
              label={fieldLabels.theirCount}
              type="number"
            />
            <RHFTextField
              name="ourCount"
              control={control}
              label={fieldLabels.ourCount}
              type="number"
            />

            <RHFCalculatedGridTextField
              label={fieldLabels.totalCount}
              name="totalCount"
              computeValue={(values) => {
                const our = Number(values?.ourCount) || 0;
                const their = Number(values?.theirCount) || 0;
                return our + their;
              }}
            />

            <RHFCalculatedGridTextField
              name="perCapitaAmount"
              label={fieldLabels.perCapitaAmount}
              computeValue={(values) => {
                if (!values.totalCount) return "0.00";
                const totalAmount = Number(values?.totalAmount) || 0;
                const totalCount = Number(values?.totalCount) || 0;
                return (totalAmount / totalCount).toFixed(2);
              }}
            />
            <RHFSelect
              name="ourHostPositionId"
              control={control}
              label={fieldLabels.ourHostPosition}
              options={positions}
              getOptionLabel={(d) => d.title}
              getOptionValue={(d) => d.id}
              rules={{ required: "我方主持招待人员职务 is required" }}
            />

            <RHFSelect
              name="theirHostPositionId"
              control={control}
              label={fieldLabels.theirHostPosition}
              options={positions}
              getOptionLabel={(d) => d.title}
              getOptionValue={(d) => d.id}
              rules={{ required: "对方主持招待人员职务 is required" }}
            />

            <RHFTextField
              name="deptHeadApprovalDate"
              control={control}
              label={fieldLabels.deptHeadApprovalDate}
              type="date"
            />
            <RHFTextField
              name="partySecretaryApprovalDate"
              control={control}
              label={fieldLabels.partySecretaryApprovalDate}
              type="date"
            />
          </Grid>
          <HospitalityItemsFieldArray control={control} name="items" />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>取消</Button>
          <Button variant="contained" onClick={handleSubmit(submit)}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
