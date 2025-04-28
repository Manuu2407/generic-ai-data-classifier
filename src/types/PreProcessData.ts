import { UUID } from "crypto";

export type PreProcessData = {
    custom_id: string | number | UUID | undefined;
    data_type: string;
    category: string;
    text: string;
  }