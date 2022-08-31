# Project Name
ENVECO - enviroment economy
<br>



## Description

Sharing economy, where you can rent out your car while it standing. It's better for the enviroment to share than to fear.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Homepage** - As a user I want to be able to access the homepage, search for cars, look at the price and make a request. 
- **Sign up** - As a user I want to sign up on the web page so that I can make a request to either rent a car or rent out my car.
- **Login** - As a user I want to be able to log in on the web page so that I can get back to my account and make updates.
- **Logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **Edit user** - As a user I want to be able to edit my profile.
- **Result** - As a user I want to see the list of cars and make a request.
- **Cars listing** - As a user i want to view all the cars avaliable



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                                                                                                       
| `GET`      | `/car`                             | Cars page route. Renders car `Hirecar` view.
| `POST`     | `/AddCars`                      | Creats cars form data to the server.                          | { type,information} 
| `GET`      | `/car/:carId`                      | Find cars by Id. Renders car details `car-details`            | { type,view} 
| `POST`     | `/search`                          | Make you search for the car in chosen date. Renders cardetails and summary`car-details` and `summary`       | { type,information}
| `GET`      | `/request`                         | Request page route. Renders request `request` view.
| `POST`     | `/request`                         | Sends request form data to the server.                         | { type,information} 
| `POST`     | `/signup-user`                          | Sends Sign Up info to the server and creates user in the DB. | {, Firstname, Surname, email, password} Renders signup `Profile-user`  |     
| `POST`     | `/signup-rental`                          | Sends Sign Up info to the server and creates user in the DB. | {, Firstname, Surname, email, password} Renders signup `Profile-rental`  |     
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                        | Renders `/auth/login`
| `GET`      | `/profile-user`                    | Profile page route. Renders home `profile-user` view.
| `PUT`     | `/profile-user`                    | Make you edit {firstName, lastName, adress, postBox and card-details}  information.   
| `PUT`     | `/profile-rental`                  | Make you edit {firstName, lastName, adress, postBox, add car, accountnumber}  information.   
| `GET`      | `/profile-rental`                  | Profile page route. Renders home `profile-rental` view.
| `DELETE`      | `/delete-profile`                  | Make you delete the profile view.






## Models

User model

```javascript
{
email: {
type: String,
required: True,
unique: True},
firstName: {
type: String,
required: True},
lastName: {
type: String,
required: True},
adress: {
type: String,
required: True},
postBox: {
type: String,
required: True},
password: {
type: String,
required: True},
card-details: {
type: String,
required: True},
picture: {
type: String,
},
  }

```
Rental-user model

```javascript
{
email: {
type: String,
required: True,
unique: True},
firstName: {
type: String,
required: True},
lastName: {
type: String,
required: True},
adress: {
type: String,
required: True},
postBox: {
type: String,
required: True},
password: {
type: String,
required: True},
account-details: {
type: String,
required: True},
picture: {
type: String,
required: String,
}
cars: [
    {
        type: Schema.Types.ObjectId,
        ref: "Car"
    }
]
// Array Car ID`s
  }

```
Car model

```javascript
  {
  cartype: {
type: String,
required: True},
  carmodel: {
type: String,
required: True},
  price: {
type: Number,
required: True},
  passengers: {
type: Number,
required: True},
  picture: {
  type: String,
  required: True,
   },
  engine: {
type: String,
required: True},
  gear: {
type: String,
required: True},

}
```
Request model

```javascript
{
startDate: {
type: String,
required: True},
endDate: {
type: String,
required: True},
carType: {
type: String,
required: True},
carModel: {
type: String,
required: True},
totalPrice: {
type: Number,
required: True},
contactinformation: {
type: String,
required: True},
}

```


<br>
 

## Packages
 ### Nodemailer

<br>

## Api
 ### Air quality API


<br>



## Links



### Git

The url to your repository and to your deployed project

[[Repository Link](https://github.com/Matulan/Project3)]




<br>



### Slides

The url to your presentation slides

[Slides Link]()

### Contributors
Matulan Mahenthra - [`<github-Matulan>`](https://github.com/Matulan) - [`<linkedin-profile-link>`](www.linkedin.com/in/matulan-mahenthra)

Majid Boukachni - [`<github-username>`](https://github.com/magicmajid2511) - [`<linkedin-profile-link>`](www.linkedin.com/in/majid-boukachni)