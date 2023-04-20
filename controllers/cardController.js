const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Card = require("../models/cardModel");

exports.createCard = async (req, res, next) => {
    try {
        const card = await Card.create({
            projectName: req.body.projectName,
            cardTitle: req.body.cardTitle,
            description: req.body?.description,
        });
        console.log(card);

        res.status(201).json({
            status: 'success',
            data: card
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllCards = async (req, res, next) => {
    try {
        const data = await Card.find();

        const backlog = data.filter((item) => item.status === 'backlog');
        const todo = data.filter((item) => item.status === 'todo');
        const inProgress = data.filter((item) => item.status === 'inProgress');
        const done = data.filter((item) => item.status === 'done');

        res.status(200).json({
            status: 'success',
            data: {
                backlog,
                todo,
                inProgress,
                done
            }
        });
    } catch (error) {
        next(error);
    }
};
