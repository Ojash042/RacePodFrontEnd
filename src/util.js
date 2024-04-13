export function getLocalIP(){
    return new Promise((resolve, reject) => {
        const rtcPeerConnection = new RTCPeerConnection({ iceServers: [] });
        rtcPeerConnection.createDataChannel('');
        rtcPeerConnection.createOffer()
            .then(offer => rtcPeerConnection.setLocalDescription(offer))
            .catch(error => reject(error));
        rtcPeerConnection.onicecandidate = iceEvent => {
            if (iceEvent && iceEvent.candidate && iceEvent.candidate.candidate) {
                const ipAddress = iceEvent.candidate.candidate.split(' ')[4];
                resolve(ipAddress);
            }
        };
    });
}