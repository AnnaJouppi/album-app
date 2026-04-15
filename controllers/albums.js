import Album from '../models/Album.js'

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({}).sort({ artist: 1, title: 1 }).exec()
    res.json(albums)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load albums' })
  }
}

const getSingleAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).exec()
    if (!album) return res.status(404).json({ error: 'Album not found' })
    res.json(album)
  } catch (error) {
    // cast error jos id ei ole validi ObjectId
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ error: 'Invalid album id' })
    }
    res.status(500).json({ error: 'Failed to load album' })
  }
}

const createAlbum = async (req, res) => {
  try {
    const { artist, title, year, genre, tracks } = req.body

    if (!artist || !title || year == null || !genre || tracks == null) {
      return res.status(400).json({
        error: 'Missing fields. Required: artist, title, year, genre, tracks',
      })
    }

    const created = await Album.create({
      artist,
      title,
      year: Number(year),
      genre,
      tracks: Number(tracks),
    })

    res.status(201).json(created)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create album' })
  }
}

// update album
const updateAlbum = async (req, res) => {
  try {
      const albumID = req.params.id;
      const updatedAlbum = await Album.findByIdAndUpdate(
        albumID,
        req.body,
        { new: true }
      )
      // If it's -1, it doesn't exist
      if (!updatedAlbum) {
        return res.status(404).json({ error: 'Album not found' })
      }
      
      // send it back to client
      res.status(200).send();
  
    } catch (error) {
      res.status(500).json({ error: 'Failed to update album!' })
    }
}

// delete album
const deleteAlbum = async (req, res) => {
  try{
  const albumID = req.params.id;
  const deletedAlbum = await Album.findByIdAndDelete(albumID)

   // If it doesn't exist
    if (!deletedAlbum) {
      return res.status(404).json({ error: 'Album not found' })
    }

    return res.status(204).send();

   } catch {
      res.status(500).json({ error: 'Failed to delete album!' })
   }
}

export { getAllAlbums, getSingleAlbum, createAlbum, updateAlbum, deleteAlbum }