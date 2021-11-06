AFRAME.registerComponent('camera_focus', {
    init: function() {
        this.el.addEventListener('raycaster-intersected', function(evt) {
            var worldPos = new THREE.Vector3();
            worldPos.setFromMatrixPosition(evt.target.object3D.matrixWorld);
            console.log(worldPos);
            console.log(evt.target.object3D.position);

            let cameraPos = document.querySelector('#camera').getAttribute('position');
            console.log(cameraPos);
        })
    },
    remove: function() {
        this.el.removeEventListener('click', this.el.getAttribute('position'));
    }
})
