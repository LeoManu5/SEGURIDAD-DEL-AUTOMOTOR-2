import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
        });
        res.status(201).json({ status: 'success', message: 'Usuario registrado', user: newUser });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).json({ status: 'success', token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const currentUser = (req, res) => {
    res.json({ status: 'success', user: req.user });
};

export default { register, login, currentUser };
