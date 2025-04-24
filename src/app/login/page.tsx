// // //login/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleAuthProvider } from '@/lib/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (isRegistering) {
            if (!displayName.trim()) {
                setError('Display name is required for registration.');
                setLoading(false);
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: displayName,
                });
                toast.success('Account created successfully!');
                router.push('/dashboard');
            } catch (error: any) {
                toast.error(error.message || 'Something went wrong');
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Signed in successfully!');
                router.push('/dashboard');
            } catch (error: any) {
                toast.error(error.message || 'Something went wrong');
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const signInWithGoogle = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithPopup(auth, googleAuthProvider);
            toast.success('Signed in with Google!');
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.message || 'Google Sign-in failed');
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300">
            <div className="p-8 max-w-md w-full bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    {isRegistering ? 'Create Account' : 'Sign In'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <input type="text" name="fake-username" autoComplete="username" className="hidden" />
                    <input type="password" name="fake-password" autoComplete="new-password" className="hidden" />

                    {isRegistering && (
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                autoComplete="off"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                            autoComplete="new-email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="space-y-4">
                        <button
                            type="submit"
                            className={`w-full bg-indigo-600 text-white py-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''} font-medium`}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : isRegistering ? 'Create Account' : 'Sign In'}
                        </button>

                        <button
                            type="button"
                            onClick={signInWithGoogle}
                            className={`w-full bg-white text-gray-800 py-3 rounded-md shadow-sm hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 flex justify-center items-center font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <FcGoogle className="mr-2" size={24} /> Signing in...
                                </>
                            ) : (
                                <>
                                    <FcGoogle className="mr-2" size={24} /> Sign in with Google
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <button
                            type="button"
                            onClick={() => setIsRegistering((prev) => !prev)}
                            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                        >
                            {isRegistering
                                ? 'Already have an account? Sign in'
                                : "Don't have an account? Create one"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
