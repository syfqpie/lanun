import type { PlopTypes } from '@turbo/gen'

/**
 * Generator for the project. Please refer:
 * - https://turborepo.com/docs/guides/generating-code
 * - https://plopjs.com/documentation/#getting-started
 * - https://handlebarsjs.com/guide/
 */
export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator('react-kit-component', {
		description: 'Adds a new `@lanun/react-kit` component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the component?',
				validate: (input) => (input ? true : 'Component name cannot be empty.'),
			},
		],
		actions: [
			{
				type: 'add',
				path: 'packages/react-kit/src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
				templateFile: 'templates/react-kit/component/tsx.hbs',
			},
			{
				type: 'add',
				path: 'packages/react-kit/src/components/{{pascalCase name}}/index.ts',
				templateFile: 'templates/react-kit/component/index.hbs',
			},
			{
				type: 'modify',
				path: 'packages/react-kit/src/components/index.ts',
				transform: (content, data) => {
					const componentName = data.name.replace(/(^\w|-\w)/g, (s: string) =>
						s.replace('-', '').toUpperCase(),
					)
					const importLine = `export * from './${componentName}'`
					const lines = content
						.split('\n')
						.map((l) => l.trim())
						.filter(Boolean)

					if (lines.includes(importLine)) {
						return content.endsWith('\n\n') ? content : content + '\n'
					}

					return [...lines, importLine, ''].join('\n')
				},
			},
		],
	})
}
