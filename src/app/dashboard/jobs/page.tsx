
'use client';

import { useState, useEffect } from 'react';
import useCandidateStore from '@/store/useCandidateStore';
import { jobs } from '@/lib/jobs'; // Adjust the path based on your structure
import { Job } from '@/app/types'; // Make sure this path matches your types file

export default function JobsPage() {
    const apply = useCandidateStore((state) => state.apply);
    const [popupMsg, setPopupMsg] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

    useEffect(() => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered);
    }, [searchTerm]);

    const handleApply = (job: Job) => {
        apply(job);
        setPopupMsg(`You have successfully applied for "${job.title}"`);
        setTimeout(() => setPopupMsg(''), 3000);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>

            <div className="mb-4">
                <label htmlFor="search" className="block text-gray-700 text-sm font-bold mb-2">
                    Search Jobs:
                </label>
                <input
                    type="text"
                    id="search"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {filteredJobs.map((job) => (
                <div key={job.id} className="p-4 border rounded mb-4 shadow">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-600">{job.description}</p>
                    <button
                        onClick={() => handleApply(job)}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Apply
                    </button>
                </div>
            ))}

            {filteredJobs.length === 0 && searchTerm !== '' && (
                <p>No jobs found matching your search criteria.</p>
            )}

            {popupMsg && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg transition-all duration-300 z-50">
                    {popupMsg}
                </div>
            )}
        </div>
    );
}