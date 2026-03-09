import type {
  ImplementationTracker,
  TrackerCategory,
} from "@/data/official-texts/implementation-tracker-types";
import trackerData from "@/data/official-texts/implementation-tracker.json";

export function getTrackerData(): ImplementationTracker {
  return trackerData as ImplementationTracker;
}

export function getCategoryStats(categories: TrackerCategory[]) {
  let totalItems = 0;
  let notifiedItems = 0;

  for (const cat of categories) {
    totalItems += cat.items.length;
    notifiedItems += cat.items.filter((i) => i.status === "notified").length;
  }

  return {
    totalItems,
    notifiedItems,
    pendingItems: totalItems - notifiedItems,
  };
}
