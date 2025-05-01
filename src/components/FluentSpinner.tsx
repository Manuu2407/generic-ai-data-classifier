import * as React from "react";
import { Spinner } from "@fluentui/react-components";
import type { SpinnerProps } from "@fluentui/react-components";

interface FluentSpinnerProps extends SpinnerProps {
  description?: string;
}

export const FluentSpinner: React.FC<FluentSpinnerProps> = ({
  description,
  ...props
}: FluentSpinnerProps) => (
  <div>
    <Spinner {...props} />
    <span>{description}</span>
  </div>
);
