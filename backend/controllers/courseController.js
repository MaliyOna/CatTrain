const Course = require('../models/Course');
const { validationResult } = require('express-validator')

class courseController {
    async createCourse(req, res) {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при создании", errors})
            }

            const { title, progLanguage } = req.body;

            const course = new Course({
                title: title,
                description: "default",
                level: "Начальный",
                progLanguage: progLanguage
            });

            await course.save();
            return res.json({ message: "Курс успешно добавлен" });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Course error" });
        }
    }

    async getAllCourse(req, res) {
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Course error" })
        }
    }
}

module.exports = courseController;