const Example = require('../models/Example');

class exampleController {
    async getExampleById(req, res) {
        try {
            const exampleId = req.params.exampleId;

            const example = await Example.findById(exampleId).populate('codeHTML').populate('codeCSS');

            res.json(example);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Example error" });
        }
    }

    async updateExampleTitle(req, res) {
        try {
            const exampleId = req.params.exampleId;
            const title = req.body.title;

            await Example.findByIdAndUpdate({_id: exampleId}, {title: title});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update example title error" });
        }
    }

    async updateDescription(req, res) {
        try {
            const exampleId = req.params.exampleId;
            const description = req.body.description;

            await Example.findByIdAndUpdate({_id: exampleId}, {description: description});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Update example description error" });
        }
    }
}

module.exports = exampleController;