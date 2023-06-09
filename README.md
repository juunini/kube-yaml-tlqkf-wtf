<div align="center">

# Kube YAML tlqkf wtf

---

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![BunJS](https://img.shields.io/badge/Bun-beige?style=for-the-badge&logo=bun&logoColor=black)

</div>

---

## Install

> [bun](https://bun.sh/)이 설치되어 있어야 합니다.

```sh
git clone https://github.com/juunini/kube-yaml-tlqkf-wtf.git
bun install
```

## Start local server

```sh
bun run dev
```

## How to know `Repository ID` and `Discussion Category ID`?

Enter [GitHub GraphQL API Explorer](https://docs.github.com/en/graphql/overview/explorer) and run the following query.

```graphql
query { 
  repository(owner: "<name>", name: "<repository>") {
    id # RepositoryID
    name
    discussionCategories(first: 10) {
      nodes {
        id # CategoryID
        name
      }
    }
  }
}
```
