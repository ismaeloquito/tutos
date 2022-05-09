var accounts = [
  {
    user: 'Alfa', 
    saldo: 200,
    password: 789
  },
  {
    user: 'Yammy',
    saldo: 290,
    password: 456
  },
  {
    user: 'Aly',
    saldo: 67,
    password: 123
  }
];


function iniciar({ user, password }){
    const resultado = accounts.find(accounts  => accounts.user === user.value);
    localStorage.setItem('currentUser', JSON.stringify(resultado));
    if (resultado) {
        if (password.value==resultado.password) {
          location='principal.html'
        } else {
          alert('Contraseña incorrecta')
        }
    } else {
        alert('Usuario incorrecto')
    }
}

////
    function currentUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
    
    function consultar() {
      const { saldo } = currentUser();
      document.getElementsByName('currentBalance')[0].value = saldo;
  }
    
    function depositar() {
      const payload = currentUser();
        let { saldo } = payload

        const deposito = parseFloat(document.getElementsByName('deposito')[0].value);

        if (isNaN(deposito)) {
            alert('El valor ingresado no es número válido');
            return;
        }

        if (saldo + deposito > 990) {
          alert('No puedes depositar esa cantidad, tu saldo total debe de ser igual o menor a $990')
          return;
        }

  
        payload.saldo = saldo + deposito;
        localStorage.setItem('currentUser', JSON.stringify(payload));
        document.getElementById('balance').value = payload.saldo 
        resetValue('deposit');
        alert('Depositaste $' + deposito + ', tu saldo es de $' + payload.saldo) 
    }

    function resetValue(id) {
      document.getElementById(id).value = ''
    }

    function retirar() {
      const payload = currentUser();
        let { saldo } = currentUser();
        const retiro = parseFloat(document.getElementsByName('retiro')[0].value);

        if (isNaN(retiro)) {
            alert('El valor ingresado no es número válido');
            return;
        }

        if (saldo - retiro < 10) {
          alert('No puedes retirar esa cantidad, tu saldo total debe de ser igual o mayor a $10')
          return;
        }

        if (retiro > saldo) {
            alert('Tu fondo disposible no es suficiente');
            return;
        }

        payload.saldo = saldo - retiro;
        localStorage.setItem('currentUser', JSON.stringify(payload));
        document.getElementById('balance').value = payload.saldo
        resetValue('withdraw');
        alert('Retiraste $' + retiro + ', tu saldo es de $' + payload.saldo)
    }