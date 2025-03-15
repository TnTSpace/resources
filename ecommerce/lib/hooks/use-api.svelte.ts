import { onError, type iResult } from "@toolsntuts/utils";
import { toast } from "svelte-sonner";

export class API {

  async fetch(url: string, options: RequestInit) {
    try {
      const response = await fetch(url, options);
      const result = (await response.json()) as iResult;
      const { status, message } = result;

      status === "error" ? toast.error(message) : toast.success(message)
      
      return result

    } catch (error: any) {
      console.error("Fetch error:", error);
      toast.error(error.message);
      return onError(error.message)
    }
  }
}

export function useApi() {
  return new API();
}
