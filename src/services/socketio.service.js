import { io } from 'socket.io-client';

class SocketioService {
  socket;

  bands;

  setupSocketConnection() {
    this.socket = io('http://localhost:8080');

    this.socket.on('currentBands', (data) => {
      console.log('cambio la data');
      this.bands = data;
    });
    return this.bands;
  }

  getBand() {
    return this.bands;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
