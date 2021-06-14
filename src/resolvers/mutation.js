const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
        AuthenticationError,
        ForbiddenError
    } = require('apollo-server-express');
const gravatar = require("../util/gravatar");
require('dotenv').config();

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
    },
    signUp: async (parent, {username, password, email}, {models}) => {
        // normalize email address
        email = email.trim().toLowerCase();
        // hash the password
        const hashed = await bcrypt.hash(password, 10);

        // create the gravatar url
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });
            // create and return the json web token
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err);
            // if there's a problem creating the account, throw an error
            throw new Error('Error creating account');
        }
    },
    signIn: async (parent, {username, password, email}, {models}) => {
        if (email) {
            email = email.trim().toLowerCase();
        }

        const user = await models.User.findOne({
            $or: [{email}, {password}]
        });

        if (!user) {
            throw new AuthenticationError('User not exist!');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new ForbiddenError('Password not matched');
        }

        return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    }
};