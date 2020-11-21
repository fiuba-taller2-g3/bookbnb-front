const nameValidation = (fieldValue) => {
    var nameFormat = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
    
    if (!fieldValue) {
      return '*Este es un campo obligatorio';
    }
    if (!nameFormat.test(fieldValue)) {
      return `*Campo con caracteres invalidos`;
    }
    if (fieldValue.trim().length < 3) {
      return '*Debe tener al menos tres caracteres';
    }
    return null;
  };
  
  const emailValidation = email => {
    var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (mailformat.test(email)) {
      return null;
    }
    if (!email) {
      return '*Este es un campo obligatorio';
    }
    return '*Por favor ingrese un email valido';
  };
  
  const dniValidation = dni => {
    var dniFormat = /^[0-9]*$/;
    if(dniFormat.test(dni)) {
      if(dni.length < 7) {
        return '*Ingrese un dni valido, debe contener al menos 7 digitos';
      }
      return null;
    }
    return '*Ingrese solo números'
  }
  
  const passwordsValidation = (pass, passConfirmed) => {
    if (pass && passConfirmed) {
      if (pass !== passConfirmed) {
        return '*Las contraseñas no coinciden';
      }
    }
    return null
  }
  
  const passwordValidation = pass => {
    if (!pass) {
       return'*Este es un campo obligatorio'
    }
    return null
  }
  
  const validate = values => {
    var errors = {};
    var errorPasswordsNotMatch = '';
    errors.name = nameValidation(values.name);
    errors.surname = nameValidation(values.surname);
    errors.dni = dniValidation(values.dni);
    errors.email = emailValidation(values.email);
    errors.password = passwordValidation(values.password);
    errors.passwordConfirmed = passwordValidation(values.passwordConfirmed);
    errorPasswordsNotMatch = passwordsValidation(values.password, values.passwordConfirmed);
    if (errorPasswordsNotMatch) {
      errors.password = errorPasswordsNotMatch;
      errors.passwordConfirmed = errorPasswordsNotMatch;
    }
    if(!errors.name && !errors.surname && !errors.surname && !errors.dni && !errors.email && !errors.password && !errors.passwordConfirmed) {
      errors = {}
    }
    return errors
  }

  export default validate