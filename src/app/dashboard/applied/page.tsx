// app/dashboard/applied/page.tsx
'use client';
import useCandidateStore from '@/store/useCandidateStore';
import { Job } from '@/app/types';

export default function AppliedPage() {
    const appliedJobs = useCandidateStore((state) => state.applied);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>
            {appliedJobs.length === 0 ? (
                <p>No jobs applied yet.</p>
            ) : (
                appliedJobs.map((job: Job) => (
                    <div key={job.id} className="p-3 border rounded my-2">{job.title}</div>
                ))
            )}
        </div>
    );
}
