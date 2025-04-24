 //\src\store\useCandidateStore.ts
import { create } from 'zustand';

type Job = {
    id: number;
    title: string;
    description: string;
};

type CandidateStore = {
    applied: Job[];
    apply: (job: Job) => void;
    removeAppliedJob: (jobId: number) => void; // Add this function
};

const useCandidateStore = create<CandidateStore>((set) => ({
    applied: [],
    apply: (job) =>
        set((state) => ({
            applied: [...state.applied, job],
        })),
    removeAppliedJob: (jobId) =>
        set((state) => ({
            applied: state.applied.filter((job) => job.id !== jobId),
        })),
}));

export default useCandidateStore;
