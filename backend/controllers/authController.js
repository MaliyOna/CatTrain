const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Role = require('../models/Role')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret} = require("../config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }

            const {userName, password} = req.body;
            const candidate = await User.findOne({userName});

            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            
            const hash = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})

            const user = new User({
                userName: userName,
                password: hash,
                roles: [userRole.value],
                userTopics: []
            })

            await user.save();

            return res.json({message: "Пользователь успешно зарегистрирован"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {userName, password} = req.body;
            const user = await User.findOne({userName});

            if (!user) {
                return res.status(400).json({message: "Пользователь не найден"});
            };

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({message: "Введен не верный пароль"});
            }

            const token = generateAccessToken(user._id, user.roles);

            return res.json({token});

        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            res.json("server work");
        } catch (error) {
        }
    }
}

module.exports = authController;
