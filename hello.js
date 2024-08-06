

export default function Hello(app) {
    app.get('/hello', (req, res) => {
        res.send("Life is Good");
    });

    //default
    app.get("/", (req, res) => {
        res.send("Welcome to webdev")
    })
}