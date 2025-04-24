// components/JobCard.tsx
export default function JobCard({ job, onApply }: any) {
    return (
        <div className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p>{job.description}</p>
            <button
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                onClick={onApply}
            >
                Apply
            </button>
        </div>
    );
}
