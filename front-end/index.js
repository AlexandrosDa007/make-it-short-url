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
        lastUrl.href = `http://localhost:443/urls/${url.short}`;
        urlTextField.value = lastUrl.href;
        newUrlContainer.style.display = 'flex';
    } else {
        newUrlContainer.style.display = 'none';
    }
}

copyButton.addEventListener('click', async (ev) => {
    const v = urlTextField.value;
    await navigator.clipboard.writeText(v);
    console.log('asfgasfg');
    // show toast
    showSnack();
});



function showSnack() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = 'Copied link...';
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

setUrl();