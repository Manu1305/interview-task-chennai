const express = require('express')
const router = express.Router()
const User = require('./Database/Model/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const accountSid = "AC3c80ebcca609761ae6e0cf309bee754b";
const authToken = "7471b7367ded7959d7fa307bd97a31ce"
const verifySid = "VA6a2f6b9793dd798d6b297eb870ee7ee6";
const client = require("twilio")(accountSid, authToken);
const multer = require('multer')






const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../src/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })
router.post("/signup", upload.single("image"), async (req, res) => {
    console.log(req.body, 'body')
    try {
        const reccievedemail = req.body.email
        console.log('====================================');
        console.log(reccievedemail);
        console.log('====================================');
        const Data = await User.findOne({ email: req.body.email })
        const checkPhone = await User.findOne({ phone: req.body.phone })
        const password = req.body.password
        const salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(password, salt)


        console.log(Data, 'email')
        console.log(checkPhone, 'phone')
        console.log(typeof checkPhone)
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (Data) {
            console.log('email exist ')
            return res.status(409).json({ error: 'email-already-exist' })

        }
        else if (checkPhone) {
            console.log("phone already exist")
            return res.status(409).json({ error: "phone number already exist" })

        }
        else {
            const data = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                image: req.file.filename,
                Type: req.body.Type
            })
            await data.save();
            console.log(data, 'its saved data')
            return res.status(200).json({ message: 'success' })

        }

    } catch (error) {
        console.log(error)
    }

})
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

router.post("/emailotp", async (req, res) => {
    const email = req.body.email;




    console.log(email, 'email')
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "manukrishnan1305@gmail.com",
            pass: "cdoghdveizplrlna",
        },
    });
    try {
        let mailOptions = {
            from: "manukrishnan858@gmail.com",
            to: email,
            subject: "Otp validation signup task",
            html: `
      
        <h2>YOur otp is ${otp} </h2>
      `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);

                return res.status(200).json({ success: true, message: info.response });
            }
        });
    } catch (err) {
        console.log(err);
    }
})


router.post('/verifyemailotp', (req, res) => {
    const reccievdOtp = req.body.emailotp

    if (reccievdOtp == otp) {
        res.status(200).json({ message: 'verified' })
    }
    else {
        res.status(401).json({ error: 'wrongotp' })
    }
})


router.post("/sendmobotp", (req, res) => {
    const number = req.body.phone
    if (number.length !== 10 || !/[6-9]/.test(number.charAt(0))) {
        res.status(403).json({ error: 'Invalid number' })
        console.log('wrong number')
    }

    else {

        client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${number}`, channel: "sms" })
            .then((verification) => console.log(verification.status),
                res.status(200).json({ message: 'otp sent successfully' })
            )

    }


})
router.post('/verifymobileotp', (req, res) => {
    const otpCode = req.body.mobotp


    try {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: "+918943293217", code: otpCode })
            .then((verification_check) => console.log(verification_check.status, 'check otp'))
        res.send({ message: 'success' })
        readline.close();
    } catch (error) {
        console.log(error)
    }
})


router.post('/login', async (req, res) => {
    const email = req.body.email

    console.log(email, 'comingemail')
    const password = req.body.password
    try {
        const Data = await User.findOne({ email: email })
        if (!Data) {
            console.log('no email exist')
            return res.status(409).json({ err: 'usernotexists' })

        }
   const checkpassword = await bcrypt.compare(password,Data.password)
        if (checkpassword) {

            return res.status(200).json({ message: 'success',Data })

        }
        else {
             console.log('wrong password')
            return res.status(409).json({ err: 'wrong-password' })
           
        }
    } catch (error) {
        console.log(error)
    }
})


router.get('/allUsers',async(req,res)=>{

    try {
        const allUsers = await User.find()
        console.log(allUsers,'allusers') 
        res.status(200).json(allUsers);
    } catch (error) {
        console.log('====================================');
        console.log(error,'allerroruser');
        console.log('====================================');
    }
    
})



module.exports = router