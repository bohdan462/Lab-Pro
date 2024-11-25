/**
 * @description Renders an ASCII animation of a spinning donut
 * @returns {void}
 */
(function () {
    var preTag = document.getElementById('donut');

    var A = 1;
    var B = 1;

    var intervalId = null;
    var observer = null; 

    /**
     * @description Renders a single frame of the ASCII animation
     * @returns {void}
     */
    function renderAsciiFrame() {
        var b = [];
        var z = [];

        var width = 270;
        var height = 150;

        A += 0.07;
        B += 0.03;

        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        for (var k = 0; k < width * height; k++) {
            b[k] = k % width == width - 1 ? '\n' : ' ';
            z[k] = 0;
        }

        for (var j = 0; j < 6.28; j += 0.07) {
            var ct = Math.cos(j);
            var st = Math.sin(j);

            for (var i = 0; i < 6.28; i += 0.02) {
                var sp = Math.sin(i);
                var cp = Math.cos(i);
                var h = ct + 2;
                var D = 1 / (sp * h * sA + st * cA + 5);
                var t = sp * h * cA - st * sA;

                var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

                var o = x + width * y;

                var N = Math.floor(
                    8 *
                        ((st * sA - sp * ct * cA) * cB -
                            sp * ct * sA -
                            st * cA -
                            cp * ct * sB)
                );

                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;

                    var ch = '.,-~0=!*0#$@'[N > 0 ? N : 0];

                    if (ch === '0') {
                        b[o] = '<span style="color:blue;">' + ch + '</span>';
                    } else if (ch === '!') {
                        b[o] = '<span style="color:yellow;">' + ch + '</span>';
                    } else if (ch === '=') {
                        b[o] = '<span style="color:yellow;">' + ch + '</span>';
                    } else {
                        b[o] = ch;
                    }
                }
            }
        }

        var html = '';
        for (var i = 0; i < height; i++) {
            html += b.slice(i * width, (i + 1) * width).join('') + '\n';
        }

        preTag.innerHTML = html;

     
        b.length = 0;
        z.length = 0;
    }

    /**
     * @description Starts the ASCII animation
     * @returns {void}
     */
    function startAsciiAnimation() {
        if (!intervalId) {
            intervalId = setInterval(renderAsciiFrame, 50);
        }
    }

    /**
     * @description Stops the ASCII animation and releases memory
     * @returns {void}
     */
    function stopAsciiAnimation() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        preTag.innerHTML = '';
    }
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startAsciiAnimation();
                } else {
                    stopAsciiAnimation();
                }
            });
        },
        { threshold: 0.1 } 
    );

    observer.observe(preTag);

    window.addEventListener('resize', renderAsciiFrame);

    window.addEventListener('unload', () => {
        stopAsciiAnimation();
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    });
})();
