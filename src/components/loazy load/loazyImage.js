
export const loazyLoadImage = () => {
    const loazyImages = document.querySelectorAll('img[data-src]');
    const windowHeight = document.documentElement.clientHeight;

    let loazyImagesPositions = [];
    if (loazyImages.length > 0) {
        loazyImages.forEach(img => {
            if (img.src) {
                loazyImagesPositions.push(img.getBoundingClientRect().top + scrollY);
                lazyScrollChek()
            }
        });
    }

    window.addEventListener("scroll", lazyScroll);

    function lazyScroll() {
        if (document.querySelectorAll('img[data-src]').length > 0) {
            lazyScrollChek();
        }

    }

    function lazyScrollChek() {
        let imgIndex = loazyImagesPositions.findIndex(
            item => scrollY > item - windowHeight
        );
        if (imgIndex >= 0) {
            if (loazyImages[imgIndex].dataset.src) {
                loazyImages[imgIndex].src = loazyImages[imgIndex].dataset.src;
                loazyImages[imgIndex].removeAttribute('data-src');
            }
            delete loazyImagesPositions[imgIndex];
        }
    }

}

