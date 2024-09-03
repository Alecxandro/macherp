import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export function toDownCase(text) {
    return text.toLowerCase();
}

export const authorizationAction = async (req, res, model) => {
    const { isAdmin } = req.user;
    const { id } = req.params;

    try {
        const query = isAdmin ? { _id: id } : { _id: id, user: req.user._id };
        const document = await model.findOne(query);
        if (!document)
            return res
                .status(403)
                .json({
                    message:
                        'You are not authorized to perform this action or the data is not found.',
                });

        return document;
    } catch (error) {
        res.status(404).json({ message: 'Document not found' });
        return null;
    }
};
