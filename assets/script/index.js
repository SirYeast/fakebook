"use strict";

import Subscriber from "./Subscriber.js";

const profileImgPath = "assets/img/profilepicture.jpg";

const headerProfileImg = document.querySelector(".profile-picture img");

const postTextArea = document.querySelector("textarea");
const postInputFile = document.querySelector("input[type=file]");
const postFileName = document.getElementById("post-file-name");
const postButton = document.getElementById("post-btn");
const postSection = document.querySelector("section");
const postTemplate = document.getElementById("post-template");

const modalWrapper = document.getElementById("modal-wrapper");
const profileInfo = document.getElementById("modal-profile-info");
const closeButton = document.getElementById("modal-close-btn");

const subscriber = new Subscriber(
    "AA-000-001",
    "John Smith",
    "johnnyboy68",
    "jsmith68@gmail.com",
    ["Elysian", "Synapse", "Proto Smasher", "Veil"],
    ["Cool Boys", "Xpert Devs", "Sus Impostors"],
    true
);

let selectedFile = null;

function post() {
    let text = postTextArea.value.trim();

    if (text.length == 0 && !selectedFile) {
        return;
    }

    const newPost = postTemplate.content.cloneNode(true);
    newPost.querySelector(".profile-picture img").src = profileImgPath;
    newPost.querySelector(".post-user-name").innerText = subscriber.userName;
    newPost.querySelector(".post-date").innerText = new Date().toDateString();

    const content = newPost.querySelector(".post-content");

    if (text.length != 0) {
        const paragraph = document.createElement("p");
        paragraph.innerText = text;
        content.appendChild(paragraph);
    }

    if (selectedFile) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(selectedFile);
        content.appendChild(img);
    }

    postSection.appendChild(newPost);

    postTextArea.value = "";
    selectedFile = null;
    postFileName.innerText = "";
}

window.addEventListener("load", function() {
    headerProfileImg.src = profileImgPath;

    postTextArea.placeholder = `What's new, ${subscriber.name.slice(0, subscriber.name.indexOf(" "))}?`;

    for (let subInfo of subscriber.getInfo()) {
        const info = document.createElement("p");
        info.innerText = subInfo;
        profileInfo.appendChild(info);
    }
});

headerProfileImg.addEventListener("click", function() {
    modalWrapper.style.display = "flex";
});

postInputFile.addEventListener("change", function() {
    selectedFile = postInputFile.files[0];

    postFileName.innerText = selectedFile.name;
});

postButton.addEventListener("click", post);

closeButton.addEventListener("click", function() {
    modalWrapper.style.display = "none";
});