document.querySelector('.logo')?.addEventListener('click', () => {
    window.location.href = '#section1';
    window.location.reload();
});

const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        const content = faq.querySelector('.faq-content');
        if (content) {
            content.classList.toggle('show');
        }
    });
});

function toggleMenu(forceClose = null) {
    const overlay = document.getElementById('menuOverlay');
    const menuIcon = document.getElementById('menuIcon');

    if (!overlay || !menuIcon) return;

    const isOpen = overlay.classList.contains('active');

    if (forceClose || (forceClose === null && isOpen)) {
        overlay.classList.remove('active');
        overlay.classList.add('closing');
        menuIcon.classList.remove('active');

        setTimeout(() => {
            overlay.classList.remove('closing');
            overlay.style.display = 'none';
        }, 300);
    } else if (!isOpen) {
        overlay.style.display = 'block';
        overlay.classList.add('active');
        menuIcon.classList.add('active');
    }
}

let canCreate = true;

document.addEventListener("mousemove", (e) => {
    if (!canCreate) return;

    const section2 = document.querySelector("#section2");
    if (!section2) return;

    const rect = section2.getBoundingClientRect();
    const isInSection2 =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (!isInSection2) return;

    canCreate = false;

    const image = document.createElement("img");
    image.src = "src/wing.png";
    image.classList.add("dump");
    image.style.position = "fixed";
    image.style.zIndex = "2";
    image.style.top = `${e.clientY - 100}px`;
    image.style.left = `${e.clientX - 100}px`;
    image.style.width = "100px";
    image.style.opacity = "1";
    image.style.transition = "opacity 1s ease, transform 1s ease";
    image.style.pointerEvents = "none";

    document.body.appendChild(image);

    setTimeout(() => {
        image.style.opacity = "0";
        image.style.transform = "scale(1)";
        setTimeout(() => image.remove(), 1000);
    }, 50);

    setTimeout(() => {
        canCreate = true;
    }, 30);
});


function navigateToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMenu(true);
}

function navigateToAngel(angelNumber) {
    const section4 = document.getElementById('section4');
    const targetWrap = document.querySelector('.w' + angelNumber);

    if (section4 && targetWrap) {
        section4.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            const scrollPosition = angelNumber * section4.clientWidth;
            section4.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, 1000);
    }
}

function animateText(element, finalText, duration) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()가나다라마바사아자차카타파하";
    element.classList.add('animating');

    let currentIndex = 0;
    const interval = setInterval(() => {
        let currentText = finalText.substring(0, currentIndex);

        for (let i = currentIndex; i < finalText.length; i++) {
            if (finalText[i] === ' ') {
                currentText += ' ';
            } else {
                currentText += chars[Math.floor(Math.random() * chars.length)];
            }
        }

        element.textContent = currentText;
        currentIndex++;

        if (currentIndex > finalText.length) {
            clearInterval(interval);
            element.textContent = finalText;
            element.classList.remove('animating');
        }
    }, duration / finalText.length);
}

function initializeATex() {
    const aWraps = document.querySelectorAll('.AWrap:not(.ww)');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()가나다라마바사아자차카타파하";

    aWraps.forEach((wrap, index) => {
        const atexSpan = wrap.querySelector('.ATex span');
        const tagging = wrap.querySelector('.tagging');

        if (atexSpan && tagging) {
            const angelNames = ["Michael", "Gabriel", "Uriel", "Cherubim", "Ophanim"];
            const tags = ["#Justice #Courage", "#Messenger #Power", "#Wisdom #Heal", "#Knowledge #Guardians", "#Wheels #Mystery"];

            const targetName = angelNames[index] || angelNames[0];
            const targetTag = tags[index] || tags[0];

            let randomName = '';
            let randomTag = '';

            for (let i = 0; i < targetName.length; i++) {
                if (targetName[i] === ' ') {
                    randomName += ' ';
                } else {
                    randomName += chars[Math.floor(Math.random() * chars.length)];
                }
            }

            for (let i = 0; i < targetTag.length; i++) {
                if (targetTag[i] === ' ' || targetTag[i] === '#') {
                    randomTag += targetTag[i];
                } else {
                    randomTag += chars[Math.floor(Math.random() * chars.length)];
                }
            }

            atexSpan.textContent = randomName;
            tagging.textContent = randomTag;

            wrap.dataset.animated = 'false';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeATex();

    function setupIconHoverEvents() {
        const icons = document.querySelectorAll('.icon');
        const descriptionElement = document.getElementById('iconDescription');

        if (icons.length > 0 && descriptionElement) {
            icons.forEach((icon, index) => {
                icon.addEventListener('mouseenter', (e) => {
                    const description = icon.getAttribute('data-description');
                    if (description) {
                        descriptionElement.textContent = description;
                        descriptionElement.style.opacity = '1';
                    }
                });

                icon.addEventListener('mouseleave', (e) => {
                    descriptionElement.textContent = '';
                    descriptionElement.style.opacity = '0';
                });
            });
        } else {
            console.error('Icons or description element not found');
        }
    }

    setTimeout(setupIconHoverEvents, 100);

    const section4 = document.querySelector('#section4');
    const goUp = document.querySelector('.goUp');

    if (section4 && goUp) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    goUp.classList.add('show');
                } else {
                    goUp.classList.remove('show');
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(section4);
    }

    const acons = document.querySelectorAll('.ACon');

    acons.forEach((acon, index) => {
        acon.addEventListener('mouseenter', () => {
            const wrap = acon.closest('.AWrap');
            if (!wrap || wrap.dataset.animated === 'true') return;

            wrap.dataset.animated = 'true';

            const atexSpan = wrap.querySelector('.ATex span');
            const tagging = wrap.querySelector('.tagging');

            if (atexSpan && tagging) {
                const angelNames = ["Michael", "Gabriel", "Uriel", "Cherubim", "Ophanim"];
                const tags = ["#Justice #Courage", "#Messenger #Power", "#Wisdom #Heal", "#Knowledge #Guardians", "#Wheels #Mystery"];

                const angelName = angelNames[index] || angelNames[0];
                const tag = tags[index] || tags[0];

                animateText(atexSpan, angelName, 1000);
                animateText(tagging, tag, 1000);
            }

            const goUp = document.querySelector('.goUp');

            if (goUp) {
                const i1 = goUp.querySelector('.I1');
                const i2 = goUp.querySelector('.I2');
                const i3 = goUp.querySelector('.I3');

                const imageSet = [
                    // Michael (index 0)
                    ['src/000-b1.png', 'src/000-b2.png', 'src/000-b3.png'],
                    // Gabriel (index 1)
                    ['src/111-b1.png', 'src/111-b2.png', 'src/111-b3.png'],
                    // Uriel (index 2)
                    ['src/222-b1.png', 'src/222-b2.png', 'src/222-b3.png'],
                    // Cherubim (index 3)
                    ['src/333-b1.png', 'src/333-b2.png', 'src/333-b3.png'],
                    // Ophanim (index 4)
                    ['src/444-b1.png', 'src/444-b2.png', 'src/444-b3.png']
                ];

                const textSet = [
                    // Michael (index 0)
                    ['Revelation 12:7', 'sLegion, 2010', 'Saint Beast'],
                    // Gabriel (index 1)
                    ['Luke 1:26–38', 'Constantine, 2005', 'Gabriel DropOut, 2017'],
                    // Uriel (index 2)
                    ['1 Enoch 20:2', 'Omniscient Readers Viewpoint', 'Supernatural'],
                        // Cherubim (index 3)
                        ['Genesis 3:24', 'Evangelion', 'Bayonetta'],
                        // Ophanim (index 4)
                        ['Ezekiel 1:15–21', 'Digimon Adventure', 'Bayonetta']
                    ];

                const currentImages = imageSet[index] || imageSet[0];
                const currentTexts = textSet[index] || textSet[0];

                if (i1) {
                    i1.style.backgroundImage = `url('${currentImages[0]}')`;
                    i1.style.backgroundSize = 'cover';
                    i1.style.backgroundPosition = 'center';
                    i1.style.display = 'flex';
                    i1.style.alignItems = 'center';
                    i1.style.justifyContent = 'center';
                    i1.style.color = '#fff';
                    i1.style.fontWeight = '300';
                    i1.style.fontSize = '22px';
                    i1.style.textAlign = 'center';
                    i1.classList.add('show');
                    i1.innerHTML = '';

                    i1.addEventListener('mouseenter', () => {
                        i1.style.backgroundImage = 'none';
                        i1.innerHTML = currentTexts[0];

                        setTimeout(() => {
                            i1.innerHTML = '';
                        }, 1200);
                    });
                }

                if (i2) {
                    i2.style.backgroundImage = `url('${currentImages[1]}')`;
                    i2.style.backgroundSize = 'cover';
                    i2.style.backgroundPosition = 'center';
                    i2.style.display = 'flex';
                    i2.style.alignItems = 'center';
                    i2.style.justifyContent = 'center';
                    i2.style.color = '#fff';
                    i2.style.fontWeight = '300';
                    i2.style.fontSize = '22px';
                    i2.style.textAlign = 'center';
                    i2.classList.add('show');
                    i2.innerHTML = '';

                    i2.addEventListener('mouseenter', () => {
                        i2.style.backgroundImage = 'none';
                        i2.innerHTML = currentTexts[1];

                        setTimeout(() => {
                            i2.innerHTML = '';
                        }, 1200);
                    });
                }

                if (i3) {
                    i3.style.backgroundImage = `url('${currentImages[2]}')`;
                    i3.style.backgroundSize = 'cover';
                    i3.style.backgroundPosition = 'center';
                    i3.style.display = 'flex';
                    i3.style.alignItems = 'center';
                    i3.style.justifyContent = 'center';
                    i3.style.color = '#fff';
                    i3.style.fontWeight = '300';
                    i3.style.fontSize = '22px';
                    i3.style.textAlign = 'center';
                    i3.classList.add('show');
                    i3.innerHTML = '';

                    i3.addEventListener('mouseenter', () => {
                        i3.style.backgroundImage = 'none';
                        i3.innerHTML = currentTexts[2];

                        setTimeout(() => {
                            i3.innerHTML = '';
                        }, 1200);
                    });
                }
            }
        });
    });

    setTimeout(startCountUpAnimation, 500);
});

let animationInterval;

function startCountUpAnimation() {
    const element = document.getElementById('textAnimation');
    if (!element) return;

    const texts = ["Seen this Angel?", "Seen this Number?"];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let currentTextIndex = 0;

    if (animationInterval) {
        clearInterval(animationInterval);
    }

    function runAnimation() {
        const finalText = texts[currentTextIndex];
        let currentText = "";
        let currentIndex = 0;

        for (let i = 0; i < finalText.length; i++) {
            currentText += chars[Math.floor(Math.random() * chars.length)];
        }
        element.textContent = currentText;

        const isForward = currentTextIndex === 1;

        const interval = setInterval(() => {
            if (currentIndex >= finalText.length) {
                clearInterval(interval);
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(runAnimation, 2000);
                return;
            }

            if (isForward) {
                currentText = finalText.substring(0, currentIndex + 1);
                for (let i = currentIndex + 1; i < finalText.length; i++) {
                    if (finalText[i] === ' ') {
                        currentText += ' ';
                    } else {
                        currentText += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
            } else {
                currentText = "";
                for (let i = 0; i < finalText.length - currentIndex - 1; i++) {
                    if (finalText[i] === ' ') {
                        currentText += ' ';
                    } else {
                        currentText += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                currentText += finalText.substring(finalText.length - currentIndex - 1);
            }

            element.textContent = currentText;
            currentIndex++;
        }, 100);
    }

    runAnimation();
}