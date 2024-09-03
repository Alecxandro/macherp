import Book from '../models/Book.js';
import slugify from 'slugify';
import { authorizationAction } from '../utils/helperfunctions.js';

export const createBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const book = new Book({
            title,
            author,
            slug: slugify(title.toLowerCase()),
            user: req.user._id,
        });

        await book.save();
        res.status(201).json({ message: `Book saved successfully: ${book.title} by ${ book.author}` });
    } catch (error) {
        res.status(500).json({
            message: `Book saved failed: ${error.message}`,
        });
    }
};

export const getBooks = async (req, res) => {
    try {
        let book;

        if (req.user.isAdmin) {
            book = await Book.find();
            return res.json(book);
        }

        book = await Book.find({ user: req.user._id });
        res.json(book);
    } catch (error) {
        res.status(500).json({
            message: `Error fetching book. Details: ${error.message}`,
        });
    }
};

// export const getBookById = async (req, res) => {   DEPRECATED
//     try {
//         let book;

//         if (req.user.isAdmin) {
//             book = await Book.findById(req.params.id);
//             return res.json(book);
//         }

//         book = await Book.findOne({ _id: req.params.id, user: req.user._id });
//         console.log('Book username creator:', book.user.username);

//         if (!book) {
//             return res.status(403).json({
//                 message:
//                     'Book not found or not authorized to see this book info',
//             });
//         }
//         return res.json(book);
//     } catch (error) {
//         return res.status(500).json({ Error: error.message });
//     }
// };

export const getBookById = async (req, res) => {
    const book = await authorizationAction(req, res, Book);
    if (!book) return res.status(403).json({ Error: 'Book not found' });

    try {
        const bookJson = await Book.find(book._id);
        return res.status(200).json(bookJson)
    } catch (error) {
        
    }
}

// export const deleteBook = async (req, res) => {  DEPRECATED
//     try {
//         let book;
//         console.log(req.user.isAdmin);
//         if (req.user.isAdmin) {
//             book = await Book.findById(req.params.id);
//             console.log(
//                 'Book fetched inside deleteBook function if user is admin: ',
//                 book
//             );
//             book = await Book.findByIdAndDelete(book._id);
//             const displayBook = book.title;
//             return res.json({
//                 message: `Book deleted successfully: ${displayBook}`,
//             });
//         }

//         book = await Book.findOne({ _id: req.params.id, user: req.user._id });

//         if (book) {
//             book = await Book.findByIdAndDelete(book._id);
//             return res.json({ message: `Book deleted successfully: ${book}` });
//         }

//         if (!book) {
//             return res.status(403).json({
//                 message:
//                     'You are not authorized to delete this book or it is not registered yet.',
//             });
//         }
//     } catch (error) {
//         return res
//             .status(500)
//             .json({ message: `Book deletion failed: ${error.message}` });
//     }
// };

export const deleteBook = async (req, res) => {
    const book = await authorizationAction(req, res, Book);

    if (!book) return res.status(403).json({ Error: 'Book not found' });

    try {
        await Book.findByIdAndDelete(book._id);
        return res
            .status(200)
            .json({ message: `Book deleted successfully: ${book}` });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Book deletion failed: ${error.message}` });
    }
};

export const updateBook = async (req, res) => {
    const book = await authorizationAction(req, res, Book);
    if (!book) return res.status(403).json({ Error: 'Book not found' });

    try {
        const updatedBook = await Book.findByIdAndUpdate(book._id, req.body, {
            new: true,
        });
        return res.status(200).json(updatedBook);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Book update failed: ${error.message}` });
    }
};
