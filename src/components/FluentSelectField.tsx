import * as React from "react";
import { makeStyles, Select, tokens, useId } from "@fluentui/react-components";

interface FluentSelectFieldProps {
  required?: boolean;
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

export const FluentSelectField: React.FC<FluentSelectFieldProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  required,
}) => {
  required = required || false;
  const styles = useStyles();
  const selectId = useId();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={selectId}>Select {label}</label>
        <Select id={selectId} value={selectedValue} onChange={onChange} required={required}>
          <option value="" disabled>
            Please select an option
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
