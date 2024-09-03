import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate'

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: true,
        },
    },
    {
        timestamps: true,
    }
);

bookSchema.plugin(autopopulate)

export default mongoose.model('Book', bookSchema);
