AFRAME.registerComponent('camera_focus', {
    init: function() {
        this.el.addEventListener('raycaster-intersected', function(evt) {
            let targetElement = evt.target;
            if (targetElement.id !== 'robot') {
                return ;
            }

            let cameraElement = evt.target.sceneEl.camera.el;
            cameraElement.object3D.position.set(8.18, 1.47, 1.6);
        })
    },
    remove: function() {
        this.el.removeEventListener('click', this.el.getAttribute('position'));
    }
})
