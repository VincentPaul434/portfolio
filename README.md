# Vincent Paul Dumangcas - Portfolio

A desktop-style portfolio built with React and Vite.

The interface recreates a compact operating-system workspace with draggable, resizable, and
persistent windows; personalized project folders and text files; a nine-app dock; search; display
settings; and a working command-line interface. Its content is based on Vincent's current projects,
education, stack, and contact details.

Typography uses DM Sans for the interface, Newsreader for editorial headings, and Geist Mono for
text editors and Terminal. The visual palette is Vincent's moss, cream, and acid green.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

The project includes Vercel history fallbacks for app and project routes.

## Source structure

```text
src/
├── components/
│   ├── common/       # Reusable portfolio components
│   └── ui/           # Small UI primitives
├── config/           # Contact links and application constants
├── hooks/            # Shared React hooks
├── lib/              # Shared library helpers
├── pages/
│   └── Portfolio/    # Route-level portfolio workspace
├── styles/           # Global application styles
├── App.jsx           # Root application shell
└── main.jsx          # Vite entry point
```

The portfolio intentionally has no `features`, authentication, store, services, or protected-route
layers. Those folders should be introduced only when real functionality requires them.
