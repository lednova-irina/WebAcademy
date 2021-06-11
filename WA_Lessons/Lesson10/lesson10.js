//Closures and Scopes
function createFunctions(n) {
  const callbacks = [];
  while (callbacks.length < n) {
    const index = callbacks.length;
    callbacks.push(function () {
      return index;
    });
  }
  return callbacks;
}

//Can you keep a secret?
function createSecretHolder(secret) {
  const wrapper = function () {
    let privateSecret = secret;
    const secretHolder = {
      getSecret: function () {
        return privateSecret;
      },
      setSecret: function (value) {
        privateSecret = value;
      },
    };

    return secretHolder;
  };
  return wrapper();
}


