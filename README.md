# action-get-primary-language
Get Primary Language

Set a personal PAT on the repository or an organization PAT with minimal rights called GH_PAT

Use the ${{ needs.read_type.outputs.primaryLanguage}} in subsequent jobs

```
name: CI Testing Primary Language
on: [push]

jobs:
  read_type:
    outputs:
      primaryLanguage: ${{ steps.read.outputs.primary_language }}
    runs-on: ubuntu-latest
    name: Detect Primary Language
    steps:
      - name: Read integration_type
        id: read
        uses: fiddlermikey/action-get-primary-language@v1
        with:
          token: ${{ secrets.GH_PAT}}
      - name: Display type
        id: display
        run: |
          echo ${{ steps.read.outputs.primary_language}} | tee -a $GITHUB_STEP_SUMMARY


