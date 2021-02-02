const dodaj = document.getElementById('dodaj');
const text = document.getElementById('opis');
const database = firebase.database();

  
fileButton.addEventListener('change', (e) => {
     e.preventDefault();
     let file = e.target.files[0];
     let storageRef = firebase.storage().ref("Document" + file.name);
     let task = storageRef.put(file);
     var uuid = generateUUID();

     task
     .then (snapshot => snapshot.ref.getDownloadURL())
     .then (function(url) {
        fileUrl = url;
        database.ref('Propisi/' + uuid).set({
            FileName: file.name,
            FileUrl: fileUrl,
            TimeCreated: Date.now()
        });
     });
     
     var ref = database.ref('Propisi/' + uuid);
     ref.on('value', getLatestDocument);
})

function getLatestDocument(data) {
    var latestUploadedDocument = data.val();
        var fileName = latestUploadedDocument.FileName;
        var fileUrl = latestUploadedDocument.FileUrl;
        var list = document.createElement('li');
        var aLink = document.createElement('a');
        aLink.setAttribute('href', fileUrl);
        aLink.innerHTML = fileName;
        list.appendChild(aLink);
        babo.appendChild(list);
};

function alertTimeout() {
    var myAlert = setTimeout(alertFunction,1000);
}

function alertFunction() {
    alert('file added successfully');
}

function generateUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    })
    return uuid;
};

/* function getDocuments() {
        var ref = database.ref('Propisi/');
         ref.on('value', getData);

         function getData(data) {
            var Propisi = data.val();
            var keys = Object.keys(Propisi);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var fileName = Propisi[k].FileName;
                var fileUrl = Propisi[k].FileUrl;
                console.log(fileUrl);
        
                var list = document.createElement('li');
                var aLink = document.createElement('a');
                aLink.setAttribute('href', fileUrl);
                aLink.innerHTML = fileName;
                list.appendChild(aLink);
                babo.appendChild(list);
        
            }
        }
    
    }; */