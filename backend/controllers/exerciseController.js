const Code = require("../models/Code");
const Exercise = require("../models/Exercise");
const Topic = require("../models/Topic");
const UserTopics = require("../models/UserTopics");

class exerciseController {
    async getExerciseById(req, res) {
        try {
            const exerciseId = req.params.exerciseId;

            const exercise = await Exercise.findById(exerciseId).populate('rightCodeHTML').populate('rightCodeCSS').populate('startCodeHTML').populate('startCodeCSS');

            res.json(exercise);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Exercise error" });
        }
    }

    async deleteExample(req, res) {
        try {
            const exerciseId = req.params.exerciseId;

            const exercise = await Exercise.findById(exerciseId);

            await Code.deleteMany({
                _id: {
                    $in: [
                        exercise.rightCodeHTML,
                        exercise.rightCodeCSS,
                        exercise.startCodeHTML,
                        exercise.startCodeCSS
                    ]
                }
            });

            await Topic.updateMany(
                { exercises: exerciseId },
                { $pull: { exercises: exerciseId } }
            );

            await UserTopics.updateMany(
                { completedExercises: exerciseId },
                { $inc: { countOfAllExercises: -1 } }
            );

            await Exercise.deleteOne({ _id: exerciseId });

            return res.status(200).json({ message: "Упражнение успешно удален" });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Exercise error" });
        }
    }

    async updateExerciseTitle(req, res) {
        try {
            const exerciseId = req.params.exerciseId;
            const title = req.body.title;

            await Exercise.findByIdAndUpdate({_id: exerciseId}, {title: title});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update exercise title error" });
        }
    }

    async updateDescription(req, res) {
        try {
            const exerciseId = req.params.exerciseId;
            const description = req.body.description;

            await Exercise.findByIdAndUpdate({_id: exerciseId}, {description: description});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update exercise description error" });
        }
    }
}

module.exports = exerciseController;