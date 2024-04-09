import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { notesData } from "../types";
import { creatingNote } from "./send.content.api";

export const useCreatingNote = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<unknown, unknown, notesData>({
        mutationFn: (data: notesData) => creatingNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            if (onSuccessCallback) onSuccessCallback();
        },
    });
};