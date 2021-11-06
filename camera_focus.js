AFRAME.registerComponent('camera_focus', {
    init: function() {
        this.el.addEventListener('raycaster-intersected', function(evt) {
            let targetElement = evt.target;
            if (targetElement.id !== 'robot') {
                return ;
            }

            let objectToPos = posObject => {
                return posObject.x + " " + posObject.y + " " + posObject.z;
            }

            const cursorElement = document.querySelector('#cursor');


            const movingTimeout = setTimeout(function() {
                let cameraElement = document.querySelector('#rig');

                let camPos = objectToPos(cameraElement.getAttribute('position'))
                let targetPos = "7.18 0 1.5";
                cursorElement.setAttribute('animation', 'property:scale; from: 5 5 5; to: 1 1 1; dur: 0');

                cameraElement.setAttribute('animation', `property:position; from: ${camPos}; to: ${targetPos}; dur:701`);

                setTimeout(() => document.querySelectorAll(".showOnFocus").forEach(e => {
                    const opacityVal = e.classList.contains('faded') ? 0.5: 1;
                    e.setAttribute('animation', `property: opacity; from: 0; to: ${opacityVal}; dur: 1500`);
                }), 800);
            }, 3000)

            cursorElement.setAttribute('animation', 'property: scale; from: 1 1 1; to: 5 5 5; dur: 3000')

            const cameraRig = document.querySelector('#rig');
            const cameraElement = document.querySelector('#camera');

            function timeoutCancelerListener(evt) {
                // if it's still within the boundaries of the object don't cancel
                if (cursorElement.components.raycaster.getIntersection(targetElement)) {
                    return ;
                }

                clearTimeout(movingTimeout);
                cameraRig.removeEventListener('positionChanged', timeoutCancelerListener);
                cameraElement.removeEventListener('rotationChanged', timeoutCancelerListener);
                cursorElement.setAttribute('animation', 'property:scale; from: 5 5 5; to: 1 1 1; dur: 0');
            }
            cameraRig.addEventListener('positionChanged', timeoutCancelerListener);
            cameraElement.addEventListener('rotationChanged', timeoutCancelerListener);
        });

        const cameraRig = document.querySelector("#rig");
        cameraRig.addEventListener('positionChanged', function () {
           document.querySelectorAll('.showOnFocus').forEach(e => {
               if (e.getAttribute('opacity') === "0") {
                   return ;
               }

               e.setAttribute('animation', 'property: opacity; from: 1; to: 0; dur: 0');
           });
        });
    },
    remove: function() {
        this.el.removeEventListener('click', this.el.getAttribute('position'));
    }
})

function play() {
    var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
    audio.play();
  }
