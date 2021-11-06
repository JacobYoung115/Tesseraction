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

            let cameraElement = document.querySelector('#rig');

            let camPos = objectToPos(cameraElement.getAttribute('position'))
            console.log(camPos);
            let targetPos = "7.18 0 1.5";
            console.log(targetPos);

            cameraElement.setAttribute('animation', `property:position; from: ${camPos}; to: ${targetPos}; dur:701`)
        })
    },
    remove: function() {
        this.el.removeEventListener('click', this.el.getAttribute('position'));
    }
})
