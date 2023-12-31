const Course = require('../models/Course');
const Topic = require('../models/Topic');
const { validationResult } = require('express-validator');
const User = require('../models/User');

class courseController {
    async createCourse(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при создании", errors })
            }

            const { title, progLanguage } = req.body;

            const course = new Course({
                title: title,
                description: "{\"blocks\":[{\"key\":\"636a5\",\"text\":\"default\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
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

    async getCourseById(req, res) {
        try {
            const courseId = req.params.courseId;

            const course = await Course.findById(courseId).populate('topics');
            res.json(course);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Course error" })
        }
    }

    async updateDescriptionById(req, res) {
        try {
            const courseId = req.params.courseId;
            const description = req.body.description;

            await Course.findOneAndUpdate({ _id: courseId }, { description: description });

            return res.status(200).json({ message: 'Description updated successfully' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update description error" })
        }
    }

    async updateLevelById(req, res) {
        try {
            const courseId = req.params.courseId;
            const level = req.body.level;

            await Course.findOneAndUpdate({ _id: courseId }, { level: level });
            return res.status(200).json({ message: 'Level updated successfully' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update level error" })
        }
    }

    async updateLanguageById(req, res) {
        try {
            const courseId = req.params.courseId;
            const progLanguage = req.body.language;

            await Course.findOneAndUpdate({ _id: courseId }, { progLanguage: progLanguage });
            return res.status(200).json({ message: 'Language updated successfully' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Language level error" })
        }
    }

    async addNewTopic(req, res) {
        try {
            const courseId = req.params.courseId;
            const topicTitle = req.body.title;

            const topic = new Topic({
                title: topicTitle,
                description: "{\"blocks\":[{\"key\":\"636a5\",\"text\":\"default\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
                examples: [],
                exercises: []
            });

            await topic.save();

            const course = await Course.findById(courseId);
            course.topics.push(topic._id);
            await course.save();

            return res.status(200).json({ message: 'Topic added to course successfully' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Topic error" });
        }
    }

    async checkOrAddConnectionCourse(req, res) {
        try {
            const courseId = req.params.courseId;
            const userName = req.body.userName;
            
            await User.findOneAndUpdate(
                { userName },
                { $addToSet: { courses: courseId } },
                { new: true }
            );
            res.status(200);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Check or add connection course error" });
        }
    }
}

module.exports = courseController;
