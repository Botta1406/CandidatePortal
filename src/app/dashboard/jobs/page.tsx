// //src/app/dashboard/jobs/page.tsx
'use client';

import { jobs } from '@/lib/jobs';
import JobCard from '@/components/JobCard';
import useCandidateStore from '@/store/useCandidateStore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function JobsPage() {
    const apply = useCandidateStore((state) => state.apply);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUserId(user.uid);
        });
        return () => unsubscribe();
    }, []);

    const handleApply = async (job: any) => {
        apply(job);
        toast.success(`Applied for ${job.title}`);

        try {
            await fetch('/api/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    jobId: job.id,
                    title: job.title,
                    description: job.description,
                }),
            });
        } catch (error) {
            console.error('Error applying:', error);
            toast.error('Error applying. Try again.');
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Available Jobs</h1>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={() => handleApply(job)} />
            ))}
        </div>
    );
}
