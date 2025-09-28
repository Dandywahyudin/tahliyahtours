import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ katalog }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        nama: katalog.nama || '',
        deskripsi: katalog.deskripsi || '',
        gambar: null,
    });

    const [preview, setPreview] = useState(katalog.gambar ? `/storage/${katalog.gambar}` : null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setData(name, files[0]);
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    post(route("katalog.update", katalog.id), {
        forceFormData: true,
    });
};


    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Katalog</h2>}
        >
            <Head title="Edit Katalog" />

            <div className="py-6 md:py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                                {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                <textarea
                                    name="deskripsi"
                                    value={data.deskripsi}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                                {errors.deskripsi && <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                                <input
                                    type="file"
                                    name="gambar"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                                {preview && (
                                    <img src={preview} alt="Preview" className="mt-2 w-48 h-48 object-cover rounded-md" />
                                )}
                                {errors.gambar && <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>}
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    Update
                                </button>
                                <Link
                                    href={route('katalog.index')}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition-colors duration-200"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
