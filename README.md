# Task Test API Documentation
This is a Node.js API creating using Express for the task based purpose the application allows any user to create, delete, update, login user as well as posts along with finding the nearby posts.
# How to run the application
You can run the application simply by following these steps.
1:) Clone the repository by git clone
```
git clone https://github.com/TheCasperSolangi/express_task.git
```
2:) Install the node modules.
```
npm install 
```
3:) set up the enviromental variables in .env
```
MONGO_URI=your mongodb url
JWTSECRET=yourjwtsecretkey
```
# API Documentation
Congratulation you have clone the application and now you are ready to test. here is an api documentation and complete information. However we have only covered the essentials and important endpoints only. 
** All Routes are protected with authentication middleware ensure to add token in the Authorization header **
# User Routes.
**1:) To create a user you can send a post request.**
```
http://localhost:5000/api/auth/register
```
**RESPONSE:** 
```
{
    "message": "User registered successfully",
    "user": {
        "username": "testuser22",
        "email": "test22@example.com",
        "password": "$2a$10$DHh9R7oljYemWyXSJkNnyOZK2GONskrUDYYtLyHu7KBulMMz6qY1G",
        "first_name": "casper",
        "last_name": "solangi",
        "lat": "20.91203",
        "long": "18.2109",
        "_id": "6735f50f01747f328a9a15c3",
        "__v": 0
    }
}
```
**2:) To Login You can send a post request to**
```
http://localhost:5000/api/auth/login
```
**RESPONSE**
```
{
    "message": "Signin Successful",
    "token": "JWT TOKEN WILL BE RETURNED IN RESPONSE"
}
```
*** Due to non smtp or server availbility here only the demonstration of reset password is used. ***
**1:) Issue Reset Password Request by sending the post request along with userId in request body.**
```
http://localhost:5000/api/auth/reset-password
```
```
request body:
{
userId: "6735d249c0e2969c9e414431"
}
```
**RESPONSE**
```
{
    "msg": "OTP issued",
    "otp": 8855
}
P.S I know it's a really bad practice and security issue but it's for demonstration and dramatization purpose only. to show the reset password flow. 
```
**2:) Verify OTP Code. by sending the request to along with otp in request body.**
```
http://localhost:5000/api/auth/verify-code
```
```
{
    "userId": "6735d249c0e2969c9e414431",
      "otp": 8855
}
```
**RESPONSE** 
```
{
    "msg": "OTP verified successfully"
}
```
**3:) Reset Password by entering the new password send the request to along with newPassword in request body**
```
http://localhost:5000/api/auth/new-password
```
```
{
    "userId": "6735d249c0e2969c9e414431",
    "newPassword":"casper123"
}
```
**RESPONSE**
```
{
    "msg": "Password reset successfully"
}
```
**4:) Update user profile by sending the put reqeust to and along with field and value in request body**
```
https://localhost:5000/api/auth/update
```
```
{
  "field": "first_name",
  "value": "casper solangi"
}
```
**RESPONSE**
```
{
    "msg": "User field updated successfully",
    "updatedField": {
        "first_name": "casper"
    }
}
```
**5:) Delete user accounts by sending the delete request to:**
```
https://localhost:5001/api/auth/delete
```
**response**
```
{
    "msg": "User account deleted successfully"
}
```
# POST ROUTES
**1:) Add New Post**
```
http://localhost:5000/api/post/add
```
```
request body
{
    "title": "Event in another state",
    "post_body": "We're hosting an event in a different state.",
    "lat": 37.7749,
    "long": -122.4194
}
response body
{
    "msg": "Post added successfully",
    "post": {
        "postId": 27,
        "userId": "6735d249c0e2969c9e414431",
        "username": "testuser2",
        "title": "Event in another state",
        "post_body": "We're hosting an event in a different state.",
        "lat": 37.7749,
        "long": -122.4194,
        "_id": "6735ec81193510a7d5150792",
        "createdAt": "2024-11-14T12:26:41.728Z",
        "__v": 0
    }
}
```
**2:) Retrieve Post by Username**
```
GET https://localhost:5001/api/post/testuser2
```
```
{
    "posts": [
        {
            "_id": "6735e50a4f43f1ff90ed841a",
            "postId": 1,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Sample Post Title",
            "post_body": "This is the body of the post.",
            "lat": 40.7128,
            "long": -74.006,
            "createdAt": "2024-11-14T11:54:50.951Z",
            "__v": 0
        },
        {
            "_id": "6735e5134f43f1ff90ed8422",
            "postId": 3,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Sample Post Title",
            "post_body": "This is the body of the post.",
            "lat": 40.7128,
            "long": -74.006,
            "createdAt": "2024-11-14T11:54:59.303Z",
            "__v": 0
        },
        {
            "_id": "6735e5144f43f1ff90ed8426",
            "postId": 4,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Sample Post Title",
            "post_body": "This is the body of the post.",
            "lat": 40.7128,
            "long": -74.006,
            "createdAt": "2024-11-14T11:55:00.617Z",
            "__v": 0
        },
        {
            "_id": "6735ea36fa19609e9dec332f",
            "postId": 9,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Post within 10 km",
            "post_body": "This is a post within 10 km of your location.",
            "lat": 40.7128,
            "long": -74.006,
            "createdAt": "2024-11-14T12:16:54.089Z",
            "__v": 0
        },
        {
            "_id": "6735ea43fa19609e9dec3333",
            "postId": 10,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Nearby event",
            "post_body": "Join us for a nearby event this weekend!",
            "lat": 40.7306,
            "long": -73.9352,
            "createdAt": "2024-11-14T12:17:07.668Z",
            "__v": 0
        },
        {
            "_id": "6735ea4dfa19609e9dec3337",
            "postId": 11,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Nearby event",
            "post_body": "Join us for a nearby event this weekend!",
            "lat": 40.7306,
            "long": -73.9352,
            "createdAt": "2024-11-14T12:17:17.076Z",
            "__v": 0
        },
        {
            "_id": "6735ea57fa19609e9dec333b",
            "postId": 12,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Close by meetup",
            "post_body": "Looking for people to meet within 10 km of me.",
            "lat": 40.758,
            "long": -73.9855,
            "createdAt": "2024-11-14T12:17:27.500Z",
            "__v": 0
        },
        {
            "_id": "6735ea61fa19609e9dec333f",
            "postId": 13,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Faraway event",
            "post_body": "This event is happening far away, but you can join us online.",
            "lat": 34.0522,
            "long": -118.2437,
            "createdAt": "2024-11-14T12:17:37.129Z",
            "__v": 0
        },
        {
            "_id": "6735ea6dfa19609e9dec3343",
            "postId": 14,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Distant event",
            "post_body": "We have an event across the country. Stay tuned for more!",
            "lat": 51.5074,
            "long": -0.1278,
            "createdAt": "2024-11-14T12:17:49.342Z",
            "__v": 0
        },
        {
            "_id": "6735ea75fa19609e9dec3347",
            "postId": 15,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Travel opportunity",
            "post_body": "Traveling to a distant place for a retreat.",
            "lat": 48.8566,
            "long": 2.3522,
            "createdAt": "2024-11-14T12:17:57.376Z",
            "__v": 0
        },
        {
            "_id": "6735ea7efa19609e9dec334b",
            "postId": 16,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Faraway opportunity",
            "post_body": "An opportunity awaits you in another city.",
            "lat": 39.9042,
            "long": 116.4074,
            "createdAt": "2024-11-14T12:18:06.706Z",
            "__v": 0
        },
        {
            "_id": "6735ea8cfa19609e9dec334f",
            "postId": 17,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Out of town event",
            "post_body": "Join our out-of-town event!",
            "lat": 35.6895,
            "long": 139.6917,
            "createdAt": "2024-11-14T12:18:20.641Z",
            "__v": 0
        },
        {
            "_id": "6735ea96fa19609e9dec3353",
            "postId": 18,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Global event",
            "post_body": "An international conference, don't miss out!",
            "lat": 34.0522,
            "long": -118.2437,
            "createdAt": "2024-11-14T12:18:30.323Z",
            "__v": 0
        },
        {
            "_id": "6735ea9ffa19609e9dec3357",
            "postId": 19,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Event in another state",
            "post_body": "We're hosting an event in a different state.",
            "lat": 37.7749,
            "long": -122.4194,
            "createdAt": "2024-11-14T12:18:39.267Z",
            "__v": 0
        },
        {
            "_id": "6735ec10bb10cb88e61757df",
            "postId": 23,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Event in another state",
            "post_body": "We're hosting an event in a different state.",
            "lat": 0,
            "long": 0,
            "createdAt": "2024-11-14T12:24:48.504Z",
            "__v": 0
        },
        {
            "_id": "6735ec4e3e5db5de9f0f78bd",
            "postId": 24,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Event in another state",
            "post_body": "We're hosting an event in a different state.",
            "lat": 0,
            "long": 0,
            "createdAt": "2024-11-14T12:25:50.131Z",
            "__v": 0
        },
        {
            "_id": "6735ec81193510a7d5150792",
            "postId": 27,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Event in another state",
            "post_body": "We're hosting an event in a different state.",
            "lat": 37.7749,
            "long": -122.4194,
            "createdAt": "2024-11-14T12:26:41.728Z",
            "__v": 0
        }
    ]
}
```
**3:) Edit Post** 
```
PUT http://localhost:5000/api/post/edit
```
```
request body
{

  "postId": 28,
     "title": "Edited Post",
    "post_body": "Edited post",
    "lat": 35.6895,
    "long": 139.6917
}
response
{
    "msg": "Post updated successfully",
    "post": {
        "_id": "6735fd2983f9ca96cdc851fd",
        "postId": 28,
        "userId": "6735fcc883f9ca96cdc851f6",
        "username": "testuser22",
        "title": "Edited Post",
        "post_body": "Edited post",
        "lat": 35.6895,
        "long": 139.6917,
        "createdAt": "2024-11-14T13:37:45.895Z",
        "__v": 0
    }
}
```
**4:) Fetch Post by Nearby**
```
GET http://localhost:5000/api/post/fetch/all?lat=YOUR_LAT&long=YOUR_LONG&radius=5000 5km
```
```
{
    "posts": [
        {
            "_id": "6735fd2983f9ca96cdc851fd",
            "postId": 28,
            "userId": "6735fcc883f9ca96cdc851f6",
            "username": "testuser22",
            "title": "Edited Post",
            "post_body": "Edited post",
            "lat": 35.6895,
            "long": 139.6917,
            "createdAt": "2024-11-14T13:37:45.895Z"
        },
        {
            "_id": "6735ea8cfa19609e9dec334f",
            "postId": 17,
            "userId": "6735d249c0e2969c9e414431",
            "username": "testuser2",
            "title": "Out of town event",
            "post_body": "Join our out-of-town event!",
            "lat": 35.6895,
            "long": 139.6917,
            "createdAt": "2024-11-14T12:18:20.641Z"
        }
    ]
}
```
