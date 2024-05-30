Create a folder (named buybetter)

Steps to run the Project:

Click on the folder path and type "cmd" to open command prompt.
On the command line Enter "code ." to open "VScode".
Then open 2 terminals in VS code(click ctrl+shift+`) for frontend and backend.
Open one terminal and run "npm init react-app front".
After downloaded run "cd front".
Run "npm install axios" and "npm install react-router-dom sweetalert2".
Then create a folder(named back) in EMS folder.
Open second terminal and run "cd back".
Then run "npm install express body-parser cors multer mysql2 bcrypt dotenv crypto".
Download the project from the private repository and open the zip file.
Copy "the index.js file and the uploads folder" from back folder(on github) and paste it in the back folder(on system).
Then replace "the src and the public" from front folder(on system) with "the src and the public" in the front folder(on github).
Download xampp and run apache and mysql.
Click on mysql admin and create a database "ecommerce".
Goto import select the data.sql from the repository and click import.
Run "npm start" in frontend terminal and "node index.js" in backend terminal.
Working :

Login with HR id and password (id=22 and password=12345). Only ecommerce on hr team can able to login.
After logged in click add to go to the add page. Enter ecommerce details and click submit.
Then Click edit to go to the edit page. Click edit button (Except id all other datas are editable).
To delete click on delete and click yes to conform or no to cancel the delete operation.
The add and edit page is secure. It is not possible to enter those pages without Login.
Note : If there is any doubt to use the EMS project, use EMS.mp4 (video reference).

About :

Title : EMS (ecommerce Management System)
Used to add, update, and delete the ecommerce details.
Languages used: ReactJS(front_end), NodeJS(back_end), and MYSQL(database).
Highly secure. So one person can login at a time in the same id. If two persons try to login at a time. the second person who logged remain logged in and logged out for the first person automatically.
