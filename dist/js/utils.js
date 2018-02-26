var Utils = (function() {
    // http://mrdoob.com/
    var Cache = {
        enabled: true,
        files: {},
        add: function(key, file) {
            if (this.enabled === false) return;
            this.files[key] = file;
        },
        get: function(key) {
            if (this.enabled === false) return;
            return this.files[key];
        },
        remove: function(key) {
            delete this.files[key];
        },
        clear: function() {
            this.files = {};
        }
    };

    function ImageLoader(manager) {}

    Object.assign(ImageLoader.prototype, {
        crossOrigin: 'Anonymous',
        load: function(url, onLoad, onProgress, onError) {
            if (url === undefined) {
                url = '';
            }
            if (this.path !== undefined) {
              url = this.path + url;
            }

            var scope = this;
            var cached = Cache.get(url);
            if (cached !== undefined) {
                setTimeout(function() {
                    if (onLoad) {
                        onLoad(cached);
                    }
                }, 0);
                return cached;
            }

            var image = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
            image.addEventListener('load', function() {
                Cache.add(url, this);
                if (onLoad) {
                  onLoad(this);
                }
            }, false);
            image.addEventListener('error', function(event) {
                if (onError) {
                  onError(event);
                }
            }, false);
            if (url.substr(0, 5) !== 'data:') {
                if (this.crossOrigin !== undefined) {
                  image.crossOrigin = this.crossOrigin;
                }
            }
            image.src = url;
            return image;
        },
        setCrossOrigin: function(value) {
            this.crossOrigin = value;
            return this;
        },
        setPath: function(value) {
            this.path = value;
            return this;
        }
    });

    return {
        'Cache': Cache,
        'ImageLoader': ImageLoader,
    }
})();