const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname,"./views")))
const viewPath = path.join(__dirname, "./views");
app.set('view engine', 'ejs');
app.set('views', viewPath);

app.get("/index",async(req,res)=>{
    res.render("index");
})

let tasks = [
    { id: 1, name: 'Mango', priority: 1 , color:'yellow' },
    { id: 2, name: 'Grapes', priority: 2 , color:'green' },
    { id: 3, name: 'Strawbeeries', priority: 3 , color:'pink' },
    { id: 4, name: 'Apple', priority: 4 , color:'#FF0000' },
    { id: 5, name: 'Orange', priority: 5 , color:'#FFC96F' },
    { id: 6, name: 'Avocados', priority: 6 , color:'#ACD793' },
    { id: 7, name: 'Mangosteen', priority: 7 , color:'#D2649A' },
];



// ========================= socket.io ==========================================

io.on('connection', (socket) => {
    
    socket.emit('displayItems', tasks);
    
    socket.on('changePriority', (updatedTasks) => {
        socket.broadcast.emit('displayItems', updatedTasks);
    });
    
    socket.on('disconnect', () => {
    });
    
});

server.listen(3520, () => {
    console.log('Server is running on http://localhost:3520/index');
});