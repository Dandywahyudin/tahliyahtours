import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ katalog }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Detail Katalog - ${katalog.nama}`} />

            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{katalog.nama}</h1>
                
                {katalog.gambar && (
                    <img
                        src={`/storage/${katalog.gambar}`}
                        alt={katalog.nama}
                        className="w-full max-h-96 object-cover rounded-lg mb-4"
                    />
                )}

                <p className="text-gray-700 mb-6">{katalog.deskripsi}</p>

                <div className="flex justify-between">
                    <Link
                        href={route('katalog.index')}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Kembali
                    </Link>

                    <Link
                        href={route('katalog.edit', katalog.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
