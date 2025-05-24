import dbConnect from '../../../lib/mongodb';
import Event from '../../../models/Event';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const events = await Event.find();
    res.status(200).json(events);
  }

  if (req.method === 'POST') {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  }
}
