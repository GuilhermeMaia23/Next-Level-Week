const app = document.getElementById("app");
const user = [
  {
    email: "gumstere@gmail.com",
    phone: "21972389224",
    ref: 100,
    refBy: null,
  },
  {
    email: "gomstere@gmail.com",
    phone: "1111111111",
    ref: 200,
    refBy: 100,
  },
  {
    email: "tost@gmail.com",
    phone: "1111111111",
    ref: 300,
    refBy: 100,
  },
];

const getUser = (userData) => {
  const userFound = user.find((user) => user.email == userData.email);
  return userFound;
};

const getTotalSubscribers = (userData) => {
  const subs = user.filter((user) => user.refBy == userData.ref);
  return subs.length;
};

const showInvite = (userData) => {
  app.innerHTML = `
    <input id="link" value="https://evento.com?ref${userData.ref}" disabled />
    <div id="stats">
      <h4><span id="total">${getTotalSubscribers(userData)}</span> Total</h4>
      <p>Inscrições feitas</p>
    </div>
    `;
};

const saveUser = (userData) => {
  const newUser = {
    email: userData.email,
    phone: userData.phone,
    ref: Math.round(Math.random() * 1000),
    refBy: 100,
  };
  user.push(newUser);
  return newUser;
};

const formAction = () => {
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const user = getUser(userData);
    if (user) {
      showInvite(user);
    } else {
      const newUser = saveUser(userData);
      showInvite(newUser);
      // email: userData.email,
      // phone: userData.phone,
      // ref: Math.floor(Math.random() * 1000),
      // refBy: 100,
    }
  };
};

const startApp = () => {
  const content = `
   <form id="form">
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="phone" placeholder="Telefone" />
        <button>
            Confirmar
        </button>
    </form>
  `;
  app.innerHTML = content;
  formAction();
};

startApp();

document.getElementById("logo").onclick = () => startApp();
