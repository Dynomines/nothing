let db = new Dexie("/idbfs");
let db1 = new Dexie("SGP_Storage");
db.open(); db1.open();
var new_zip = new JSZip,
    importZIP = document.createElement("input");

function progressCallback({
    totalRows: e,
    completedRows: o
}) {
    console.log(`Progress (indexedDB_subwayunity): ${o} of ${e} rows completed`)
}
function progressCallback1({
    totalRows: e,
    completedRows: o
}) {
    console.log(`Progress (indexedDB_doodle): ${o} of ${e} rows completed`)
}

importZIP.type = "file", importZIP.accept = "application/zip", importZIP.onchange = function(e) {
    try { for (var o, t = e.target.files, n = 0; n < t.length; n++) o = t[n],
        JSZip.loadAsync(o).then(function(e) {
            try {
                return e.files["indexedDB_subwayunity.json"].async("blob");
                console.log(e.files["indexedDB_subwayunity.json"].async("blob"))
            } catch (error) {
                console.log("IndexedDB: No indexedDB_subwayunity.json found. SB Unity data was not imported.")
            }
        }).then(function(e) {
            try {
                db.delete(), db = Dexie.import(e, {
                    progressCallback: progressCallback
                });
            } catch (error) {
                console.log("indexedDB_subwayunity: empty.")
            };

        }),
        JSZip.loadAsync(o).then(function(e) {
            try {
                return e.files["indexedDB_doodle.json"].async("blob")
            } catch (error) {
                console.log("IndexedDB: No indexedDB_doodle.json found. DG data was not imported.")
            }
        }).then(function(e) {
            try {
                db1.delete(), db1 = Dexie.import(e, {
                    progressCallback: progressCallback1
                });
            } catch (error) {
                console.log("indexedDB_doodle: empty.")
            };
        }),
        JSZip.loadAsync(o).then(function(e) {
            try {
                return e.files["localStorage.json"].async("text")
            } catch (error) {
                console.log("localStorage: empty.");
            }
        }).then(function(e) {
            try {
                var o = JSON.parse(e);
                Object.keys(o).forEach(function(e) {
                    localStorage.setItem(e, o[e])
                })
                $("#importModal").modal("show");
                setTimeout(function() {
                    window.location.reload(1)
                }, 3e3)
            } catch (error) {
                console.log("localStorage: empty, cannot import.");
                $("#importFailedModal").modal("show")
            }
        })
    } catch (error) {
        $("#importFailedModal").modal("show")
    }
}, document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("exportLink");
        document.getElementById("downloadZIP").onclick = (async () => {
            const e = new JSZip,
                o = JSON.stringify(localStorage);
            e.file("localStorage.json", o);
            try {
                const o = await db.export();
                e.file("indexedDB_subwayunity.json", o);
            } catch (error) {
                console.log("No indexedDB_subwayunity data, skipping...");
            }
            try {
                const o1 = await db1.export();
                e.file("indexedDB_doodle.json", o1);
            } catch (error) {
                console.log("No indexedDB_doodle data, skipping...");
            }
            e.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: {level: 5}
            }, function(e) {
                console.log("Progress: " + e.percent.toFixed(0) + " %"), $("#progressModal").modal("show")
            }).then(function(e) {
                download(e, "data-yell0wsuit.zip")
            })
        })
});