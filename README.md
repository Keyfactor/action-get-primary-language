# action-get-primary-language
Get Primary Language
```
name: CI Testing Primary Language
on: [push]

jobs:
  read_type:
    runs-on: ubuntu-latest
    name: Detect Primary Language
    steps:
      # To use this repository's private action,
      # you must check out the repository
      # Temporarily public, testing in personal Org
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GH_PAT}}
      - name: Read integration_type
        id: read
        uses: fiddlermikey/action-get-primary-language@v1
        with:
          token: ${{ secrets.GH_PAT}}
      - name: Display type
        id: display
        run: |
          echo ${{ steps.read.outputs.primary_language}} | tee -a $GITHUB_STEP_SUMMARY


