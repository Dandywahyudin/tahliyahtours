import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        deskripsi: '',
        gambar: null,
        created_at: '',
        published_at: '',
    });

    function submit(e) {
        e.preventDefault();
        
        // Create FormData untuk handle file upload
        const formData = new FormData();
        
        // Append semua field
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== '') {
                formData.append(key, data[key]);
            }
        });

        post(route('katalog.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                // Reset form after success
                setData({
                    nama: '',
                    deskripsi: '',
                    gambar: null,
                    created_at: '',
                    published_at: '',
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Katalog</h2>}
        >
            <Head title="Tambah Katalog" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {errors.message && (
                        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
                            {errors.message}
                        </div>
                    )}
                                {/* Nama */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                                        Nama
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="nama"
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                    />
                                    {errors.nama && <div className="text-red-500 text-xs italic">{errors.nama}</div>}
                                </div>
                                {/* Deskripsi */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="deskripsi">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                    />
                                    {errors.deskripsi && <div className="text-red-500 text-xs italic">{errors.deskripsi}</div>}
                                </div>
                                {/* Gambar */}
                                <div className="mb-4">
                                    <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="gambar">   
                                        Gambar
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="gambar"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('gambar', e.target.files[0])}
                                    />
                                    {errors.gambar && <div className="text-red-500 text-xs italic">{errors.gambar}</div>}
                                </div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Simpan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}