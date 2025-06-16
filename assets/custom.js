// Adapted from https://stackoverflow.com/a/76505964

// This script allows the addition of a custom footer to the title slide only

console.log("✅ Custom JS loaded!");

function add_custom_footer() {
    // Footer was hardcoded in custom.js because {{ }} code injection or even quote escaping/html entities like &quot; do not seem to work when passed via the
    // title-slide-attributes => title-footer YAML option.
    let title_slide = document.querySelector("section#title-slide");
    let title_slide_footer = title_slide.getAttribute('title-footer') ?? '<i class="fa-brands fa-github" aria-label="github"></i> &nbsp; <a href="https://github.com/pmoris/calcua-tips"><code>pmoris/calcua-tips</code></a> &nbsp; &bull; &nbsp; <i class="fa-brands fa-creative-commons" aria-label="creative-commons"></i> <i class="fa-brands fa-creative-commons-by" aria-label="creative-commons-by"></i> &nbsp; <a href="https://creativecommons.org/licenses/by/4.0/deed.en"><code>cc-by-4.0</code></a>'
    let footer = document.querySelector('div.footer.footer-default p');
    // If footer doesn't exist, create it
    if (!footer) {
        const reveal = document.querySelector('.reveal');

        const footerWrapper = document.createElement('div');
        footerWrapper.className = 'footer footer-default';
        footerWrapper.style = 'display: block;';

        footer = document.createElement('p');
        footerWrapper.appendChild(footer);

        reveal.appendChild(footerWrapper);
    }

    let global_footer_text = footer.innerHTML || "";

    if (title_slide.classList.contains('present')) {
        footer.innerHTML = title_slide_footer;
    }

    Reveal.on( 'slidechanged' , event => {
        if (event.currentSlide.matches('#title-slide')) {
            footer.innerHTML = title_slide_footer;
        } else {
            footer.innerHTML = global_footer_text;
        }
    });
};

window.addEventListener("load", (event) => {
    add_custom_footer();
    console.log("✅ Reveal is ready. Current slide:", Reveal.getCurrentSlide().id);
});
