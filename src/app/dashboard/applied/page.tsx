// // app/dashboard/applied/page.tsx
'use client';
import useCandidateStore from '@/store/useCandidateStore';
import { Job } from '@/app/types';
import { useRouter } from 'next/navigation';

export default function AppliedPage() {
    const appliedJobs = useCandidateStore((state) => state.applied);
    const { back } = useRouter();

    const handleDelete = (jobId: number) => {
        // Remove the job from the applied jobs list
        useCandidateStore.getState().removeAppliedJob(jobId);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>

            <button
                onClick={() => back()}
                className="text-blue-600 underline mb-4"
            >
                &#8592; Back
            </button>

            {appliedJobs.length === 0 ? (
                <p>No jobs applied yet.</p>
            ) : (
                appliedJobs.map((job: Job) => (
                    <div key={job.id} className="p-3 border rounded my-2 flex justify-between items-center">
                        <span>{job.title}</span>
                        <button
                            onClick={() => handleDelete(job.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
