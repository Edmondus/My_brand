const article = document.querySelector("#cards");


    db.collection("articles").add({
        title : article["post-title"].value,
        description : article["post-desc"].value
    })
    

