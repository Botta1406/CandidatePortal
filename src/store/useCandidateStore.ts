import { create } from 'zustand';

type Job = {
    id: number;
    title: string;
    description: string;
};

type CandidateStore = {
    applied: Job[];
    apply: (job: Job) => void;
};

const useCandidateStore = create<CandidateStore>((set) => ({
    applied: [],
    apply: (job) =>
        set((state) => ({
            applied: [...state.applied, job],
        })),
}));

export default useCandidateStore;
