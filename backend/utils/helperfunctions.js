import bcrypt from 'bcryptjs'

export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export const authorizationAction = async (req, res, model) => {
    const { isAdmin } = req.user
    const { id } = req.params
    try {
        const query = isAdmin ? { _id: id } : { _id: id, user: req.user._id }
        if (id === String(req.user._id)) {
            const user = await model.findById(req.user._id)
            console.log('User fetched:', user)
            return user
        }
        const document = await model.findOne(query)
        console.log('Document fetched:', document)

        if (!document) return null

        return document
    } catch (error) {
        res.status(404).json({ message: 'Document not found' })
        return null
    }
}
