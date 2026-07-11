# FindAFriend

Instruções, estrutura, regras e requisitos do projeto.

Este projeto consiste no desenvolvimento de uma API REST chamada **FindAFriend** para um sistema de adoção de animais. Deve reforçar os conceitos de SOLID e a prática de testes automatizados.

## Funcionalidades da aplicação

- Cadastro de um pet
- Listagem de todos os pets disponíveis para adoção em uma determinada cidade
- Filtragem de pets com base em suas características (idade, porte, etc.)
- Visualização dos detalhes de um pet específico
- Cadastro de uma ORG (organização)
- Login de uma ORG no sistema

## Regras de negócio

As seguintes condições devem ser implementadas:

1. A informação da cidade é obrigatória para listar os pets.
2. Uma ORG deve, obrigatoriamente, ter um endereço e um número de WhatsApp.
3. Todo pet cadastrado precisa estar vinculado a uma ORG.
4. O contato do usuário interessado em adotar um pet será feito diretamente com a ORG via WhatsApp.
5. Todos os filtros de características do pet, com exceção da cidade, são opcionais.
6. Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar logada.

---

Checklist de Desenvolvimento - API Pets
[] Cadastro de ORG: Criar rota para registrar uma Organização (deve incluir endereço e número de WhatsApp).

[] Login de ORG: Criar rota de autenticação para as organizações.

[] Cadastro de Pet: Criar rota para cadastrar um pet, garantindo a associação obrigatória com uma ORG.

[] Listagem de Pets: Criar rota para listar pets, utilizando a cidade como parâmetro obrigatório.

[] Filtros de Pets: Implementar a funcionalidade de filtros opcionais por características dos animais na listagem.

[] Detalhes do Pet: Criar rota para visualizar os detalhes de um pet específico.

[] Controle de Acesso: Garantir que as funcionalidades administrativas da ORG sejam restritas a usuários logados.

[] Arquitetura: Aplicar os princípios SOLID durante o desenvolvimento da estrutura da API.

[] Testes: Criar testes automatizados para validar as funcionalidades e todas as regras de negócio.
