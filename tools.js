if (!localStorage.getItem("token")) {
  window.location.href = "./login.html";
}

const token = localStorage.getItem("token");

const headers = {
  Authorization: token,
  "x-super-properties": "ewogICJvcyI6ICJXaW5kb3dzIiwKICAiY2xpZW50X2J1aWxkX251bWJlciI6IDE1MjQ1MAp9",
};

const showToast = (message, background, color) => {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: background,
      color: color,
    },
  }).showToast();
};

const handleErrors = async (response) => {
  if (!response.ok) {
    if (response.status === 429) {
      showToast("Ratelimited!", "#e73131", "#ffffff");
    } else {
      showToast("An error occurred.", "#e73131", "#ffffff");
    }
    throw Error(response.statusText);
  }
  return response;
};

const getGuildCount = async () => {
  try {
    const response = await fetch("https://discord.com/api/v10/users/@me/guilds", { headers });
    await handleErrors(response);
    const data = await response.json();
    const guild_count = data.filter((item) => item.hasOwnProperty("id")).length;
    showToast("Servers: " + guild_count, "#111c1d", "#e2fcfa");
  } catch (error) {
    console.error(error);
  }
};

const countRelationships = async () => {
  try {
    const response = await fetch("https://discord.com/api/v9/users/@me/relationships", { headers });
    await handleErrors(response);
    const data = await response.json();
    let friends = 0, blocked = 0, ofr = 0, ifr = 0;

    for (const relationship of data) {
      if (relationship.type === 1) {
        friends++;
      } else if (relationship.type === 2) {
        blocked++;
      } else if (relationship.type === 3) {
        ifr++;
      } else if (relationship.type === 4) {
        ofr++;
      }
    }

    const info = `
    Friends: ${friends}⠀Outgoing friend requests: ${ofr}<br>
    Blocked: ${blocked}⠀Incoming friend requests: ${ifr}
    `;

    document.getElementById('relationship-info').innerHTML = info

  } catch (error) {
    console.error("Error:", error.message);
  }
};



const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};