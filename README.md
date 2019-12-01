# Utils commands

Reload PowerShell path

```bash
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

# Start

```bash
npm run dev
```

# Test

```bash
npm run test
```
