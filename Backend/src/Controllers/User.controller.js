import User from "../Models/User.model.js";

const insert = async (req, res) => {
    const { empName, username, password } = req.body;
    const user = {
        empName,
        username,
        password
    }
    try {
        const response = await User.insertOne(user);
        return res.send({
            success: true,
            message: "User added successfully",
            data: response
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error
        });
    }
}

export { insert }