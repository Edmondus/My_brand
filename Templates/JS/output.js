const messageList = document.querySelector("#message-list");

function renderMessage(doc) {
    let li= document.createElement('li');
    let name= document.createElement('span');
    let email= document.createElement('span');
    let message= document.createElement('p');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    email.textContent = doc.data().email;
    message.textContent = doc.data().message;

    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(message);

    messageList.appendChild(li);
}


    db.collection("contact").get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
            renderMessage(doc);
        });
    })

