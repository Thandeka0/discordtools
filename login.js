if ("token" in localStorage) {
  window.location.href = "./index.html";
} else {
  // User isn't logged in, stay on the login page
}

let loginbutton = document.getElementById("login-button");
let tokeninput = document.getElementById("token");

async function isValid() {
  let headers = {
    Authorization: tokeninput.value,
  };

  let response = await fetch("https://canary.discord.com/api/v9/users/@me/relationships", {
    headers,
  });

  return response.status === 200;
}

loginbutton.addEventListener("click", async function () {
    if (await isValid()) {
      console.log("Token is valid:", tokeninput.value);
      localStorage.setItem("token", tokeninput.value);
      console.log("Token set in localStorage:", localStorage.getItem("token"));
      window.location.href = "./index.html";
    } else {
      alert("Invalid token!");
    }
  });
  