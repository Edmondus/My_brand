export const checkName = (req, res, next) => {
    const { userName } = req.body;
    const pattern = /^[a-z]/;
    if (pattern.test(userName)) {
        return next();
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: 'user name must start with only a small letter',
        });
    }
}
export const checkEmail = (req, res, next) => {
    const { email } = req.body;
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (pattern.test(email)) {
        return next();
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: 'Invalid email.',
        });
    }
}
export const checkPassword = (req, res, next) => {
    const { password } = req.body;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/;
    if (pattern.test(password)) {
        return next();
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: 'Password must contain a special character, capital letter and a number and have at least 8 characters',
        });
    }
}