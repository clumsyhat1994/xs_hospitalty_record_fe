import { useEffect } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { useWatch, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import RHFTableTextField from "../form/RHFTableTextField";
import fieldLabels from "../../constants/recordFieldLabels";

export default function ItemRow({ tableName, index, onRemove }) {
  const { setValue, control } = useFormContext();

  const row = useWatch({
    control,
    name: `${tableName}.${index}`,
  });

  useEffect(() => {
    const unit = Number(row?.unitPrice) || 0;
    const qty = Number(row?.quantity) || 0;
    const total = unit * qty;

    setValue(`${tableName}.${index}.lineTotal`, total || "", {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [row?.unitPrice, row?.quantity, tableName, index, setValue]);

  return (
    <TableRow>
      <RHFTableTextField
        name={`${tableName}.${index}.itemName`}
        control={control}
        label={fieldLabels.itemName}
      />

      <RHFTableTextField
        name={`${tableName}.${index}.unitPrice`}
        control={control}
        label={fieldLabels.itemUnitPrice}
        type="number"
      />

      <RHFTableTextField
        name={`${tableName}.${index}.quantity`}
        control={control}
        label={fieldLabels.itemQuantity}
        type="number"
      />
      <RHFTableTextField
        name={`${tableName}.${index}.specification`}
        control={control}
        label={fieldLabels.itemSpecification}
      />
      <RHFTableTextField
        name={`${tableName}.${index}.lineTotal`}
        control={control}
        label={fieldLabels.itemLineTotal}
        type="number"
        readOnly
      />

      <TableCell align="center">
        <IconButton onClick={() => onRemove(index)} color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
