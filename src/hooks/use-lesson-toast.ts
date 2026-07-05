import { useRef, useCallback } from "react";
import { toast } from "sonner";
import { LESSON_TOAST, CODE_PRAISE, NEXT_LESSON_SLUG } from "@/lib/lessons/praise";
import { playSuccess } from "@/lib/audio/sounds";
import { track } from "@/lib/analytics/posthog";

/**
 * Shows a toast + plays a sound on first successful code run per lesson.
 * Toast is clickable — navigates to the next lesson.
 */
export function useLessonToast(lessonNumber: number) {
  const shown = useRef(false);

  const onSuccess = useCallback(() => {
    const praise = CODE_PRAISE[lessonNumber];
    if (!shown.current) {
      shown.current = true;
      const msg = LESSON_TOAST[lessonNumber];
      const nextSlug = NEXT_LESSON_SLUG[lessonNumber];
      if (msg && lessonNumber < 9 && nextSlug) {
        toast.success(msg, {
          duration: 5000,
          action: {
            label: "Next lesson",
            onClick: () => {
              track("next_lesson_clicked", { from: lessonNumber, to: lessonNumber + 1, source: "toast" });
              window.location.href = `/lesson/${nextSlug}`;
            },
          },
        });
      }
      playSuccess();
    }
    return praise ?? null;
  }, [lessonNumber]);

  return { onSuccess };
}
