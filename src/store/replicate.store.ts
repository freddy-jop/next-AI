import { Replicate } from "@prisma/client";
import { create } from "zustand";

export type ReplicateType = {
  ifDropZoneActive: boolean;
  replicateList: Array<Replicate> | [] | null;
  setReplicateList: (currentReplicate: Array<Replicate>) => void;
  setIfDropZoneActive: (ifDropZoneActive: boolean) => void;
  filterReplicateList: (filter: Array<Replicate>) => void;
  setReplicateListToNull: () => void;
};

export const useReplicateStore = create<ReplicateType>((set) => ({
  ifDropZoneActive: false,
  replicateList: null,
  setReplicateList: (currentReplicate: Array<Replicate>) =>
    set((state) => ({
      replicateList: state.replicateList
        ? [...currentReplicate, ...state.replicateList]
        : [...currentReplicate],
    })),
  setIfDropZoneActive: (ifDropZoneActive: boolean) =>
    set({ ifDropZoneActive: ifDropZoneActive }),
  filterReplicateList: (filter: Array<Replicate>) =>
    set((state) => ({
      replicateList: state.replicateList
        ? [
            ...filter,
            ...state.replicateList?.filter(
              (replicate) => replicate.slug !== filter[0].slug
            ),
          ]
        : [...filter],
    })),
  setReplicateListToNull: () => set({ replicateList: null }),
}));
