require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

// Socket.io auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Unauthorized'));
  try {
    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  const user = socket.user;
  console.log(`[Socket] ${user.name} connected`);

  // Join personal room for notifications
  socket.join(`user:${user.id}`);

  // Join channel rooms
  socket.on('join:channel', (channelId) => socket.join(`channel:${channelId}`));
  socket.on('leave:channel', (channelId) => socket.leave(`channel:${channelId}`));

  // Chat messages
  socket.on('message:send', (data) => {
    io.to(`channel:${data.channelId}`).emit('message:new', data);
  });

  // Typing indicator
  socket.on('typing:start', (data) => socket.to(`channel:${data.channelId}`).emit('typing:start', { userId: user.id, name: user.name }));
  socket.on('typing:stop', (data) => socket.to(`channel:${data.channelId}`).emit('typing:stop', { userId: user.id }));

  // Task updates
  socket.on('task:update', (data) => socket.broadcast.emit('task:updated', data));

  socket.on('disconnect', () => {
    console.log(`[Socket] ${user.name} disconnected`);
  });
});

// Export io for use in controllers (notifications)
app.set('io', io);

server.listen(PORT, () => {
  console.log(`[MAVA-OS] Server running on port ${PORT} | env: ${process.env.NODE_ENV}`);
});
