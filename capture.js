(function () {
    var width = 320;
    var height = 0;

    var streaming = false;

    var video = null;
    var canvas = null;
    var snap = null;
    var capturebtn = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        snap = document.getElementById('snap');
        capturebtn = document.getElementById('capturebtn');

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });
        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        capturebtn.addEventListener('click', function (ev) {
            takesnap();
            ev.preventDefault();
        }, false);

        clearsnap();

    }) ();
    function clearsnap() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        snap.setAttribute('src', data);
    }
    function takesnap() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            snap.setAttribute('src', data);
        } else {
            clearsnap();
        }
    }