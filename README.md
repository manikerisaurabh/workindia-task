# assignment for SDE Internship Program at WorkIndia

## setup

1. Clone this repository
   ```bash
   git clone https://github.com/manikerisaurabh/campus-log
   ```
2. Install all dependencies
   ```bash
   npm i
   ```
3. create an .env file and paste this
   ```bash
   DATABASE_URL=postgresql://postgres.djkyfczytbupwyixgkgl:UkVm8EM9yUiVc0EC@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   JWT_SECRET=sdfbdjJSBKnfdfdrdgd
   ```
4. Start the server from root directory
   ```bash
   nodemon server.js
   or
   node server.js
   ```
   Now your server will run on `http://localhost:8080/` this link

## Working

1. ### Register a user
   #### Make an POST api call to `http://localhost:8080/api/auth/sign-up`
   request body should contains a json file of format
   ```bash
   {
   "email": "xddysaxz@gmail.com",
   "password": "saurabh",
   "role": "user"
   }
   
   ```
   Response will get
   ```bash
   {
   "message": "User registered successfully",
   "user": {
    "id": 18,
    "email": "xddysaxz@gmail.com",
    "role": "user"
    }
   }
   ```

2) ### Login User
  #### Make an POST api call to `http://localhost:8080/api/auth/sign-up`
   request body should contains a json file of format
   ```bash
   {
   "email": "xddysaxz@gmail.com",
   "password": "saurabh"
   }
   
   ```
3) ### Add new train
    #### Make an POST api call to `http://localhost:8080/api/train/add`
   request body should contains a json file of format
   ```bash
   {
   "roll": "admin",
   "name": "sauradsdbhTrainv",
   "source": "basarge",
   "destination": "sgm",
   "seats": 10
   }

4) ### Get seat availability
   #### Make an GET api call to `http://localhost:8080/api/train/check`
   request body should contains a json file of format
   ```bash
   {
   "source": "basarge",
   "destination":"sgm"
   }
   ```
   Response will get
   ```bash
   {
     "availabeSeats": 5
   }
   ```
5) ### Book a new seat
   #### Make an POST api call to `http://localhost:8080/api/train/book`
   request body should contains a json file of format
   ```bash
   {
    "source": "basarge",
    "destination": "sgm",
    "seatCount": 5,
    "user_id": 5
   }
   ```
   Response will get
   ```bash
   {
     "message": "Booking successful",
     "booking": {
      "id": 1,
      "train_id": 1,
      "user_id": 5,
      "seat_count": 5,
      "created_at": "2024-12-07T00:17:39.934Z"
   },
    "availableSeats": 5
   }
   ```
6) ### Get specific booking details
    #### Make an GET api call to `http://localhost:8080/api/booking/info/1`
  
   Response will get
   ```bash
   {
       "booking_id": 1,
       "seat_count": 5,
       "email": "manikerisaurabhm@gmail.com",
       "source": "basarge",
       "destination": "sgm"
   }
   ```
   
