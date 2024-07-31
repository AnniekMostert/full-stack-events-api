import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    const defaultReturnObject = { authenticated: false, user: null};
    try {
        const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
        const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
        
    } catch (error) {
        
    }
})

export default router;