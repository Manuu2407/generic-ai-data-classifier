import * as React from "react";
import {
  makeStyles,
  tokens,
  useId,
} from "@fluentui/react-components";

interface FluentFileInputFieldProps {
  required?: boolean;  
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

export const FluentFileInputField: React.FC<FluentFileInputFieldProps> = ({ required, onFileUpload }) => {
  required = required || false;
  const styles = useStyles();
  const inputId = useId();

  return (
    <div className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={inputId}>Upload File</label>
        <input
          required       
          id={inputId}
          type="file"
          accept=".json,.jsonl,.csv"
          onChange={onFileUpload}
        />
      </div>
    </div>
  );
};
