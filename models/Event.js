import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: String,
  date: String,
  location: String,
  participants: [String],
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
