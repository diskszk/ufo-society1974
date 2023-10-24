import { useLocation } from "react-router-dom";
import type { Status } from "../../types";
import { useCallback } from "react";

export function useStatus() {
  const pathString = useLocation().pathname.split("/")[2];

  const getStatus: () => { status: Status } = useCallback(() => {
    if (pathString !== "edit" && pathString !== "preview") {
      throw new Error("URLが正しくありません。");
    }

    const status = pathString as Status;
    return { status };
  }, [pathString]);

  return [getStatus] as const;
}
