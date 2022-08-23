const showModalContainer = document.getElementById('show-modal');
const bookmarksCont = document.getElementById('bookmarks-container');
const bookmark = document.getElementById('bookmark');
const bookmarkExit = document.getElementById('delete-bookmark');
const modalCont = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const websiteName = document.getElementById('website-name');
const websiteURL = document.getElementById('website-url');
const bookmarkForm = document.getElementById('bookmark-form');
const formBtn = document.getElementById('submit-button');

//setting the global variables
let newWebsiteName = "";
let newWebURL = "";

//Setting variable for the bookmark object to be saved in the LocalServer
let savedBookmarks = {};

//Setting an array of objects to be saved on the local storage
let allBookmarks = [];
savedBookmarks.allBookmarks = allBookmarks;

//Opening the form
function showModal() {
    modalCont.style.display = "flex";
}
//Closing the form
function closeModalForm() {
    modalCont.style.display = "none";
}

// //Function to remove the bookmark and the data
// function deleteBkm(e) {
//     console.log(e.target);
//     bookmark.style.display = "none";
//  }

 // Delete Bookmark
function deleteBookmark(url) {
    // Loop through the bookmarks array
    console.log(url);
    // allBookmarks.forEach((bookmark, i) => {
    //   if (bookmark.URL === url) {
    //     allBookmarks.splice(i, 1);
    //   }
    // });
    // // Update bookmarks array in localStorage, re-populate DOM
    // localStorage.setItem('bookmarks', JSON.stringify(allBookmarks));
    // createNewElements();
  }

//Creating Bookmark elements
function createNewElements() {
        // Create new Bookmark Div and append child of closing icon
        const newBkm = document.createElement("div");
        newBkm.className = "bookmark";
        const bkmIcon = document.createElement("i");
        bkmIcon.className = "fa-solid fa-xmark";
        bkmIcon.setAttribute('onclick', `deleteBookmark('${newWebURL}')`);
        bookmarksCont.appendChild(newBkm);
        newBkm.appendChild(bkmIcon);
        // Create a new div called Name for the link 
        const newName = document.createElement("div");
        newName.className = "name";
        newBkm.appendChild(newName);

        //Create elements for favicon and URL
        const newBkmImg = document.createElement("img");
        const newBkmURL = document.createElement("a");
        newBkmImg.src = `https://s2.googleusercontent.com/s2/favicons?domain_url=${newWebURL}&sz=32`;
        newBkmImg.alt = newWebsiteName;
        newBkmURL.href = newWebURL;
        newBkmURL.target = "_blank";
        newBkmURL.innerHTML = newWebsiteName;
        newName.appendChild(newBkmImg);
        newName.appendChild(newBkmURL);
}

function updateBookmark(e) {
        //Prevent page from refreshing when the button is clicked
        e.preventDefault();
        newWebsiteName = e.srcElement[0].value;
        newWebURL = e.srcElement[1].value;
        if (!newWebURL.includes('https://') && !newWebURL.includes('http://')) {
            newWebURL = `https://${newWebURL}`; 
        }
        validate(newWebsiteName, newWebURL);
        formBtn.addEventListener('click', closeModalForm);

        //Saving in Local Storage the object of countdown
        savedBookmarks = {
            title: newWebsiteName,
            URL: newWebURL
        }
        //Saving object into array and saving array on the storage
        allBookmarks = JSON.parse(localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : []
        allBookmarks.push(savedBookmarks)
        localStorage.setItem('bookmarks', JSON.stringify(allBookmarks))
}


function restorePrev() {
    //Get bookmark from Local Storage if available
    if(localStorage.getItem("bookmarks")) {
        //Getting array from the storage
        allBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        for(let i = 0; i < allBookmarks.length; i++) {
        // Assigning values for each object in the array
        newWebsiteName = allBookmarks[i].title;
        newWebURL = allBookmarks[i].URL;
        createNewElements();
        }
    }
}

//Validating the form entries and creating entries if valid
function validate(newWebsiteName, newWebURL){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!newWebURL || !newWebsiteName) {
        alert("Please provide values for both fields.");
        return false;
    }
    if(!newWebURL.match(regex)) {
        alert("Please provide a valid web address");
        return false;
    }
    //Valid
    createNewElements();
    return true;
}





//Adding event listeners
// bookmarkExit.addEventListener('click', deleteBkm);

bookmarkForm.addEventListener('submit', updateBookmark);
showModalContainer.addEventListener('click', showModal);

closeModal.addEventListener('click', closeModalForm);




//Check if there is local storage and restore it
restorePrev();