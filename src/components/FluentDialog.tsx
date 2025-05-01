import * as React from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import { FluentSpinner } from "./FluentSpinner";

interface FluentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  responseStatus: number | undefined;
  error: string | null;
  onStartBatchProcess: () => void;
  isBatchProcessStarted: boolean;
  isPrepared: boolean;
}

export const FluentDialog: React.FC<FluentDialogProps> = ({
  isOpen,
  onOpenChange,
  isLoading,
  responseStatus,
  error,
  onStartBatchProcess,
  isBatchProcessStarted,
  isPrepared,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Processing Result</DialogTitle>
          <DialogContent>
            {isLoading && <FluentSpinner description="Processing data..." />}
            {!isLoading && error && <div style={{ color: "red" }}>Error: {error}</div>}
            {!isLoading && isPrepared && (
              <div>
                <div style={{ color: "green" }}>Data prepared successfully for processing!</div>
                <span>Do you want to start batch process?</span>
              </div>
            )}
            {!isLoading && responseStatus !== 200 && !error && (
              <div style={{ color: "orange" }}>
                Processing failed! Status code: {responseStatus}
              </div>
            )}
            {!isLoading && isBatchProcessStarted && (
              <div>
                <div style={{ color: "green" }}>Batch process started successfully!</div>
                <div>You can check the current status of your batch request at Data Storage</div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              appearance="primary"
              onClick={onStartBatchProcess}>
              Yes!
            </Button>
            <Button onClick={() => onOpenChange(false)}>No, save file for later!</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
