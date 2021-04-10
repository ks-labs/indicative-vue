# Indicative Vue

[![CI/CD - GHPackages](https://github.com/ks-labs/indicative-vue/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/ks-labs/indicative-vue/actions/workflows/npm-publish.yml/badge.svg)

Esse projeto é uma abstração do Validation utilizado no Adonis com o pacote indicative

## Instalação

Baixe o pacote rodando em seu terminal:

```bash
  npm i @ks-labs/indicative-vue
```

Instale o pacote no seu projeto Vue.js

```js
  ...
  import IndicativeVue from "@ks-labs/indicative-vue";
  ...
  Vue.use(IndicativeVue);
  ...
```

## Uso

O Indicative Vue espera a seguinte estrutura de pasta:

```
src/
| - validation
  | - User.js
main.js
App.vue
```

O conteúdo no arquivo User.js segue o mesmo padrão utilizado no Adonis.js

```js
// src/validation/User.js
class User {
  get rules() {
    return {
      name: "string",
    };
  }

  get messages() {
    return {
      "name.string": "Campo Nome deve ser do tipo string.",
    };
  }

  ...

}

module.exports = new User();
```

Após a instalação do pacote um novo metodo ficara disponivel na instancia do Vue.js permitindo ser utilizado dessa forma:

```js
const result = await this.$indicative(
  { toi: "1de3" },
  require("@/validation/User.js")
);

// result = { valid: true or false, errors: [] *caso possua* }
```

### Retorno dos erros

Caso possua erro por padrão o retorno de erro ira percorrer a DOM buscando identificadores referentes a keys inseridas no metodo rules e apos isso ira adicionar a classe "is-invalid" para todos.
A mensagem de erro sera adicionada diretamente na tag que possuir o seguinte padrão `[field.name]_message`.

Ou seja:

```html
<input id="name" type="text" />
<p id="name_message"></p>
```

Caso você deseja retornar somente a lista de erro podera alterar as opções no plugin da seguinte forma:

```js
    ...
  import IndicativeVue from "@ks-labs/indicative-vue";
  ...
  Vue.use(IndicativeVue, {return_error: true});
  ...
```

## Criar validações e sanitizor customizados

Você podera criar validações customizadas seguindo o padrão do indicative e inserindo-as nas opções do plugin

```js
// src/customValidation/NameValidation.js

export const name = {
  async: false,
  validate: function(data: any, field: any) {
    data = data.original;
    if (data[field]) return true;
    else throw Error;
  },
};
```

E na configuração do plugin:

```js
      ...
  import IndicativeVue from "@ks-labs/indicative-vue";
  import CustomValidations from 'src/customValidation/NameValidation.js'
  ...
  Vue.use(IndicativeVue, {
    return_error: true,
    validations: {
      CustomValidations
      }
    });
  ...
```

E da mesma forma podera ser feita com os Sanitizor. Para mais informações de como criar Validações e Sanitizor customizados acesse a documentação do [Indicative](https://indicative.adonisjs.com/guides/master/introduction)
