import * as React from "react";
import { Input, makeStyles, Select, tokens, useId } from "@fluentui/react-components";

interface FluentTextInputFieldProps {
  required?: boolean;
  label: string;
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
});

export const FluentTextInputField: React.FC<FluentTextInputFieldProps> = ({
  label,
  inputValue,
  onChange,
  required,
}) => {
  required = required || false;
  const styles = useStyles();
  const selectId = useId();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={selectId}>{label}</label>
        <Input id={selectId} value={inputValue} onChange={onChange} required={required}></Input>
      </div>
    </div>
  );
};
