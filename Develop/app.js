const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// CREATING EMPTY ARRAY FOR EMPLOYEES AND IDs TO POPULATE
const employees = [];

// FUNCTION FOR INITILIAIZING APP
function init() {
    //FUNCTION TO BEGIN PROGRAM AND ASK MANAGER QUESTIONS
    function managerQuestions (){
        console.log("Let's build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                //VALIDATION FOR NAME
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your manager's id number?",
                //VALIDATION FOR ID
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter a valid id number.";
                }    
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your manager's office number?",
                //VALIDATION FOR OFFICE NUMBER
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter a valid office number.";
                }    
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                //VALIDATION FOR EMAIL
                validate: answer => {
                    const pass = answer.match(
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                    );
                    if(pass) {
                        return true;
                    }
                    return "Please enter a valid email address."
                }
            }
        ]).then(data => {
            let employee = new Manager(data.managerName, data.managerID, data.managerEmail, data.officeNumber,);
            employees.push(employee);
            selectMember();
        });
    }

    //FUNCTION TO SELECT TEAM MEMBER
    function selectMember() {
        inquirer.prompt([
            {
                type: "list",
                name: "chooseMember",
                message: "What type of employee would you like to add?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members."
                ],
            }
        ]).then(data => {
            switch(data.chooseMember) {
                case "Engineer":
                    engineerQuestions();
                    break;
                case "Intern":
                    internQuestions();
                    break;
                default:
                    createTeam()
            }
        });
    }

    //FUNCTION TO ASK ENGINEER QUESTIONS
    function engineerQuestions() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                //VALIDATION FOR NAME
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is your engineer's id number?",
                //VALIDATION FOR ID
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter a valid id number.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                //VALIDATION FOR EMAIL
                validate: answer => {
                    const pass = answer.match(
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                    );
                    if(pass) {
                        return true;
                    }
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's GitHub username?",
                //VALIDATION FOR GITHUB USERNAME
                validate: answer => {
                    if(answer !== '') {
                        return true
                    }
                    return 'Please enter at least one character.';
                }
            }
        ]).then(data => {
            let employee = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.engineerGithub);
            employees.push(employee);
            selectMember();
        });
    }

    //FUNCTION TO ASK INTERN QUESTIONS
    function internQuestions() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                //VALIDATION FOR NAME
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter a valid name."
                }
            },
            {
                type: "input",
                name: "internID",
                message: "What is your intern's id number?",
                //VALIDATION FOR ID
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter a valid id number.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                //VALIDATION FOR EMAIL
                validate: answer => {
                    const pass = answer.match(
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                    );
                    if(pass) {
                        return true;
                    }
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the name of the school your intern is attending?",
                //VALIDATION FOR INTERN SCHOOL
                validate: answer => {
                    if(answer !== '') {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            }
        ]).then(data => {
            let employee = new Intern(data.internName, data.internID, data.internEmail, data.internSchool);
            employees.push(employee);
            selectMember();
        });
    }

    //FUNCTION TO CREATE TEAM
    function createTeam() {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employees), "UTF-8")
        console.log("Your team has been created!");
    }

    managerQuestions();
}

init()

