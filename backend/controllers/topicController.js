const Code = require('../models/Code');
const Example = require('../models/Example');
const Exercise = require('../models/Exercise');
const Topic = require('../models/Topic');

class topicController {
    async getTopicById(req, res) {
        try {
            const topicId = req.params.topicId;

            const topic = await Topic.findById(topicId)
                .populate('examples')
                .populate('exercises');
            res.json(topic);

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Topic error" });
        }
    }

    async updateTopicTitle(req, res) {
        try {
            const topicId = req.params.topicId;
            const title = req.body.title;

            await Topic.findByIdAndUpdate({ _id: topicId }, { title: title })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update topic title error" });
        }
    }

    async updateTopicDescription(req, res) {
        try {
            const topicId = req.params.topicId;
            const description = req.body.description;

            await Topic.findByIdAndUpdate({_id: topicId}, {description: description});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update topic description error" });
        }
    }

    async addExampleToTopic(req, res) {
        try {
            const topicId = req.params.topicId;
            const title = req.body.title;

            const codeHTML = new Code({language:"HTML", code:"<! -- HTML -->"});
            const codeCSS = new Code({language: "CSS", code: "/* CSS */"});
            
            await codeHTML.save();
            await codeCSS.save();

            const example = new Example({
                title: title,
                description: "{\"blocks\":[{\"key\":\"636a5\",\"text\":\"default\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
                codeHTML: codeHTML,
                codeCSS:codeCSS
            })

            await example.save();

            const topic = await Topic.findById(topicId);
            topic.examples.push(example._id);
            await topic.save();

            return res.status(200).json({ message: 'Example added to course successfully' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Add example to topic description error" });
        }
    }

    async addExerciseToTopic(req, res) {
        try {
            const topicId = req.params.topicId;
            const title = req.body.title;

            const rightCodeHTML = new Code({language:"HTML", code:"<! -- RightHTML -->"});
            const rightCodeCSS = new Code({language: "CSS", code: "/* RightCSS */"});
            const codeHTML = new Code({language:"HTML", code:"<! -- HTML -->"});
            const codeCSS = new Code({language: "CSS", code: "/* CSS */"});

            await rightCodeHTML.save();
            await rightCodeCSS.save();
            await codeHTML.save();
            await codeCSS.save();

            const exercise = new Exercise({
                title: title,
                description: "{\"blocks\":[{\"key\":\"636a5\",\"text\":\"default\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
                rightCodeHTML: rightCodeHTML,
                rightCodeCSS: rightCodeCSS,
                startCodeHTML: codeHTML,
                startCodeCSS: codeCSS
            });

            await exercise.save();
            
            const topic = await Topic.findById(topicId);

            topic.exercises.push(exercise);
            await topic.save();
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Add exercise to topic description error" });
        }
    }
}

module.exports = topicController;