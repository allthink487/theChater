http = require('http')

//mysql = require('mysql2')

cors = require('cors')

express = require('express')

app = express()

server = http.createServer(app)

/*connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydatabase'
})*/

function createdb(){
sql = `CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    msg VARCHAR(255),
    cretedAt DATE
)`
}

app.use(cors());

/*app.get('/lastmsg',(req,res)=>{
    sql = `SELECT msg FROM message LIMIT 2`
    connection.query(sql,(err,result)=>{
        if(err) throw err
        res.json(result)
    })
})*/

server.listen(8080,()=>{console.log("Server en ecoute...")})

const oi = require('socket.io')

const io = new oi.Server(server,{cors: {
    origin: "*", // Remplacez par l'URL de votre frontend
    methods: ["GET", "POST","UPDATE","PUT"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
    }})

io.on('connection',(socket)=> {
    console.log("Un utilisateur s'est connecte")
    socket.on('chat_msg',(message)=>{
        io.sockets.emit('chat_send',message)
        /*sql = `INSERT INTO message (msg) VALUES (?)`
        connection.query(sql,[message.msg],(err,result)=>{
            if(err){
            console.log(err)
        }})*/
        
    })
})

