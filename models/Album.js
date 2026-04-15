import mongoose from 'mongoose'

const albumSchema = new mongoose.Schema(
  {
    artist: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 0 },
    genre: { type: String, required: true, trim: true },
    tracks: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Album', albumSchema)
