fetch("v/all").then(res => res.json())
.then(data => {
    data.forEach(e => {
        document.querySelector(".portfolioWrapper").innerHTML +=
        `
            <div class="innerInfoWrapper">
                <h1 class="projectName">${e.projectName}</h1>
                <h1 class="projectDesc">${e.projectDescription}</h1>
                <a href="${e.projectLink}">Project Link</a>
            </div>
        `
    });
})