let cuentas = [
    { nombre: "Krystel", password: "krystel", saldo: 100 },
    { nombre: "Andres", password: "andres", saldo: 200 },
    { nombre: "Fausto", password: "fausto", saldo: 300 },
  ];
  
  let saldo;
  let user;
  let userIndex;
  
  function login() {
    user = document.getElementById("username").value;
    let pwd = document.getElementById("password").value;
    let msg = document.getElementById("message");
    userIndex = cuentas.findIndex((element) => element.nombre === user);
  
    if (cuentas[userIndex] === undefined) {
      msg.classList.add("text-danger");
      msg.innerHTML = "Usuario o contraseña incorrectos, verifique";
    } else if (cuentas[userIndex].password === pwd) {
      saldo = Number(cuentas[userIndex].saldo);
      document.getElementById("saludo").innerHTML = "Hola, " + user;
      document.getElementById("viewSaludo").classList.remove("d-none");
      document.getElementById("viewLogin").classList.add("d-none");
      document.getElementById("viewPrincipal").classList.remove("d-none");
    } else {
      msg.classList.add("text-danger");
      msg.innerHTML = "Usuario o contraseña incorrectos, verifique";
    }
  }
  
  function logout() {
    document.getElementById("viewPrincipal").classList.add("d-none");
    document.getElementById("viewSaludo").classList.add("d-none");
    document.getElementById("viewLogin").classList.remove("d-none");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("montoRetiro").value = "";
    document.getElementById("montoDeposito").value = "";
    document.getElementById("message").innerHTML = "";
    document.getElementById("messageDeposito").innerHTML = "";
    document.getElementById("messageRetiro").innerHTML = "";
  }
  
  function displaySaldo() {
    document.getElementById("viewPrincipal").classList.add("d-none");
    document.getElementById("viewConsulta").classList.remove("d-none");
    document.getElementById("viewBotonRegresar").classList.remove("d-none");
    document.getElementById("saldo").innerHTML = "$ " + saldo;
  }
  
  function displayRetiro() {
    document.getElementById("viewPrincipal").classList.add("d-none");
    document.getElementById("viewRetiro").classList.remove("d-none");
    document.getElementById("viewBotonRegresar").classList.remove("d-none");
  }
  
  function displayDeposito() {
    document.getElementById("viewPrincipal").classList.add("d-none");
    document.getElementById("viewDeposito").classList.remove("d-none");
    document.getElementById("viewBotonRegresar").classList.remove("d-none");
  }
  
  function regresar() {
    document.getElementById("viewPrincipal").classList.remove("d-none");
    document.getElementById("viewConsulta").classList.add("d-none");
    document.getElementById("viewRetiro").classList.add("d-none");
    document.getElementById("viewDeposito").classList.add("d-none");
    document.getElementById("viewBotonRegresar").classList.add("d-none");
    document.getElementById("montoRetiro").value = "";
    document.getElementById("montoDeposito").value = "";
    document.getElementById("messageDeposito").innerHTML = "";
    document.getElementById("messageRetiro").innerHTML = "";
  }
  
  function hacerRetiro() {
    let montoRetiro = Number(document.getElementById("montoRetiro").value);
    if (document.getElementById("montoRetiro").value == "") {
      document.getElementById("messageRetiro").innerHTML =
        "Ingresa una cantidad válida para retirar.";
      document.getElementById("messageRetiro").classList.add("text-danger");
    } else if (saldo - montoRetiro < 10) {
      document.getElementById("messageRetiro").innerHTML =
        "Tu saldo no puede ser menor a 10. Intenta retirar una menor cantidad.";
      document.getElementById("messageRetiro").classList.add("text-danger");
      document.getElementById("montoRetiro").value = "";
    } else {
      saldo -= montoRetiro;
      document.getElementById("messageRetiro").innerHTML =
        "Retiraste exitosamente la cantidad de " +
        montoRetiro +
        ". Tu nuevo saldo es de " +
        saldo;
      document.getElementById("messageRetiro").classList.remove("text-danger");
      document.getElementById("messageRetiro").classList.add("text-success");
      document.getElementById("montoRetiro").value = "";
    }
  }
  
  function hacerDeposito() {
    let montoDeposito = Number(document.getElementById("montoDeposito").value);
    if (document.getElementById("montoDeposito").value == "") {
      document.getElementById("messageDeposito").innerHTML =
        "Ingresa una cantidad válida para depositar.";
      document.getElementById("messageDeposito").classList.add("text-danger");
    } else if (saldo + montoDeposito > 990) {
      document.getElementById("messageDeposito").innerHTML =
        "Tu saldo no puede ser mayor a 990. Intenta depositar una menor cantidad.";
      document.getElementById("messageDeposito").classList.add("text-danger");
      document.getElementById("montoDeposito").value = "";
    } else {
      saldo += montoDeposito;
      document.getElementById("messageDeposito").innerHTML =
        "Depositaste exitosamente la cantidad de " +
        montoDeposito +
        ". Tu nuevo saldo es de " +
        saldo;
      document.getElementById("messageDeposito").classList.remove("text-danger");
      document.getElementById("messageDeposito").classList.add("text-success");
      document.getElementById("montoDeposito").value = "";
    }
  }