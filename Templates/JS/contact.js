const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection("contact").add({
        name : contactForm["contact-name"].value,
        email : contactForm["contact-email"].value,
        message : contactForm["contact-message"].value
    })
    contactForm.reset();

});