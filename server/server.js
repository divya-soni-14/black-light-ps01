// Required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');

// Set up Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

//OpenAPI 
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Define user schema
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    image_ids:[{type: String}],
    prompt:{type:String},
    image_urls:[{type:String}]
});

// Set up pre-save hook to hash password
// UserSchema.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('passwordHash')) {
//         return next();
//     }
//     // bcrypt.genSalt(10, function (err, salt) {
//     //     if (err) {
//     //         return next(err);
//     //     }
//         bcrypt.hash(user.passwordHash, 10, function (err, hash) {
//             if (err) {
//                 return next(err);
//             }
//             user.passwordHash = hash;
//             next();
//         });
//     //});
// });

// Add instance methods to user schema for password hashing and authentication
// UserSchema.methods.setPassword = function (password) {
//     this.passwordHash = sha256(password);
// };

UserSchema.methods.checkPassword = async function (password) {
    if(password == passwordHash)
        return true;
    return false

};

const User = mongoose.model('User', UserSchema)
mongoose.connect('mongodb+srv://ds952073:Y9HLqqugm2SR4zWL@cluster0.d2el9gu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define authentication middleware function
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Missing Authorization header');
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'ilikeballs', function (err, decoded) {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.email = decoded.email;
        next();
    });
}

// Define SHA-256 encryption function
// function sha256(input) {
//     const hash = crypto.createHash('sha256');
//     hash.update(input);
//     return hash.digest('hex');
// }

// Define API routes
app.post('/api/login', async function (req, res) {
    try{
        const data = await User.findOne({ email: req.body.email });
        if (!data) {
            return res.status(404).send('User not found');
          }
          console.log(data.passwordHash,req.body.password)
            if(req.body.password!=data.passwordHash)
            return res.status(200).json({'msg':'Incorrect password'});
          
          const token = jwt.sign({ email: data.email }, 'ilikeballs', {
            expiresIn: '1h',
          });
          return res.status(200).json({ token: token ,image_ids : data.image_ids });
    }catch(err){
        return res.status(400).send('User authentication failed');
    }
})


app.post('/api/image_ids', async function (req, res) {
    try{
	console.log(req.body.email)
        const data = await User.findOne({ email: req.body.email });
        if (!data) {
            return res.status(200).json({'msg':'User not found  '});
          }
        return res.status(200).json({image_ids : data.image_ids , image_urls : data.image_urls});
    }catch(err){
        return res.status(200).json({'msg':'User authentication failed'});
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password , image_ids,image_desc,image_urls} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password with bcrypt
        
        
        //Generating Prompt
        const prompt = await balls(image_desc);

        // Create new user
        const user = new User({
            email: email,
            passwordHash: password,
            image_ids: image_ids,
            prompt: prompt,
            image_urls: image_urls
        });

        // Save user to database
        await user.save();

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, 'ilikeballs', {
            expiresIn: '1h',
        });

       
        res.status(201).json({ token,prompt:prompt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start the server
app.listen(3000, function () {
    console.log('Server started');
});

async function balls(data){
    let company = "here are 5 image descriptions in order.";
    for(const x of data){
        company+=x;
        company+="\n";
    }
    company+="create a meaningful sentence out of these descriptions in the same order and keep the sentences very short";
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: company,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.data.choices[0].text.replace("\n\n",'');
}
