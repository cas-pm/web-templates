# github-actions

Workflow templates copied into a client repo by `create-client`.

- `build-and-deploy.yml` → `.github/workflows/build-and-deploy.yml`

The deploy job depends on a successful build, so a failed build leaves the
previously deployed version live. `services/content-assist`'s `status/` module
polls the workflow run to report success/failure.
