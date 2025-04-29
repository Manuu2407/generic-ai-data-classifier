import { UUID } from "crypto";

export type PreProcessData = {
  title: string;
  data_type: string;
  body: {
    custom_id: string | number | UUID | undefined;
    category: string;
    text: string;
  };
};
