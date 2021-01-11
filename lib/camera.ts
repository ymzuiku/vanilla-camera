const iOS = ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0;
const isMediaStreamAPISupported = navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices;
let noCameraPermission = false;

export function startCapture(video: HTMLVideoElement, constraints: any, onError: Function) {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
      // video.playsInline = true;
      video.setAttribute("playsinline", "true");
      video.controls = true;
      setTimeout(() => {
        video.controls = false;
      });
    })
    .catch(function (err) {
      console.log("Error occurred ", err);
      onError(err);
    });
}

export function startCamera(video: HTMLVideoElement, onError: Function) {
  if (isMediaStreamAPISupported) {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        const device = devices.filter(function (device) {
          // const deviceLabel = device.label.split(",")[1];
          if (device.kind == "videoinput") {
            return device;
          }
        });

        let constraints;
        if (device.length > 1) {
          constraints = {
            video: {
              mandatory: {
                sourceId: device[device.length - 1].deviceId ? device[device.length - 1].deviceId : null,
              },
            },
            audio: false,
          } as any;

          if (iOS) {
            constraints.video.facingMode = "environment";
          }
          startCapture(video, constraints, onError);
        } else if (device.length) {
          constraints = {
            video: {
              mandatory: {
                sourceId: device[0].deviceId ? device[0].deviceId : null,
              },
            },
            audio: false,
          } as any;

          if (iOS) {
            constraints.video.facingMode = "environment";
          }

          if (!constraints.video.mandatory.sourceId && !iOS) {
            startCapture(video, { video: true }, onError);
          } else {
            startCapture(video, constraints, onError);
          }
        } else {
          startCapture(video, { video: true }, onError);
        }
      })
      .catch(function (error) {
        console.error("Error occurred : ", error);
      });
  }
}
