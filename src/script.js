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
    //getTopTracks()
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

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}



  // 1. Redirect User to Spotify Authorization Page
const CLIENT_ID = 'ca9c3a54c68049479ba9c3ef73760763'
const CLIENT_SECRET = '9e93b8bd4ec34cad940d09bac932f4ba'
const REDIRECT_URI = 'https://jordan-shefman.netlify.app/';
const SCOPE = 'user-top-read';

// Function to redirect user to Spotify authorization page
const redirectToSpotifyAuth = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;
  window.location.href = authUrl;
};

// 2. Get Authorization Code from the URL
const getAuthorizationCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code'); // Extract the authorization code
};

// 3. Exchange Authorization Code for Access Token
const exchangeCodeForToken = async (authorizationCode) => {
  const credentials = new URLSearchParams();
  credentials.append('grant_type', 'authorization_code');
  credentials.append('code', authorizationCode);
  credentials.append('redirect_uri', REDIRECT_URI);
  credentials.append('client_id', CLIENT_ID);
  credentials.append('client_secret', CLIENT_SECRET);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: credentials.toString(),
  });

  const data = await response.json();
  return data.access_token; // Return the access token
};

// 4. Use the access token to fetch user's top tracks
const getTopTracks = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`, // Use the user-specific access token
    }
  });

  const data = await response.json();
  console.log(data); // Output the user's top tracks
};

// Main flow
const main = async () => {
  const authorizationCode = getAuthorizationCode();
  if (!authorizationCode) {
    // Redirect user to Spotify authorization page if no code is found in URL
    redirectToSpotifyAuth();
  } else {
    // Exchange the code for an access token and fetch top tracks
    const accessToken = await exchangeCodeForToken(authorizationCode);
    getTopTracks(accessToken);
  }
};


