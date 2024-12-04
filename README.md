
## License

This project is licensed under the **BSD 3-Clause License with Specific Usage Restrictions**.

### Key Terms

- **Permitted Use**: This software may only be used to develop applications (frontend or backend) that directly interface with the Merkl incentive distribution solution.
- **Prohibited Uses**:
  - Developing standalone applications unrelated to the original backend.
  - Creating competitive backend services or applications.
  - Reverse engineering the core backend logic.
  - Developing alternative backend implementations.
- **Commercial Use**: Commercial use of this software, including incorporating it into paid products or services, is **strictly prohibited without prior written approval** from Angle Labs, Inc. For inquiries regarding commercial use, contact [contact@merkl.xyz](contact@merkl.xyz)

### Full License

For detailed terms and conditions, refer to the [`LICENSE`](./LICENSE) file in this repository.


# Welcome to Merkl Lite !

## Prerequisites
- [Bun](https://bun.sh/)
- [Remix](https://remix.run/docs)

## Installation

1. Go to `cd packages/dappkit`
2. `git submodule init`
3. `git submodule update`
4. `bun i`
5. `cd ../..`
6. `bun i`
7. `bun dev`

## Development

Run the dev server:

```shellscript
bun dev
```


## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Updating a fork

When pulling changes from `merkl-lite`, you have to:

```
# (On the forked repository)

# Fetch commits on merkl lite
git fetch merkl-lite

# Open a branch from main
git checkout main
git checkout -b sync

# Merge changes from upstream
git merge merkl-lite/main

# Open a sync PR
```
