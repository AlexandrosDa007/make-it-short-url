const input = document.getElementById('url');
const button = document.getElementById('btn');
const lastUrl = document.getElementById('last-url');
const copyButton = document.getElementById('copy-btn');
const urlTextField = document.getElementById('url-text');
const newUrlContainer = document.getElementsByClassName('new-url-container')[0];


button.addEventListener('click', async (ev) => {
    const result = await fetch('/urls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ url: input.value })
    });
    const response = await result.json();
    if (!response.success) {
        alert('Something went wrong');
        return;
    }
    const newUrl = response.url;
    // this is the last url
    localStorage.setItem('lastUrl', JSON.stringify(newUrl));
    setUrl();
});

async function setUrl() {
    const json = localStorage.getItem('lastUrl');
    if (json) {
        const url = JSON.parse(json);
        lastUrl.innerText = url.short;
        lastUrl.href = `https://make-it-short-url.herokuapp.com/urls/${url.short}`;
        urlTextField.value = lastUrl.href;
        newUrlContainer.style.display = 'flex';
    } else {
        newUrlContainer.style.display = 'none';
    }
}

copyButton.addEventListener('click', async (ev) => {
    const url = urlTextField.value;
    await copyToClipboard(url);
    console.log({ url });
    // show snack bar
    showSnack();
});

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}


function showSnack() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = 'Copied link...';
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

setUrl();
