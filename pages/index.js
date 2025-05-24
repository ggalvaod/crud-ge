import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const deleteEvent = async (id) => {
    if (!confirm('Deseja excluir este evento?')) return;
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    setEvents(events.filter(event => event._id !== id));
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      <h1>Eventos</h1>
      <Link href="/create" className="create-link">Criar novo evento</Link>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.name}</strong> - {formatDate(event.date)}<br />
            {event.location}<br />
            Participantes: {event.participants.join(', ')}<br />
            <Link href={`/edit/${event._id}`}>Editar</Link>
            <button onClick={() => deleteEvent(event._id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 30px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          background-color: #f4f6f8;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          background-color: #f0f0f0;
          margin-bottom: 15px;
          padding: 15px;
          border-radius: 8px;
        }

        a {
          color: #0070f3;
          text-decoration: none;
          font-weight: bold;
          margin-right: 10px;
        }

        a:hover {
          text-decoration: underline;
        }

        .create-link {
          display: inline-block;
          margin-bottom: 20px;
        }

        button {
          background-color: #ff4d4d;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #e60000;
        }
      `}</style>
    </div>
  );
}
