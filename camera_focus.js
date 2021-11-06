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
            }, 3000)

            cursorElement.setAttribute('animation', 'property: scale; from: 1 1 1; to: 5 5 5; dur: 3000')

            const cameraElement = document.querySelector('#rig');
            cameraElement.addEventListener('positionChanged',
              function timeoutCancelerListener() {
                  clearTimeout(movingTimeout);
                  cameraElement.removeEventListener('positionChanged', timeoutCancelerListener);
                  cursorElement.setAttribute('animation', 'property:scale; from: 5 5 5; to: 1 1 1; dur: 0');
              });
        })
    },
    remove: function() {
        this.el.removeEventListener('click', this.el.getAttribute('position'));
    }
})
