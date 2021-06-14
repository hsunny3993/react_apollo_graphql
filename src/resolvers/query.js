module.exports = {
    hello: () => "Hello World!",
    notes: (parent, args, {models}) => {
        return models.Note.find();
    },
    note: (parent, args, {models}) => {
        return models.Note.findById(args.id)
    }
}