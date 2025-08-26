import { useForm } from '@inertiajs/react';

export default function Artikel({ artikels }) {
  const { data, setData, post, processing, errors } = useForm({
    judul: '',
    konten: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('artikel.store'));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={data.judul} onChange={e => setData('judul', e.target.value)} />
        <textarea value={data.konten} onChange={e => setData('konten', e.target.value)} />
        <button type="submit" disabled={processing}>Simpan</button>
        {errors.judul && <div>{errors.judul}</div>}
        {errors.konten && <div>{errors.konten}</div>}
      </form>
      <ul>
        {artikels.map(a => <li key={a.id}>{a.judul}</li>)}
      </ul>
    </div>
  );
}