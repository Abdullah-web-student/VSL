// set year
document.getElementById('year').innerText = new Date().getFullYear();

// Reveal on scroll using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// Carousel basic controls (horizontal scroll)
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -carousel.offsetWidth * 0.7, behavior: 'smooth' });
});
nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: carousel.offsetWidth * 0.7, behavior: 'smooth' });
});

// Small mouse drag for carousel
let isDown = false, startX, scrollLeft;
carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => { isDown = false; carousel.classList.remove('dragging'); });
carousel.addEventListener('mouseup', () => { isDown = false; carousel.classList.remove('dragging'); });
carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2;
    carousel.scrollLeft = scrollLeft - walk;
});

// Play overlay (demo) - will open a modal or link in real use
// document.querySelectorAll('.play-overlay, .card .play').forEach(btn => {
//     btn.addEventListener('click', () => {
//         alert('Open video player / link here (replace with real embed).');
//     });
// });




// Video play functionality
document.querySelectorAll('.card .play').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const video = btn.previousElementSibling;
        const card = btn.closest('.card');

        if (video.paused) {
            video.play();
            btn.style.opacity = '0';
            card.classList.add('playing');
        } else {
            video.pause();
            btn.style.opacity = '1';
            card.classList.remove('playing');
        }
    });
});

// Pause video when clicking elsewhere
document.querySelectorAll('.card-video video').forEach(video => {
    video.addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = video.nextElementSibling;
        if (video.paused) {
            video.play();
            btn.style.opacity = '0';
        } else {
            video.pause();
            btn.style.opacity = '1';
        }
    });
});

// Show play button when video ends
document.querySelectorAll('.card-video video').forEach(video => {
    video.addEventListener('ended', () => {
        const btn = video.nextElementSibling;
        btn.style.opacity = '1';
        video.currentTime = 0;
    });
});



// Video load hone par thumbnail set karo
document.querySelectorAll('.card-video video').forEach(video => {
    video.addEventListener('loadeddata', function () {
        // First frame capture ke liye
        this.currentTime = 0.1;
    });

    video.addEventListener('seeked', function () {
        // Thumbnail set ho gaya
    });
});




// Video Modal Functionality
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const closeModal = document.querySelector('.close-modal');

// Video data for titles and descriptions
const videoData = {
    'v1.mp4': {
        title: '@brian_mark - 307K Followers',
        description: 'I never had an organic strategy that was consistently going viral... until I worked with Devin.'
    },
    'v2.mp4': {
        title: '@ryan_nork - 176K Followers',
        description: 'Within 4 months I had 5 videos get over a million views — the scripting and editing changed everything.'
    },
    'v3.mp4': {
        title: '@khalidknows - 85K Followers',
        description: 'Took my brand from 6k followers to 236k and reached 10M accounts in 90 days.'
    },
    'v4.mp4': {
        title: '@dluces_ - 199K Followers',
        description: 'The very first video I posted got 483k views.'
    }
};

// Open modal when video card is clicked
document.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('play')) {
            const videoSrc = `VideoTestimonial/v${index + 1}.mp4`;
            const videoInfo = videoData[`v${index + 1}.mp4`];

            modalVideo.src = videoSrc;
            videoTitle.textContent = videoInfo.title;
            videoDescription.textContent = videoInfo.description;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Play video automatically when modal opens
            modalVideo.play();
        }
    });
});

// Close modal functionality
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalVideo.pause();
    modalVideo.currentTime = 0;
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
});



// Picture Modal Functionality
const pictureModal = document.getElementById('pictureModal');
const modalPicture = document.getElementById('modalPicture');
const pictureTitle = document.getElementById('pictureTitle');
const pictureDescription = document.getElementById('pictureDescription');
const closePictureModal = pictureModal.querySelector('.close-modal');

// Picture data for titles and descriptions
const pictureData = {
    'p1.jpg': {
        title: '@brian_mark - 307K Followers',
        description: 'From struggling creator to viral sensation with consistent organic growth strategies.'
    },
    'p2.jpg': {
        title: '@ryan_nork - 176K Followers',
        description: 'Mastered the art of viral content creation with proven scripting and editing frameworks.'
    },
    'p3.jpg': {
        title: '@khalidknows - 85K Followers',
        description: 'Explosive growth from 6k to 236k followers in just 90 days through strategic content.'
    },
    'p4.jpg': {
        title: '@dluces_ - 199K Followers',
        description: 'First video reached 483k views - proving the power of our content framework.'
    }
};

// Open picture modal when picture card is clicked
document.querySelectorAll('.picture-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const pictureSrc = `PicTestimonials/p${index + 1}.jpg`;
        const pictureInfo = pictureData[`p${index + 1}.jpg`];

        modalPicture.src = pictureSrc;
        modalPicture.alt = pictureInfo.title;
        pictureTitle.textContent = pictureInfo.title;
        pictureDescription.textContent = pictureInfo.description;

        pictureModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close picture modal functionality
closePictureModal.addEventListener('click', () => {
    pictureModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
pictureModal.addEventListener('click', (e) => {
    if (e.target === pictureModal) {
        pictureModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pictureModal.style.display === 'block') {
        pictureModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
