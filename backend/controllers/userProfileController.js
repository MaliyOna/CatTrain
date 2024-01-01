const User = require("../models/User");

class userProfileController {
    async getUser(req, res) {
        try {
            const userName = req.params.userName;
            
            const user = await User.findOne({userName}).populate('userTopics').populate('courses');

            return res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Get user error" });
        }
    }
    
    async getCoursesWithInformation(req, res) {
        try {
            const courses = await Course.find().populate('topics');
            res.json(courses);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Course error" })
        }
    }
}

module.exports = userProfileController;