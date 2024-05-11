import { type ZodSchema } from "zod";

export interface Packet {
  payload: object;
  id: number;

  parseOptions: ZodSchema;

  parseData(): void;
}
