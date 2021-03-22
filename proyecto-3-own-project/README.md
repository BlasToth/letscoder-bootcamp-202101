# PROYECTO 3 - OWN APPLICATION  - IRREGULAR VERBS

## DESCRIPTION

This is an application to learn irregular verbs 

You can:  

- Sign up
- Log in
- Have a look at the verbs 
- Pick a random verb
- Test your knowledge with a quiz (the correct answer is not visible at the frontend)

## Duration: 3 weeks
- Delivery date: 20/03/2021


### TECHNICAL DESCRIPTION 

The following endpoints are provided to front end for consumption:

-http://localhost:4000/signup
A user can sign up here providing the unique, required fields: email, password, nickname
The password is hashed(bcrypt) before saving it to a MongoDB.

-http://localhost:4000/login/
A user can log in here providing a valid email-password combination
A logged in user will be granted a Jason Web Token for authentication.

-http://localhost:4000/verbs/verbs
This is a public route showing the users all the verbs.

-http://localhost:4000/verbs/onerandomverb
This is a private route showing the user a random verb.

-http://localhost:4000/verbs/answers
This is a private route sending possible answers to the front.

-http://localhost:4000/verbs/check
This is a private route checking whether the answer is correct or not. True or false will be sent to the front as a verdict.

### TECHNOLOGIES 

- [NODE](Node)<img src="https://github.com/tkswann2/tech-logos/blob/master/nodejs.svg" height="40">
- [MONGOOSE](Mongoose)<img src="https://github.com/tkswann2/tech-logos/blob/master/mongoose.png" height="40">
- [MONGODB](MongoDB)<img src="https://github.com/tkswann2/tech-logos/blob/master/mongo.png" height="40">
- [EXPRESS](Express)<img src="https://github.com/tkswann2/tech-logos/blob/master/express.png" height="40">
- [EJS](Ejs)<img src="https://github.com/tkswann2/tech-logos/blob/master/ejs.png" height="40">

### TODO

- avoid repetition at random verbs
- create a timestamp for the verb when a user gives a correct answer
- add different symbols depending on the points earned
- create a hall of fame with the first 20 users (based on their points earned)




  







