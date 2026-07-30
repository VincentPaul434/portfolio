import { access, cp, mkdir, rm } from "node:fs/promises"
import { resolve } from "node:path"

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch (error) {
    if (error?.code === "ENOENT") return false
    throw error
  }
}

export function sites() {
  let root = "."

  return {
    name: "sites",
    apply: "build",
    configResolved(config) {
      root = config.root
    },
    async buildStart() {
      await rm(resolve(root, "dist"), { recursive: true, force: true })
    },
    async closeBundle() {
      const distDirectory = resolve(root, "dist")
      const metadataDirectory = resolve(distDirectory, ".openai")
      const serverDirectory = resolve(distDirectory, "server")
      const hostingConfig = resolve(root, ".openai", "hosting.json")
      const workerEntry = resolve(root, "worker", "index.js")

      await rm(metadataDirectory, { recursive: true, force: true })
      await rm(serverDirectory, { recursive: true, force: true })
      await mkdir(metadataDirectory, { recursive: true })
      await mkdir(serverDirectory, { recursive: true })

      if (await exists(hostingConfig)) {
        await cp(hostingConfig, resolve(metadataDirectory, "hosting.json"))
      }

      await cp(workerEntry, resolve(serverDirectory, "index.js"))
    },
  }
}
