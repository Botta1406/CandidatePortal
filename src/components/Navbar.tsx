// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 text-white flex gap-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/jobs">Jobs</Link>
            <Link href="/dashboard/applied">Applied</Link>
        </nav>
    );
}
