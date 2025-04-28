import * as React from "react";
import {
    makeStyles,
    Select,
    tokens,
    useId,
  } from "@fluentui/react-components";

interface FluentSelectFieldProps {
    options: string[];
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
    
      filledLighter: {
        backgroundColor: tokens.colorNeutralBackgroundInverted,
        "> label": {
          color: tokens.colorNeutralForegroundInverted2,
        },
      },
      filledDarker: {
        backgroundColor: tokens.colorNeutralBackgroundInverted,
        "> label": {
          color: tokens.colorNeutralForegroundInverted2,
        },
      },
});

export const FluentSelectField: React.FC<FluentSelectFieldProps> = ({ options }) => {
    const styles = useStyles();
    const selectId = useId();
  
    return (
      <div className={styles.base}>
        <div className={styles.field}>
          <label htmlFor={`${selectId}-outline`}>Select Category</label>
          <Select id={`${selectId}-outline`} appearance="underline">
             {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        </div>
      </div>
    );
  };