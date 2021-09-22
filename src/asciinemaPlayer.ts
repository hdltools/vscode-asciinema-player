import * as path from 'path'
import * as fs from 'fs'
import * as vscode from 'vscode'

export class AsciinemaPlayerProvider implements vscode.CustomTextEditorProvider {
	private static readonly viewType = 'asciinemaPlayer.cast'

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new AsciinemaPlayerProvider(context)
		const providerRegistration = vscode.window.registerCustomEditorProvider(AsciinemaPlayerProvider.viewType, provider, {
			webviewOptions: {
				retainContextWhenHidden: true,
			}
		})
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
		function updateWebview() {
			webviewPanel.webview.postMessage({
				type: 'update',
				name: path.basename(document.uri.path),
				body: document.getText(),
			})
		}
		webviewPanel.webview.options = {
			enableScripts: true,
		}
		webviewPanel.webview.html = this.getHTML(webviewPanel.webview)
		const chgDoc = vscode.workspace.onDidChangeTextDocument(e => {
			if(e.document.uri.toString() === document.uri.toString()) {
				updateWebview()
			}
		})
		webviewPanel.onDidDispose(() => {
			chgDoc.dispose()
		})
		updateWebview()
	}

	static loadHTML(htmlPath: string): string {
		try {
			const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
			return htmlContent
		} catch(error) {
			console.error(error)
			return ''
		}
	}

	private getHTML(webview: vscode.Webview): string {
		const webRoot = path.join(this.context.extensionPath, 'web')
		const rootUri = webview.asWebviewUri(vscode.Uri.file(webRoot))
		const html = AsciinemaPlayerProvider.loadHTML(path.join(webRoot, 'index.html'))
		const _html = html.replace(/src="/g, `src="${rootUri}/`)
		.replace(/href="/g, `href="${rootUri}/`)
		.replace(/<base>/, `<meta http-equiv="Content-Security-Policy" content="default-src ${webview.cspSource} blob:;">`)
		return _html
	}
}