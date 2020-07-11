class AssetManager {
    constructor(callback) {
        this.queue = [];
        this.successCount = 0;
        this.results = {};
        this.callback = callback;
    }

    loadAll() {
        let that = this;
        for (let x of this.queue) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", x.url);
            xhr.responseType = (x.type === "img") ? "blob" : ((x.type === "audio") ? "arraybuffer" : "text");
            xhr.send();
            xhr.onload = function () {
                that.results[x.name] = xhr.response;
                that.successCount++;
                if (that.isDone()) {
                    that.callback();
                }
            }
        }
    }

    queueItems(arr) { // array of file objects
        for (let x of arr) {
            if (!this.queue.includes(x)) 
                this.queue.push(x);
        }
    }

    isDone() {
        return(this.queue.length == this.successCount);
    }

    getAsset(name) {
        return this.results[name]
    }
}

class FileInfo {
    constructor(name, url, type) {
        this.name = name;
        this.url = url;
        this.type = type;
    }
}