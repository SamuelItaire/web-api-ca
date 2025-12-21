import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (req, res, next) => {
  try {
    console.log("AUTH MIDDLEWARE HIT");

    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("DECODED:", decoded);

    const user = await User.findByUserName(decoded.username);
    console.log("USER:", user);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    res.status(401).json({ message: err.message });
  }
};

export default authenticate;
