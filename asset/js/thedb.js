var dbPromise = idb.open("football", 1, function (upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("tim")) {
    var timDb = upgradeDb.createObjectStore("tim", { keypath: "id" });
    timDb.createIndex("tim", "tim", { unique: false });
  }
});

function saveTimDb(data) {
  return new Promise(function (resolve, reject) {
    dbPromise
      .then(function (db) {
        var tx = db.transaction("tim", "readwrite");
        var store = tx.objectStore("tim");

        store.add(data, data.id); //menambahkan key "buku"
        return tx.complete;
      })
      .then(function () {
        resolve (true);
      })
      .catch(function () {
        reject (false);
      });
  });
}

function readTimDb(id) {
  return new Promise(function (resolve, reject) {
    dbPromise
      .then(function (db) {
        var tx = db.transaction("tim", "readonly");
        var store = tx.objectStore("tim");
        // mengambil primary key berdasarkan isbn
        return store.get(id);
      })
      .then(function (val) {
        resolve(val);
      })
      .catch(function () {
        reject("Tidak ada Data");
      });
  });
}

function deleteTimDB(id) {
  console.log(id)
  return new Promise(function (resolve, reject) {
    dbPromise
      .then(function (db) {
        var tx = db.transaction("tim", "readwrite");
        var store = tx.objectStore("tim");
        store.delete(id);
        return tx.complete;
      })
      .then(function () {
        resolve("Item deleted");
      })
      .catch(function () {
        reject("Tidak ada Data");
      });
  });
}

function getAllTimDB() {
  return new Promise(function (resolve, reject) {
    dbPromise
      .then(function (db) {
        var tx = db.transaction("tim", "readonly");
        var store = tx.objectStore("tim");
        return store.getAll();
      })
      .then(function (tim) {
        setTimeout(function(){loadPage('favtim')}, 3000);
        resolve(tim);
      }).catch(function () {
        reject("Tidak ada Data");
      });
  });
}
