# azure-pipelines-monorepo

## USE CASE

This is not a recommendation to use a monorepo, just an example of how to implement it. Although uncommon, there are valid reasons to have a monorepo, especially for projects just migrating to the cloud.

includes commit lints : 
- detects the pr title and makes sure that its correct 

In this scenario, we want to have multiple independent Azure DevOps pipelines in a single git repository.

## MONOREPO STRUCTURE

This project has 3 different YAML pipelines, one in the project root and two in subfolders as shown:

```
.
├── README.md
├── azure-pipelines.yml
│   └── …
└── service-core
    |── azure-pipelines-core.yml
    └── …
```

## STEPS REQUIRED IN AZURE DEVOPS UI

In short, the trick is that you name your pipeline as code YAML file whatever you want - which was not true when Azure DevOps was first released. Given that, we create three different pipelines.

### FORK THE REPOSITORY (OPTIONAL)

This is a public repository so you should be able to add this repository into your Azure DevOps account. Note: you may need to create a service connection to GitHub even though this is a public repository. 

If you have issues, fork the repo.

### ADD THE PIPELINE

1. Go to a project
2. click **"New Pipeline"** blue button
3. Select the repository
4. Under **"Configure your Pipeline"**, select **"Existing Azure Pipelines YAML file"**. Run these steps 1-4 **three times**, each time selecting a different YAML file:
  - `azure-pipelines.yml`
  - `service-core/azure-pipelines-core.yml`

## HOW IT WORKS

### ROOT PIPELINE

The pipeline in the root folder is defined to ignore changes in the subfolders:

```
trigger:
  paths:
    exclude: # Exclude!
      - 'service-core/*'
```

### SUB-PROJECT PIPELINES

Each subfolder has a pipeline that is (CI) triggered by changes in its own directories. 

```
trigger:
  paths:
    include: # Include!
```

Note: the paths are always defined relative to the project root, not the location of the file.

## CAVEATS!

There's a reason why monorepos are not common. If you choose this setup…

- Be Aware of Other Triggers, not just CI ones
- Are we Building A or B or both?
- Keep your Working Directory in Mind, e.g. running `npm install` doesn't work from root. So you may need to set `workingDirectory` in _each_ step.
