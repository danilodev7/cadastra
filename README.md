# 🛒 Projeto de E-Commerce

Bem-vindo ao projeto de E-Commerce! Este projeto é uma aplicação web para um site de comércio eletrônico, onde os usuários podem visualizar produtos, aplicar filtros, ordenar produtos e adicionar itens ao carrinho de compras.

## 🚀 Tecnologias Utilizadas

- **TypeScript**: Linguagem de programação que estende o JavaScript adicionando tipos estáticos.
- **HTML5**: Linguagem de marcação utilizada para estruturar o conteúdo da web.
- **CSS3**: Linguagem de estilo utilizada para estilizar o conteúdo da web.
- **API**: Interface para realizar requisições HTTP assíncronas.

## 📂 Estrutura do Projeto

- **src/ts**: Contém os arquivos TypeScript.
  - `Product.ts`: Define a interface `Product`.
  - `index.ts`: Arquivo principal que inicializa a aplicação.
  - `api.ts`: Função para buscar produtos do servidor.
- **src/components**: Contém os componentes da aplicação.
  - `setupCart.ts`: Configura o carrinho de compras.
  - `setupCartModal.ts`: Configura o modal do carrinho de compras.
  - `setupFilters.ts`: Configura os filtros de produtos.
  - `setupFilterModal.ts`: Configura o modal de filtros.
  - `setupSortModal.ts`: Configura o modal de ordenação.
  - `renderProducts.ts`: Função para renderizar os produtos na página.
  - `filtersProduct/colorFilter.ts`: Cria o filtro de cores.
  - `filtersProduct/sizeFilter.ts`: Cria o filtro de tamanhos.
  - `filtersProduct/priceFilter.ts`: Cria o filtro de preços.
  - `filtersProduct/sortFilter.ts`: Cria o filtro de ordenação.

## 📜 Métodos Principais

### `fetchProducts(page: number = 1, limit: number = 9): Promise<Product[]>`
Busca produtos do servidor com paginação.

### `setupCart()`
Configura o carrinho de compras e atualiza a exibição do carrinho.

### `setupCartModal()`
Configura o modal do carrinho de compras.

### `setupFilters(products: Product[])`
Configura os filtros de produtos.

### `setupFilterModal(products: Product[])`
Configura o modal de filtros.

### `setupSortModal(products: Product[])`
Configura o modal de ordenação.

### `renderProducts(products: Product[], append: boolean = false)`
Renderiza os produtos na página.

## 🌟 Funcionalidades Extras

### Mini-cart Funcional
Nosso projeto inclui um Mini-cart funcional, que conta com um contador de produtos adicionados ao carrinho e cálculo de preço final com atualização em tempo real. Não deixe de testar essa funcionalidade extra para uma experiência de compra mais dinâmica e interativa!

## 📦 Dependências

### Produção
- **TypeScript**
- **HTML5**
- **CSS3**
- **Fetch API**

### Desenvolvimento
- **Webpack**: Empacotador de módulos JavaScript.
- **Babel**: Transpilador JavaScript.
- **ESLint**: Ferramenta de linting para JavaScript/TypeScript.
- **Prettier**: Formatador de código.

## 🛠️ Execução do Projeto

### Ambiente de Desenvolvimento

1. Clone o repositório:
   ```bash
   git clone https://github.com/danilodev7/cadastra
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

   O projeto irá levantar dois servidores:
   - Front-end: Acessível em [http://localhost:3000](http://localhost:3000)
   - JSON Server (API de produtos): Acessível em [http://localhost:5000/products](http://localhost:5000/products)

### Ambiente de Produção

1. Gere o build de produção:
   ```bash
   npm run build
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```

## 📧 Contato

Para mais informações, entre em contato pelo e-mail: [danilodev7@gmail.com](mailto:danilodev7@gmail.com)

---

Feito com ❤️ por Danilo Dev
