module.exports = {
    newNote: async (parent, args, {models}) => {
        return await models.Note.create({
            content: args.content,
            author: args.author
        });
    },
    updateNote: (parent, {id, content}, {models}) => {
        return models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content: content
                }
            },
            {
                new: true
            }
        );
    },
    deleteNote: async (parent, {id}, {models}) => {
        try {
            await models.Note.findOneAndDelete({_id: id});
            return true;
        } catch (e) {
            console.log(e.toString());
            return false;
        }
    }
}