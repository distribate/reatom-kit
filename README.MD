# @distribate/reatom-kit

## Installation
```bash
pnpm add @distribate/reatom-kit
```

## Reatom Kit

A collection of lightweight extensions and integration helpers for [Reatom](https://v3.reatom.dev/) version 3.

Reatom Kit provides small utilities for common application-level concerns around Reatom state and actions without introducing additional abstractions or changing Reatom's programming model.

### Overview

The package provides:

- **State extensions** for atom history and async action parameters.
- **Development tooling** for logging atom changes and action calls.
- **Integration helpers** for connecting Reatom with external application infrastructure, currently including TanStack Router.
- **Configuration** for controlling development-oriented features such as logging.

The utilities are independent and composable. They extend existing Reatom primitives rather than wrapping or replacing them.

### Design

Reatom Kit intentionally keeps its scope small:

- Reuse native Reatom primitives and APIs.
- Keep extensions composable and opt-in.
- Avoid introducing another state management abstraction.
- Keep external integrations isolated from core extensions.
- Keep development tooling lightweight and configurable.
