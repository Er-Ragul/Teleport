const { ipcRenderer } = require('electron');
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const { exec } = require('child_process');

let peer
let protect = false

// Set up socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected', socket.id);

  // To check driver is online or not
  socket.on('driver-online', (msg) => {
    ipcRenderer.send('driver-online');
  })

  // Create offer and send to client
  socket.on('offer', (e) => {
    createOffer()
  })

  // Receive answer
  socket.on('answer', (answer) => {
    if(protect == false){
      console.log(answer);
      peer.setRemoteDescription(JSON.parse(answer))
      protect = true
    }
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    ipcRenderer.send('reload-window');

    let timer = setTimeout(() => {
      exec('controller.exe', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      clearTimeout(timer)
    }, 5000)
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
  exec('controller.exe', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

let createOffer = () => {
  peer = new RTCPeerConnection()

  // Get media devices and create data channel & offer
  navigator.mediaDevices.getUserMedia({video: {
      mandatory: {              
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: 'screen:0:0',
          width: { ideal: 1920 }, // Set the maximum width
          height: { ideal: 1080 }, // Set the maximum height
          frameRate: { ideal: 30, max: 60 }, // Set the max FPS
      }
    },
    audio: {
      mandatory: {
          chromeMediaSource: 'desktop'
      }
    }})
    .then((stream) => {
        let channel = peer.createDataChannel('channel')

        channel.onopen = (e) => {
            console.log('Connection Opened');
        }
        
        channel.onmessage = (e) => {
            console.log(e.data);
            io.emit('message', e.data)
        }

        peer.addStream(stream)
        
        peer.createOffer()
        .then((offer) => {
            peer.setLocalDescription(offer)
        })
        .catch((err) => {
            console.log(err);
        })
        
        peer.onicecandidate = (e) => {
            if(e.candidate){
                let offer = JSON.stringify(peer.localDescription)
                io.emit('offer', offer);
            }
        }
    })
    .catch((err) => console.log(err))
}