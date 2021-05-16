async function initSearchBox() {
    let searchEl;

    if (document.querySelector('.input-search')) {
        initSearchElement(document.querySelector('.input-search'));
    }
}

async function basicSearch(content, query) {
    let postsByTitle = [], postsByContent = [];

    for (var i = 0; i < content.length; i++) {
        let post = content[i];

        if (post.content.length == 0) {
            continue;
        }

        if (post.title.toLowerCase().includes(query)) {
            postsByTitle.push(post);
        } else if (post.content.toLowerCase().includes(query)) {
            postsByContent.push(post);
        }
    }

    if (postsByTitle.length > 1) {
        return Promise.resolve(postsByTitle);
    }

    return Promise.resolve(postsByTitle.concat(postsByContent));
}

async function searchContent(content, query) {
    let searchResult = [];

    // Try a basic search.
    searchResult = searchResult.concat(await basicSearch(content, query));

    return Promise.resolve(searchResult);
}

async function initSearchElement(searchEl) {
    // Initialize search variables.
    let currentFocus, resultSize = 0;
    let hugoContent = await (await fetch('/index.json')).json();
    //let resultsEl = document.getElementById(searchEl.getAttribute('list'));

    searchEl.addEventListener('input', async function () {
        let acList, acEl;

        if (searchEl.value.length > 2) {
            currentFocus = -1;
            let matchContent = await searchContent(hugoContent, searchEl.value.toLowerCase());
            resultSize = matchContent.length;
            if (matchContent.length > 0) {
                closeAllLists();
                acList = document.createElement("div");
                acList.setAttribute("id", "autocomplete-list");
                acList.setAttribute("class", "autocomplete-items");
                this.parentNode.appendChild(acList);

                for (let i = 0; i < matchContent.length; i++) {
                    let post = matchContent[i];

                    acEl = document.createElement("div");
                    acEl.innerHTML = "<strong>" + post.title + "</strong></br>";
                    acEl.innerHTML += post.content.substring(0, 20) + "...";

                    acEl.addEventListener("click", function (e) {
                        window.location = post.permalink;
                    }.bind(post));

                    acList.appendChild(acEl);
                }

            }

        }
    });

    searchEl.addEventListener("keydown", function (e) {
        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("div");

        if (e.keyCode == 40 && currentFocus < resultSize) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38 && currentFocus > 0) { //up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;

        removeActive(x);

        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var acItems = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < acItems.length; i++) {
            if (elmnt != acItems[i] && elmnt != searchEl) {
                acItems[i].parentNode.removeChild(acItems[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

export {
    initSearchBox
};