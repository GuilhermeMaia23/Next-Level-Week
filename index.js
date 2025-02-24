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
    <main>
      <h3 class="title">Inscrição confirmada!</h3>

      <p class="description__confirm">
        Convide mais pessoas e concorra a prêmios! <br/>
        Compartilhe o link e acompanhe as inscrições:
      </p>

      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="Link icon">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${
          userData.ref
        }" disabled>

      </div>
    </main>

    <section class="stats">
        <h4>
           ${getTotalSubscribers(userData)}
        </h4>

        <p>
            Inscrições feitas!
        </p>
    </section>
    `;
  app.setAttribute("class", "page-invite");
  updateImageLinks();
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

const updateImageLinks = () => {
  document.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http")) {
      img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
    }
  });
};

const startApp = () => {
  const content = `
   <main>
    <section class="about">
      <div class="section-header">
        <h2>
          Sobre o evento
        </h2>
        <span class="badge">AO VIVO</span>
      </div>

      <p class="description">
        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
        <br/><br/>Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
      </p>
    </section>

    <section class="registration">
      <h2>Inscrição</h2>

      <form id="form">
        <div class="input-wrapper">
          <div class="input-group">
            <label for="email">
              <img src="mail.svg" alt="Email icon">
            </label>
            <input type="email" id="email" name="email" placeholder="E-mail">
          </div>

          <div class="input-group">
            <label for="phone">
              <img src="phone.svg" alt="Phone icon">
            </label>
            <input type="text" id="phone" name="phone" placeholder="Telefone">
          </div>
        </div>

        <button>
          Confirmar
          <img src="arrow.svg" alt="Arrow right">
        </button>
      </form>
    </section>
  </main>
`;
  app.innerHTML = content;
  app.setAttribute("class", "page-start");
  updateImageLinks();
  formAction();
};

startApp();

document.getElementById("logo").onclick = () => startApp();
