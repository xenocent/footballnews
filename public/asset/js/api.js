var base_url = "https://api.football-data.org/v2/";
var url_liga = base_url + "competitions/2001/standings";
var url_tim = base_url + "teams/";
var api_key = "ac8ab4d2a22d4d91a29c3a25c73a3c5b";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getLiga() {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(url_liga).then(function (response) {
        if (response) {
          response
            .json()
            .then(function (data) {
              // Objek/array JavaScript dari response.json() masuk lewat data.
              // Menyusun komponen card artikel secara dinamis
              var totalHtml = "";
              var homeHtml = "";
              var awayHtml = "";
              data.standings.forEach(function (standings) {
                if (standings.type == "TOTAL") {
                  totalHtml += `<div class='col s12'><h3>${standings.group}</h3></div>`;
                  standings.table.forEach(function (data) {
                    totalHtml += ` <div class='col s3'>
              <div class='card'> 
                <div class='card-image waves-effect waves-block waves-light'>
                  <img class='activator img-logo' src='${data.team.crestUrl}'>
                </div>
                <div class='card-content'>
                  <span class='card-title activator grey-text text-darken-4'>${data.team.name}<i class='material-icons right'>more_vert</i></span>
                  <p><a class="waves-effect" href="#tim" onclick="loadPage('tim',${data.team.id})">Lihat Tim</a></p>
                </div>
                <div class='card-reveal'>
                  <span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span>
                  <ul class="collection">
                    <li class="collection-item">Played Games : ${data.playedGames}</li>
                    <li class="collection-item">Won : ${data.won}</li>
                    <li class="collection-item">Draw : ${data.draw}</li>
                    <li class="collection-item">Lost : ${data.lost}</li>
                    <li class="collection-item">Points : ${data.points}</li>
                  </ul>
                </div>
              </div></div>`;
                  });
                } else if (standings.type == "HOME") {
                  homeHtml += `<div class='col s12'><h3>${standings.group}</h3></div>`;
                  standings.table.forEach(function (data) {
                    homeHtml += ` <div class='col s3'>
              <div class='card'> 
              <div class='card-image waves-effect waves-block waves-light'>
                <img class='activator img-logo' src='${data.team.crestUrl}'>
              </div>
              <div class='card-content'>
                <span class='card-title activator grey-text text-darken-4'>${data.team.name}<i class='material-icons right'>more_vert</i></span>
                <p><a class="waves-effect" href="#tim" onclick="loadPage('tim',${data.team.id})">Lihat Tim</a></p>
              </div>
              <div class='card-reveal'>
                <span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span>
                <ul class="collection">
                  <li class="collection-item">Played Games : ${data.playedGames}</li>
                  <li class="collection-item">Won : ${data.won}</li>
                  <li class="collection-item">Draw : ${data.draw}</li>
                  <li class="collection-item">Lost : ${data.lost}</li>
                  <li class="collection-item">Points : ${data.points}</li>
                </ul>
              </div>
            </div></div>`;
                  });
                } else if (standings.type == "AWAY") {
                  awayHtml += `<div class='col s12'><h3>${standings.group}</h3></div>`;
                  standings.table.forEach(function (data) {
                    awayHtml += `<div class='col s3'>
              <div class='card'>
              <div class='card-image waves-effect waves-block waves-light'>
                <img class='activator img-logo' style='width:' src='${data.team.crestUrl}'>
              </div>
              <div class='card-content'>
                <span class='card-title activator grey-text text-darken-4'>${data.team.name}<i class='material-icons right'>more_vert</i></span>
                <p><a class="waves-effect" href="#tim" onclick="loadPage('tim',${data.team.id})">Lihat Tim</a></p>
              </div>
              <div class='card-reveal'>
                <span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span>
                <ul class="collection">
                  <li class="collection-item">Played Games : ${data.playedGames}</li>
                  <li class="collection-item">Won : ${data.won}</li>
                  <li class="collection-item">Draw : ${data.draw}</li>
                  <li class="collection-item">Lost : ${data.lost}</li>
                  <li class="collection-item">Points : ${data.points}</li>
                </ul>
              </div>
            </div></div>`;
                  });
                }
              });

              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("total").innerHTML = totalHtml;
              document.getElementById("home").innerHTML = homeHtml;
              document.getElementById("away").innerHTML = awayHtml;
              $(".tabs").tabs();
              resolve(data);
            })
            .catch("get tim",error);
        }
      });
    }
    fetch(url_liga, {
      headers: {
        "X-Auth-Token": api_key,
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        // Menyusun komponen card artikel secara dinamis
        var totalHtml = "";
        var homeHtml = "";
        var awayHtml = "";
        data.standings.forEach(function (standings) {
          if (standings.type == "TOTAL") {
            totalHtml += `<div class='col s12'><h3>${standings.group}</h3></div>`;
            standings.table.forEach(function (data) {
              totalHtml += ` <div class='col s3'>
              <div class='card'> 
                <div class='card-image waves-effect waves-block waves-light'>
                  <img class='activator img-logo' src='${data.team.crestUrl}'>
                </div>
                <div class='card-content'>
                  <span class='card-title activator grey-text text-darken-4'>${data.team.name}<i class='material-icons right'>more_vert</i></span>
                  <p><a class="waves-effect" href="#tim" onclick="loadPage('tim',${data.team.id})">Lihat Tim</a></p>
                </div>
                <div class='card-reveal'>
                  <span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span>
                  <ul class="collection">
                    <li class="collection-item">Played Games : ${data.playedGames}</li>
                    <li class="collection-item">Won : ${data.won}</li>
                    <li class="collection-item">Draw : ${data.draw}</li>
                    <li class="collection-item">Lost : ${data.lost}</li>
                    <li class="collection-item">Points : ${data.points}</li>
                  </ul>
                </div>
              </div></div>`;
            });
          } else if (standings.type == "HOME") {
            homeHtml += `<div class='col s12'><h3>${standings.group}</h3></div>`;
            standings.table.forEach(function (data) {
              homeHtml += ` <div class='col s3'>
              <div class='card'> 
              <div class='card-image waves-effect waves-block waves-light'>
                <img class='activator img-logo' src='${data.team.crestUrl}'>
              </div>
              <div class='card-content'>
                <span class='card-title activator grey-text text-darken-4'>${data.team.name}<i class='material-icons right'>more_vert</i></span>
                <p><a class="waves-effect" href="#tim" onclick="loadPage('tim',${data.team.id})">Lihat Tim</a></p>
              </div>
              <div class='card-reveal'>
                <span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span>
                <ul class="collection">
                  <li class="collection-item">Played Games : ${data.playedGames}</li>
                  <li class="collection-item">Won : ${data.won}</li>
                  <li class="collection-item">Draw : ${data.draw}</li>
                  <li class="collection-item">Lost : ${data.lost}</li>
                  <li class="collection-item">Points : ${data.points}</li>
                </ul>
              </div>
            </div></div>`;
            });
          } else if (standings.type == "AWAY") {
            awayHtml += `<div class='col s12'><h3>${standings.group}</h3></div>`;
            standings.table.forEach(function (data) {
              awayHtml += `<div class='col s3'>
              <div class='card'>
              <div class='card-image waves-effect waves-block waves-light'>
                <img class='activator img-logo' style='width:' src='${data.team.crestUrl}'>
              </div>
              <div class='card-content'>
                <span class='card-title activator grey-text text-darken-4'>${data.team.name}<i class='material-icons right'>more_vert</i></span>
                <p><a class="waves-effect" href="#tim" onclick="loadPage('tim',${data.team.id})">Lihat Tim</a></p>
              </div>
              <div class='card-reveal'>
                <span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span>
                <ul class="collection">
                  <li class="collection-item">Played Games : ${data.playedGames}</li>
                  <li class="collection-item">Won : ${data.won}</li>
                  <li class="collection-item">Draw : ${data.draw}</li>
                  <li class="collection-item">Lost : ${data.lost}</li>
                  <li class="collection-item">Points : ${data.points}</li>
                </ul>
              </div>
            </div></div>`;
            });
          }
        });

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("total").innerHTML = totalHtml;
        document.getElementById("home").innerHTML = homeHtml;
        document.getElementById("away").innerHTML = awayHtml;
        $(".tabs").tabs();
        resolve(data);
      })
      .catch(error);
  });
}

function getTim(idParam) {
  return new Promise(function (resolve, reject) {
    if (idParam != null) {
      if ("caches" in window) {
        caches.match(url_tim + "/" + idParam).then(function (response) {
          if (response) {
            response.json().then(function (data) {
              timHtml = `<div class='col s12'>
              <div class='card horizontal'>
              <div class='card-image waves-effect waves-block waves-light'>
                <img class='activator img-logo' src='${data.crestUrl}'>
              </div>
              <div class='card-content'>
                <ul>
                  <li>Nama : ${data.name}</li>
                  <li>Alias : ${data.shortName}</li>
                  <li>Alamat : ${data.address}</li>
                  <li>Area : ${data.area.name}</li>
                  <li>Thn. Berdiri : ${data.founded}</li>
                  <li>Telp : ${data.phone}</li>
                  <li>Email : ${data.email}</li>
                  <li>Web : ${data.website}</li>
                </ul>
                <span class='card-title activator grey-text text-darken-4'>Anggota Tim<i class='material-icons right'>more_vert</i></span>
              </div>
              <div class='card-reveal' id='squad'></div>
              <div class="center"><button id='saveTim'><span> Favoritkan <i class="material-icons">add_circle</i></span></button></div>
            </div></div>`;

              squad =
                "<span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span><ul>";
              data.squad.forEach(function (sq) {
                squad += `<li>Name : ${sq.name} , Role : : ${sq.role}</li>`;
              });
              squad += "</ul>";

              document.getElementById("tim").innerHTML = timHtml;
              document.getElementById("squad").innerHTML = squad;
              document.getElementById("saveTim").onclick = function () {
                saveTimDb(data)
                  .then(function () {
                    alert("Tersimpan");
                  })
                  .catch(function () {
                    alert("Gagal");
                  });
                return false;
              };
              resolve(data);
            });
          }
        });
      }
      fetch(url_tim + "/" + idParam, {
        headers: {
          "X-Auth-Token": api_key,
        },
      })
        .then(status)
        .then(json)
        .then(function (data) {
          timHtml = `<div class='col s12'>
        <div class='card horizontal'>
        <div class='card-image waves-effect waves-block waves-light'>
          <img class='activator img-logo' src='${data.crestUrl}'>
        </div>
        <div class='card-content'>
          <ul>
            <li>Nama : ${data.name}</li>
            <li>Alias : ${data.shortName}</li>
            <li>Alamat : ${data.address}</li>
            <li>Area : ${data.area.name}</li>
            <li>Thn. Berdiri : ${data.founded}</li>
            <li>Telp : ${data.phone}</li>
            <li>Email : ${data.email}</li>
            <li>Web : ${data.website}</li>
          </ul>
          <span class='card-title activator grey-text text-darken-4'>Anggota Tim<i class='material-icons right'>more_vert</i></span>
        </div>
        <div class='card-reveal' id='squad'></div>
        <div class="center"><button id='saveTim'><span> Favoritkan <i class="material-icons">add_circle</i></span></button></div>
      </div></div>`;

          squad =
            "<span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span><ul>";
          data.squad.forEach(function (sq) {
            squad += `<li>Name : ${sq.name} , Role : : ${sq.role}</li>`;
          });
          squad += "</ul>";

          document.getElementById("tim").innerHTML = timHtml;
          document.getElementById("squad").innerHTML = squad;
          document.getElementById("saveTim").onclick = function () {
            saveTimDb(data)
              .then(function () {
                alert("Tersimpan");
              })
              .catch(function () {
                alert("Gagal");
              });
            return false;
          };
          resolve(data);
        })
        .catch("get tim", error);
    }
  });
}

function getAllFav() {
  getAllTimDB().then(function (data) {
    var timHtml = "";
    data.forEach(function (data) {
      timHtml += `<div class='col s12'>
      <div class='card horizontal'>
      <div class='card-image waves-effect waves-block waves-light'>
        <img class='activator img-logo' src='${data.crestUrl}'>
      </div>
      <div class='card-content'>
        <ul>
          <li>Nama : ${data.name}</li>
          <li>Alias : ${data.shortName}</li>
          <li>Alamat : ${data.address}</li>
          <li>Area : ${data.area.name}</li>
          <li>Thn. Berdiri : ${data.founded}</li>
          <li>Telp : ${data.phone}</li>
          <li>Email : ${data.email}</li>
          <li>Web : ${data.website}</li>
        </ul>
        <span class='card-title activator grey-text text-darken-4'>Anggota Tim<i class='material-icons right'>more_vert</i></span>
      </div>
      <div class='card-reveal' id='squad'>`;
      timHtml +=
        "<span class='card-title grey-text text-darken-4'>Detail Match<i class='material-icons right'>close</i></span><ul>";
      data.squad.forEach(function (sq) {
        timHtml += `<li>Name : ${sq.name} , Role : ${sq.role}</li>`;
      });
      timHtml += "</ul>";
      timHtml += `</div>
        <a class="waves-effect waves-light btn" href="#tim" onclick="loadPage('del',${data.id})">Hapus Tim</a></div></div>`;
      document.getElementById("tim").innerHTML = timHtml;
    });
  });
}
