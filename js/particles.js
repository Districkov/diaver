// ===== PARTICLES AS FULL BACKGROUND =====
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 60, // Оптимальное количество
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#6366f1"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.3, // Прозрачнее чтобы не мешал контенту
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2, // Меньше размер
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 120, // Ближе связи
                color: "#6366f1",
                opacity: 0.5, // Еще прозрачнее
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5, // Медленнее
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 80, // Меньшая дистанция
                    duration: 0.4
                },
                push: {
                    particles_nb: 3
                }
            }
        },
        retina_detect: true
    });
}

// Handle resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }, 250);
});

// Initialize particles
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
});