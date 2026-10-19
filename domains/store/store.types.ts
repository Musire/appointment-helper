import { StoreConfig } from "@/generated/prisma";

export type defaultHours = {
 label: string;
 isActive: boolean;
 start: string;
 end: string;
}[]


export type BusinessDay = {
  id: string;
  day: string;
  start: number | null;
  end: number | null;
};

export type State = BusinessDay[];

export type Action =
  | { type: "update_start"; id: string; value: number }
  | { type: "update_end"; id: string; value: number }
  | { type: "toggle_closed"; id: string };

export interface storeHours {
    id: string;
    label: string;
    start: string;
    end:string;
    isActive: boolean
}

export type StoreConfigResult =
  | { status: "STORE_NOT_FOUND" }
  | { status: "CONFIG_MISSING"; storeId: string }
  | { status: "OK"; storeId: string; config: StoreConfig };
