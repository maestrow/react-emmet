- https://www.metachris.com/2021/04/starting-a-typescript-project-in-2021/
- run jest: `npx jest -t "name"` or `npm test -- -t "name"`



Проблемы при настройке проекта:

- ts-node не реагирует на tsconfig/compilerOptions/paths. Сообщает: Cannot find module. Решение: `npm i -D tsconfig-paths`, `ts-node -r tsconfig-paths/register src/index.ts`. Источник: https://stackoverflow.com/a/66592655/1189832

- jest не реагирует на tsconfig/compilerOptions/paths. Сообщает: Cannot find module. Решение: 
jest.config:
```
  moduleNameMapper: {
    "@lib/(.*)": "<rootDir>/lib/$1",
  },
```

- [ts-jest aliases does not work](https://github.com/microsoft/vscode/issues/94474) is VSCode. В VSCode, в файле с тестом, подсвечивается строка импорта модуля "import * as P from '@lib/parsimmon'". Сообщение: Cannot find module. Проверка: Открыть файла с тестом; F1, "TypeScript: Go to project configuration". Если файл - часть ts-проекта, то должен открыться соответствующий tsconfig. Иначе сообщается "file is not a part of ts project". В моем случае причиной была настройка tsconfig/exclude. 

- eslint подчеркивает в jest config и eslintrc.js : 'module' is not defined. Решение: добавить в eslintrc строку
```
"env": {
    "browser": true,
    "amd": true,
    "node": true
},
```
Источник: https://stackoverflow.com/questions/49789177/module-is-not-defined-and-process-is-not-defined-in-eslint-in-visual-studio-code