const controller = {
    keys: {
        'ArrowUp': -1,
        'ArrowRight': Math.PI / 15,
        'ArrowLeft': -Math.PI / 15,
        ' ': 1,
    },
    activeKeys: [],
    init() {
        document.addEventListener('keydown', (e) => {
            if (Object.keys(this.keys).includes(e.key) && !this.activeKeys.includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
                this.activeKeys.push(e.key);
            }
        })
        document.addEventListener('keyup', (e) => {
            if (this.activeKeys.includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
                const i = this.activeKeys.indexOf(e.key);
                this.activeKeys.splice(i, 1);
            }
        })
    }
}
export default controller;