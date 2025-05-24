// pages/create.js
import { useRouter } from 'next/router';
import EventForm from '../components/EventForm';

export default function CreateEvent() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/');
  };

  return (
    <div>
      <h1>Criar Evento</h1>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
}
