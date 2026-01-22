console.log("JS CARICATO");

const pexelApiKey = "IT9qen52QXe8BBkCnnBPIX3cp56hqdODc4ri2XhmnlH8Xq7diVCciTXY";

const fetchImages = (query) => {
  const url = "https://api.pexels.com/v1/search?query=" + query;
  fetch(url, {
    method: "GET",
    headers: { Authorization: pexelApiKey },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("nope");
      }
    })
    .then((data) => {
      displayImages(data.photos);
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

const loadButton = document.getElementById("load-first");
loadButton.addEventListener("click", () => {
  fetchImages("hamsters");
});

const displayImages = (arrPhoto) => {
  const rowElement = document.querySelector(".album>.container>.row");
  rowElement.innerHTML = "";
  console.log("sss", arrPhoto);
  arrPhoto.forEach((foto) => {
    // ricreiamo il div col-md-4
    const col = document.createElement("div");
    col.classList.add("col-md-4");
    col.innerHTML = `
    <div class="card mb-4 shadow-sm">
                <a href="./dettagli.html?id=${foto.id}"><img src="${foto.src.original}" class="bd-placeholder-img card-img-top" /></a>
                <div class="card-body">
                  <h5 class="card-title">Lorem Ipsum</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary btn-hide">Hide</button>
                    </div>
                    <small class="text-muted">${foto.id}</small>
                  </div>
                </div>
              </div>
              `;
    //   logica bottone HIDE
    const hideButton = col.querySelector(".btn-hide");
    hideButton.addEventListener("click", () => {
      col.remove();
    });
    rowElement.append(col);
  });
};

const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", () => {
  const query = document.getElementById("search-input").value;
  if (query) {
    fetchImages(query);
  } else {
    alert("Scrivi qualcosa nell'input");
  }
});
