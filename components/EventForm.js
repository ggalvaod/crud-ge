// components/EventForm.js
import { useState } from 'react';

export default function EventForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    date: initialData.date || '',
    location: initialData.location || '',
    participants: initialData.participants?.join(', ') || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      participants: form.participants.split(',').map(p => p.trim()),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required /><br />
      <input name="date" type="date" value={form.date.slice(0, 10)} onChange={handleChange} required /><br />
      <input name="location" placeholder="Local" value={form.location} onChange={handleChange} required /><br />
      <input name="participants" placeholder="Participantes (separados por vírgula)" value={form.participants} onChange={handleChange} /><br />
      <button type="submit">Salvar</button>
    </form>
  );
}
