"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./services/data-source");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoute_1.default);
app.use("/api/plans", planRoutes_1.default);
app.use("/api/tasks", taskRoute_1.default);
console.log("Iniciando backend...");
data_source_1.AppDataSource.initialize()
    .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.error("Data Source init error:", err));
