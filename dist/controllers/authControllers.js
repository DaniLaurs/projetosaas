"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.updatePlan = void 0;
const data_source_1 = require("../services/data-source");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const userRepo = data_source_1.AppDataSource.getRepository(User_1.User);
const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: "Campos obrigatórios" });
    const existing = await userRepo.findOne({ where: { email } });
    if (existing)
        return res.status(400).json({ message: "Usuário já existe" });
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = userRepo.create({ name, email, password: hashedPassword });
    await userRepo.save(user);
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({
        message: "Cadastro realizado com sucesso",
        user: { id: user.id, name, email },
        token,
    });
};
const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepo.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ message: "Credenciais inválidas" });
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ message: "Credenciais inválidas" });
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({
        message: "Login realizado com sucesso",
        user: { id: user.id, name: user.name, email },
        token,
    });
};
const updatePlan = async (req, res) => {
    const { plan } = req.body;
    const userId = req.userId;
    if (!plan)
        return res.status(400).json({ message: "Plano não informado" });
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });
    user.plan = plan;
    await userRepo.save(user);
    res.json({ message: "Plano atualizado com sucesso", user });
};
exports.updatePlan = updatePlan;
exports.authController = {
    signUp,
    signIn,
    updatePlan: exports.updatePlan,
};
