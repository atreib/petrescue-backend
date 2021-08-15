# 👨🏻‍💻 Contributing

Our back-end uses the Clean Architecture pattern and we're using TDD to develop the application. Besides, ESLint is set with the Airbnb standard configuration and Prettier is also configured. The code-style is applied in every `pre-commit` and `pre-push` git hooks, using the `husky` and `lint-staged` libraries.

## 🖼️ Architecture diagram

![](docs/architecture.png)

This project development is being driven by our architecture diagram. This diagram doesn't have any particular pattern, just being used as an easy and fast overview of the solution.

- The diagram project can be found inside the directory `./docs/architecture.png`.
- The tool used to control the diagram is [draw.io](https://app.diagrams.net/).
- Every new version must be available in the `.png` extension and replace the old one
    - You can open the `.png` file as a project, inside [draw.io](https://app.diagrams.net/)
    - When saving the project, after updating it, choose "File" -> "Export as" -> "PNG" and **check the option "Include a copy of my diagram"**. Then, replace the file with the old version by the exported (and new) one.

## ✅ Unit tests

Pet Rescue uses TDD as the development process. As so, unit testing is required and we're going to always pursuit 100% code coverage. We understand that automated tests shouldn't be a burden, easing the quality improvement without increasing the burocracy to develop. So, the developer needs to understand the best scenario for the requirement under development and if the automated test is going to increase the quality without decreasing the productivity.

Pet Rescue is using Jest for writing unit test. Every class has a `filename.spec.ts` file associated and Jest is already set to search for these files.
The unit tests can be executed by running `yarn test`.

## 🖌️ Code-style

To-do
