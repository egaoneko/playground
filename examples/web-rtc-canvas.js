import Box from './utils/box';

const container = document.querySelector("#container");

document.querySelector("#local").addEventListener("click", startLocal);
document.querySelector("#remote").addEventListener("click", startRemote);

function startLocal() {
  removeAllChildren();

  const width = container.clientWidth;
  const height = container.clientHeight;
  const canvas = document.createElement("canvas");

  new Box(canvas, {
    width,
    height,
    ratio: window.devicePixelRatio,
    images: [
      'data/img/iu/iu01.jpg',
      'data/img/iu/iu02.jpg',
      'data/img/iu/iu03.jpg',
      'data/img/iu/iu04.jpg',
      'data/img/iu/iu05.jpg',
      'data/img/iu/iu06.jpg',
    ]
  });
  
  container.appendChild(canvas);

  new LocalConnection(canvas);
}

function startRemote() {
  removeAllChildren();
  const video = document.createElement("video");
  container.appendChild(video);

  video.muted = true;
  video.autoplay = true;
  container.appendChild(video);

  video.addEventListener("loadedmetadata", function() {
    console.log(
      `Remote video videoWidth: ${this.videoWidth}px, videoHeight: ${this.videoHeight}px`
    );
  });

  new RemoteConnection(video);
}

function removeAllChildren() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

const PC_CONFIG = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    },
    {
      urls: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com"
    }
  ]
};

class LocalConnection {
  constructor(canvas, config = PC_CONFIG) {
    const pc = new RTCPeerConnection(config);
    this.pc = pc;
    this.canvas = canvas;

    const stream = canvas.captureStream();
    this.stream = stream;
    canvas.srcObject = stream;
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length > 0) {
      console.log(`Using video device: ${videoTracks[0].label}`);
    }
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    this.init();
  }

  init() {
    const pc = this.pc;

    removeItem("web-rtc-local-candidate");
    removeItem("web-rtc-local-description");
    removeItem("web-rtc-remote-candidate");
    removeItem("web-rtc-remote-description");

    pc.addEventListener("icecandidate", e => {
      const candidate = e.candidate;
      console.log("local candidate", candidate);

      if (!candidate) {
        return;
      }

      setItem("web-rtc-local-candidate", {
        candidate: candidate.candidate,
        sdpMid: candidate.sdpMid,
        sdpMLineIndex: candidate.sdpMLineIndex,
        foundation: candidate.foundation,
        component: candidate.component,
        priority: candidate.priority,
        protocol: candidate.protocol,
        port: candidate.port,
        type: candidate.type,
        tcpType: candidate.tcpType,
        relatedAddress: candidate.relatedAddress,
        relatedPort: candidate.relatedPort,
        usernameFragment: candidate.usernameFragment
      });
    });

    pc.addEventListener("iceconnectionstatechange", e =>
      onIceStateChange(pc, e)
    );

    const candidate = getItem("web-rtc-remote-candidate");
    if (candidate) {
      this.addIceCandidate(this.pc, candidate);
    } else {
      onItemChange("web-rtc-remote-candidate", candidate =>
        addIceCandidate(this.pc, candidate)
      );
    }

    pc.createOffer({
      // offerToReceiveAudio: true,
      offerToReceiveVideo: true
    })
      .then(offer => {
        setItem("web-rtc-local-description", {
          type: offer.type,
          sdp: offer.sdp
        });
        pc.setLocalDescription(offer);

        onItemChange("web-rtc-remote-description", remoteDescription => {
          console.log("remote description", remoteDescription);

          if (!remoteDescription) {
            return;
          }

          pc.setRemoteDescription(remoteDescription);
        });

        console.log("Added local stream");
      })
      .catch(e => {
        console.log(e);
        this.close();
      });
  }

  close() {
    this.stream.getTracks().forEach(track => track.stop());
    removeItem("web-rtc-local-candidate");
    removeItem("web-rtc-local-description");
    return this.pc.close();
  }
}

class RemoteConnection {
  constructor(video, config = PC_CONFIG) {
    this.pc = new RTCPeerConnection(config);
    this.video = video;
    this.init();
  }

  init() {
    const pc = this.pc;

    removeItem("web-rtc-remote-candidate");
    removeItem("web-rtc-remote-description");
    pc.addEventListener("icecandidate", e => {
      const candidate = e.candidate;
      console.log("remote candidate", candidate);

      if (!candidate) {
        return;
      }

      setItem("web-rtc-remote-candidate", {
        candidate: candidate.candidate,
        sdpMid: candidate.sdpMid,
        sdpMLineIndex: candidate.sdpMLineIndex,
        foundation: candidate.foundation,
        component: candidate.component,
        priority: candidate.priority,
        protocol: candidate.protocol,
        port: candidate.port,
        type: candidate.type,
        tcpType: candidate.tcpType,
        relatedAddress: candidate.relatedAddress,
        relatedPort: candidate.relatedPort,
        usernameFragment: candidate.usernameFragment
      });
    });
    pc.addEventListener("iceconnectionstatechange", e =>
      onIceStateChange(pc, e)
    );
    pc.addEventListener("track", e => this.gotRemoteStream(e));

    const candidate = getItem("web-rtc-local-candidate");
    if (candidate) {
      addIceCandidate(this.pc, candidate);
    } else {
      onItemChange("web-rtc-local-candidate", candidate =>
        addIceCandidate(this.pc, candidate)
      );
    }

    const localDescription = getItem("web-rtc-local-description");

    if (localDescription) {
      this.setDescription(localDescription);
    } else {
      onItemChange.on("web-rtc-local-description", localDescription =>
        this.setDescription(localDescription)
      );
    }
  }

  setDescription(localDescription) {
    const pc = this.pc;
    const video = this.video;

    console.log("local description", localDescription);

    if (!localDescription) {
      return;
    }

    pc.setRemoteDescription(localDescription)
      .then(() => pc.createAnswer())
      .then(answer => {
        pc.setLocalDescription(answer);
        setItem("web-rtc-remote-description", {
          type: answer.type,
          sdp: answer.sdp
        });
        video.srcObject = new MediaStream(
          pc.getReceivers().map(receiver => receiver.track)
        );
        console.log("Added remote stream");
      })
      .catch(e => {
        console.log(e);
        this.close();
      });
  }

  gotRemoteStream(e) {
    if (this.video.srcObject !== e.streams[0]) {
      this.video.srcObject = e.streams[0];
      console.log("received remote stream");
    }
  }

  close() {
    this.video.srcObject = null;
    removeItem("web-rtc-remote-candidate");
    removeItem("web-rtc-remote-description");
    return this.pc.close();
  }
}

function addIceCandidate(pc, candidate) {
  console.log("candidate", candidate);

  pc.addIceCandidate(new RTCIceCandidate(candidate))
    .then(() => {
      console.log(
        `ICE candidate:\n${candidate ? candidate.candidate : "(null)"}`
      );
    })
    .catch(e => console.log(e));
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log(`ICE state: ${pc.iceConnectionState}`);
    console.log("ICE state change event: ", event);
  }
}

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

const listeners = {};
window.addEventListener("storage", e => {
  console.log(e);
  const callback = listeners[e.key];
  if (!callback) {
    return;
  }
  callback(JSON.parse(e.newValue));
});

function onItemChange(key, callback) {
  listeners[key] = callback;
}
