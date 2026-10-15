# One-time setup on a new Windows laptop. Needs Node 20.9+ and Python 3.10+.
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

Write-Host "== Backend ==" -ForegroundColor Cyan
Set-Location "$root\backend"
if (-not (Test-Path .venv)) { python -m venv .venv }
.\.venv\Scripts\python.exe -m pip install -q -r requirements.txt
if (-not (Test-Path .env)) { Copy-Item .env.example .env; Write-Host "Created backend\.env: fill in your values" -ForegroundColor Yellow }

Write-Host "== Frontend ==" -ForegroundColor Cyan
Set-Location "$root\frontend"
npm install
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local; Write-Host "Created frontend\.env.local: fill in your values" -ForegroundColor Yellow }

Set-Location $root
Write-Host "Done. Run ./start-dev.ps1" -ForegroundColor Green
