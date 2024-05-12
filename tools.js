if ("token" in localStorage) {
  // User is logged in, do nothing
} else {
  window.location.href = "./login.html";
}

let token = localStorage.getItem("token");

let headers = {
  Authorization: token,
  "x-super-properties":
    "ewogICJvcyI6ICJXaW5kb3dzIiwKICAiY2xpZW50X2J1aWxkX251bWJlciI6IDE1MjQ1MAp9",
};

function getGuildCount() {
  fetch("https://discord.com/api/v10/users/@me/guilds", { headers })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 429) {
        Toastify({
          text: "Ratelimited!",
          duration: 3000,
          newWindow: true,
          gravity: "top",
          position: "right", 
          stopOnFocus: true,
          style: {
            background: "#e73131",
            color: "#ffffff",
          }
        }).showToast();} else {
          Toastify({
            text: "An error occurred.",
            duration: 3000,
            newWindow: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true,
            style: {
              background: "#e73131",
              color: "#ffffff",
            }
          }).showToast();
        }
      }
    })
    .then((data) => {
      let guild_count = data.filter((item) => item.hasOwnProperty("id")).length;
      Toastify({
        text: "Servers: " + guild_count,
        duration: 3000,
        newWindow: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "#111c1d",
          color: "#e2fcfa",
        }
      }).showToast();
    })
    .catch((error) => {
      console.error(error);
    });
}