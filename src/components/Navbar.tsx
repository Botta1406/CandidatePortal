// // components/Navbar.tsx

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 text-white flex gap-4">
            <Link href="/" className="hover:underline">Home</Link> {/* Home link */}
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/dashboard/jobs" className="hover:underline">Jobs</Link>
            <Link href="/dashboard/applied" className="hover:underline">Applied</Link>
        </nav>
    );
}
