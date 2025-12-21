import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
 userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }

});

export default mongoose.model('Favourite', FavouriteSchema);
