(function () {
    const preTag = document.getElementById('donut');
    let A = 1;
    let B = 1;
    let intervalId = null;
    let observer = null;
    const width = 270;
    const height = 150;
    const b = Array(width * height).fill(' ');
    const z = Array(width * height).fill(0);

    const colorMapping = {
        '0': '<span style="color:blue;">0</span>',
        '!': '<span style="color:yellow;">!</span>',
        '=': '<span style="color:yellow;">=</span>',
    };

    function renderAsciiFrame() {
        A += 0.07;
        B += 0.03;

        const cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        b.fill(' ');
        z.fill(0);

        for (let j = 0; j < 6.28; j += 0.07) {
            const ct = Math.cos(j);
            const st = Math.sin(j);

            for (let i = 0; i < 6.28; i += 0.02) {
                const sp = Math.sin(i);
                const cp = Math.cos(i);
                const h = ct + 2;
                const D = 1 / (sp * h * sA + st * cA + 5);
                const t = sp * h * cA - st * sA;

                const x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                const y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));
                const o = x + width * y;

                const N = Math.floor(
                    8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB)
                );

                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    const ch = '.,-~0=!*0#$@'[N > 0 ? N : 0];
                    b[o] = colorMapping[ch] || ch;
                }
            }
        }

        const html = Array.from({ length: height }, (_, i) =>
            b.slice(i * width, (i + 1) * width).join('')
        ).join('\n');

        preTag.innerHTML = html;
    }

    function startAsciiAnimation() {
        if (!intervalId) {
            intervalId = setInterval(renderAsciiFrame, 100); 
        }
    }

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

    window.addEventListener(
        'resize',
        debounce(() => {
            renderAsciiFrame();
        }, 200)
    );

    window.addEventListener('beforeunload', () => {
        stopAsciiAnimation();
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    });

    function debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }
})();
