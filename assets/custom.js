// Adapted from https://stackoverflow.com/a/76505964

// This script allows the addition of a custom footer to the title slide only

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

function add_title_dates() {

    Reveal.on('ready', () => {

        let title_slide = document.querySelector("#title-slide");
        if (!title_slide) return;

        if (title_slide.querySelector(".title-dates")) return;

        let original = title_slide.getAttribute("date-original-publication");
        let updated = title_slide.getAttribute("date-last-update");

        if (!original && !updated) return;

        let separator = original && updated ? ' &nbsp; &mdash; &nbsp; ' : '';

        let text =
            `Originally published: ${original ?? ''}${separator}Last updated: ${updated ?? ''}`;

        let wrapper = document.createElement("div");
        wrapper.className = "title-dates";

        let p = document.createElement("p");
        p.innerHTML = text;

        wrapper.appendChild(p);
        title_slide.appendChild(wrapper);
    });
}

window.addEventListener("load", (event) => {
    add_custom_footer();
    add_title_dates();
});
