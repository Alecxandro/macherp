import Book from '../models/Book.js'
import slugify from 'slugify'

export const createBook = async (req, res) => {
    try {
        const { title, author } = req.body
        const book = new Book({
            title,
            author,
            slug: slugify(title.toLowerCase()),
            user: req.user._id,
        })

        await book.save()
        res.status(201).json({ message: `Book saved successfully: ${book}` })
    } catch (error) {
        res.status(500).json({ message: `Book saved failed: ${error.message}` })
    }
}

export const getBooks = async (req, res) => {
    try {
        let book

        if (req.user.isAdmin) {
            book = await Book.find()
            return res.json(book)
        }

        book = await Book.find({ user: req.user._id })
        res.json(book)
    } catch (error) {
        res.status(500).json({
            message: `Error fetching book. Details: ${error.message}`,
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        let book

        if (req.user.isAdmin) {
            book = await Book.findById(req.params.id)
            return res.json(book)
        }

        book = await Book.findOne({ _id: req.params.id, user: req.user._id })
        if (!book) return res.status(404).json({ message: `Book not found` })
        return res.json(book)
    } catch (error) {
        return res.status(500).json({ Error: error.message })
    }
}
