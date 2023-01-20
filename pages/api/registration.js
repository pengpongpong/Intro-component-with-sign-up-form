const mongoose = require("mongoose");
import hashPass from "../../src/bcrypt/hash";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schemaRegistration = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});
const Registration = new mongoose.model("Registration", schemaRegistration);

export default function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !firstName || !lastName || !password) {
      res.json({
        message: "Required fields cannot be empty",
      });
    } else if (!email.includes("@")) {
      res.json({
        message: "Email not valid",
      });
    } else {
      const saveRegistration = async () => {
        await hashPass(password).then((result) => {
          const registration = new Registration({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: result,
          });
          registration.save((err, userData) => {
            if (err) return console.error(err);
            res.json({
              message: "You have been successfully registered for a free trial",
            });
            console.log(userData);
          });
        });
      };
      saveRegistration();
    }
  }
}
