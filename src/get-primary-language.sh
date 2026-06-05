#!/bin/bash

set -e

# Get the repository root directory
REPO_ROOT="${GITHUB_WORKSPACE:-.}"

# Check for Go indicators
if [[ -f "$REPO_ROOT/.goreleaser" ]] || [[ -f "$REPO_ROOT/go.mod" ]]; then
  echo "primary_language=Go" | tee -a $GITHUB_OUTPUT
  echo "Detected primary language: Go"
  exit 0
fi

# Check for C# indicators
if [[ -f "$REPO_ROOT/.sln" ]]; then
  echo "primary_language=C#" | tee -a $GITHUB_OUTPUT
  echo "Detected primary language: C#"
  exit 0
fi

# Check for .csproj files within one level deep
if find "$REPO_ROOT" -maxdepth 2 -name "*.csproj" -type f | grep -q .; then
  echo "primary_language=C#" | tee -a $GITHUB_OUTPUT
  echo "Detected primary language: C#"
  exit 0
fi

# No primary language detected
echo "primary_language=Unknown" | tee -a $GITHUB_OUTPUT
echo "No primary language detected"
