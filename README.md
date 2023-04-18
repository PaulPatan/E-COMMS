# E-Commerce platform project

Project specification can be found at PROJECT.md

Repository preconfigured using NX on as a monorepo structure, lb, core and resource apps have been bootstrapped and should be managed under apps/

Any shared dependencies should be added under packages/ and bootstrapped using `npm init -w ./packages/${insert_name_of_package_dependency_here}`

The repository comes preconfigured with a CI configuration that runs Jest on merge requests for all services (no configuration is provided, this will need to be added by you)

The repository also comes preconfigured with debug configurations for each backend service (lb, core and resource) to make running services and debugging easier

To see a list of recommended VSCode extensions you can look at .vscode/extensions.json and make changes as desired
