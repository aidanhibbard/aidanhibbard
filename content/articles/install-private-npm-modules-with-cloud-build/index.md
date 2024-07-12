---
title: 'Installing Private NPM Modules with Cloud Build'
desc: 'Learn how to secretly mount a .npmrc in your docker image to avoid leaking keys.'
publishedAt: 06-17-24
lastEditedAt: 06-17-24
img: 'images/articles/install-private-npm-modules-with-cloud-build/index.png'
tags: 'Tutorial,Docker,Google Cloud,Cloud Build,npm'
---

## [Introduction]{.block .mb-6 .prose .sm:prose-md .md:prose-lg .lg:prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

::article-paragraph
Recently I was tasked with creating a new pipelines from app repositories in GitHub to Cloud Run deployments. One of our apps used private modules not hosted in our own artifact registry (BullMQ Pro), and we needed a secure way to pull the secrets without leaking them into the docker image.
::

::article-paragraph
Cloud build has the ability to pull secrets directly from Cloud Secrets so I wanted our NPM tokens for various vendors to live there. That way we had the benefits of versioning, and security not offered by GitHub secrets in actions.
::

::article-paragraph
I saw many people using pipelines where they generated a .npmrc file, or added private tokens to the NPM configs during install, then removed them at the end. NPMs docs has a different way of going about this by mounting the npmrc as a secret.
::

::article-paragraph
Per the NPM docs this "will leave no trace after npm dependency installation is done."
::

## [Setup]{.block .mb-6 .prose .sm:prose-md .md:prose-lg .lg:prose-xl .text-gray-900 .h-full .hover:text-green-300 .transition .duration-50 .no-underline}

::article-paragraph
(Note: mounting secrets in a dockerfile will require enabling BuildKit)
::

::code-block
```yaml
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'your-registry-domain', '.']
    env:
      - 'DOCKER_BUILDKIT=1'
```
::

::article-paragraph
So I added our needed NPM tokens to cloud secrets, and made them available to cloudbuild VIA the availableSecrets key in the cloudbuild.yaml
::

::code-block
```yaml
availableSecrets:
  secretManager:
    - versionName: projects/YOUR_PROJECT_ID/secrets/NPM_TOKEN/versions/latest
      env: 'NPM_TOKEN'
    - versionName: projects/YOUR_PROJECT_ID/secrets/NPM_TASKFORCESH_TOKEN/versions/latest
      env: 'NPM_TASKFORCESH_TOKEN'
```
::

::article-paragraph
Generating the .npmrc for the docker image needs to be done as a bash step before your docker build step
::

::code-block
```yaml
steps:
  - name: bash
    args:
      - '-c'
      - |
        echo "@taskforcesh:registry=https://npm.taskforce.sh/" > .npmrc
        echo "//npm.taskforce.sh/:_authToken=$$NPM_TASKFORCESH_TOKEN" >> .npmrc
        echo "always-auth=true" >> .npmrc
        echo "@your-org:registry=https://registry.npmjs.org/" >> .npmrc
        echo "//registry.npmjs.org/:_authToken=$$NPM_TOKEN" >> .npmrc
    secretEnv: ['NPM_TOKEN', 'NPM_TASKFORCESH_TOKEN']
```
::

::article-paragraph
Now that the npmrc is created mount it as a secret in your docker image
::

::code-block
```bash
RUN --mount=type=secret,id=npmrc,target=YOUR_APP_DIR/.npmrc npm install
RUN npm run build
```
::

::article-paragraph
That's it! You should be able to add multiple private module sources to your cloud build pipeline.
::
