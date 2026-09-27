export interface DocsVersion {
  id: string
  label: string
  url: string
}

// Each major version's docs are deployed from their own branch. The v0 docs
// live on the frozen `v0` branch, served from its Netlify branch subdomain.
export const docsVersions: DocsVersion[] = [
  { id: 'v1', label: 'v1', url: 'https://animxyz.com' },
  { id: 'v0', label: 'v0.6', url: 'https://v0.animxyz.com' },
]

// Set per branch: 'v1' on master/v1, 'v0' on the v0 branch.
export const currentVersionId = 'v0'

export const currentVersion = docsVersions.find((v) => v.id === currentVersionId)!
export const latestVersion = docsVersions[0]
export const isLatestVersion = currentVersion === latestVersion
