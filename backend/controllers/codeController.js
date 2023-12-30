const Code = require("../models/Code");

class codeController {
    async updateCode(req, res) {
        try {
            const codeId = req.params.codeId
            const code = req.body.code;

            await Code.findOneAndUpdate({ _id: codeId }, { code: code });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Code error" })
        }
    }
}

module.exports = codeController;