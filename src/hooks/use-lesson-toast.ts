import { useRef, useCallback } from "react";
import { toast } from "sonner";
import { LESSON_TOAST, CODE_PRAISE } from "@/lib/lessons/praise";
import { playSuccess } from "@/lib/audio/sounds";

/**
 * Shows a toast + plays a sound on first successful code run per lesson.
 * Returns the praise string for inline display.
 */
export function useLessonToast(lessonNumber: number) {
  const shown = useRef(false);

  const onSuccess = useCallback(() => {
    const praise = CODE_PRAISE[lessonNumber];
    if (!shown.current) {
      shown.current = true;
      const msg = LESSON_TOAST[lessonNumber];
      if (msg && lessonNumber < 9) {
        toast.success(msg, { className: "text-sm font-medium" });
      }
      playSuccess();
    }
    return praise ?? null;
  }, [lessonNumber]);

  return { onSuccess };
}
