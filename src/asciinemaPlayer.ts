import * as path from 'path'
import * as fs from 'fs'
import * as vscode from 'vscode'

export class AsciinemaPlayerProvider implements vscode.CustomTextEditorProvider {
	private static readonly viewType = 'catCustoms.asciinema'

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new AsciinemaPlayerProvider(context)
		const providerRegistration = vscode.window.registerCustomEditorProvider(AsciinemaPlayerProvider.viewType, provider)
		return providerRegistration
	}

	constructor(
		private readonly context: vscode.ExtensionContext
	) {
	}

	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		webviewPanel.webview.options = {
			enableScripts: true,
		}
		webviewPanel.webview.html = AsciinemaPlayerProvider.loadHTML(path.join(this.context.extensionPath, 'web', 'index.html'))
		const recv = webviewPanel.webview.onDidReceiveMessage(this.receive)
		webviewPanel.onDidDispose(() => {
			recv.dispose()
		})
	}

	private receive(message: object): void {

	}

	static loadHTML(htmlPath: string): string {
		const [_webRoot, _htmlPath] = fs.statSync(htmlPath).isDirectory() ?
			[htmlPath, path.join(htmlPath, 'index.html')]
			: [path.dirname(htmlPath), htmlPath]
		const vscodeWebRoot = vscode.Uri.file(_webRoot).with({scheme: 'vscode-resource'})
		try {
			const htmlContent = fs.readFileSync(_htmlPath, 'utf-8')
			.replace(/<base>/, `<base href=${vscodeWebRoot}`)
			return htmlContent
		} catch(error) {
			console.error(error)
			return ''
		}
	}
}