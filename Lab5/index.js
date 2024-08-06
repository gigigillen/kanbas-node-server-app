
const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};

let todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
];

//module object
const module = { id: "1", name: "Learning HTML", description: "Learning the basics of html", course: "CS1000" };


const Lab5 = (app) => {

    app.get("/lab5/welcome", (req, res) => {
        res.send("Wecome to Lab 5");
    })

    //retrieving module object
    app.get("/Lab5/module", (req, res) => {
        res.json(module);
    });

    //retrieving module name
    app.get("/Lab5/module/name", (req, res) => {
        res.json(module.name);
    });

    //updating the module name
    app.get("/Lab5/module/:name", (req, res) => {
        const { name } = req.params;
        module.name = name;
        res.json(module);
    })

    //updating the module description
    app.get("/Lab5/module/update-description/:description", (req, res) => {
        const { description } = req.params;
        module.description = description;
        res.json(module);
    })


    app.get("/Lab5/todos", (req, res) => {
        res.json(todos);
    });
    // don't know how to use POST yet
    //I THINK IT HAS TO BE UP HERE???
    app.get("/Lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    });

    //post method, clients job to handle the behavior of the new object
    app.post("/lab5/todos", (req, res) => {
        //extract body of all the todos
        const newTodo = { ...req.body, id: new Date().getTime() };
        //push new todo
        todos.push(newTodo);
        res.json(newTodo);
    });


    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });

    //filter completed todos
    app.get("/Lab5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter(
                (t) => t.completed === completedBool);
            res.json(completedTodos);
            return;
        }
        res.json(todos);
    });


    // deleting
    app.get("/Lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1);
        }
        res.json(todos);
    });

    app.delete("/Lab5/todos/:id", (req, res) => {
        //retrive id
        const { id } = req.params;
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        //find the id you want to delete
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        //cut the array at the intended index
        todos.splice(todoIndex, 1);
        //sending browser success code 200
        res.sendStatus(200);
    });



    //updating the title
    app.get("/Lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    //MANIPULATING TODOS
    app.put("/Lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        //ERROR MESSAGE
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        //applying changes through map by singling out only the todo with the appropriate id
        todos = todos.map((t) => {
            //if the current todo's id matches with the param provided id
            if (t.id === parseInt(id)) {
                //merge between old todo and new todo
                return { ...t, ...req.body };
            }
            //then return the todo
            return t;
        });
        res.sendStatus(200);
    });


    //updating compeltion
    app.get("/Lab5/todos/:id/completed/:completion", (req, res) => {
        const { id, completion } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.completed = completion
        res.json(todo);
    });

    //updating description
    app.get("/Lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todo);
    })



    app.get("/Lab5", (req, res) => {
        res.send("Welcome to Assignment 5")
    });


    app.get("/Lab5/add/:a/:b", (req, res) => {
        const a = parseInt(req.params.a);
        const b = parseInt(req.params.b);

        // res.send(`The sum of ${a} and ${b} is ${a+b}`);
        const sum = a + b;
        res.send(sum.toString());
    })

    app.get("/Lab5/subtract/:a/:b", (req, res) => {
        const a = parseInt(req.params.a);
        const b = parseInt(req.params.b);
        const sum = a - b;
        res.send(sum.toString());
    })

    app.get("/Lab5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            case "multiply":
                result = parseInt(a) * parseInt(b);
                break;
            case "divide":
                result = parseInt(a) / parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });

    app.get("/Lab5/assignment", (req, res) => {
        res.json(assignment);
    })

    app.get("/Lab5/assignment/title", (req, res) => {
        //retriving the title from the json object
        res.json(assignment.title);
    });

    app.get("/Lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    app.get("/Lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });

    app.get('/Lab5/assignment/completed/:completion', (req, res) => {
        const { completion } = req.params;
        assignment.completed = completion;
        res.json(assignment);
    })


};
export default Lab5;