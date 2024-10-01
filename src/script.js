const typewriter = document.getElementById('typewriter')
const contact_button = document.getElementById('contact')
const contact_form = document.getElementById('contact-form')
const contact_modal = document.getElementById('contact-modal')
const contact_submit = document.getElementById('contact-submit')
const contact_cancel = document.getElementById('contact-cancel')
const status_message = document.getElementById('status-message');
const resume_button = document.getElementById('resume');


const phrases = ['Software Engineer', 'Data Enthusiast', 'Creative Designer', 'Continuous Learner']
let sleepTime = 100
let curPhraseIndex = 0


// DOM Content Loaded
document.addEventListener("DOMContentLoaded", (event) => {
    writeLoop()
});

// Bring up contact modal
contact.addEventListener("click", () => {contact_modal.style.opacity = '100'})

// Close contact modal
contact_cancel.addEventListener("click", () => {contact_modal.style.opacity = '0'})  

// Submit contact modal
contact_submit.addEventListener("click", (e) => {
    e.preventDefault()
    emailjs.init({publicKey:"29YL2LwOcgdlA-G-_"});
      emailjs.sendForm('service_7zk7mts', 'template_fmbgz7x', contact_form).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          status_message.textContent = "Your message has been sent!";
          setTimeout(() => {
            contact_modal.style.opacity = 0;
        }, 1000); 
        setTimeout(() => {
            status_message.textContent = ""; 
        }, 3000);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
})  

// View resume
resume_button.addEventListener("click", () => {window.open(
    'Jordan Shefman Resume.pdf',
    '_blank'
)});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms))
}

const writeLoop = async () => {
    while (true) {
        let curWord = phrases[curPhraseIndex]

        for (let i = 0; i < curWord.length; i++) {
            typewriter.innerText = curWord.substring(0, i + 1)
            await sleep(sleepTime)
        }

        await sleep(sleepTime * 10)

        for (let i = curWord.length; i > 0 ; i--) {
            typewriter.innerText = curWord.substring(0, i - 1)
            await sleep(sleepTime)
        }

        await sleep(sleepTime * 5)

        curPhraseIndex = (curPhraseIndex + 1) % phrases.length
    }
}


