# Documentation of the front end
## App.js file
This is the main file, in this project it is used as the router for the pages, here we have only two pages, the login page, and the main page.

## Login.jsx file
This is the login file, it asks for the email and the password of the user, after being submitted it sends them to the backend to authenticate them. If the response is returned false, the website will display a message saying that the credentials are wrong. If the response is returned true, then the user will be sent to the main page. <br>
Also the username will be saved into the session storage, it would have been better to use a token but because this was an MVP project we opted for the simpler solution so we can save on time as we were pressed. <br>
The saved username is used to assure that there is someone logged in, we use it in case the user decides to write the url of a page that needs them to be logged in, if they are not logged in then they are sent back to the login.

## Main.jsx file
In this file, we use it to route between the pages, we chose to do it this way instead of actually having them in different pages because if they were different pages then the website would reload every time, instead of just changing the small part that is the section, because the layout never changes.
It also sends a fetch request to get the information about the logged in user, and then sends this information to the pages that need it.

## Layout.jsx file
This file is used as the layout, viewing that every page will have the same layout and sidebar, we opted to make it a component and include the other components into it, it has the buttons on the sidebar so we can navigate through pages and a logout button.

## Dashboard.jsx file
This is where the user can see all the processes that are assigned to them, currently there was a problem with receiving the information from the backend, not sure if it is a problem with the backend logic or the frontend request. The function progress and the other associated functions are mainly used to just check how many stages are complete so we can show a progress bar, those functions are purely for the UI to show the progress bar. <br>
This page also includes a button to add a process, every staff is able to add a process.

## Staff.jsx & Patients.jsx files
These files are practically the same, they show the entirety of the staff and patients in the system. <br>
For the patients page, any staff member can add a patient, there is a button called add patient and they are introduced to a form where they just need to fill up the information of the patient and then it is sent to the database. <br>
For the staff page, only staff who have admin privilages will get to see in their UI a button that says add staff, when they click it they get introduced to a form where also they just need to fill the information of the doctor, for now the doctor who adds the account puts the user password, and also gets to decide if the new staff will be admin or not.

## AddProcess.jsx file
This is the page we see when we click on the button add process in the page Dashboard.jsx, we get to fill the form, to add stages we click on add stage and it pops a window that also shows a small form, we can add as many stages as we want and they will be added to that process. <br>
The submission does not work, I am not sure if it is the backend or the frontend that is the problem, but also the program to send them in the frontend is quite over complicated and could have been simpler but due to how the structure of the database is made, we did not see any other way, and we had to do it this way as there was no time to change because we were late. <br>
A success message will show or an error message will show depending if the fetch request worked or not. <br>

## AddStaff.jsx & AddPatient.jsx files
These files are also practically the same, once clicked on their respective buttons in their respective pages, a new page with a form will show, and then after clicking on the submit button it will send the data to the database. <br>
A success message will show or an error message will show depending if the fetch request worked or not. <br>
During testing those two pages worked perfectly.
