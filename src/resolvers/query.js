module.exports = {
    hello: () => "Hello World!",
    notes: async (parent, args, {models}) => {
        return await models.Note.find();
    },
    note: async (parent, args, {models}) => {
        return await models.Note.findById(args.id);
    },
    users: async (parent, args, {models}) => {
        return await models.User.find();
    },
    user: async (parent, {username}, {models}) => {
        return await models.User.findOne({username});
    },
    me: async (parent, args, {models, user}) => {
        return await models.User.findById(user.id);
    }
};