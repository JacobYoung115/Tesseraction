AFRAME.registerComponent('camera_focus', {
    init: function() {
        let el = this.el;
        console.log(this);

        var pos = el.getAttribute('position');
        console.log(pos);
        this.el.addEventListener('click', el.getAttribute('position'));
    },
    remove: function() {
        this.el.removeEventListener('click', this.el.getAttribute('position'));
    }
})