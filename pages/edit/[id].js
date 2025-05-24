// pages/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EventForm from '../../components/EventForm';

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then(res => res.json())
        .then(data => setEventData(data));
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/');
  };

  return (
    <div>
      <h1>Editar Evento</h1>
      {eventData ? <EventForm initialData={eventData} onSubmit={handleSubmit} /> : <p>Carregando...</p>}
    </div>
  );
}
