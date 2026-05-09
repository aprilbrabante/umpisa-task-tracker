/*****************
USER CONTROLLER
******************/
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const auth = require("../auth");

const { errorHandler } = require("../auth.js");

/**
 * Register a new user account with encrypted password
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns Registered user success message or validation errors
 */
module.exports.registerUser = (req, res) => {

	if(!req.body.email.includes('@')){
		return res.status(400).send({ error: "Email invalid" });
	} else if(req.body.mobileNo.length !== 11) {
		return res.status(400).send({ error: "Mobile number invalid" });
	} else if (req.body.password.length < 8) {
		return res.status(400).send({ error: "Password must be atleast 8 characters" });
	} else { 
		let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			password: bcrypt.hashSync(req.body.password, 10)
		})

		return newUser.save()
		.then((result) => res.status(201).send({
            message: "Registered successfully"
        }))
		.catch(error => errorHandler(error, req, res))
	}
}

/**
 * Login user
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns Login success message or validation errors
 */
module.exports.loginUser = (req, res) => {
	if(req.body.email.includes("@")) {
		return User.findOne({email: req.body.email})
		.then(result => {
			if(result == null) {
				return res.status(404).send({ error: "No Email Found" });
			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

				if(isPasswordCorrect) {
					return res.status(200).send({ 
                        token : auth.createAccessToken(result)
                        })
				} else {
					return res.status(401).send({ error: "Email and password do not match" });
				}
			}
		})
		.catch(error => errorHandler(error, req, res));
	} else {
		return res.status(400).send({ error: "Invalid Email" });
	}
}

/**
 * Get user details
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns User success message or validation errors
 */
module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id).select("-password")
    .then(user => {
        if(!user){
            return res.status(404).send({ error: "User not found" })
        } else {
            return res.status(200).send({ user: user });
        }  
    })
    .catch(error => errorHandler(error, req, res));
};

/**
 * Reset user password
 * 
 * @param {*} req
 * @param {*} res
 * 
 * @returns User success message or validation errors
 */
module.exports.resetPassword = (req, res) => {

    const { newPassword } = req.body;
    const { id } = req.user;

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    return User.findByIdAndUpdate(id, { password: hashedPassword })
    .then(user => {
		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}
		return res.status(201).send({ message: "Password reset successfully" });
	})
	.catch(error => errorHandler(error, req, res));
};