import dbConnect from '../../../lib/mongodb';
import Event from '../../../models/Event';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    const event = await Event.findById(id);
    res.status(200).json(event);
  }

  if (req.method === 'PUT') {
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(event);
  }

  if (req.method === 'DELETE') {
    await Event.findByIdAndDelete(id);
    res.status(204).end();
  }
}
